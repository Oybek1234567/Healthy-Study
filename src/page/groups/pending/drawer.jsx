import { useEffect, useState } from "react";
import { Drawer, Form } from "antd";
import axios from "axios";
import Select from "react-select";

const ExistingDrawer = ({ open, onClosed, onCreate }) => {
    const [users, setUsers] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [courses, setCourses] = useState([]);
    const [modules, setModules] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState("");
    const [selectedAssistant, setSelectedAssistant] = useState("");
    const [selectedCourse, setSelectedCourse] = useState("");
    const [date, setDate] = useState("");
    const [selectedModule, setSelectedModule] = useState("");
    const [days, setDays] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState("");
    const [time, setTime] = useState("");

    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState([]);
    const API = "http://localhost:3000";

    useEffect(() => {
        const getTeachers = async () => {
            try {
                const res = await axios.get(`${API}/users/all`);
                setUsers(res.data.users);
                console.log(res.data);
            } catch (err) {
                console.error("Error fetching teachers", err);
            }
        };
        getTeachers();
    }, []);

    useEffect(() => {
        const getRooms = async () => {
            try {
                const res = await axios.get(`${API}/rooms/all`);
                setRooms(res.data.rooms);
            } catch (err) {
                console.error("Error fetching rooms", err);
            }
        };
        getRooms();
    }, []);

    useEffect(() => {
        const getCourses = async () => {
            try {
                const req = await axios.get(`${API}/courses/all`);
                setCourses(req.data.courses);
            } catch (err) {
                console.error(err);
            }
        };
        getCourses();
    }, []);

    useEffect(() => {
        const getModules = async (courseId) => {
            if (courseId) {
                try {
                    const res = await axios.get(
                        `${API}/modules/all/${courseId}`
                    );
                    setModules(res.data.modules);
                } catch (err) {
                    console.error("Error fetching modules", err);
                }
            }
        };
        getModules(selectedCourse);
    }, [selectedCourse]);

    useEffect(() => {
        const handleGetDays = async () => {
            try {
                const res = await axios.get(`${API}/days/all`);
                setDays(res.data.days);
                setOptions(
                    res.data.days.map((day) => ({
                        value: day.id,
                        label: day.name,
                    }))
                );
            } catch (err) {
                console.error("Error fetching days", err);
            }
        };
        handleGetDays();
    }, []);

    const handlePost = async () => {
        const data = {
            teacher_id: selectedTeacher,
            assistant_id: selectedAssistant,
            starting_date: date,
            module_id: selectedModule,
            days: selectedOption.map((option) => ({ id: option.value })),
            room_id: selectedRoom,
            time: time,
            course_id: selectedCourse,
        };
        try {
            console.log(data);
            alert("Created successfully");
            window.location.reload();
            await axios.post(`${API}/groupenrolements/create`, data);
            if (onCreate) {
                onCreate(
                    data.teacher_id,
                    data.assistant_id,
                    data.starting_date,
                    data.module_id,
                    data.days,
                    data.room_id,
                    data.course_id,
                    data.time
                );
            }
        } catch (err) {
            console.error("Error creating group", err);
        }
        setSelectedTeacher("");
        setSelectedAssistant("");
        setSelectedRoom("");
        setSelectedModule("");
        setSelectedOption([]);
    };

    const handleTeacherChange = (e) => {
        setSelectedTeacher(e.target.value);
    };

    const handleAssistantChange = (e) => {
        setSelectedAssistant(e.target.value);
    };

    const handleDate = (e) => {
        setDate(e.target.value);
    };

    const handleCourse = (e) => {
        setSelectedCourse(e.target.value);
    };

    const handleModuleChange = (e) => {
        setSelectedModule(e.target.value);
    };

    const handleWhen = (selectedOptions) => {
        setSelectedOption(selectedOptions);
    };

    const handleRoomChange = (e) => {
        setSelectedRoom(e.target.value);
    };

    const handleTime = (e) => {
        setTime(e.target.value);
    };

    return (
        <Drawer
            title='Create Group'
            placement='right'
            onClose={onClosed}
            open={open}>
            <Form onFinish={handlePost}>
                <label htmlFor='course'>Course</label>
                <select
                    name='course'
                    value={selectedCourse}
                    onChange={handleCourse}
                    id='course'
                    className='w-full mt-2 h-8 bg-gray-50 rounded-md'>
                    <option value='select' disabled selected>
                        Select Course
                    </option>
                    {courses
                        .filter((item) => item.status === "active")
                        .map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                </select>
                <label htmlFor='module_id'>Module</label>
                <select
                    name='module_id'
                    id='module_id'
                    value={selectedModule}
                    onChange={handleModuleChange}
                    className='w-full mt-2 h-8 bg-gray-50 rounded-md'>
                    <option value=''>Select Module</option>
                    {modules.map((module) => (
                        <option key={module.id} value={module.id}>
                            {module.name}
                        </option>
                    ))}
                </select>
                <label htmlFor='teacher_id'>Teacher</label>
                <select
                    name='teacher_id'
                    value={selectedTeacher}
                    onChange={handleTeacherChange}
                    id='teacher_id'
                    className='w-full mt-2 h-8 bg-gray-50 rounded-md'>
                    <option value=''>Select Teacher</option>
                    {users
                        .filter(
                            (teacher) =>
                                teacher.role === "teacher" ||
                                teacher.role === "head_teacher" ||
                                teacher.role === "super"
                        )
                        .map((teacher) => (
                            <option key={teacher.id} value={teacher.id}>
                                {teacher.name} {teacher.surname}
                            </option>
                        ))}
                </select>
                <label htmlFor='assistant_id' className='mt-2'>
                    Assistant
                </label>
                <select
                    name='assistant_id'
                    value={selectedAssistant}
                    onChange={handleAssistantChange}
                    id='assistant_id'
                    className='w-full mt-2 h-8 bg-gray-50 rounded-md'>
                    <option value='select'>Select Assistant</option>

                    {users
                        .filter((assistant) => assistant.role === "assistant")
                        .map((assistant) => (
                            <option key={assistant.id} value={assistant.id}>
                                {assistant.name} {assistant.surname}
                            </option>
                        ))}
                </select>
                <label htmlFor='room_id' className='mt-2'>
                    Room
                </label>
                <select
                    name='room_id'
                    id='room_id'
                    value={selectedRoom}
                    onChange={handleRoomChange}
                    className='w-full mt-2 h-8 bg-gray-50 rounded-md'>
                    <option value=''>Select Room</option>
                    {rooms.map((room) => (
                        <option key={room.id} value={room.id}>
                            {room.name}
                        </option>
                    ))}
                </select>
                <label htmlFor='when' className='mt-2'>
                    Days
                </label>
                <Select
                    className='w-full mt-2'
                    onChange={handleWhen}
                    value={selectedOption}
                    options={options}
                    isMulti={true}
                />

                <label htmlFor='time' className='mt-2'>
                    Time
                </label>
                <input
                    type='time'
                    name='time'
                    value={time}
                    onChange={handleTime}
                    className='w-full mt-3 border-2 border-black'
                />
                <label htmlFor='starting_date' className='mt-2'>
                    Starting Date
                </label>
                <input
                    type='date'
                    name='starting_date'
                    value={date}
                    onChange={handleDate}
                    className='w-full mt-3 border-2 border-black'
                />
                <button
                    type='submit'
                    className='bg-green-800 p-2 mt-3 text-white ml-3 rounded-lg'>
                    Create
                </button>
            </Form>
        </Drawer>
    );
};

export default ExistingDrawer;
