import { useState } from "react";
import GroupsNewExcisting from "./excisting";
import GroupsNewPending from "./pending";
const GroupsNew = () => {
    const [activeTab, setActiveTab] = useState("1");

    const handleTabClick = (key) => {
        setActiveTab(key);
    };

    return (
        <div className='relative p-8 bg-gray-50 min-h-screen'>
            <h1 className='text-3xl font-bold text-gray-800 mb-6'>Groups</h1>

            <div className='mt-12 w-full'>
                <div className='flex space-x-4 mb-6'>
                    <button
                        className={`w-[500px] p-4 text-3xl font-semibold text-gray-700 transition-colors duration-300 border border-gray-200 rounded-t-lg shadow-md ${
                            activeTab === "1"
                                ? "bg-white text-blue-500"
                                : "bg-gray-100 hover:bg-gray-200"
                        }`}
                        onClick={() => handleTabClick("1")}>
                        Existing Groups
                    </button>
                    <button
                        className={`w-[500px] p-4 text-3xl font-semibold text-gray-700 transition-colors duration-300 border border-gray-200 rounded-t-lg shadow-md ${
                            activeTab === "2"
                                ? "bg-white text-blue-500"
                                : "bg-gray-100 hover:bg-gray-200"
                        }`}
                        onClick={() => handleTabClick("2")}>
                        Pending Groups
                    </button>
                </div>
                {activeTab === "1" && <GroupsNewExcisting />}
                {activeTab === "2" && <GroupsNewPending />}
            </div>
        </div>
    );
};

export default GroupsNew;
