import { Tabs } from "antd";
import Exams from "./exams";
import Themes from "./subjects";
import Lessons from "./lessons";
import Report from "./report";
import LessonSubjects from "./lesson_subjects";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faBookOpen,
    faClipboardList,
    faUsers,
} from "@fortawesome/free-solid-svg-icons";

const Tests = () => {
    const [activeTabKey, setActiveTabKey] = useState("lessons");

    const handleTabChange = (key) => {
        setActiveTabKey(key);
    };

    return (
        <div className='p-4'>
            <Tabs
                activeKey={activeTabKey}
                onChange={handleTabChange}
                tabBarGutter={16}
                size='large'
                className='custom-tabs'
                tabBarStyle={{ borderBottom: "2px solid #e2e8f0" }}
            >
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
            </Tabs>
        </div>
    );
};

export default Tests;
