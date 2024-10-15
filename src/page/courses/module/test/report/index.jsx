import axios from "axios";
import { useEffect, useState } from "react";
import useDrawer from "../../../../../hooks/useDrawer";
import ReportsDrawer from "./drawer";
import { useParams } from "react-router-dom";
import { Dropdown, Button, Modal, Space } from "antd";

const Report = () => {
    const [filteredReports, setFilteredReports] = useState([]);
    const [reports, setReports] = useState([]);
    const [editReport, setEditReport] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [newName, setNewName] = useState("");
    const [newWeight, setNewWeight] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const { id } = useParams();
    const { open, onOpen, onClose } = useDrawer();
    const API = "http://localhost:3000";

    // Ma'lumotlarni olish uchun funktsiya
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${API}/lessonreporttypes/all/${id}`
                );
                setReports(response.data.lesson_report_types);
                setFilteredReports(response.data.lesson_report_types);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [id]);

    // O'zgartirishlarni saqlash uchun funktsiya
    const handleSave = async () => {
        try {
            await axios.post(
                `${API}/lessonreporttypes/edit/${editReport.id}`,
                { name: newName, weight: newWeight },
                { headers: { "Content-Type": "application/json" } }
            );

            const updatedReports = reports.map((report) =>
                report.id === editReport.id
                    ? { ...report, name: newName, weight: newWeight }
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
        setNewWeight(report.weight);
        setShowEditModal(true);
    };

    // O'chirish uchun funktsiya
    const handleDelete = async (report) => {
        try {
            await axios.post(
                `${API}/lessonreporttypes/delete/${report.id}`
            );
            const updatedReports = reports.filter((c) => c.id !== report.id);

            setReports(updatedReports);
            setFilteredReports(updatedReports);
            alert("Kurs muvaffaqiyatli o'chirildi");
        } catch (error) {
            console.error(error);
            alert("Kursni o'chirishda xatolik");
        }
    };

    // Holat o'zgarishini boshqarish
    const handleStatusChange = (status) => {
        setSelectedStatus(status);
        setFilteredReports(
            status === "all"
                ? reports
                : reports.filter((report) => report.status === status)
        );
    };

    // Dropdown menyusi uchun elementlar
    const menuItems = (report) => [
        { key: "edit", label: "Tahrirlash", onClick: () => handleEdit(report) },
        {
            key: "delete",
            label: "O'chirish",
            onClick: () => handleDelete(report),
        },
    ];

    return (
        <div className='relative p-6'>
            <select
                name='lessons'
                onChange={(e) => handleStatusChange(e.target.value)}
                className=' w-1/6 text-xl border border-black rounded-md'>
                <option value='all'>Hammasi</option>
                <option value='active'>Faol</option>
                <option value='deleted'>O`chirilgan</option>
            </select>
            <button
                className='absolute top-0 right-0 w-14 h-14 bg-green-700 text-2xl text-white rounded-full shadow-lg'
                onClick={onOpen}>
                +
            </button>
            <ReportsDrawer open={open} onClosed={onClose} />
            <div className='flex flex-wrap gap-6 mt-6'>
                {filteredReports.map((report) => (
                    <div
                        key={report.id}
                        className='flex flex-col w-72 h-40 p-4 border-4 border-gray-300 rounded-lg transition-colors duration-300 hover:bg-gray-100'>
                        <p className='text-2xl font-semibold'>
                            Nom: {report.name}
                        </p>
                        <p className='text-xl font-semibold'>Og`irlik: {report.weight}</p>
                        <Dropdown
                            className="mt-4"
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
                        O'zgarishlarni saqlash
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
                </div>
            </Modal>
        </div>
    );
};

export default Report;
