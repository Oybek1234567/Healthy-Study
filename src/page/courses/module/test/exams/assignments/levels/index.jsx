import { useContext, useEffect, useState } from "react";
import useDrawer from "../../../../../../../hooks/useDrawer";
import AssignmentLvlDrawer from "./drawer";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Dropdown, Menu, Modal, Form, Input, Select } from "antd";
import { AuthContext } from "../../../../../../../context/authContext";

const AssignmentLevels = () => {
    const { open, onOpen, onClose } = useDrawer();
    const [data, setData] = useState([]);
    const [levels, setLevels] = useState([]);
    const [units, setUnits] = useState([]);
    const [modal, setModal] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [form] = Form.useForm();
    const location = useLocation();
    const { courseName, moduleName, examName, assignmentName, moduleID, courseId } =
        location.state;
    const typeId = location.state?.typeId;
    const { role } = useContext(AuthContext);;

    const API = "http://localhost:3000";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${API}/assignmentlevels/all/${typeId}`
                );
                setData(response.data.assignment_levels);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [typeId]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const req = await axios.get(
                    `${API}/questionlevels/all/${courseId}`
                );
                setLevels(req.data.question_levels);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [courseId]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const req = await axios.get(`${API}/subjects/all/${moduleID}`);
                setUnits(req.data.units);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [moduleID]);

    const handleEdit = (item) => {
        setEditItem(item);
        form.setFieldsValue({
            unit_id: item.unit_id,
            level_id: item.level_id,
            quantity: item.quantity,
        });
        setModal(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.post(`${API}/assignmentlevels/delete/${id}`);
            setData((prevData) => prevData.filter((item) => item.id !== id));
        } catch (error) {
            console.error("Error deleting data:", error);
        }
    };

    const handleSubmit = async (values) => {
        try {
            await axios.post(
                `${API}/assignmentlevels/edit/${editItem.id}`,
                values
            );
            setData((prevData) =>
                prevData.map((item) =>
                    item.id === editItem.id ? { ...item, ...values } : item
                )
            );
            setModal(false);
            window.location.reload();
        } catch (error) {
            console.error("Error updating data:", error);
        }
    };

    const menu = (item) => (
        <Menu>
            <Menu.Item key='edit' onClick={() => handleEdit(item)}>
                Edit
            </Menu.Item>
            <Menu.Item
                key='delete'
                onClick={() => {
                    handleDelete(item.id);
                    window.location.reload();
                }}>
                Delete
            </Menu.Item>
        </Menu>
    );

    return (
        <div className='relative p-8 bg-gray-50'>
            <div className='flex items-center justify-between'>
                <h1 className='text-3xl font-bold text-gray-800'>
                    <span
                        className='cursor-pointer'
                        onClick={() => window.history.go(-4)}>
                        Kurslar /{" "}
                    </span>
                    <span
                        className='cursor-pointer'
                        onClick={() => window.history.go(-3)}>
                        {courseName} /{" "}
                    </span>
                    <span
                        className='cursor-pointer'
                        onClick={() => window.history.go(-2)}>
                        {moduleName} /{" "}
                    </span>
                    <span
                        className='cursor-pointer'
                        onClick={() => window.history.back(-1)}>
                        {examName} /{" "}
                    </span>
                    <span
                        className='cursor-pointer'
                        onClick={() => window.history.back()}>
                        {assignmentName}
                    </span>
                </h1>

                {(role === "super" || role === "head_teacher") && (
                    <button
                        className=' bg-green-700 w-10 h-10 text-xl rounded-full text-white hover:bg-green-600 transition duration-300'
                        onClick={onOpen}>
                        +
                    </button>
                )}
            </div>
            <AssignmentLvlDrawer open={open} onClose={onClose} />
            <table className='min-w-full border border-gray-300 mt-14'>
                <thead className='bg-gray-100 text-center text-xl'>
                    <tr className='text-center'>
                        <th className='border p-2'>№</th>
                        <th className='border p-2'>Subject</th>
                        <th className='border p-2'>Level</th>
                        <th className='border p-2'>Quantity</th>
                        {(role === "super" || role === "head_teacher") && (
                            <th className='border p-2'>Action</th>
                        )}
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {data.map((item, index) => (
                        <tr key={item.id} className='hover:bg-gray-100 text-xl'>
                            <td className='border text-center p-2'>
                                {index + 1}
                            </td>
                            <td className='border text-center p-2'>
                                {item.unit_name}
                            </td>
                            <td className='border text-center p-2'>
                                {item.level_name}
                            </td>
                            <td className='border text-center p-2'>
                                {item.quantity}
                            </td>
                            {(role === "super" || role === "head_teacher") && (
                                <td className='border text-center p-2'>
                                    <Dropdown
                                        overlay={menu(item)}
                                        trigger={["click"]}>
                                        <button className='rotate-90 text-3xl px-2 py-1 rounded'>
                                            ...
                                        </button>
                                    </Dropdown>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal
                open={modal}
                title='Edit Assignment Level'
                onCancel={() => setModal(false)}
                footer={null}>
                <Form form={form} onFinish={handleSubmit} layout='vertical'>
                    <Form.Item
                        name='unit_id'
                        label='Subject'
                        rules={[
                            {
                                required: true,
                                message: "Please select a subject",
                            },
                        ]}>
                        <Select placeholder='Select a subject'>
                            {units.map((unit) => (
                                <Select.Option value={unit.id} key={unit.id}>
                                    {unit.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name='level_id'
                        label='Level'
                        rules={[
                            {
                                required: true,
                                message: "Please select a level",
                            },
                        ]}>
                        <Select placeholder='Select a level'>
                            {levels.map((level) => (
                                <Select.Option value={level.id} key={level.id}>
                                    {level.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name='quantity'
                        label='Quantity'
                        rules={[
                            {
                                required: true,
                                message: "Please enter a quantity",
                            },
                        ]}>
                        <Input type='number' />
                    </Form.Item>
                    <Form.Item>
                        <button
                            type='submit'
                            className='bg-green-800 text-white rounded-lg px-4 py-2'>
                            Save
                        </button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AssignmentLevels;
