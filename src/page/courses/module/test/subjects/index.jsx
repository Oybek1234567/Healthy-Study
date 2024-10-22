import { useContext, useEffect, useState } from "react";
import useDrawer from "../../../../../hooks/useDrawer";
import axios from "axios";
import { Link, useLocation, useParams } from "react-router-dom";
import { Button, Dropdown, Modal, Space } from "antd";
import SubjectsDrawer from "./drawer";
import { AuthContext } from "../../../../../context/authContext";
import { menu } from "../../../../../constants/data";

const Subjects = () => {
    const [filteredSubjects, setFilteredSubjects] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [editSubject, setEditSubject] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [newName, setNewName] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("active");
    const [newStatus, setNewStatus] = useState("active");
    const { id } = useParams();
    const location = useLocation();
    const courseName = location.state?.courseName;
    const moduleName = location.state?.moduleName;
    console.log(location.state);

    const API = "http://localhost:3000";

    const { role } = useContext(AuthContext);

    menu.filter((item) => {
        if (role === "super" || role === "head_teacher") {
            return item.roles?.includes(role);
        }
        return false;
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`${API}/subjects/all/${id}`);
                setSubjects(data.units);
                setFilteredSubjects(data.units);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);

    const handleSave = async () => {
        try {
            await axios.post(
                `${API}/subjects/edit/${editSubject.id}`,
                { name: newName, status: newStatus },
                { headers: { "Content-Type": "application/json" } }
            );

            const updatedSubjects = subjects.map((subject) =>
                subject.id === editSubject.id
                    ? { ...subject, name: newName, status: newStatus }
                    : subject
            );

            setSubjects(updatedSubjects);
            setFilteredSubjects(updatedSubjects);
            setShowEditModal(false);
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert("Failed to update subject");
        }
    };

    const handleEdit = (subject) => {
        setEditSubject(subject);
        setNewName(subject.name);
        setNewStatus(subject.status);
        setShowEditModal(true);
    };

    const handleStatusChange = (status) => {
        setSelectedStatus(status);
        setFilteredSubjects(
            status === "active"
                ? subjects.filter((subject) => subject.status === "active")
                : status === "deleted"
                ? subjects.filter((subject) => subject.status === "deleted")
                : subjects
        );
    };

    const menuItems = (subject) => [
        { key: "edit", label: "Edit", onClick: () => handleEdit(subject) },
    ];

    const { open, onOpen, onClose } = useDrawer();

    return (
        <div className='relative p-6'>
            {(role === "super" || role === "head_teacher") && (
                <>
                    <button
                        className='absolute w-14 h-14 text-xl -top-2 right-6 bg-green-700 rounded-full text-white'
                        type='button'
                        onClick={onOpen}>
                        +
                    </button>
                    <SubjectsDrawer open={open} onClosed={onClose} />

                    <div className='flex justify-between'>
                        <select
                            name='subjects'
                            onChange={(e) => handleStatusChange(e.target.value)}
                            className='border-2 border-black rounded-md px-2 py-1 focus:outline-none focus:border-gray-500 ml-[82%] -translate-y-5'>
                            <option value='active'>Active</option>
                            <option value='deleted'>Deleted</option>
                            <option value='all'>All</option>
                        </select>
                    </div>
                </>
            )}

            <table className='min-w-full border border-gray-300'>
                <thead>
                    <tr className='bg-gray-100 text-xl text-center'>
                        <th className='px-4 py-2 border border-gray-300'>№</th>
                        <th className='px-4 py-2 border border-gray-300'>
                            Name
                        </th>
                        {(role === "super" || role === "head_teacher") && (
                            <>
                                <th className='px-4 py-2 border border-gray-300'>
                                    Status
                                </th>
                                <th className='px-4 py-2 border border-gray-300'>
                                    Actions
                                </th>
                            </>
                        )}
                    </tr>
                </thead>
                <tbody className='text-center text-xl'>
                    {filteredSubjects.map((item, index) => (
                        <tr key={item.id} className='hover:bg-gray-50'>
                            <td className='px-4 py-2 border border-gray-300'>
                                {index + 1}
                            </td>
                            <td className='px-4 py-2 border border-gray-300'>
                                {role === "super" || role === "head_teacher" ? (
                                    <Link
                                        to={`/modules/${id}/subjects/${item.id}/test`}
                                        state={{
                                            moduleId: item.id,
                                            courseName: courseName,
                                            moduleName: moduleName,
                                            name: item.name,
                                        }}>
                                        {item.name}
                                    </Link>
                                ) : (
                                    <p>{item.name}</p>
                                )}
                            </td>

                            {(role === "super" || role === "head_teacher") && (
                                <>
                                    <td className='px-4 py-2 border border-gray-300'>
                                        {item.status}
                                    </td>
                                    <td className='px-4 py-2 border border-gray-300'>
                                        <Dropdown
                                            menu={{ items: menuItems(item) }}
                                            trigger={["click"]}>
                                            <a
                                                onClick={(e) =>
                                                    e.preventDefault()
                                                }>
                                                <Space>
                                                    <p className='rotate-90 text-4xl cursor-pointer'>
                                                        ...
                                                    </p>
                                                </Space>
                                            </a>
                                        </Dropdown>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal
                open={showEditModal}
                onCancel={() => setShowEditModal(false)}
                footer={[
                    <>
                        <Button
                            type='dashed'
                            onClick={() => setShowEditModal(false)}>
                            Close
                        </Button>
                        <Button key='save' type='primary' onClick={handleSave}>
                            Save Changes
                        </Button>
                    </>,
                ]}>
                <h2>Edit Subject</h2>
                <input
                    type='text'
                    className='border-2 border-black w-full mt-2 mb-3 h-10 pl-2 rounded-md'
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                />
                <select
                    name='status'
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className='border border-black w-full p-2 rounded-md'>
                    <option value='active'>Active</option>
                    <option value='deleted'>Deleted</option>
                </select>
            </Modal>
        </div>
    );
};

export default Subjects;
