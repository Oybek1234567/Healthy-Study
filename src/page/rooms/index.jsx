import { useEffect, useState, useContext } from "react";
import useDrawer from "../../hooks/useDrawer";
import RoomsDrawer from "./drawer";
import axios from "axios";
import { Dropdown as AntDropdown, Modal, Space } from "antd";
import { AuthContext } from "../../context/authContext";
const Rooms = () => {
    const { open, onOpen, onClose } = useDrawer();
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [status, setStatus] = useState("active");
    const [newName, setNewName] = useState("");
    const [newMaxStudents, setNewMaxStudents] = useState(0);
    const [newStatus, setNewStatus] = useState("active");
    const [showModal, setShowModal] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [data, setData] = useState([]);
    const API = "http://localhost:3000";
    const { role } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const req = await axios.get(`${API}/rooms/all`);
                setData(req.data.rooms);
                setFilteredCourses(
                    req.data.rooms.filter(
                        (course) => course.status === "active"
                    )
                );
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const handleEdit = (item) => {
        setNewName(item.name);
        setNewMaxStudents(item.max_students);
        setNewStatus(item.status);
        setCurrentItem(item);
        setShowModal(true);
    };

    const handleSave = async (item) => {
        try {
            await axios.post(`${API}/rooms/edit/${item.id}`, {
                name: newName,
                max_students: newMaxStudents,
                status: newStatus,
            });

            const updatedData = data.map((room) =>
                room.id === item.id
                    ? {
                          ...room,
                          name: newName,
                          max_students: newMaxStudents,
                          status: newStatus,
                      }
                    : room
            );
            setFilteredCourses((prev) =>
                prev.map((c) =>
                    c.id === item.id
                        ? {
                              ...c,
                              name: newName,
                              max_students: newMaxStudents,
                              status: newStatus,
                          }
                        : c
                )
            );
            setData(updatedData);
            setShowModal(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleStatusChange = (status) => {
        setStatus(status);
        if (status === "all") {
            setFilteredCourses(data);
        } else {
            setFilteredCourses(
                data.filter((course) => course.status === status)
            );
        }
    };

    const menuItems = (item) => ({
        items: [
            {
                key: "1",
                label: "Edit",
                onClick: () => handleEdit(item),
            },
        ],
    });

    return (
        <div className='relative p-8 bg-gray-50'>
            <div className='flex justify-between'>
                <h1 className='text-3xl font-bold text-gray-800 mb-6'>
                    Xonalar
                </h1>
                {role === "super" && (
                    <>
                        <select
                            className='w-24 h-10 border border-black rounded-lg ml-[70%] p-1'
                            name='status'
                            value={status}
                            onChange={(e) =>
                                handleStatusChange(e.target.value)
                            }>
                            <option value='active'>Active</option>
                            <option value='deleted'>Deleted</option>
                            <option value='all'>All</option>
                        </select>
                        <button
                            onClick={onOpen}
                            className='ml-4 w-10 h-10 bg-green-700 rounded-full text-white flex items-center justify-center hover:bg-green-600 transition-colors'
                            type='button'>
                            +
                        </button>
                    </>
                )}
            </div>
            <RoomsDrawer open={open} onClose={onClose} />
            <div className='flex gap-4'>
                {filteredCourses.map((item) => (
                    <div
                        key={item.id}
                        className='relative flex flex-col bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer mt-10 p-6 pt-8 w-[270px] h-40 border-4 border-gray-300 rounded-lg hover:border-black hover:text-gray-700'>
                        <h2 className='text-2xl -translate-y-2 font-bold text-gray-800 text-center'>
                            {item.name}
                        </h2>
                        <p className='text-gray-700 text-lg'>
                            Max Students: {item.max_students}
                        </p>
                        <p className='left-4 translate-y-7 w-10 h-6 bg-green-600 text-center text-white rounded'>
                            {item.id}
                        </p>
                        <p
                            className={`ml-[160px] right-4 w-16 py-1 text-center text-white rounded-md ${
                                item.status === "active"
                                    ? "bg-green-500"
                                    : "bg-red-500"
                            }`}>
                            {item.status === "active" ? "Active" : "Deleted"}
                        </p>
                        {role === "super" && (
                            <AntDropdown
                                menu={menuItems(item)}
                                trigger={["click"]}>
                                <a
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.id;
                                    }}
                                    className='cursor-pointer absolute translate-x-[210px] -translate-y-[20px]'>
                                    <Space>
                                        <p className='rotate-90 text-2xl font-bold text-gray-600'>
                                            ...
                                        </p>
                                    </Space>
                                </a>
                            </AntDropdown>
                        )}
                    </div>
                ))}
            </div>
            <Modal
                open={showModal}
                onClose={() => setShowModal(false)}
                title='Edit Room'
                footer={[
                    <button
                        key='back'
                        className='mr-2 bg-gray-500 text-white p-2 rounded-lg'
                        onClick={() => setShowModal(false)}>
                        Cancel
                    </button>,
                    <button
                        key='submit'
                        type='button'
                        className='bg-blue-500 text-white p-2 rounded-lg'
                        onClick={() => handleSave(currentItem)}>
                        Save
                    </button>,
                ]}>
                <input
                    type='text'
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder='Name'
                    className='border p-2 rounded-lg border-gray-300 w-full mb-4'
                />
                <input
                    type='number'
                    value={newMaxStudents}
                    onChange={(e) => setNewMaxStudents(e.target.value)}
                    placeholder='Max Students'
                    className='border p-2 rounded-lg border-gray-300 w-full mb-4'
                />
                <select
                    name='status'
                    className='border p-2 rounded-lg border-gray-300 w-full'
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}>
                    <option value='active'>Active</option>
                    <option value='deleted'>Deleted</option>
                </select>
            </Modal>
        </div>
    );
};

export default Rooms;
