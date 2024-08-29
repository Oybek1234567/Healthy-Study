import { useEffect, useState } from "react";
import useDrawer from "../../../../../hooks/useDrawer";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Button, Dropdown, Modal, Space } from "antd";
import SubjectsDrawer from "./drawer";

const Subjects = () => {
    const [filteredSubjects, setFilteredSubjects] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [editSubject, setEditSubject] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [newName, setNewName] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const req = await axios.get(
                    `http://localhost:3000/subjects/all/${id}`
                );
                setSubjects(req.data.units);
                setFilteredSubjects(req.data.units);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);

    const handleSave = async () => {
        try {
            await axios.post(
                `http://localhost:3000/subjects/edit/${editSubject.id}`,
                { name: newName },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const updatedSubjects = subjects.map((subject) =>
                subject.id === editSubject.id
                    ? { ...subject, name: newName }
                    : subject
            );

            setSubjects(updatedSubjects);
            setFilteredSubjects(updatedSubjects);
            setShowEditModal(false);
            alert("Subject successfully updated");
        } catch (error) {
            console.error(error);
            alert("Failed to update subject");
        }
    };

    const handleEdit = (subject) => {
        setEditSubject(subject);
        setNewName(subject.name);
        setShowEditModal(true);
    };

    const handleDelete = async (subject) => {
        try {
            await axios.post(
                `http://localhost:3000/subjects/delete/${subject.id}`
            );

            const updatedSubjects = subjects.filter((s) => s.id !== subject.id);
            setSubjects(updatedSubjects);
            setFilteredSubjects(updatedSubjects);
            alert("Subject successfully deleted");
        } catch (error) {
            console.error(error);
            alert("Failed to delete subject");
        }
    };

    const handleStatusChange = (status) => {
        setSelectedStatus(status);
        if (status === "all") {
            setFilteredSubjects(subjects);
        } else {
            setFilteredSubjects(
                subjects.filter((subject) => subject.status === status)
            );
        }
    };

    const menuItems = (subject) => [
        {
            key: "edit",
            label: "Edit",
            onClick: () => handleEdit(subject),
        },
        {
            key: "delete",
            label: "Delete",
            onClick: () => handleDelete(subject),
        },
    ];

    const { open, onOpen, onClose } = useDrawer();

    return (
        <div>
            <button
                className='absolute w-14 h-14 -translate-y-[200px] ml-[94%] bg-green-700 rounded-full text-white'
                type='button'
                onClick={onOpen}>
                +
            </button>
            <SubjectsDrawer open={open} onClosed={onClose} />
            <table className='absolute'>
                <thead>
                    <tr className='text-center'>
                        <th>№</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSubjects && filteredSubjects.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>
                                <Link to={`/modules/${id}/subjects/${item.id}`}>
                                    {item.name}
                                </Link>
                            </td>
                            <td>
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
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <select
                name='subjects'
                onChange={(e) => handleStatusChange(e.target.value)}
                className='-translate-y-[200px] ml-[75%] w-1/12 text-xl'>
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
                <h2>Edit Subject</h2>
                <input
                    type='text'
                    className='border-2 border-black w-full mt-2 mb-3 h-10 pl-1'
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                />
            </Modal>
        </div>
    );
};

export default Subjects;
