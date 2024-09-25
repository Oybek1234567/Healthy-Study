import { useEffect, useState } from "react";
import useDrawer from "../../../../hooks/useDrawer";
import LevelDrawer from "./drawer";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Dropdown, Modal, Space } from "antd";

const QuestionLvl = () => {
    const { open, onOpen, onClose } = useDrawer();
    const [data, setData] = useState([]);
    const { id } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [value, setValue] = useState("");
    const [currentItem, setCurrentItem] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const req = await axios.get(
                    `http://localhost:3000/questionlevels/all/${id}`
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
                `http://localhost:3000/questionlevels/edit/${currentItem.id}`,
                { name: value }
            );
            // Update local state with new value
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
                `http://localhost:3000/questionlevels/delete/${item.id}`
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
            label: <p onClick={() =>handleDelete(item)}>Delete</p>,
        },
    ];

    return (
        <div>
            <button
                className='bg-green-800 w-10 h-10 text-white rounded-full ml-[95%] -translate-y-20'
                onClick={onOpen}>
                +
            </button>
            <LevelDrawer open={open} onClose={onClose} />
            <table>
                <thead>
                    <tr className='text-center'>
                        <th>№</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, idx) => (
                        <tr key={item.id}>
                            <td>{idx + 1}</td>
                            <td>{item.name}</td>
                            <td>
                                <Dropdown
                                    menu={{ items: menuItems(item) }}
                                    trigger={["click"]}>
                                    <a onClick={(e) => e.preventDefault()}>
                                        <Space>
                                            <p className='rotate-90 text-4xl cursor-pointer'>
                                                ...
                                            </p>
                                        </Space>
                                    </a>
                                </Dropdown>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal
                open={showModal}
                onCancel={() => setShowModal(false)}
                footer={null}>
                <span className='mr-1'>Change name</span>
                <input
                    type='text'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className='border-2 border-black'
                />
                <button
                    onClick={handleSave}
                    className='bg-green-800 p-2 mt-3 text-white ml-3 rounded-lg'>
                    Save
                </button>
            </Modal>
        </div>
    );
};

export default QuestionLvl;
