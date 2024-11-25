import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import Modules from "./tab_1/module";
import QuestionLvl from "./tab_2";

const ModulesTab = () => {
    const location = useLocation();
    const courseName = location.state.name;
    const [activeTab, setActiveTab] = useState("1");

    const handleTabClick = (key) => {
        setActiveTab(key);
    };

    return (
        <div className='relative p-8 bg-gray-50 min-h-screen'>
            <h1 className='text-3xl font-bold text-gray-800 mb-6'>
                <Link
                    style={{ textDecoration: "none", text: "black" }}
                    to='/courses'
                    className='text-gray-600 hover:text-gray-800 transition duration-200'>
                    Kurslar  {" "}
                </Link>
                <span className='text-gray-800 hover:text-gray-600 transition duration-200'>
                        / {courseName}
                </span>
            </h1>

            <div className='mt-12 w-full'>
                <div className='flex space-x-4 mb-6'>
                    <button
                        className={`w-[500px] p-4 text-3xl font-semibold text-gray-700 transition-colors duration-300 border border-gray-200 rounded-t-lg shadow-md ${
                            activeTab === "1"
                                ? "bg-white text-blue-500"
                                : "bg-gray-100 hover:bg-gray-200"
                        }`}
                        onClick={() => handleTabClick("1")}>
                        Modules
                    </button>
                    <button
                        className={`w-[500px] p-4 text-3xl font-semibold text-gray-700 transition-colors duration-300 border border-gray-200 rounded-t-lg shadow-md ${
                            activeTab === "2"
                                ? "bg-white text-blue-500"
                                : "bg-gray-100 hover:bg-gray-200"
                        }`}
                        onClick={() => handleTabClick("2")}>
                        Question Level
                    </button>
                </div>
                {activeTab === "1" && <Modules />}
                {activeTab === "2" && <QuestionLvl />}
            </div>
        </div>
    );
};

export default ModulesTab;
