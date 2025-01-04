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
    }, [moduleId]);

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
        <div className='relative p-8 bg-gray-50'>
            <h1
                className='text-3xl font-bold text-gray-800 mb-6'
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
                                    style={{
                                        textDecoration: "none",
                                        color: "black",
                                    }}
                                    to={`/excisting/${groupId}/assignmenttypes/${item.id}`}
                                    state={{
                                        groupId,
                                        id: item.id,
                                        assignment_name: item.name,
                                        name: name,
                                        assignment_type_id: item.id,
                                    }}
                                    key={item.id}
                                    className='relative flex flex-col justify-center items-center bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer mt-10 p-6 w-[300px] h-40 border-4 border-gray-300 rounded-lg hover:border-black hover:text-gray-700'>
                                    <p className='text-3xl font-semibold'>
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
                                    style={{
                                        textDecoration: "none",
                                        color: "black",
                                    }}
                                    to={`/excisting/${groupId}/lesson_reports/${item.id}`}
                                    state={{
                                        groupId,
                                        lesson_report_type_id: item.id,
                                    }}
                                    key={item.id}
                                    className='relative flex flex-col justify-center items-center bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer mt-10 p-6 w-[300px] h-40 border-4 border-gray-300 rounded-lg hover:border-black hover:text-gray-700'>
                                    <p className='text-3xl font-semibold'>
                                        {item.name}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab='Attendance' key='3'>
                        <button
                            className='w-10 h-10 mb-4 ml-[95%] bg-green-600 text-white rounded-full border-2 border-black transition duration-200 ease-in-out hover:bg-green-700'
                            onClick={onOpen}>
                            +
                        </button>
                        <ExcistingGroupDrawer open={open} onClose={onClose} />
                        <table className='min-w-full border border-gray-300'>
                            <thead>
                                <tr className='bg-gray-200 text-gray-600'>
                                    <th className='px-4 py-2 border border-gray-300'>
                                        Name
                                    </th>
                                    <th className='px-4 py-2 border border-gray-300'>
                                        Attendance
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {attendance.map((item) => (
                                    <tr
                                        key={item.id}
                                        className='hover:bg-gray-50'>
                                        <td className='px-4 py-2 border border-gray-300'>
                                            {item.student_name}
                                        </td>
                                        <td className='px-4 py-2 border border-gray-300'>
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
