import axios from "axios";
import { useEffect, useState } from "react";
import TestsDrawer from "./drawer";
import useDrawer from "../../../../../../hooks/useDrawer";
import {
    Button,
    Dropdown,
    Modal,
    Space,
    Select,
    notification,
    Radio,
} from "antd";
import { useParams } from "react-router-dom";

const { Option } = Select;

const SubjectTests = () => {
    const { open, onOpen, onClose } = useDrawer();
    const [showEditModal, setShowEditModal] = useState(false);
    const [data, setData] = useState([]);
    const [editSubject, setEditSubject] = useState(null);
    const [newName, setNewName] = useState("");
    const [newLevel, setNewLevel] = useState("");
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const req = await axios.get(
                    `http://localhost:3000/questions/all/${id}`
                );
                setData(req.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [id]);

    const handleSave = async () => {
        if (!newName || !newLevel) {
            notification.error({ message: "Please fill in all fields" });
            return;
        }
        try {
            await axios.post(
                `http://localhost:3000/questions/edit/${id}`,
                {
                    question: newName,
                    level: newLevel,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            setShowEditModal(false);
            notification.success({ message: "Subject successfully updated" });
        } catch (error) {
            console.error("Failed to update subject:", error);
            notification.error({ message: "Failed to update subject" });
        }
    };

    const handleEdit = (item) => {
        setEditSubject(item);
        setNewName(item.question);
        setNewLevel(item.level);
        setShowEditModal(true);
    };

    const handleDelete = async (test) => {
        try {
            await axios.post(
                `http://localhost:3000/questions/delete/${test.id}`
            );
            setData(data.filter((item) => item.id !== test.id));
            notification.success({ message: "Question successfully deleted" });
        } catch (error) {
            console.error(error);
            notification.error({ message: "Failed to delete question" });
        }
    };

    const menuItems = (item) => [
        {
            key: "edit",
            label: "Edit",
            onClick: () => handleEdit(item),
        },
        {
            key: "delete",
            label: "Delete",
            onClick: () => handleDelete(item),
        },
    ];

    return (
        <div>
            <Button
                className='bg-green-700 w-10 h-10 rounded-full text-white ml-[95%]'
                onClick={onOpen}>
                +
            </Button>
            <TestsDrawer open={open} onClosed={onClose} />
            <div className='w-full mt-4'>
                {data.map((item, index) => (
                    <div
                        key={item.id}
                        className='mb-6 p-4 border border-gray-300 rounded-lg'>
                        <p className='text-lg font-semibold'>{item.level}</p>
                        <p className='text-xl'>
                            <span>{index + 1}.</span> {item.question}
                        </p>
                        <div className='flex flex-wrap gap-4 mt-4'>
                            {item.options.map((option) => (
                                <div key={option.id} className="flex gap-2">
                                    <input type="radio" name="radio" id="first" />
                                    <label htmlFor="first">{option.option}</label>
                                </div>
                            ))}
                        </div>
                        <Dropdown
                            menu={{ items: menuItems(item) }}
                            placement="bottomRight"
                            trigger={["click"]}>
                            <a onClick={(e) => e.preventDefault()}>
                                <Space className=''>
                                    <Button type='text' className="rotate-90 text-2xl mt-10 p-3">...</Button>
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
                        Close
                    </Button>,
                    <Button key='save' type='primary' onClick={handleSave}>
                        Save Changes
                    </Button>,
                ]}>
                <h2>Edit Subject</h2>
                <input
                    type='text'
                    className='border-2 border-black w-full mt-2 mb-3 h-10 pl-1'
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                />
                <Select
                    value={newLevel}
                    onChange={setNewLevel}
                    style={{ width: "100%" }}>
                    <Option value='A1'>A1</Option>
                    <Option value='A2'>A2</Option>
                    <Option value='B1'>B1</Option>
                    <Option value='B2'>B2</Option>
                    <Option value='C1'>C1</Option>
                    <Option value='C2'>C2</Option>
                </Select>
            </Modal>
        </div>
    );
};

export default SubjectTests;
