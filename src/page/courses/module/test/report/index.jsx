import axios from "axios";
import { useContext, useEffect, useState } from "react";
import useDrawer from "../../../../../hooks/useDrawer";
import ReportsDrawer from "./drawer";
import { useParams } from "react-router-dom";
import { Dropdown, Button, Modal, Space } from "antd";
import { AuthContext } from "../../../../../context/authContext";

const Report = () => {
    const [filteredReports, setFilteredReports] = useState([]);
    const [reports, setReports] = useState([]);
    const [editReport, setEditReport] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [newName, setNewName] = useState("");
    const [newWeight, setNewWeight] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("active");
    const [newStatus, setNewStatus] = useState("");
    const { id } = useParams();
    const { open, onOpen, onClose } = useDrawer();
    const API = "http://localhost:3000";
    const {role} = useContext(AuthContext);

    // Ma'lumotlarni olish uchun funktsiya
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${API}/lessonreporttypes/all/${id}`
                );
                const lessonReports = response.data.lesson_report_types;
                const activeReports = lessonReports.filter(report => report.status === "active");
                setReports(lessonReports);
                setFilteredReports(activeReports);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [id]);
    const handleSave = async () => {
        try {
            await axios.post(
                `${API}/lessonreporttypes/edit/${editReport.id}`,
                { name: newName, weight: newWeight, status: newStatus },
                { headers: { "Content-Type": "application/json" } }
            );

            const updatedReports = reports.map((report) =>
                report.id === editReport.id
                    ? { ...report, name: newName, weight: newWeight, status: newStatus }
                    : report
            );

            setReports(updatedReports);
            setFilteredReports(updatedReports);
            setShowEditModal(false);
            alert("Mavzu muvaffaqiyatli yangilandi");
        } catch (error) {
            console.error(error);
            alert("Mavzuni yangilashda xatolik");
        }
    };

    // Tahrirlash uchun funktsiya
    const handleEdit = (report) => {
        setEditReport(report);
        setNewName(report.name);
        setNewStatus(report.status);
        setNewWeight(report.weight);
        setShowEditModal(true);
    };
    const handleStatusChange = (status) => {
        setSelectedStatus(status);
        setFilteredReports(
            status === "active"
                ? reports.filter((subject) => subject.status === "active")
                : status === "deleted"
                ? reports.filter((subject) => subject.status === "deleted")
                : reports
        );
    };
    const menuItems = (report) => [
        { key: "edit", label: "Edit", onClick: () => handleEdit(report) },
    ];

    return (
        <div className='relative p-6'>
            {(role === "super" || role === "head_teacher") && (
                <>
                    <select
                        name='lessons'
                        onChange={(e) => handleStatusChange(e.target.value)}
                        className='border-2 border-black rounded-md px-2 py-1 focus:outline-none focus:border-gray-500 ml-[82%] -translate-y-5'>
                        <option value='active'>Active</option>
                        <option value='deleted'>Deleted</option>
                        <option value='all'>All</option>
                    </select>
                    <button
                        className='absolute w-14 h-14 text-xl -top-2 right-6 bg-green-700 rounded-full text-white'
                        onClick={onOpen}>
                        +
                    </button>
                </>
            )}
            <ReportsDrawer open={open} onClosed={onClose} />
            <div className='flex flex-wrap gap-6 mt-6'>
                {filteredReports.map((report) => (
                    <div
                        key={report.id}
                        className='flex flex-col w-72 h-40 p-4 border-2 border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 pt-4'>
                        <p className='text-2xl font-bold text-center -translate-y-2'>
                             {report.name}
                        </p>
                        <p className='text-xl font-semibold'>
                            Weight: {report.weight}
                        </p>
                        <p className='w-10 h-6 bg-green-600 text-center text-white rounded'>
                            {report.id}
                        </p>
                        <p
                            className={`ml-[170px] -translate-y-11 mt-1 w-16 py-1 text-center text-white rounded-md ${
                                report.status === "active"
                                    ? "bg-green-500"
                                    : "bg-red-500"
                            }`}>
                            {report.status === "active" ? "Active" : "Deleted"}
                        </p>
                        {(role === "super" || role === "head_teacher") && (
                            <Dropdown
                                className='mt-4 cursor-pointer absolute translate-x-[230px] -translate-y-[40px]'
                                menu={{ items: menuItems(report) }}
                                trigger={["click"]}>
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space>
                                        <p className='rotate-90 text-4xl cursor-pointer'>
                                            ...
                                        </p>
                                    </Space>
                                </a>
                            </Dropdown>
                        )}
                    </div>
                ))}
            </div>
            <Modal
                open={showEditModal}
                onCancel={() => setShowEditModal(false)}
                footer={[
                    <Button
                        key='cancel'
                        onClick={() => setShowEditModal(false)}>
                        Yopish
                    </Button>,
                    <Button key='save' type='primary' onClick={handleSave}>
                        Save
                    </Button>,
                ]}
                className='w-96'>
                <h2 className='text-xl font-bold mb-4'>Tahrirlash</h2>
                <div className='flex flex-col gap-4'>
                    <input
                        type='text'
                        className='border-2 border-gray-300 p-2 rounded-md w-full'
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder='Mavzu nomini kiriting'
                    />
                    <input
                        type='number'
                        className='border-2 border-gray-300 p-2 rounded-md w-full'
                        value={newWeight}
                        onChange={(e) => setNewWeight(e.target.value)}
                        placeholder="Og'irlikni kiriting"
                    />
                    <select
                        className='border border-gray-200 p-2 rounded-lg'
                        name='status'
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}>
                        <option value='active'>Active</option>
                        <option value='deleted'>Deleted</option>
                    </select>
                </div>
            </Modal>
        </div>
    );
};

export default Report;
