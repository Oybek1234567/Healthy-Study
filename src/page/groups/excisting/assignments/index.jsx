import { useEffect, useState } from "react";
import useDrawer from "../../../../hooks/useDrawer";
import { useLocation } from "react-router-dom";
import axios from "axios";
import AssignmentsModal from "./modal";
import { Modal } from "antd";

const Assignments = () => {
    const location = useLocation();
    const { groupId, id, assignment_name, name } = location.state;
    const { open, onOpen, onClose } = useDrawer();
    const [showModal, setShowModal] = useState(false);
    const [assignment, setAssignment] = useState([]);
    const [data, setData] = useState([]);
    const [selectedAssignment, setSelectedAssignment] = useState({});
    const API = "http://localhost:3000";

    useEffect(() => {
        const handlePostAssignments = async () => {
            try {
                const response = await axios.post(
                    `${API}/exams/allbygroup/${groupId}`,
                    {
                        assignment_type_id: id,
                    }
                );
                setAssignment(response.data.exams);
                console.log(response.data.exams);
            } catch (error) {
                console.error("Error fetching assignments data:", error);
            }
        };
        handlePostAssignments();
    }, [groupId, id]);

    useEffect(() => {
        const handlePostData = async () => {
            try {
                if (selectedAssignment.id) {
                    const response = await axios.post(
                        `${API}/exams/allforgroup/${groupId}`,
                        {
                            assignment_id: selectedAssignment.id,
                        }
                    );
                    setData(response.data.exams);
                    console.log(response.data.exams);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        handlePostData();
    }, [groupId, selectedAssignment]);

    const handleRowClick = (item) => {
        setSelectedAssignment(item);
        setShowModal(true);
    };

    // Sort data based on result
    const sortedData = data.sort((a, b) => {
        if (a.result === null) return 1; // Sort null results to the end
        if (b.result === null) return -1; // Sort null results to the end
        return b.result - a.result; // Descending order
    });

    return (
        <div className='relative p-8 bg-gray-50'>
            <div className='flex text-center justify-between'>
                <h1 className='text-3xl font-bold text-gray-800 mb-6'>
                    {name} / {assignment_name}
                </h1>
                <button
                    onClick={onOpen}
                    className='w-10 h-10 rounded-full bg-green-700 text-white text-2xl mb-5'>
                    +
                </button>
            </div>
            <table className='min-w-full border border-gray-300'>
                <thead>
                    <tr className='bg-gray-100 text-xl text-center'>
                        <th className='px-4 py-2 border border-gray-300'>
                            Assignment Name
                        </th>
                        <th className='px-4 py-2 border border-gray-300'>
                            Group Name
                        </th>
                        <th className='px-4 py-2 border border-gray-300'>
                            When
                        </th>
                    </tr>
                </thead>
                <tbody className='text-center text-xl'>
                    {assignment.map((item) => (
                        <tr key={item.id} className='hover:bg-gray-50'>
                            <td className='px-4 py-2 border border-gray-300'>
                                {item.assignment_name}
                            </td>
                            <td
                                className='px-4 py-2 border border-gray-300 cursor-pointer'
                                onClick={() => handleRowClick(item)}>
                                {item.group_name}
                            </td>
                            <td className='px-4 py-2 border border-gray-300'>
                                {item.when.slice(0, 10)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <AssignmentsModal open={open} onClose={onClose} />

            <Modal
                width={"80%"}
                open={showModal}
                onCancel={() => setShowModal(false)}
                footer={null}>
                <div className='p-1'>
                    <h1 className='text-3xl font-bold text-gray-800 mb-6'>
                        {name} / {selectedAssignment.assignment_name}
                    </h1>
                    <div className='grid grid-cols-4 gap-4 bg-gray-200 p-2 font-medium text-gray-700 rounded-t-md'>
                        <p>#</p>
                        <p>Name</p>
                        <p>ID</p>
                        <p>Result</p>
                    </div>

                    {sortedData.map((item, idx) => (
                        <div
                            key={item.id}
                            className='grid grid-cols-4 gap-4 p-2 border-b border-gray-200'>
                            <p className='text-gray-600'>{idx + 1}</p>
                            <p className='text-gray-700 font-medium'>
                                {item.user_name} {item.user_surname}
                            </p>
                            <p className='text-gray-600'>{item.user_id}</p>
                            <p
                                className={`font-semibold ${
                                    item.result
                                        ? "text-green-600"
                                        : "text-red-500"
                                }`}>
                                {item.result
                                    ? Math.floor(item.result * 100) + "%"
                                    : "Not completed"}
                            </p>
                        </div>
                    ))}
                </div>
            </Modal>
        </div>
    );
};

export default Assignments;
