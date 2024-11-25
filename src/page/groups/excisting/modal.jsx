import { Form, Modal, Button, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ExistingGroupDrawer = (props) => {
    const { open, onClose, onCreate } = props;
    const [data, setData] = useState([]);
    const [select, setSelect] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");
    const [commentVisible, setCommentVisible] = useState({});
    const [checkedStatus, setCheckedStatus] = useState({});
    const location = useLocation();
    const { groupId } = location.state;
        const API = "http://localhost:3000";


    useEffect(() => {
        const handleGet = async () => {
            try {
                const req = await axios.get(
                    `${API}/groupstudents/all/${groupId}`
                );
                setData(req.data.group_student);
                console.log(req.data.group_student);
            } catch (error) {
                console.error(error);
            }
        };
        handleGet();
    }, [groupId]);

    useEffect(() => {
        const handleGetSelect = async () => {
            try {
                const req = await axios.get(
                    `${API}/grouplessons/all/${groupId}`
                );
                setSelect(req.data.group_lessons);
                console.log(req.data.group_lessons);
            } catch (error) {
                console.error(error);
            }
        };
        handleGetSelect();
    }, [groupId]);

    const handlePost = async () => {
        // Talabalarni tanlash
        const selectedStudents = data.map((item) => ({
            group_student_id: item.id,
            isAttended: checkedStatus[item.id]?.tick
                ? "attended"
                : "not attended",
            comment: commentVisible[item.id] || "", 
        }));

        const postData = {
            group_lesson_id: selectedValue,
            students: selectedStudents,
        };

        console.log(selectedStudents);
        console.log(postData);

        try {
            window.location.reload()
            const res = await axios.post(
                `${API}/groupattendance/create/${groupId}`,
                postData
            );
            onCreate(selectedValue);

            console.log(res.data);
            alert("Yaratildi");
        } catch (err) {
            console.error("Xato bor", err);
        }
    };

    const handleCheckboxChange = (id, type) => {
        setCheckedStatus((prev) => {
            const newStatus = { ...prev };
            if (type === "tick") {
                newStatus[id] = { tick: true, cross: false };
            } else {
                newStatus[id] = { tick: false, cross: true };
            }
            return newStatus;
        });

        if (type === "cross") {
            setCommentVisible((prev) => ({
                ...prev,
                [id]: "",
            }));
        } else {
            setCommentVisible((prev) => {
                const newComment = { ...prev };
                delete newComment[id];
                return newComment;
            });
        }
    };

    const handleSelectChange = (value) => {
        setSelectedValue(value);
    };

    return (
        <div>
            <Modal open={open} onCancel={onClose} footer={null}>
                <Form onFinish={handlePost}>
                    <Select
                        required={true}
                        name='hello'
                        className='w-full border-2 border-black'
                        onChange={handleSelectChange}
                        value={selectedValue}>
                        {select.map((item) => (
                            <Select.Option key={item.id} value={item.id}>
                                {item.lesson_name}
                            </Select.Option>
                        ))}
                    </Select>
                    <table className='w-full mt-6 border-collapse border border-black'>
                        <thead>
                            <tr className='text-center'>
                                <th className='border border-black p-2'>
                                    Student Name
                                </th>
                                <th className='border border-black p-2'>✔</th>
                                <th className='border border-black p-2'>❌</th>
                                {Object.values(commentVisible).some(
                                    (visible) => visible
                                ) && (
                                    <th className='border border-black p-2'>
                                        New Comment
                                    </th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item.id}>
                                    <td className='border border-black p-2'>
                                        {item.student_name}
                                    </td>
                                    <td className='border border-black p-2 text-center'>
                                        <input
                                            type='checkbox'
                                            className='w-6 h-6'
                                            checked={
                                                checkedStatus[item.id]?.tick ||
                                                false
                                            }
                                            onChange={() =>
                                                handleCheckboxChange(
                                                    item.id,
                                                    "tick"
                                                )
                                            }
                                        />
                                    </td>
                                    <td className='border border-black p-2 text-center'>
                                        <input
                                            type='checkbox'
                                            className='w-6 h-6'
                                            checked={
                                                checkedStatus[item.id]?.cross ||
                                                false
                                            }
                                            onChange={() =>
                                                handleCheckboxChange(
                                                    item.id,
                                                    "cross"
                                                )
                                            }
                                        />
                                    </td>
                                    {commentVisible[item.id] !== undefined && (
                                        <td className='border border-black p-2'>
                                            <textarea
                                                rows='2'
                                                cols='20'
                                                placeholder='Enter comment'
                                                value={
                                                    commentVisible[item.id] ||
                                                    ""
                                                }
                                                onChange={(e) =>
                                                    setCommentVisible(
                                                        (prev) => ({
                                                            ...prev,
                                                            [item.id]:
                                                                e.target.value,
                                                        })
                                                    )
                                                }
                                            />
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Button type='primary' htmlType='submit' className="mt-10 ml-[85%]">
                        Create
                    </Button>
                </Form>
            </Modal>
        </div>
    );
};

export default ExistingGroupDrawer;
