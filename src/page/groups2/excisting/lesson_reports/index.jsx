import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LessonModal from "./drawer";
import useDrawer from "../../../../hooks/useDrawer";

const LessonReports = () => {
    const [data, setData] = useState([]);
    const [lesson, setLesson] = useState([]);
    const [student, setStudent] = useState([]);
    const location = useLocation();
    const { groupId, lesson_report_type_id } = location.state;
    const { open, onOpen, onClose } = useDrawer();
    const API = "http://localhost:3000";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    `${API}/lessonreportsbyuser/all/${groupId}`,
                    { lesson_report_type_id }
                );
                setData(response.data.data);
            } catch (error) {
                console.error("Xato yuz berdi:", error);
            }
        };
        fetchData();
    }, [groupId, lesson_report_type_id]);

    useEffect(() => {
        const handleGetLessons = async () => {
            try {
                const req = await axios.get(
                    `${API}/grouplessons/all/${groupId}`
                );
                setLesson(req.data.group_lessons);
            } catch (e) {
                console.error(e);
            }
        };
        handleGetLessons();
    }, [groupId]);

    useEffect(() => {
        const handleGetStudent = async () => {
            try {
                const req = await axios.post(
                    `${API}/lessonreportsbyuser/all/${groupId}`,
                    { lesson_report_type_id: lesson_report_type_id }
                );
                setStudent(req.data.data);
                console.log(req.data.data);
            } catch (e) {
                console.error(e);
            }
        };
        handleGetStudent();
    }, [groupId, lesson_report_type_id]);

    return (
        <div className='p-6 bg-gray-100 rounded-lg shadow-md'>
            <button
                onClick={onOpen}
                className='w-10 h-10 rounded-full bg-green-700 text-white text-2xl mt-5 mb-5'>
                +
            </button>
            <LessonModal open={open} onClose={onClose} />
            {data.length > 0 ? (
                <div className='overflow-x-auto'>
                    <table className='min-w-full bg-white border border-gray-300'>
                        <thead>
                            <tr className='bg-gray-200 text-center'>
                                <th className='py-2 border-b'>Talaba ismi</th>
                                <th className='py-2 border-b'>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {student.map((item) => (
                                <tr key={item.id} className='hover:bg-gray-100'>
                                    <td className='py-2 border-b text-center'>
                                        {item.student_name}
                                    </td>
                                    <td className='py-2 border-b text-center'>
                                        <div className='flex justify-center gap-1'>
                                            {item.score.map(
                                                (scoreItem, index) => (
                                                    <p key={scoreItem.id}>
                                                        {scoreItem.score}
                                                        {index ===
                                                        item.score.length - 1
                                                            ? ""
                                                            : " |"}
                                                    </p>
                                                )
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className='text-center text-gray-600'>
                    Ma`lumotlar mavjud emas.
                </p>
            )}
        </div>
    );
};

export default LessonReports;
