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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/lessonunits/all/${moduleID}`
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
            
            await axios.post(
                `http://localhost:3000/lessonunits/delete/${unit_id}`,
            );
        } catch (error) {
            console.error(error);
            alert("Failed to delete subject");
        }
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
    };

    return (
        <div>
            <table className='absolute'>
                <thead>
                    <tr className='text-center'>
                        <th>№</th>
                        <th>Lesson</th>
                        <th>Subjects</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {lessons && lessons
                        .reduce((acc, curr) => {
                            const index = acc.findIndex(
                                (item) => item.lesson_name === curr.lesson_name
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
                                }-${index}-${Math.random()}`}>
                                <td>{index + 1}</td>
                                <td>{item.lesson_name}</td>
                                <td>{[...item.subjects].join(", ")}</td>
                                <td>
                                    <Button
                                        type='link'
                                        onClick={() =>
                                            handleEdit(item.lesson_name)
                                        }>
                                        Edit
                                    </Button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

            <button
                className='absolute w-14 h-14 -translate-y-[200px] ml-[94%] bg-green-700 rounded-full text-white'
                type='button'
                onClick={onOpen}>
                +
            </button>
            <LessonSubjectsDrawer open={open} onClosed={onClose} />

            <select
                name='lessons'
                className='-translate-y-[200px] ml-[75%] w-1/12 text-xl'>
                <option value='all'>All</option>
                <option value='active'>Active</option>
                <option value='deleted'>Deleted</option>
            </select>

            <Modal
                open={showEditModal}
                onCancel={() => setShowEditModal(false)}
                footer={null}>
                <h2>Edit Lesson</h2>

                <Select
                    placeholder='Select Lesson'
                    style={{ width: "100%", marginBottom: "20px" }}
                    onChange={(value) => handleEdit(value)}>
                    {lessons && lessons
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
                                <div>
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
