import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useDrawer from "../../../../../hooks/useDrawer";
import LessonsDrawer from "./drawer";
import { Dropdown, Space, Button, Modal, Menu } from "antd";
import { AuthContext } from "../../../../../context/authContext";

const Lessons = () => {
    const { id: moduleID } = useParams();
    const [lessons, setLessons] = useState([]);
    const [newName, setNewName] = useState("");
    const [editLesson, setEditLesson] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const { open, onOpen, onClose } = useDrawer();
    const API = "http://localhost:3000";
    const {role} = useContext(AuthContext)

    // Darslarni olish
    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const { data } = await axios.get(
                    `${API}/lessons/all/${moduleID}`
                );
                setLessons(data.lessons);
            } catch (error) {
                console.error("Darslarni olishda xato:", error);
            }
        };

        fetchLessons();
    }, [moduleID]);

    // Darsni saqlash
    const handleSave = async () => {
        if (!editLesson) return;

        try {
            await axios.post(
                `${API}/lessons/edit/${editLesson.id}`,
                { name: newName }
            );
            setLessons((prev) =>
                prev.map((lesson) =>
                    lesson.id === editLesson.id
                        ? { ...lesson, name: newName }
                        : lesson
                )
            );
            setShowEditModal(false);
            alert("Dars muvaffaqiyatli yangilandi");
        } catch (error) {
            console.error("Darsni yangilashda xato:", error);
            alert("Darsni yangilashda xato");
        }
    };

    // Darsni tahrirlash
    const handleEdit = (lesson) => {
        setEditLesson(lesson);
        setNewName(lesson.name);
        setShowEditModal(true);
    };

    // Darsni o'chirish
    const handleDelete = async (lesson) => {
        try {
            await axios.post(
                `${API}/lessons/delete/${lesson.id}`
            );
            setLessons((prev) => prev.filter((l) => l.id !== lesson.id));
            alert("Dars muvaffaqiyatli o'chirildi");
        } catch (error) {
            console.error("Darsni o'chirishda xato:", error);
            alert("Darsni o'chirishda xato");
        }
    };

    // Dropdown menyusini yaratish
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
        <div className='relative p-4'>
            {(role === "super" || role === "head_teacher") && (
                <button
                    className='absolute w-14 h-14 text-xl -top-2 right-6 bg-green-700 rounded-full text-white'
                    type='button'
                    onClick={onOpen}>
                    +
                </button>
            )}
            <LessonsDrawer open={open} onClosed={onClose} />
            <table className='min-w-full border border-gray-300 mt-14'>
                <thead>
                    <tr className='bg-gray-100 text-center text-xl'>
                        <th className='border p-2'>№</th>
                        <th className='border p-2'>Name</th>
                        {(role === "super" || role === "head_teacher") && (
                            <th className='border p-2'>Action</th>
                        )}
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {lessons.map((item, index) => (
                        <tr key={item.id} className='hover:bg-gray-100 text-xl'>
                            <td className='border text-center p-2'>
                                {index + 1}
                            </td>
                            <td className='border text-center p-2'>
                                {item.name}
                            </td>
                            {(role === "super" || role === "head_teacher") && (
                                <td className='border text-center p-2'>
                                    <Dropdown
                                        overlay={renderMenu(item)}
                                        trigger={["click"]}>
                                        <Space>
                                            <p className='rotate-90 text-2xl cursor-pointer'>
                                                ...
                                            </p>
                                        </Space>
                                    </Dropdown>
                                </td>
                            )}
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
                        Save
                    </Button>,
                ]}>
                <h2 className='text-lg font-semibold'>Edit Lesson</h2>
                <input
                    type='text'
                    className='border-2 border-gray-300 w-full mt-2 mb-3 h-10 pl-2 rounded'
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                />
            </Modal>
        </div>
    );
};

export default Lessons;
