import { Tabs } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useDrawer from "../../../hooks/useDrawer";
import ExcistingGroupDrawer from "./modal";

const Page = () => {
    const { open, onOpen, onClose } = useDrawer();
    const location = useLocation();
    const { name, moduleId, groupId } = location.state;
    const [assignments, setAssignments] = useState([]);
    const [attendance, setAttendance] = useState([]);
    const [lesson, setLesson] = useState([]);
    const [activeTabKey, setActiveTabKey] = useState(
        localStorage.getItem("activeTabKey") || "1"
    );
    const API = "http://localhost:3000";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const assignmentTypes = await axios.get(
                    `${API}/assignmenttypes/all/${moduleId}`
                );
                setAssignments(assignmentTypes.data.assignmenttypes);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [groupId, moduleId]);

    useEffect(() => {
        const handleGetAssignments = async () => {
            try {
                const lessonReports = await axios.get(
                    `${API}/lessonreporttypes/all/${moduleId}`
                );
                setLesson(lessonReports.data.lesson_report_types);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        handleGetAssignments();
    }, [moduleId]);

    useEffect(() => {
        const handleGetAttendance = async () => {
            try {
                const response = await axios.get(
                    `${API}/groupattendance/all/${groupId}`
                );
                setAttendance(response.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        handleGetAttendance();
    }, [groupId]);

    const handleMainTabChange = (key) => {
        setActiveTabKey(key);
        localStorage.setItem("activeTabKey", key);
    };

    return (
        <div className='w-full p-6 bg-gray-100 rounded-lg'>
            <h1
                className='text-4xl mb-4 cursor-pointer text-gray-800 hover:underline'
                onClick={() => window.history.back()}>
                {name}
            </h1>
            <div className='flex space-x-4 w-full'>
                <Tabs
                    activeKey={activeTabKey}
                    onChange={handleMainTabChange}
                    size='small'
                    className='w-full'>
                    <Tabs.TabPane tab='Assignments' key='1'>
                        <div className='flex gap-6 flex-wrap'>
                            {assignments.map((item) => (
                                <Link
                                    to={`/excisting/${groupId}/assignmenttypes/${item.id}`}
                                    state={{
                                        groupId,
                                        assignment_type_id: item.id,
                                    }}
                                    key={item.id}
                                    className='flex cursor-pointer justify-center items-center w-[300px] h-40 border-2 border-gray-300 rounded-lg shadow-lg hover:border-black transition duration-200 ease-in-out bg-white'>
                                    <p className='text-2xl text-center text-gray-800'>
                                        {item.name}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab='Lesson Reports' key='2'>
                        <div className='flex gap-4 flex-wrap'>
                            {lesson.map((item) => (
                                <Link
                                    to={`/excisting/${groupId}/lesson_reports/${item.id}`}
                                    state={{
                                        groupId,
                                        lesson_report_type_id: item.id,
                                    }}
                                    key={item.id}
                                    className='flex cursor-pointer justify-center items-center w-[300px] h-40 border-2 border-gray-300 rounded-lg shadow-lg hover:border-black transition duration-200 ease-in-out bg-white'>
                                    <p className='text-3xl text-center text-gray-800'>
                                        {item.name}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab='Attendance' key='3'>
                        <button
                            className='w-10 h-10 mb-4 ml-auto bg-green-600 text-white rounded-full border-2 border-black transition duration-200 ease-in-out hover:bg-green-700'
                            onClick={onOpen}>
                            +
                        </button>
                        <ExcistingGroupDrawer open={open} onClose={onClose} />
                        <table className='min-w-full bg-white border border-gray-300'>
                            <thead>
                                <tr className='bg-gray-200 text-gray-600'>
                                    <th className='p-2 border-b'>Name</th>
                                    <th className='p-2 border-b'>Attendance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {attendance.map((item) => (
                                    <tr
                                        key={item.id}
                                        className='hover:bg-gray-100 transition duration-200'>
                                        <td className='p-2 border-b'>
                                            {item.student_name}
                                        </td>
                                        <td className='flex gap-2 p-2 border-b'>
                                            {item.attendance.map((att) => (
                                                <p key={att.id}>
                                                    {att.isAttended ===
                                                    "attended"
                                                        ? "✅"
                                                        : "❌"}
                                                </p>
                                            ))}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Tabs.TabPane>
                </Tabs>
            </div>
        </div>
    );
};

export default Page;
