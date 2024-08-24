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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const req = await axios.get(
                    `http://localhost:3000/lessonreporttypes/all/${id}`
                );
                setReports(req.data.lesson_report_types);
                setFilteredReports(req.data.lesson_report_types);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);

    const handleSave = async () => {
        try {
            window.location.reload()
            alert("Subject successfully updated");
            await axios.post(
                `http://localhost:3000/lessonreporttypes/edit/${editReport.id}`,
                { name: newName, weight: newWeight },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const updatedReports = reports.map((report) =>
                report.id === editReport.id
                    ? { ...report, name: newName, weight: newWeight }
                    : report
            );

            setReports(updatedReports);
            setFilteredReports(updatedReports);
            setShowEditModal(false);

            alert("Course updated successfully");
        } catch (error) {
            console.error(error);
            alert("Failed to update course");
        }
    };

    const handleEdit = (report) => {
        setEditReport(report);
        setNewName(report.name);
        setNewWeight(report.weight);
        setShowEditModal(true);
    };

    const handleDelete = async (report) => {
        try {
            window.location.reload()
            alert("Course deleted successfully");
            await axios.post(
                `http://localhost:3000/lessonreporttypes/delete/${report.id}`
            );

            const updatedReports = reports.filter((c) => c.id !== report.id);

            setReports(updatedReports);
            setFilteredReports(updatedReports);

            alert("Course deleted successfully");
        } catch (error) {
            console.error(error);
            alert("Failed to delete course");
        }
    };

    const handleStatusChange = (status) => {
        setSelectedStatus(status);
        if (status === "all") {
            setFilteredReports(reports);
        } else {
            setFilteredReports(
                reports.filter((report) => report.status === status)
            );
        }
    };

    const menuItems = (report) => [
        {
            key: "edit",
            label: "Edit",
            onClick: () => handleEdit(report),
        },
        {
            key: "delete",
            label: "Delete",
            onClick: () => handleDelete(report),
        },
    ];

    const { open, onOpen, onClose } = useDrawer();

    return (
        <div>
            <button
                className='absolute w-14 h-14 -translate-y-[200px] ml-[94%] bg-green-700 rounded-full text-white'
                type='button'
                onClick={() => onOpen()}>
                +
            </button>
            <ReportsDrawer open={open} onClosed={onClose} />
            <div className='absolute flex gap-4 flex-wrap'>
                {filteredReports.map((report) => (
                    <div key={report.id}>
                        <div className='flex flex-col cursor-pointer mt-20 justify-center items-center w-[300px] h-40 border-4 border-black hover:text-black'>
                            <p>Name: {report.name}</p>
                            <p>Weight: {report.weight}</p>
                        </div>
                        <Dropdown
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
            <select
                name='lessons'
                onChange={(e) => handleStatusChange(e.target.value)}
                className=' -translate-y-[200px] ml-[75%] w-1/12 text-xl'>
                <option value='all'>All</option>
                <option value='active'>Active</option>
                <option value='deleted'>Deleted</option>
            </select>
            <Modal
                open={showEditModal}
                onCancel={() => setShowEditModal(false)}
                footer={[
                    <Button
                        key='cancel'
                        onClick={() => setShowEditModal(false)}>
                        Close
                    </Button>,
                    <Button key='save' type='primary' onClick={handleSave}>
                        Save Changes
                    </Button>,
                ]}>
                <h2>Edit Report</h2>
                <div className='flex flex-col gap-2'>
                    <input
                        type='text'
                        className='border-2 border-black w-full'
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                    <input
                        type='number'
                        className='border-2 border-black w-full'
                        value={newWeight}
                        onChange={(e) => setNewWeight(e.target.value)}
                    />
                </div>
            </Modal>
        </div>
    );
};

export default Report;
