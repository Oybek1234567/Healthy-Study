import { useEffect, useState } from "react";
import useDrawer from "../../../../../hooks/useDrawer";
import LessonReportTypesByModal from "./modal";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Modal } from "antd";

const LessonReportTypesByGroup = () => {
    const { open, onOpen, onClose } = useDrawer();
    const [data, setData] = useState([]);
    const [uniqueColumns, setUniqueColumns] = useState([]);
    const API = "http://localhost:3000";
    const location = useLocation();
    const { lesson_report_type_id, groupId } = location.state;
    const [showModal, setShowModal] = useState(false)
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const req = await axios.post(
                    `${API}/lessonreportsbyuser/all/${groupId}`,
                    { lesson_report_type_id: lesson_report_type_id }
                );
                setData(req.data.data); 
                const columns = [];
                req.data.data.forEach((item) => {
                    item.score.forEach((score) => {
                        if (!columns.includes(score.group_lesson_id)) {
                            columns.push(score.group_lesson_id);
                        }
                    });
                });
                setUniqueColumns(columns);
            } catch (e) {
                console.error("error", e);
            }
        };
        fetchData();
    }, [groupId, lesson_report_type_id]);

    const handleShowModal = () => {
        setShowModal(true);
    }
    const handleCloseModal = () => {
        setShowModal(false);
    }

    return (
        <div className='p-6 h-screen bg-gradient-to-r from-blue-50 to-blue-100'>
            <button
                onClick={onOpen}
                className='bg-green-500 text-white font-semibold rounded-full w-12 h-12 flex items-center justify-center ml-auto shadow-lg hover:bg-green-600 focus:ring-4 focus:ring-green-300 transition duration-200 ease-in-out'>
                +
            </button>
            <LessonReportTypesByModal open={open} onClose={onClose} />
            <div className='overflow-x-auto mt-6'>
                <table className='min-w-full table-auto border border-gray-300 shadow-lg bg-white rounded-lg'>
                    <thead className='bg-gray-600 text-white'>
                        <tr className='border-b'>
                            <th className='px-6 py-3 text-left font-medium'>
                                Student Name
                            </th>
                            {uniqueColumns.map((col) => (
                                <th
                                    key={col}
                                    className='px-6 py-3 text-center font-medium'>
                                    {col}
                                    <button
                                        onClick={handleShowModal}
                                        className='ml-2 text-white hover:text-blue-300'>
                                        ✏️
                                    </button>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200'>
                        {data.map((item) => (
                            <tr
                                key={item.id}
                                className='hover:bg-gray-100 transition duration-150'>
                                <td className='px-6 py-3 text-gray-700'>
                                    {item.student_name}
                                </td>
                                {uniqueColumns.map((col) => {
                                    const scoreItem = item.score.find(
                                        (s) => s.group_lesson_id === col
                                    );
                                    return (
                                        <td
                                            key={`${item.id}-${col}`}
                                            className='px-6 py-3 text-center text-gray-600'>
                                            {scoreItem ? scoreItem.score : "-"}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal open={showModal} onCancel={handleCloseModal}>
                <p>Hello World</p>
            </Modal>
        </div>
    );
};

export default LessonReportTypesByGroup;
