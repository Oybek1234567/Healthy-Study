import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useDrawer from "../../../../../hooks/useDrawer";
import LessonsDrawer from "./drawer";
import { Dropdown, Space, Button, Modal, Menu } from "antd";

const Lessons = () => {
    const { id: moduleID } = useParams();
    const [data, setData] = useState([]);
    const [newName, setNewName] = useState("");
    const [editLesson, setEditLesson] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const { open, onOpen, onClose } = useDrawer();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const req = await axios.get(
                    `http://localhost:3000/lessons/all/${moduleID}`
                );
                setData(req.data.lessons);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [moduleID]);

    const handleSave = async () => {
        try {
            alert("Yaratildi");
            window.location.reload();
            await axios.post(
                `http://localhost:3000/lessons/edit/${editLesson.id}`,
                { name: newName }
            );
            const updatedLessons = data.map((lesson) =>
                lesson.id === editLesson.id
                    ? { ...lesson, name: newName }
                    : lesson
            );
            setData(updatedLessons);
            setEditLesson(null);
            setShowEditModal(false);
            alert("Lesson successfully updated");
        } catch (error) {
            console.error(error);
            alert("Failed to update lesson");
        }
    };

    const handleEdit = (lesson) => {
        setEditLesson(lesson);
        setNewName(lesson.name);
        setShowEditModal(true);
    };

    const handleDelete = async (lesson) => {
        try {
            alert("Deleted");
            window.location.reload();
            await axios.post(
                `http://localhost:3000/lessons/delete/${lesson.id}`
            );
            const updatedLessons = data.filter((l) => l.id !== lesson.id);
            setData(updatedLessons);
            alert("Lesson successfully deleted");
        } catch (error) {
            console.error(error);
            alert("Failed to delete lesson");
        }
    };

    const renderMenu = (lesson) => (
        <Menu>
            <Menu.Item key='edit' onClick={() => handleEdit(lesson)}>
                Edit
            </Menu.Item>
            <Menu.Item key='delete' onClick={() => handleDelete(lesson)}>
                Delete
            </Menu.Item>
        </Menu>
    );

    return (
        <div>
            <button
                className='absolute w-14 h-14 -translate-y-[200px] ml-[94%] bg-green-700 rounded-full text-white'
                type='button'
                onClick={() => onOpen()}>
                +
            </button>
            <LessonsDrawer open={open} onClosed={onClose} />
            <table className='absolute'>
                <thead>
                    <tr className='text-center'>
                        <th>№</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>
                                <Dropdown
                                    overlay={renderMenu(item)}
                                    trigger={["click"]}>
                                    <div>
                                        <Space>
                                            <p className='rotate-90 text-4xl cursor-pointer'>
                                                ...
                                            </p>
                                        </Space>
                                    </div>
                                </Dropdown>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
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
                <h2>Edit Lesson</h2>
                <div className='flex flex-col gap-2'>
                    <input
                        type='text'
                        className='border-2 border-black w-full'
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                </div>
            </Modal>
        </div>
    );
};

export default Lessons;
