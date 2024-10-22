import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
    Modal,
    Button,
    Table,
    Select,
    Dropdown as AntDropdown,
    Menu,
    Space,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import LessonSubjectsDrawer from "./drawer";
import useDrawer from "../../../../../hooks/useDrawer";
import { AuthContext } from "../../../../../context/authContext";

const LessonSubjects = () => {
    const [lessons, setLessons] = useState([]);
    const [editLessonData, setEditLessonData] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const { open, onOpen, onClose } = useDrawer();
    const { id: moduleID } = useParams();
    const API = "http://localhost:3000";
    const { role } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${API}/lessonunits/all/${moduleID}`
                );
                setLessons(response.data.lesson_units);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [moduleID]);

    const handleEdit = (lessonName) => {
        const filteredData = lessons.filter(
            (lesson) => lesson.lesson_name === lessonName
        );
        setEditLessonData(filteredData);
        setShowEditModal(true);
    };

    const handleDeleteSubject = async (lessonName, subjectName, index) => {
        try {
            const unit_id = editLessonData[index].id;
            console.log(unit_id);

            await axios.post(`${API}/lessonunits/delete/${unit_id}`);
            setEditLessonData((prevData) => {
                const newData = [...prevData];
                newData.splice(index, 1);
                return newData;
            });

            setLessons((prevLessons) =>
                prevLessons.filter(
                    (lesson) =>
                        lesson.lesson_name !== lessonName ||
                        lesson.unit_name !== subjectName
                )
            );
            window.location.reload()
        } catch (error) {
            console.error(error);
            alert("Failed to delete subject");
        }
    };

    const handleCreate = (lesson_id, module_id, selected_subjects) => {
        console.log("Created:", lesson_id, module_id, selected_subjects);
    };

    const menuItems = (course) => (
        <Menu>
            <Menu.Item key='1' onClick={() => handleEdit(course)}>
                Edit
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
            <LessonSubjectsDrawer
                open={open}
                onClosed={onClose}
                onCreate={handleCreate}
            />
            <table className='min-w-full border border-gray-300 mt-14'>
                <thead>
                    <tr className='bg-gray-100 text-center text-xl'>
                        <th className='border p-2'>№</th>
                        <th className='border p-2'>Lesson</th>
                        <th className='border p-2'>Subjects</th>
                        {(role === "super" || role === "head_teacher") && (
                            <th className='border p-2'>Action</th>
                        )}
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {lessons &&
                        lessons
                            .reduce((acc, curr) => {
                                const index = acc.findIndex(
                                    (item) =>
                                        item.lesson_name === curr.lesson_name
                                );
                                if (index === -1) {
                                    acc.push({
                                        ...curr,
                                        subjects: new Set([curr.unit_name]),
                                    });
                                } else {
                                    acc[index].subjects.add(curr.unit_name);
                                }
                                return acc;
                            }, [])
                            .map((item, index) => (
                                <tr
                                    key={`${
                                        item.lesson_name
                                    }-${index}-${Math.random()}`}
                                    className='hover:bg-gray-100 text-xl'>
                                    <td className='border text-center p-2'>
                                        {index + 1}
                                    </td>
                                    <td className='border text-center p-2'>
                                        {item.lesson_name}
                                    </td>
                                    <td className='border text-center p-2'>
                                        {[...item.subjects].join(", ")}
                                    </td>
                                    {(role === "super" ||
                                        role === "head_teacher") && (
                                        <td className='border text-center p-2'>
                                            <AntDropdown
                                                overlay={menuItems(
                                                    item.lesson_name
                                                )}
                                                trigger={["click"]}>
                                                <a
                                                    onClick={(e) =>
                                                        e.preventDefault()
                                                    }
                                                    className='cursor-pointer'>
                                                    <Space>
                                                        <p className='rotate-90 text-2xl font-bold text-gray-600'>
                                                            ...
                                                        </p>
                                                    </Space>
                                                </a>
                                            </AntDropdown>
                                        </td>
                                    )}
                                </tr>
                            ))}
                </tbody>
            </table>

            <Modal
                open={showEditModal}
                onCancel={() => setShowEditModal(false)}
                footer={null}
                className='rounded-lg'>
                <h2 className='text-xl font-semibold mb-4'>Edit Lesson</h2>

                <Select
                    placeholder='Select Lesson'
                    style={{ width: "100%", marginBottom: "20px" }}
                    onChange={(value) => handleEdit(value)}>
                    {lessons &&
                        lessons
                            .map((item) => item.lesson_name)
                            .filter(
                                (value, index, self) =>
                                    self.indexOf(value) === index
                            )
                            .map((lesson_name) => (
                                <Select.Option
                                    key={lesson_name}
                                    value={lesson_name}>
                                    {lesson_name}
                                </Select.Option>
                            ))}
                </Select>

                <Table
                    columns={[
                        {
                            title: "Lesson",
                            dataIndex: "lesson_name",
                            key: "lesson_name",
                        },
                        {
                            title: "Subject",
                            dataIndex: "unit_name",
                            key: "unit_name",
                            render: (text, record, index) => (
                                <div className='flex items-center justify-between'>
                                    {text}
                                    <Button
                                        type='link'
                                        icon={<DeleteOutlined />}
                                        onClick={() =>
                                            handleDeleteSubject(
                                                record.lesson_name,
                                                text,
                                                index
                                            )
                                        }
                                        className='text-red-600'
                                    />
                                </div>
                            ),
                        },
                    ]}
                    dataSource={editLessonData}
                    pagination={false}
                    rowKey={(record) =>
                        `${record.lesson_name}-${
                            record.unit_name
                        }-${Math.random()}`
                    }
                />
            </Modal>
        </div>
    );
};

export default LessonSubjects;
