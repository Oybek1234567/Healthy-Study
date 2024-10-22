import { DeleteFilled } from "@ant-design/icons";
import { Dropdown, Space, Menu, Modal } from "antd";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Existing = () => {
    const [data, setData] = useState([]);
    const myRef = useRef(null);
    const [openModal, setOpenModal] = useState(false);
    const [students, setStudents] = useState([]);
    const [lessons, setLessons] = useState([]);
    const [openLesson, setOpenLesson] = useState(false);
    const [student, setStudent] = useState("");
    const [filter, setFilter] = useState("active");
    const [studentIndex, setStudentIndex] = useState(null);
    const API = "http://localhost:3000";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const req = await axios.get(`${API}/groups/all`);
                setData(req.data.groups);
                console.log(req.data.groups);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

const handleFinish = async () => {
    try {
        const response = await axios.get(`${API}/groups/all`);
        const allData = response.data.groups;

        const filteredData =
            filter === "finished"
                ? allData.filter((item) => item.status === "finished")
                : allData.filter((item) => item.status !== "finished");

        setData(filteredData);
    } catch (error) {
        console.log(error);
        alert("Xatolik yuz berdi!");
    }
};


    const handleGetStudents = async (id) => {
        try {
            const req = await axios.get(`${API}/groupstudents/all/${id}`);
            setStudents(req.data.group_student);
            console.log(req.data.group_student);
            setOpenModal(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handleGetLessons = async (id) => {
        try {
            const req = await axios.get(`${API}/grouplessons/all/${id}`);
            setLessons(req.data.group_lessons);

            setOpenLesson(true);
        } catch (error) {
            console.error(error);
        }
    };
    const handleSetStudent = async (index) => {
        const firstStudent = students[index];
        console.log(students);
        const groupId = firstStudent.group_id;
        const data = {
            user_id: +student,
        };

        try {
            const req = await axios.post(
                `${API}/groupstudents/create/${groupId}`,
                data
            );
            setStudents(req.data.group_students);
            console.log(firstStudent);

            alert("Student added");
            setStudent("");
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.post(`${API}/groups/delete/${id}`);
            setData((prevData) => prevData.filter((item) => item.id !== id));
            alert("Group deleted successfully");
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteStudent = async (id) => {
        try {
            await axios.post(`${API}/groupstudents/delete/${id}`);
            setStudents((prevData) =>
                prevData.filter((item) => item.id !== id)
            );
        } catch (error) {
            console.log(error);
        }
    };

    const menuItems = (group) => (
        <Menu>
            <Menu.Item key='delete' onClick={() => handleDelete(group.id)}>
                Delete
            </Menu.Item>
            <Menu.Item key='finish' onClick={handleFinish}>
                Finish
            </Menu.Item>
        </Menu>
    );


    const filteredData =
        filter === "active"
            ? data
            : data.filter((item) => item.status === filter);
    console.log(filteredData);

    return (
        <div ref={myRef}>
            <select
                name='filter'
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className='mb-10 border border-black'>
                <option value='active'>Active</option>
                <option value='finished'>Finished</option>
            </select>
            <table className='min-w-full bg-white borderborder-gray-200 shadow-md rounded-md'>
                <thead className='bg-gray-100 border-b border-gray-200'>
                    <tr>
                        <th className='py-3 px-6 text-left text-gray-600 font-semibold'>
                            Name
                        </th>
                        <th className='py-3 px-6 text-left text-gray-600 font-semibold'>
                            Students
                        </th>
                        <th className='py-3 px-6 text-left text-gray-600 font-semibold'>
                            Teacher
                        </th>
                        <th className='py-3 px-6 text-left text-gray-600 font-semibold'>
                            Assistant
                        </th>

                        <th className='py-3 px-6 text-left text-gray-600 font-semibold'>
                            Room
                        </th>
                        <th className='py-3 px-6 text-left text-gray-600 font-semibold'>
                            Starting Date
                        </th>
                        <th className='py-3 px-6 text-left text-gray-600 font-semibold'>
                            Days
                        </th>
                        <th className='py-3 px-6 text-left text-gray-600 font-semibold'>
                            Time
                        </th>
                        <th className='py-3 px-6 text-left text-gray-600 font-semibold'>
                            Lessons
                        </th>
                        <th className='py-3 px-6 text-left text-gray-600 font-semibold'>
                            Process
                        </th>
                        <th className='py-3 px-6 text-left text-gray-600 font-semibold'>
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item) => (
                        <tr
                            key={item.id}
                            className='border-b border-gray-200 hover:bg-gray-50'>
                            <Link
                                to={`/excisting/${item.id}`}
                                state={{
                                    name: item.name,
                                    moduleId: item.module_id,
                                    groupId: item.id,
                                }}
                                className='p-1 text-gray-800 '>
                                {item.name}
                            </Link>
                            <td className='border border-gray-300 py-4 px-6'>
                                <button
                                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                                    onClick={() => handleGetStudents(item.id)}>
                                    Click
                                </button>
                            </td>
                            <td className='py-4 px-6 text-gray-800'>
                                {item.teacher_name}
                            </td>
                            <td className='py-4 px-6 text-gray-800'>
                                {item.assistant_name}
                            </td>

                            <td className='py-4 px-6 text-gray-800'>
                                {item.room_name}
                            </td>
                            <td className='py-4 px-6 text-gray-800'>
                                {item.starting_date
                                    ? item.starting_date.slice(0, 10)
                                    : ""}
                            </td>
                            <td className='py-4 px-6 text-gray-800'>
                                {item.days}
                            </td>
                            <td className='py-4 px-6 text-gray-800'>
                                {item.time}
                            </td>
                            <td className='py-4 px-6 text-gray-800'>
                                <button
                                    className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
                                    onClick={() => handleGetLessons(item.id)}>
                                    Open
                                </button>
                            </td>
                            <td className='py-4 px-6 text-gray-800'>0</td>
                            <td>
                                <Dropdown
                                    overlay={menuItems(item)}
                                    trigger={["click"]}>
                                    <a
                                        href='#'
                                        onClick={(e) => e.preventDefault()}>
                                        <Space>
                                            <p className='rotate-90 text-4xl'>
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

            <Modal open={openLesson} onCancel={() => setOpenLesson(false)}>
                <table className='min-w-full bg-white border border-gray-200 shadow-md rounded-md'>
                    <thead className='bg-gray-100 border-b border-gray-200'>
                        <tr>
                            <th className='py-3 px-6 text-left text-gray-600 font-semibold'>
                                №
                            </th>
                            <th className='py-3 px-6 text-left text-gray-600 font-semibold'>
                                Lesson Name
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {lessons.map((item, index) => (
                            <tr
                                key={item.id}
                                className='border-b border-gray-200 hover:bg-gray-50'>
                                <td className='py-4 px-6 text-gray-800'>
                                    {index + 1}
                                </td>
                                <td className='py-4 px-6 text-gray-800'>
                                    {item.lesson_name}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Modal>
            <Modal open={openModal} onCancel={() => setOpenModal(false)}>
                <input
                    type='text'
                    value={student}
                    onChange={(e) => setStudent(e.target.value)}
                    className='border-2 border-black'
                />
                <button
                    onClick={() => handleSetStudent(studentIndex)}
                    className='w-14 h-8 bg-green-400 text-white rounded-lg ml-10'>
                    Add
                </button>
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        border: "3px solid black",
                    }}
                    className='mt-10'>
                    <thead>
                        <tr className='text-center'>
                            <th
                                style={{
                                    border: "1px solid #000",
                                    padding: "8px",
                                }}>
                                №
                            </th>
                            <th
                                style={{
                                    border: "1px solid #000",
                                    padding: "8px",
                                }}>
                                Name
                            </th>
                            <th
                                style={{
                                    border: "1px solid #000",
                                    padding: "8px",
                                }}>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {students &&
                            students.map((item, index) => (
                                <tr
                                    key={item.id}
                                    style={{
                                        textAlign: "left",
                                        borderBottom: "1px solid #ddd",
                                    }}>
                                    <td style={{ padding: "8px" }}>
                                        {index + 1}.
                                    </td>
                                    <td style={{ padding: "8px" }}>
                                        {item.student_name}
                                    </td>
                                    <td
                                        onClick={() => {
                                            handleDeleteStudent(item.id);
                                            setStudentIndex(index);
                                        }}
                                        style={{
                                            padding: "8px",
                                            cursor: "pointer",
                                            color: "red",
                                        }}>
                                        <DeleteFilled />
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </Modal>
        </div>
    );
};

export default Existing;
