import { Drawer } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const AssignmentsModal = ({ open, onClose }) => {
    const location = useLocation();
    const { groupId, id } = location.state || {};
    const [assignments, setAssignments] = useState([]);
    const [lesson, setLesson] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState('')
    const API = "http://localhost:3000";

    useEffect(() => {
        const handleGetAssignments = async () => {
            try {
                const req = await axios.get(`${API}/assignments/all/${id}`);
                setAssignments(req.data.assignments);
                console.log(req.data, "fgfgd");
            } catch (e) {
                console.error(e);
            }
        };

        if (id) {
            handleGetAssignments();
        }
    }, [id]);

    const handlePost = async () => {
        try {
            const postData = {
                assignment_id: +lesson,
                when: date + " " + time,
            };
            console.log(postData);
            
            await axios.post(`${API}/exams/create/${groupId}`, postData);
            window.location.reload();
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Drawer
            open={open}
            onClose={onClose}
            title='Add Assignment'
            footer={null}>
            <div className='p-4'>
                <div className='mb-4'>
                    <label
                        className='block text-gray-700 mb-2'
                        htmlFor='assignment-select'>
                        Select an Assignment
                    </label>
                    <select
                        id='assignment-select'
                        className='w-full border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500'
                        value={lesson}
                        onChange={(e) => setLesson(e.target.value)}>
                        <option value='' disabled>
                            Select an assignment
                        </option>
                        {assignments.map((item) => (
                            <option value={item.id} key={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='mb-4'>
                    <label
                        className='block text-gray-700 mb-2'
                        htmlFor='date-input'>
                        Select a Date
                    </label>
                    <input
                        id='date-input'
                        type='date'
                        className='w-full border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500'
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <label htmlFor='time' className='block text-gray-700 mb-2 mt-3'>
                        Select a time
                    </label>
                    <input
                        type='time'
                        id='time'
                        className='w-full border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500'
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />
                </div>
                <button
                    className='bg-green-700 text-white p-2 rounded-lg w-full hover:bg-green-800 transition duration-200'
                    onClick={handlePost}>
                    Save
                </button>
            </div>
        </Drawer>
    );
};

export default AssignmentsModal;
