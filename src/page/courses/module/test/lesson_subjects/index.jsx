import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Modal, Button, Table, Select } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import LessonSubjectsDrawer from "./drawer";
import useDrawer from "../../../../../hooks/useDrawer";

const LessonSubjects = () => {
    const [lessons, setLessons] = useState([]);
    const [editLessonData, setEditLessonData] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const { open, onOpen, onClose } = useDrawer();
    const { id: moduleID } = useParams();
    const API = "http://localhost:3000";
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
            await axios.post(
                `${API}/lessonunits/delete/${unit_id}`
            );
            setLessons((prevLessons) =>
                prevLessons.filter(
                    (lesson) =>
                        lesson.lesson_name !== lessonName ||
                        lesson.unit_name !== subjectName
                )
            );

            setEditLessonData((prevData) => {
                const newData = [...prevData];
                newData.splice(index, 1);
                return newData;
            });
        } catch (error) {
            console.error(error);
            alert("Failed to delete subject");
        }
    };

    return (
        <div className='relative p-4'>
            <button
                className='absolute w-14 h-14 -translate-y-8 right-4 text-xl bg-green-700 rounded-full text-white flex items-center justify-center'
                type='button'
                onClick={onOpen}>
                +
            </button>
            <LessonSubjectsDrawer open={open} onClosed={onClose} />

            <select name='lessons' className='mb-4 w-1/4 ml-auto border border-black p-2 rounded-lg'>
                <option value='all'>All</option>
                <option value='active'>Active</option>
                <option value='deleted'>Deleted</option>
            </select>

            <table className='min-w-full bg-white border border-gray-300 rounded-lg'>
                <thead className='bg-gray-100'>
                    <tr className='text-center'>
                        <th className='py-3 px-4 text-gray-600 font-semibold'>
                            №
                        </th>
                        <th className='py-3 px-4 text-gray-600 font-semibold'>
                            Lesson
                        </th>
                        <th className='py-3 px-4 text-gray-600 font-semibold'>
                            Subjects
                        </th>
                        <th className='py-3 px-4 text-gray-600 font-semibold'>
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
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
                                    className='text-center border-b hover:bg-gray-100'>
                                    <td className='p-2'>{index + 1}</td>
                                    <td className='p-2'>{item.lesson_name}</td>
                                    <td className='p-2'>
                                        {[...item.subjects].join(", ")}
                                    </td>
                                    <td className='p-2'>
                                        <Button
                                            type='link'
                                            onClick={() =>
                                                handleEdit(item.lesson_name)
                                            }
                                            className='text-blue-600 hover:underline'>
                                            Edit
                                        </Button>
                                    </td>
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
