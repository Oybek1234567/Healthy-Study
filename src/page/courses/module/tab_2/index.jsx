import { useContext, useEffect, useState } from "react";
import useDrawer from "../../../../hooks/useDrawer";
import LevelDrawer from "./drawer";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Dropdown, Modal, Space } from "antd";
import { AuthContext } from "../../../../context/authContext";
import { menu } from "../../../../constants/data";

const QuestionLvl = () => {
    const { open, onOpen, onClose } = useDrawer();
    const [data, setData] = useState([]);
    const { id } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [value, setValue] = useState("");
    const [currentItem, setCurrentItem] = useState(null);
    const API = "http://localhost:3000";

    const { role } = useContext(AuthContext)
    menu.filter((item) => {
        if (role === "super" || role === "head_teacher") {
            return item.roles?.includes(role)
        }
        return false
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const req = await axios.get(
                    `${API}/questionlevels/all/${id}`
                );
                setData(req.data.question_levels);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);

    const handleEdit = (item) => {
        setCurrentItem(item);
        setValue(item.name);
        setShowModal(true);
    };

    const handleSave = async () => {
        try {
            await axios.post(
                `${API}/questionlevels/edit/${currentItem.id}`,
                { name: value }
            );
            setData((prevData) =>
                prevData.map((item) =>
                    item.id === currentItem.id ? { ...item, name: value } : item
                )
            );
            setShowModal(false);
            alert("Name successfully updated");
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (item) => {
        try {
            await axios.post(
                `${API}/questionlevels/delete/${item.id}`
            );
            const updatedData = data.filter((d) => d.id !== item.id);
            setData(updatedData);
            alert("Item successfully deleted");
        } catch (error) {
            console.error(error);
        }
    };

    const menuItems = (item) => [
        {
            key: "1",
            label: <p onClick={() => handleEdit(item)}>Edit</p>,
        },
        {
            key: "2",
            label: <p onClick={() => handleDelete(item)}>Delete</p>,
        },
    ];

    return (
        <div className='relative min-h-screen bg-gray-50 p-8'>
            <div className='flex justify-end mb-8'>
                {(role === "super" || role === "head_teacher") && (
                    <button
                        className='bg-green-600 hover:bg-green-700 transition-colors duration-200 ease-in-out text-white w-10 h-10 rounded-full shadow-md'
                        onClick={onOpen}>
                        +
                    </button>
                )}
            </div>
            <LevelDrawer open={open} onClose={onClose} />
            <div className='bg-white shadow-lg rounded-lg p-6 overflow-x-auto'>
                <table className='w-full table-auto'>
                    <thead>
                        <tr className='text-center bg-gray-100 text-gray-700'>
                            <th className='p-4'>№</th>
                            <th className='p-4'>Name</th>
                            {(role === "super" || role === "head_teacher") && (
                                <th className='p-4'>Action</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, idx) => (
                            <tr key={item.id} className='text-center'>
                                <td className='p-4 border-b'>{idx + 1}</td>
                                <td className='p-4 border-b'>{item.name}</td>
                                    {(role === "super" ||
                                        role === "head_teacher") && (
                                            <td className='p-4 border-b'>
                                        <Dropdown
                                            menu={{ items: menuItems(item) }}
                                            trigger={["click"]}>
                                            <a
                                                onClick={(e) =>
                                                    e.preventDefault()
                                                }
                                                className='cursor-pointer'>
                                                <Space>
                                                    <p className='rotate-90 text-2xl font-bold text-gray-600'>
                                                        ...
                                                    </p>
                                                </Space>
                                            </a>
                                        </Dropdown>
                                </td>
                                    )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal
                open={showModal}
                onCancel={() => setShowModal(false)}
                footer={null}
                centered
                className='p-4'>
                <div className='flex flex-col'>
                    <label className='text-lg font-semibold mb-2'>
                        Change name
                    </label>
                    <input
                        type='text'
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className='border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500'
                    />
                    <button
                        onClick={handleSave}
                        className='bg-green-600 hover:bg-green-700 transition-colors duration-200 ease-in-out text-white p-2 mt-4 rounded-md self-end'>
                        Save
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default QuestionLvl;
