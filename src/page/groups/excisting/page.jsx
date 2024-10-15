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
    const [data, setData] = useState([]);
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
                console.log(assignmentTypes.data.assignmenttypes);
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
                console.log(lessonReports.data.lesson_report_types);
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

    // `lesson` ma'lumotlarini olish uchun yangi useEffect qo'shamiz
    const handleMainTabChange = (key) => {
        setActiveTabKey(key);
        localStorage.setItem("activeTabKey", key);
    };

    return (
        <div
            style={{
                width: "100%",
                padding: "24px",
                background: "#f5f5f5",
                borderRadius: "8px",
            }}>
            <h1
                className='text-4xl mb-4 cursor-pointer'
                onClick={() => window.history.back()}>
                {name}
            </h1>
            <div className='flex space-x-4 w-full'>
                <Tabs
                    activeKey={activeTabKey}
                    onChange={handleMainTabChange}
                    size='small'
                    style={{ flex: 1 }}>
                    <Tabs.TabPane tab='Assignments' key='1'>
                        <div className='flex gap-6'>
                            {assignments.map((item) => (
                                <Link
                                    to={`/excisting/${groupId}/assignmenttypes/${item.id}`}
                                    state={{
                                        groupId,
                                        assignment_type_id: item.id,
                                    }}
                                    key={item.key}
                                    className='flex cursor-pointer mt-10 justify-center items-center w-[300px] h-40 border-4 border-black hover:text-black text-2xl'>
                                    {item.name}
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
                                    className='flex cursor-pointer mt-10 justify-center items-center w-[300px] h-40 border-4 border-black hover:text-black'>
                                    <p className='text-3xl'>{item.name}</p>
                                </Link>
                            ))}
                        </div>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab='Attendance' key='3'>
                        <button
                            className='w-10 h-10  mb-4 ml-[94%] bg-[green] text-white rounded-full border-2 border-black'
                            onClick={onOpen}>
                            +
                        </button>
                        <ExcistingGroupDrawer open={open} onClose={onClose} />
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Attendance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {attendance.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.student_name}</td>
                                        <td className='flex gap-4'>
                                            {item.attendance.map((item) => (
                                                <p key={item.id}>
                                                    {item.isAttended ===
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
