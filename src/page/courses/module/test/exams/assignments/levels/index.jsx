import { useEffect, useState } from "react";
import useDrawer from "../../../../../../../hooks/useDrawer";
import AssignmentLvlDrawer from "./drawer";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Dropdown, Menu, Modal, Form, Input, Select } from "antd";

const AssignmentLevels = () => {
    const { open, onOpen, onClose } = useDrawer();
    const location = useLocation();
    const moduleID = location.state?.moduleID;
    const typeId = location.state?.typeId;
    const [data, setData] = useState([]);
    const [levels, setLevels] = useState([]);
    const [units, setUnits] = useState([]);
    const [modal, setModal] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/assignmentlevels/all/${typeId}`
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
                    `http://localhost:3000/questionlevels/all/${moduleID}`
                );
                setLevels(req.data.question_levels);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [moduleID]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const req = await axios.get(
                    `http://localhost:3000/subjects/all/${moduleID}`
                );
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
            await axios.post(
                `http://localhost:3000/assignmentlevels/delete/${id}`
            );
          setData((prevData) => prevData.filter((item) => item.id !== id));
        } catch (error) {
            console.error("Error deleting data:", error);
        }
    };

    const handleSubmit = async (values) => {
        try {
            await axios.post(
                `http://localhost:3000/assignmentlevels/edit/${editItem.id}`,
                values
            );
            setData((prevData) =>
                prevData.map((item) =>
                    item.id === editItem.id ? { ...item, ...values } : item
                )
            );
          setModal(false);
          window.location.reload()
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
        <div>
            <button
                className='bg-green-800 text-xl w-10 h-10 mt-3 text-white rounded-full ml-[95%]'
                onClick={onOpen}>
                +
            </button>
            <AssignmentLvlDrawer open={open} onClose={onClose} />
            <table className='mt-4'>
                <thead>
                    <tr className='border-2 border-black text-center'>
                        <th>№</th>
                        <th>Subject</th>
                        <th>Level</th>
                        <th>Quantity</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.unit_name}</td>
                            <td>{item.level_name}</td>
                            <td>{item.quantity}</td>
                            <td>
                                <Dropdown
                                    overlay={menu(item)}
                                    trigger={["click"]}>
                                    <button className='rotate-90 text-3xl px-2 py-1 rounded'>
                                        ...
                                    </button>
                                </Dropdown>
                            </td>
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
