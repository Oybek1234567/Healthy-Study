import { DeleteFilled } from "@ant-design/icons";
import { Dropdown, Space, Menu, Modal } from "antd";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const GroupsNewExcisting = () => {
    const [data, setData] = useState([]);
    const myRef = useRef(null);
    const [openModal, setOpenModal] = useState(false);
    const [students, setStudents] = useState([]);
    const [student, setStudent] = useState("");
    const [filter, setFilter] = useState("active");
    const [studentIndex, setStudentIndex] = useState(null);
    const [studentName, setStudentName] = useState("");

    const API = "http://localhost:3000";

    useEffect(() => {
        const fetchData = async () => {
            try {
                let token = localStorage.getItem("token");
                console.log("1");

                const req = await axios.get(`${API}/groups/all`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log("11");
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

    const handleGetStudents = async (id, name) => {
        // 'name' parametri qo'shildi
        try {
            const req = await axios.get(`${API}/groupstudents/all/${id}`);
            setStudents(req.data.group_student);
            setOpenModal(true);
            setStudentIndex(0);
            setStudentName(name);
        } catch (error) {
            console.error(error);
        }
    };
    const handleSetStudent = async (index) => {
        if (!students[index] || !student) {
            console.error(
                "Student mavjud emas yoki noto'g'ri index, yoki student ID kiritilmagan."
            );
            return;
        }

        const selectedStudent = students[index];
        const groupId = selectedStudent.group_id;

        const data = {
            user_id: +student,
        };

        try {
            const req = await axios.post(
                `${API}/groupstudents/create/${groupId}`,
                data
            );
            setStudents(req.data.group_students);

            alert("Student qo'shildi");
            window.location.reload();
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
    return (
        <div ref={myRef} className='p-8 bg-gray-50 overflow-x-scroll'>
            <div className='absolute flex justify-between items-center ml-[80%] -translate-y-[230px] z-10'>
                <select
                    name='status'
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className='border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm hover:border-blue-400 transition duration-200 px-4 py-2'>
                    <option value='active'>Active</option>
                    <option value='finished'>Finished</option>
                </select>
            </div>
            <table className='min-w-full border border-gray-300'>
                <thead>
                    <tr className='bg-gray-100 text-center text-xl'>
                        <th className='p-4 text-left'>Name</th>
                        <th className='p-4 text-left'>Students</th>
                        <th className='p-4 text-left'>Teacher</th>
                        <th className='p-4 text-left'>Assistant</th>

                        <th className='p-4 text-left'>Room</th>
                        <th className='p-4 text-left'>Starting Date</th>
                        <th className='p-4 text-left'>Course</th>
                        <th className='p-4 text-left'>Module</th>
                        <th className='p-4 text-left'>Process</th>
                        <th className='p-4 text-left'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item) => (
                        <tr key={item.id} className='bg-white border-b text-xl'>
                            <td className='p-4'>
                                <Link
                                    to={`/groups/${item.id}`}
                                    state={{
                                        name: item.name,
                                        moduleId: item.module_id,
                                        groupId: item.id,
                                    }}
                                    style={{ textDecoration: "none" }}
                                    className='p-1 text-gray-800'>
                                    {item.name}
                                </Link>
                            </td>
                            <td className='p-4'>
                                <button
                                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                                    onClick={() => {
                                        handleGetStudents(item.id, item.name);
                                    }}>
                                    Click
                                </button>
                            </td>
                            <td className='p-4'>
                                {item.teacher_name + " " + item.teacher_surname}
                            </td>
                            <td className='p-4'>
                                {item.assistant_name +
                                    " " +
                                    item.assistant_surname}
                            </td>

                            <td className='p-4'>{item.room_name}</td>
                            <td className='p-4'>
                                {item.starting_date
                                    ? item.starting_date.slice(0, 10)
                                    : ""}
                            </td>
                            <td className='p-4'>{item.course_name}</td>
                            <td className='p-4'>{item.module_name}</td>
                            <td className='p-4'>0</td>
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
            <Modal open={openModal} onCancel={() => setOpenModal(false)}>
                <h2 className='text-2xl font-bold mb-4'>{studentName}</h2>
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
                            <th className='border border-black p-2'>ID</th>
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
                                    <td
                                        style={{ padding: "8px" }}
                                        className='text-center'>
                                        {index + 1}.
                                    </td>
                                    <td
                                        style={{ padding: "8px" }}
                                        className='text-center'>
                                        {item.student_name}
                                    </td>
                                    <td className='p-2 text-center'>
                                        {item.student_id}
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
                                        }}
                                        className='text-center'>
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

export default GroupsNewExcisting;
