import { useContext, useEffect, useState } from "react";
import useDrawer from "../../../../../hooks/useDrawer";
import ExamsDrawer from "./drawer";
import axios from "axios";
import { Link, useLocation, useParams } from "react-router-dom";
import { Button, Modal, Dropdown, Space } from "antd";
import { AuthContext } from "../../../../../context/authContext";

const Exams = () => {
    const [filteredExams, setFilteredExams] = useState([]);
    const [exams, setExams] = useState([]);
    const [editExam, setEditExam] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [newName, setNewName] = useState("");
    const [newWeight, setNewWeight] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("active");
    const [status, setStatus] = useState("");
    const { id } = useParams();
    const location = useLocation();
    const courseName = location.state?.courseName;
    const moduleName = location.state?.moduleName;
    const API = "http://localhost:3000";
    const {role} = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const req = await axios.get(`${API}/assignmenttypes/all/${id}`);
                const data = req.data.assignmenttypes;
                const filteredData = data.filter(
                    (exam) => exam.status === "active"
                );
                setExams(data);
                setFilteredExams(filteredData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);

    const handleSave = async () => {
        try {
            await axios.post(
                `${API}/assignmenttypes/edit/${editExam.id}`,
                { name: newName, weight: newWeight, status: status },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const updatedExams = exams.map((exam) =>
                exam.id === editExam.id
                    ? {
                          ...exam,
                          name: newName,
                          weight: newWeight,
                          status: status,
                      }
                    : exam
            );

            setExams(updatedExams);
            setFilteredExams(updatedExams);
            setShowEditModal(false);
            alert("Subject successfully updated");
        } catch (error) {
            console.error(error);
            alert("Failed to update subject");
        }
    };

    const handleEdit = (exam) => {
        setEditExam(exam);
        setNewName(exam.name);
        setNewWeight(exam.weight);
        setStatus(exam.status);
        setShowEditModal(true);
    };

    const handleStatusChange = (event) => {
        const status = event.target.value;
        setSelectedStatus(status);

        setFilteredExams(
            status === "active"
                ? exams.filter((subject) => subject.status === "active")
                : status === "deleted"
                ? exams.filter((subject) => subject.status === "deleted")
                : exams
        )
    };

    const menuItems = (exam) => [
        {
            key: "edit",
            label: "Edit",
            onClick: () => handleEdit(exam),
        },
    ];

    const { open, onOpen, onClose } = useDrawer();

    return (
        <div className='relative p-6'>
            <div className='flex justify-between mb-4'>
                {(role === "super" || role === "head_teacher") && (
                    <>
                        <select
                            name='lessons'
                            onChange={handleStatusChange}
                            className='border-2 border-black rounded-md px-2 py-1 focus:outline-none focus:border-gray-500 ml-[82%] -translate-y-5'>
                            <option value='active'>Active</option>
                            <option value='deleted'>Deleted</option>
                            <option value='all'>All</option>
                        </select>
                        <button
                            className='absolute w-14 h-14 text-xl -top-2 right-6 bg-green-700 rounded-full text-white'
                            type='button'
                            onClick={() => onOpen()}>
                            +
                        </button>
                    </>
                )}
            </div>
            <ExamsDrawer open={open} onClosed={onClose} />
            <div className='flex flex-wrap gap-6 mt-6'>
                {filteredExams &&
                    filteredExams.map((item) => (
                        <div
                            key={item.id}
                            className='flex flex-col w-72 h-40 p-4 border-2 border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 pt-4'>
                            {role === "super" || role === "head_teacher" ? (
                                <Link
                                    to={`/modules/${id}/types/${item.id}`}
                                    state={{
                                        courseName: courseName,
                                        moduleName: moduleName,
                                        name: item.name,
                                    }}
                                    className='flex flex-col text-lg font-semibold text-gray-800 cursor-pointer'>
                                    <p>Exam name: {item.name}</p>
                                    <p>Exam weight: {item.weight}</p>
                                    <p>Tests total: {item.tests_total}</p>
                                </Link>
                            ) : (
                                <div className='flex flex-col text-lg font-semibold text-gray-800'>
                                    <p className='text-center text-2xl font-bold -translate-y-3'>
                                        {item.name}
                                    </p>
                                    <p className='-translate-y-6'>
                                        Exam weight: {item.weight}
                                    </p>
                                    <p className='-translate-y-8'>
                                        Tests total: {item.tests_total}
                                    </p>
                                </div>
                            )}
                            <p className='-translate-y-10 w-10 h-6 bg-green-600 text-center text-white rounded'>
                                {item.id}
                            </p>
                            <p
                                className={`ml-[180px]  w-16 -translate-y-20 py-1 text-center text-white rounded-md ${
                                    item.status === "active"
                                        ? "bg-green-500"
                                        : "bg-red-500"
                                }`}>
                                {item.status === "active"
                                    ? "Active"
                                    : "Deleted"}
                            </p>
                            {(role === "super" || role === "head_teacher") && (
                                <Dropdown
                                    className='mt-4 cursor-pointer absolute translate-x-[230px] -translate-y-[40px]'
                                    menu={{ items: menuItems(item) }}
                                    trigger={["click"]}>
                                    <a onClick={(e) => e.preventDefault()}>
                                        <Space>
                                            <p className='rotate-90 text-4xl cursor-pointer'>
                                                ...
                                            </p>
                                        </Space>
                                    </a>
                                </Dropdown>
                            )}
                        </div>
                    ))}
            </div>
            <Modal
                open={showEditModal}
                onCancel={() => setShowEditModal(false)}
                footer={[
                    <Button
                        key='cancel'
                        onClick={() => setShowEditModal(false)}>
                        Close
                    </Button>,
                    <Button key='save' type='primary' onClick={handleSave}>
                        Save Changes
                    </Button>,
                ]}>
                <h2 className='mb-2 text-2xl'>Edit Exam</h2>
                <div className='flex flex-col gap-2'>
                    <label>
                        Name:
                        <input
                            type='text'
                            className='border-2 border-black w-full p-2 rounded-md'
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                        />
                    </label>
                    <label>
                        Weight:
                        <input
                            type='number'
                            className='border-2 border-black w-full p-2 rounded-md'
                            value={newWeight}
                            onChange={(e) => setNewWeight(e.target.value)}
                        />
                    </label>
                    <label>
                        Status:
                        <select
                            name='status'
                            className='w-full border border-black p-2 rounded-lg'
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}>
                            <option value='active'>Active</option>
                            <option value='deleted'>Deleted</option>
                        </select>
                    </label>
                </div>
            </Modal>
        </div>
    );
};

export default Exams;
