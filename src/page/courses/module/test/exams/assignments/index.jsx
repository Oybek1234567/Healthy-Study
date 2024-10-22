import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import useDrawer from "../../../../../../hooks/useDrawer";
import AssignmentsDrawer from "./drawer";
import { Dropdown, Space, Modal, Button } from "antd";
import { AuthContext } from "../../../../../../context/authContext";

const AssignmentTypes = () => {
    const [data, setData] = useState([]);
    const [newName, setNewName] = useState("");
    const [newStatus, setNewStatus] = useState("");
    const [editItem, setEditItem] = useState(null);
    const { open, onOpen, onClose } = useDrawer();
    const { assignmentID, moduleID } = useParams();
    const [selectedStatus, setSelectedStatus] = useState("active");
    const location = useLocation();
    const moduleName = location.state?.moduleName;
    const courseName = location.state?.courseName;
    const examName = location.state?.name;
    const API = "http://localhost:3000";
    const { role } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const req = await axios.get(
                    `${API}/assignments/all/${assignmentID}`
                );
                setData(req.data.assignments);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [moduleID, assignmentID]);

    const handleSave = async () => {
        try {
            await axios.post(
                `${API}/assignments/edit/${editItem.id}`,
                { name: newName, status: newStatus },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const updatedData = data.map((item) =>
                item.id === editItem.id
                    ? { ...item, name: newName, status: newStatus }
                    : item
            );

            setData(updatedData);
            setEditItem(null);
            setNewName("");
            alert("Subject successfully updated");
        } catch (error) {
            console.error(error);
            alert("Failed to update subject");
        }
    };

    const handleEdit = (item) => {
        setEditItem(item);
        setNewName(item.name);
        setNewStatus(item.status);
    };

    const handleStatusChange = (status) => {
        setSelectedStatus(status);
    };

    const filteredData = data.filter((item) => {
        if (selectedStatus === "active") return item.status === "active";
        if (selectedStatus === "deleted") return item.status === "deleted";
        return true; // 'all' tanlanganda barchasi ko'rsatiladi
    });

    const menuItems = (item) => [
        {
            key: "1",
            label: <p>Edit</p>,
            onClick: () => handleEdit(item),
        },
    ];

    return (
        <div className='relative p-8 bg-gray-50'>
            <div className='flex items-center justify-between mb-6'>
                <h1 className='text-3xl font-bold text-gray-800'>
                    <span
                        className='cursor-pointer'
                        onClick={() => window.history.go(-3)}>
                        Kurslar /{" "}
                    </span>
                    <span
                        className='cursor-pointer'
                        onClick={() => window.history.go(-2)}>
                        {courseName} /{" "}
                    </span>
                    <span
                        className='cursor-pointer'
                        onClick={() => window.history.go(-1)}>
                        {moduleName} /{" "}
                    </span>
                    <span
                        className='cursor-pointer'
                        onClick={() => window.history.back()}>
                        {examName}
                    </span>
                </h1>
                {(role === "super" || role === "head_teacher") && (
                    <>
                        <select
                            name='subjects'
                            onChange={(e) => handleStatusChange(e.target.value)}
                            className='border-2 border-black rounded-md px-2 py-1 focus:outline-none focus:border-gray-500 ml-[22%]'>
                            <option value='active'>Active</option>
                            <option value='deleted'>Deleted</option>
                            <option value='all'>All</option>
                        </select>
                        <button
                            onClick={onOpen}
                            className='bg-green-700 w-10 h-10 text-xl rounded-full text-white hover:bg-green-600 transition duration-300'>
                            +
                        </button>
                    </>
                )}
            </div>
            <AssignmentsDrawer
                open={open}
                onClosed={onClose}
                onCreate={() => {}}
            />
            <table className='min-w-full border border-gray-300 mt-14'>
                <thead className='bg-gray-100 text-center text-xl'>
                    <tr className='text-center'>
                        <th className='border p-2'>№</th>
                        <th className='border p-2'>Name</th>
                        <th className='border p-2'>Weight</th>
                        {(role === "super" || role === "head_teacher") && (
                            <>
                                <th className='border p-2'>Status</th>
                                <th className='border p-2'>Action</th>
                            </>
                        )}
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {filteredData &&
                        filteredData.map((item, index) => (
                            <tr
                                key={item.id}
                                className='hover:bg-gray-100 text-xl'>
                                <td className='border text-center p-2'>
                                    {index + 1}
                                </td>
                                <td className='border text-center p-2'>
                                    <Link
                                        to={`/modules/${moduleID}/types/${assignmentID}/assignments/${item.id}`}
                                        state={{
                                            moduleID,
                                            typeId: item.id,
                                            courseName,
                                            moduleName,
                                            examName,
                                            assignmentName: item.name,
                                        }}>
                                        {item.name}
                                    </Link>
                                </td>
                                <td className='border text-center p-2'>
                                    {item.weight
                                        ? String(item.weight).slice(0, 4)
                                        : ""}
                                </td>
                                {(role === "super" ||
                                    role === "head_teacher") && (
                                    <>
                                        <td className='py-4 px-4 border-b'>
                                            {item.status}
                                        </td>
                                        <td className='py-4 px-4 border-b'>
                                            <Dropdown
                                                menu={{
                                                    items: menuItems(item),
                                                }}
                                                trigger={["click"]}>
                                                <a
                                                    onClick={(e) =>
                                                        e.preventDefault()
                                                    }>
                                                    <Space>
                                                        <p className='rotate-90 text-4xl cursor-pointer'>
                                                            ...
                                                        </p>
                                                    </Space>
                                                </a>
                                            </Dropdown>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                </tbody>
            </table>
            <Modal
                open={editItem !== null}
                onCancel={() => setEditItem(null)}
                footer={[
                    <Button
                        key='cancel'
                        onClick={() => setEditItem(null)}
                        className='bg-gray-400 hover:bg-gray-300'>
                        Cancel
                    </Button>,
                    <Button
                        key='save'
                        type='primary'
                        onClick={handleSave}
                        className='bg-green-700 hover:bg-green-600'>
                        Save Changes
                    </Button>,
                ]}>
                <h2 className='text-xl font-semibold mb-4'>Edit Assignment</h2>
                <div className='flex flex-col gap-2'>
                    <input
                        type='text'
                        className='border-2 border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-400'
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder='Assignment Name'
                    />
                    <select
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                        name='status'
                        className='border border-gray-300 p-2 rounded-lg'>
                        <option value='active'>Active</option>
                        <option value='deleted'>Deleted</option>
                    </select>
                </div>
            </Modal>
        </div>
    );
};

export default AssignmentTypes;
