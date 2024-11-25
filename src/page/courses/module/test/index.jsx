import { Tabs } from "antd";
import Exams from "./exams";
import Themes from "./subjects";
import Lessons from "./lessons";
import Report from "./report";
import LessonSubjects from "./lesson_subjects";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faBookOpen,
    faClipboardList,
    faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";

const Tests = () => {
    const location = useLocation();
    const { courseName, moduleName } = location.state;
    const [activeTabKey, setActiveTabKey] = useState(() => {
        return localStorage.getItem("activeTabKey") || "subjects";
    });
    useEffect(() => {
        localStorage.setItem("activeTabKey", activeTabKey);
    }, [activeTabKey]);

    const handleTabChange = (key) => {
        setActiveTabKey(key);
    };

    return (
        <div className='relative p-8 bg-gray-50'>
            <h1 className='text-3xl font-bold text-gray-800 mb-6'>
                <Link
                    to='/courses'
                    style={{ textDecoration: "none", color: "black" }}>
                    Kurslar
                </Link>
                <span
                    className='cursor-pointer'
                    onClick={() => window.history.back()}>
                    {" "}
                    / {courseName}
                </span>{" "}
                / {moduleName}
            </h1>
            <Tabs
                activeKey={activeTabKey}
                onChange={handleTabChange}
                tabBarGutter={16}
                size='large'
                className='custom-tabs'
                tabBarStyle={{ borderBottom: "2px solid #e2e8f0" }}>
                <Tabs.TabPane
                    tab={
                        <span className='flex items-center space-x-2'>
                            <FontAwesomeIcon
                                icon={faBookOpen}
                                className='h-5 w-5 text-green-500'
                            />
                            <span className='font-semibold text-gray-700'>
                                Subjects
                            </span>
                        </span>
                    }
                    key='subjects'
                    className='p-4 bg-white rounded-lg shadow-lg'>
                    <Themes />
                </Tabs.TabPane>

                <Tabs.TabPane
                    tab={
                        <span className='flex items-center space-x-2'>
                            <FontAwesomeIcon
                                icon={faClipboardList}
                                className='h-5 w-5 text-purple-500'
                            />
                            <span className='font-semibold text-gray-700'>
                                Lessons
                            </span>
                        </span>
                    }
                    key='lessons'
                    className='p-4 bg-white rounded-lg shadow-lg'>
                    <Lessons />
                </Tabs.TabPane>

                <Tabs.TabPane
                    tab={
                        <span className='flex items-center space-x-2'>
                            <FontAwesomeIcon
                                icon={faUsers}
                                className='h-5 w-5 text-pink-500'
                            />
                            <span className='font-semibold text-gray-700'>
                                Lesson Subjects
                            </span>
                        </span>
                    }
                    key='lesson_subjects'
                    className='p-4 bg-white rounded-lg shadow-lg'>
                    <LessonSubjects />
                </Tabs.TabPane>

                <Tabs.TabPane
                    tab={
                        <span className='flex items-center space-x-2'>
                            <FontAwesomeIcon
                                icon={faClipboardList}
                                className='h-5 w-5 text-yellow-500'
                            />
                            <span className='font-semibold text-gray-700'>
                                Lesson Report Types
                            </span>
                        </span>
                    }
                    key='reports'
                    className='p-4 bg-white rounded-lg shadow-lg'>
                    <Report />
                </Tabs.TabPane>
                <Tabs.TabPane
                    tab={
                        <span className='flex items-center space-x-2'>
                            <FontAwesomeIcon
                                icon={faHome}
                                className='h-5 w-5 text-blue-500'
                            />
                            <span className='font-semibold text-gray-700'>
                                Assignment Types
                            </span>
                        </span>
                    }
                    key='assignment_types'
                    className='p-4 bg-white rounded-lg shadow-lg'>
                    <Exams />
                </Tabs.TabPane>
            </Tabs>
        </div>
    );
};

export default Tests;
