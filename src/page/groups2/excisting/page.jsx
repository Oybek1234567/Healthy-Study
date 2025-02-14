import { Tabs } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useDrawer from "../../../hooks/useDrawer";
import ExcistingGroupDrawer from "./modal";
import Assignments from "./assignments";
import LessonReports from "./lesson_reports";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faClipboardList,
    faUserCheck,
} from "@fortawesome/free-solid-svg-icons";

const Page = () => {
    const { open, onOpen, onClose } = useDrawer();
    const location = useLocation();
    const { name, groupId } = location.state;
    const [attendance, setAttendance] = useState([]);
    const [activeTabKey, setActiveTabKey] = useState(
        localStorage.getItem("activeTabKey") || "assignments"
    );
    const API = "http://localhost:3000";

    

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

    const handleTabChange = (key) => {
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
            <Tabs
                activeKey={activeTabKey}
                onChange={handleTabChange}
                size='large'
                tabBarStyle={{ borderBottom: "2px solid #e2e8f0" }}>
                <Tabs.TabPane
                    tab={
                        <span className='flex items-center space-x-2'>
                            <FontAwesomeIcon
                                icon={faClipboardList}
                                className='h-5 w-5 text-purple-500'
                            />
                            <span className='font-semibold text-gray-700'>
                                Assignments
                            </span>
                        </span>
                    }
                    key='assignments'
                    className='p-4 bg-white rounded-lg shadow-lg'>
                  
                    <Assignments />
                </Tabs.TabPane>

                <Tabs.TabPane
                    tab={
                        <span className='flex items-center space-x-2'>
                            <FontAwesomeIcon
                                icon={faUserCheck}
                                className='h-5 w-5 text-green-500'
                            />
                            <span className='font-semibold text-gray-700'>
                                Lesson Reports
                            </span>
                        </span>
                    }
                    key='lesson_reports'
                    className='p-4 bg-white rounded-lg shadow-lg'>
                  
                    <LessonReports />
                </Tabs.TabPane>

                <Tabs.TabPane
                    tab={
                        <span className='flex items-center space-x-2'>
                            <FontAwesomeIcon
                                icon={faUserCheck}
                                className='h-5 w-5 text-blue-500'
                            />
                            <span className='font-semibold text-gray-700'>
                                Attendance
                            </span>
                        </span>
                    }
                    key='attendance'
                    className='p-4 bg-white rounded-lg shadow-lg'>
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
                                <tr key={item.id} className='hover:bg-gray-50'>
                                    <td className='px-4 py-2 border border-gray-300'>
                                        {item.student_name}
                                    </td>
                                    <td className='flex px-4 py-2 border border-gray-300'>
                                        {item.attendance.map((att) => (
                                            <p key={att.id}>
                                                {att.isAttended === "attended"
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
    );
};

export default Page;
