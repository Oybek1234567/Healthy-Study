import { Modal } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const LessonReportTypesByModal = ({ open, onClose }) => {
    const location = useLocation();
    const { groupId, lesson_report_type_id, moduleId } = location.state;
    const [lessons, setLessons] = useState([]);
    
    const [selectedLessons, setSelectedLessons] = useState([]);
    const [data, setData] = useState([]);
    console.log(data)
    const API = "http://localhost:3000";
    const token = localStorage.getItem("token");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const req = await axios.get(
                    `${API}/grouplessons/all/${groupId}`
                );
                setLessons(req.data.group_lessons);
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }, [API, groupId]);

    useEffect(() => {
        const handleGetStudents = async () => {
            try {
                const req = await axios.get(
                    `${API}/groupstudents/all/${groupId}`
                );
                setData(req.data.group_student);
            } catch (e) {
                console.error(e);
            }
        };
        handleGetStudents();
    }, [API, groupId]);
    const handlePost = async () => {
        try {
            const students = data.map((item) => {
                console.log(item.id)
                const score = document.getElementById(`score-${item.id}`).value;
                const numberedScore = Number(score)
                return {
                    group_student_id: item.id,
                    user_id: item.student_id,
                    score: numberedScore,
                };
            });
            console.log("students", students);

            const postData = {
                group_lesson_id: Number(selectedLessons),
                lesson_report_type_id: lesson_report_type_id,
                students: students,
                module_id: moduleId,
            };
            console.log(postData);
            
            await axios.post(
                `${API}/lessonreportsbyuser/create/${groupId}`,
                postData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            window.location.reload();
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={
                <div className='flex justify-end'>
                    <button
                        onClick={handlePost}
                        className='bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow-md transition duration-200'>
                        Save
                    </button>
                </div>
            }
            className='rounded-lg p-4'>
            <div className='space-y-6'>
                <div>
                    <label className='block text-gray-700 font-medium mb-2'>
                        Select Lesson:
                    </label>
                    <select
                        className='w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                        value={selectedLessons}
                        onChange={(e) => setSelectedLessons(e.target.value)}>
                        <option value='dfg' selected>
                            Select Lesson
                        </option>
                        {lessons.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.lesson_name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Students Input */}
                <div>
                    <label className='block text-gray-700 font-medium mb-2'>
                        Students:
                    </label>
                    <div className='space-y-4'>
                        {data.map((item) => (
                            <div
                                key={item.id}
                                className='flex items-center justify-between border border-gray-300 rounded-md p-3 shadow-sm hover:shadow-md transition duration-200'>
                                <p className='text-gray-700 font-medium'>
                                    {item.student_name}
                                </p>
                                <input
                                    id={`score-${item.id}`}
                                    type='number'
                                    placeholder='Score'
                                    className='w-24 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default LessonReportTypesByModal;
