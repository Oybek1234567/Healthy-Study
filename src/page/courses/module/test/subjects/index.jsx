import { useEffect, useState } from "react";
import useDrawer from "../../../../../hooks/useDrawer";
import axios from "axios";
import { useParams } from "react-router-dom";
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
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const req = await axios.get(
                    `http://localhost:3000/subjects/all/${id}`
                );
                setData(req.data.units);
                setSubjects(req.data.units);
                setFilteredSubjects(req.data.units);
                console.log(req.data.units);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]); 

    // handleSave
    const handleSave = async () => {
        try {
            window.location.reload(); 
            await axios.post(
                `http://localhost:3000/subjects/edit/${editSubject.id}`,
                { name: newName },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            setSubjects((prev) =>
                prev.map((c) =>
                    c.id === editSubject.id
                        ? {
                              ...c,
                              name: newName,
                          }
                        : c
                )
            );
            setFilteredSubjects((prev) =>
                prev.map((c) =>
                    c.id === editSubject.id
                        ? {
                              ...c,
                              name: newName,
                          }
                        : c
                    )
                );
                setShowEditModal(false);
                
            alert("Subject successfully updated");
        } catch (error) {
            console.error(error);
            alert("Failed to update subject");
        }
    };

    // handleEdit
    const handleEdit = (subject) => {
        setEditSubject(subject);
        setNewName(subject.name);
        setShowEditModal(true);
    };

    // handleDelete
    const handleDelete = async (subject) => {
        try {
            alert("Subject successfully deleted");
            window.location.reload(); 
            await axios.post(
                `http://localhost:3000/subjects/delete/${subject.id}`
            );
            const updatedSubjects = subjects.filter((c) => c.id !== subject.id);
            setSubjects(updatedSubjects);
            setFilteredSubjects(updatedSubjects);
        } catch (error) {
            console.error(error);
            alert("Failed to delete subject");
        }
    };

    // handleStatusChange
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
                onClick={() => onOpen()}>
                +
            </button>
            <SubjectsDrawer open={open} onClosed={onClose} />
            <table className='absolute'>
                <thead>
                    <tr className='text-center'>
                        <th>№</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSubjects.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>
                                <Dropdown
                                    trigger={["click"]}
                                    menu={{ items: menuItems(item) }}>
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
                <option value='accepted'>Active</option>
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
