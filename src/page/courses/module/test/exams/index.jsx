import { useEffect, useState } from "react";
import useDrawer from "../../../../../hooks/useDrawer";
import ExamsDrawer from "./drawer";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Modal, Dropdown, Space } from "antd";

const Exams = () => {
    const [filteredExams, setFilteredExams] = useState([]);
    const [exams, setExams] = useState([]);
    const [editExam, setEditExam] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [newName, setNewName] = useState("");
    const [newWeight, setNewWeight] = useState("");
    const [newTests, setNewTests] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const req = await axios.get(
                    `http://localhost:3000/assignmenttypes/all/${id}`
                );
                setExams(req.data.assignments);
                setFilteredExams(req.data.assignments);
                console.log(req.data.assignments);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);

    const handleSave = async () => {
        try {
            window.location.reload()
            alert("Subject successfully updated");
            await axios.post(
                `http://localhost:3000/assignmenttypes/edit/${editExam.id}`,
                { name: newName, weight: newWeight, tests_total: newTests },
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
                          tests_total: newTests,
                      }
                    : exam
            );

            setExams(updatedExams);
            setFilteredExams(updatedExams);
            setShowEditModal(false);

            alert("Subject successfully updated");
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert("Failed to update subject");
        }
    };

    const handleEdit = (exam) => {
        setEditExam(exam);
        setNewName(exam.name);
        setNewWeight(exam.weight);
        setNewTests(exam.tests_total);
        setShowEditModal(true);
    };

    const handleDelete = async (exam) => {
        try {
            window.location.reload()
            alert("Subject successfully deleted");
            await axios.post(
                `http://localhost:3000/assignmenttypes/delete/${exam.id}`
            );
            const updatedExams = exams.filter((c) => c.id !== exam.id);
            setExams(updatedExams);
            setFilteredExams(updatedExams);
            alert("Subject successfully deleted");
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert("Failed to delete subject");
        }
    };

    const handleStatusChange = (status) => {
        setSelectedStatus(status);
        if (status === "all") {
            setFilteredExams(exams);
        } else {
            setFilteredExams(exams.filter((exam) => exam.status === status));
        }
    };

    const menuItems = (exam) => [
        {
            key: "edit",
            label: "Edit",
            onClick: () => handleEdit(exam),
        },
        {
            key: "delete",
            label: "Delete",
            onClick: () => handleDelete(exam),
        },
    ];

    const { open, onOpen, onClose } = useDrawer();

    return (
        <div>
            <button
                className='absolute w-14 h-14 -translate-y-[200px] ml-[94%] bg-green-700 rounded-full text-white'
                type='button'
                onClick={() => onOpen()}>
                +
            </button>
            <ExamsDrawer open={open} onClosed={onClose} />
            <div className='absolute flex gap-4 flex-wrap'>
                {filteredExams.map((item) => (
                    <div key={item.id}>
                        <div className='flex flex-col text-2xl cursor-pointer mt-10 justify-center items-center w-[300px] h-40 border-4 border-black hover:text-black'>
                            <p>Exam name: {item.name}</p>
                            <p>Exam weight: {item.weight}</p>
                            <p>Tests total: {item.tests_total}</p>
                        </div>
                        <Dropdown
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
                    </div>
                ))}
            </div>
            <select
                name='lessons'
                onChange={(e) => handleStatusChange(e.target.value)}
                className=' -translate-y-[200px] ml-[75%] w-1/12 text-xl'>
                <option value='all'>All</option>
                <option value='active'>Active</option>
                <option value='deleted'>Deleted</option>
            </select>
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
                <h2>Edit Exam</h2>
                <div className='flex flex-col gap-2'>
                    <input
                        type='text'
                        className='border-2 border-black w-full'
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                    <input
                        type='number'
                        className='border-2 border-black w-full'
                        value={newWeight}
                        onChange={(e) => setNewWeight(e.target.value)}
                    />
                    <input
                        type='number'
                        className='border-2 border-black w-full'
                        value={newTests}
                        onChange={(e) => setNewTests(e.target.value)}
                    />
                </div>
            </Modal>    
        </div>
    );
};

export default Exams;
