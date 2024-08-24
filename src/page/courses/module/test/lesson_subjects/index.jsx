import { useEffect, useState } from "react";
import useDrawer from "../../../../../hooks/useDrawer";
import LessonsDrawer from "./drawer";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Dropdown, Modal, Space, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const LessonSubjects = () => {
    const [filteredLessons, setFilteredLessons] = useState([]);
    const [lessons, setLessons] = useState([]);
    const [editLesson, setEditLesson] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [newLessonID, setNewLessonID] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [lessonUnits, setLessonUnits] = useState([]);
    const { id: moduleID } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/lessonunits/all/${moduleID}`
                );
                const lessonUnits = response.data.lesson_units;
                setLessons(lessonUnits);
                setFilteredLessons(lessonUnits);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [moduleID]);

    // handleSave
    const handleSave = async () => {
        try {
            await axios.post(
                `http://localhost:3000/lessonunits/edit/${editLesson.id}`,
                { lesson_id: newLessonID },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const updatedLessons = lessons.map((lesson) =>
                lesson.id === editLesson.id
                    ? { ...lesson, lesson_id: newLessonID }
                    : lesson
            );
            setLessons(updatedLessons);
            setFilteredLessons(updatedLessons);
            setShowEditModal(false);
            alert("Lesson successfully updated");
        } catch (error) {
            console.error(error);
            alert("Failed to update lesson");
        }
    };

    // handleEdit
    const handleEdit = (lesson) => {
        setEditLesson(lesson);
        setNewLessonID(lesson.lesson_id);
        setLessonUnits(lessons.filter((l) => l.lesson_id === lesson.lesson_id));
        setShowEditModal(true);
    };
    

    // handleDeleteLesson
    const handleDeleteLesson = async (lesson) => {
        try {
            alert("Lesson deleted");
            console.log(lesson.lesson_id);
            console.log(lesson.id);
            
            
            await axios.post(
                `http://localhost:3000/lessonunits/delete/${lesson.lesson_id}` 
            );
            const updatedLessons = lessons.filter((l) => l.id !== lesson.id);
            setLessons(updatedLessons);
            setFilteredLessons(updatedLessons);
        } catch (error) {
            console.error(error);
            console.log("Failed to delete lesson");
        }
    };



    // handleDelete
    const handleDelete = async (lesson) => {
        try {
            alert("Lesson deleted");
            await axios.post(
                `http://localhost:3000/lessonunits/delete/${lesson.id}` 
            ); 
            const updatedLessons = lessons.filter((l) => l.id !== lesson.id);
            setLessons(updatedLessons);
            setFilteredLessons(updatedLessons); 
        } catch (error) {
            console.error(error);
            console.log("Failed to delete lesson");
        }
    };



    // handleStatusChange
    const handleStatusChange = (status) => {
        setSelectedStatus(status);
        if (status === "all") {
            setFilteredLessons(lessons);
        } else {
            setFilteredLessons(
                lessons.filter((lesson) => lesson.status === status)
            );
        }
    };

    const getGroupedLessons = (lessons) => {
        const grouped = lessons.reduce((acc, lesson) => {
            const existingLesson = acc.find(
                (item) => item.lesson_id === lesson.lesson_id
            );
            if (existingLesson) {
                existingLesson.unit_ids.push(lesson.unit_id);
            } else {
                acc.push({
                    lesson_id: lesson.lesson_id,
                    unit_ids: [lesson.unit_id],
                });
            }
            return acc;
        }, []);

        grouped.forEach((lesson) => {
            lesson.unit_ids = [...new Set(lesson.unit_ids)];
        });

        return grouped;
    };

    const menuItems = (lesson) => [
        {
            key: "edit",
            label: "Edit",
            onClick: () => handleEdit(lesson),
        },
        {
            key: "Delete Lesson",
            label: "Delete Lesson",
            onClick: () => handleDeleteLesson(lesson),
        }
    ];

    const { open, onOpen, onClose } = useDrawer();

    const columns = [
        {
            title: "Name",
            dataIndex: "lesson_id",
            key: "lesson_id",
        },
        {
            title: "Subject",
            dataIndex: "unit_id",
            key: "unit_id",
        },
        {
            title: "Action",
            key: "action",
            render: (record) => (
                <DeleteOutlined
                    onClick={() => handleDelete(record)} 
                    style={{ cursor: "pointer", color: "red" }}
                />
            ),
        },
    ];



    const groupedFilteredLessons = getGroupedLessons(filteredLessons);

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
                        <th>Subject</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {groupedFilteredLessons.map((item, index) => (
                        <tr key={`${item.lesson_id}-${index}-${Math.random()}`}>
                            <td>{index + 1}</td>
                            <td>{item.lesson_id}</td>
                            <td>{item.unit_ids.join(", ")}</td>
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
                name='lessons'
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
                <h2>Edit Lesson</h2>
                <Table
                    dataSource={lessonUnits}
                    columns={columns}
                    pagination={false}
                    rowKey={(record) =>
                        `${record.lesson_id}-${record.unit_id}-${Math.random()}`
                    }
                />
            </Modal>
        </div>
    );
};

export default LessonSubjects;
