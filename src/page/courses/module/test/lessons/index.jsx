import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useDrawer from "../../../../../hooks/useDrawer";
import LessonsDrawer from "./drawer";
import { Dropdown, Space, Button, Modal, Menu } from "antd";

const Lessons = () => {
    const { id: moduleID } = useParams();
    const [lessons, setLessons] = useState([]);
    const [newName, setNewName] = useState("");
    const [editLesson, setEditLesson] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const { open, onOpen, onClose } = useDrawer();
    const API = "http://localhost:3000";

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
                Tahrirlash
            </Menu.Item>
            <Menu.Item key='delete' onClick={() => handleDelete(lesson)}>
                O`chirish
            </Menu.Item>
        </Menu>
    );

    return (
        <div className='relative p-4'>
            <button
                className='absolute w-14 h-14 -translate-y-10 ml-[90%] text-xl bg-green-600 rounded-full text-white shadow-lg hover:bg-green-700 transition duration-300 ease-in-out'
                type='button'
                onClick={onOpen}>
                +
            </button>
            <LessonsDrawer open={open} onClosed={onClose} />
            <table className='min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden mt-10'>
                <thead className='bg-gray-100'>
                    <tr className='text-center'>
                        <th className='py-3 px-4 text-gray-600 font-semibold'>
                            №
                        </th>
                        <th className='py-3 px-4 text-gray-600 font-semibold'>
                            Nomi
                        </th>
                        <th className='py-3 px-4 text-gray-600 font-semibold'>
                            Harakatlar
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {lessons.map((item, index) => (
                        <tr
                            key={item.id}
                            className='text-center border-b hover:bg-gray-50 transition duration-200 ease-in-out'>
                            <td className='py-2 px-4'>{index + 1}</td>
                            <td className='py-2 px-4'>{item.name}</td>
                            <td className='py-2 px-4'>
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
                        Yopish
                    </Button>,
                    <Button key='save' type='primary' onClick={handleSave}>
                        O'zgarishlarni saqlash
                    </Button>,
                ]}>
                <h2 className='text-lg font-semibold'>Darsni tahrirlash</h2>
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
