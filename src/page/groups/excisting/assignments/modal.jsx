import { Modal } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const AssignmentsModal = ({ open, onClose }) => {
    const location = useLocation();
    const { groupId, assignment_type_id } = location.state || {};
    const [assignments, setAssignments] = useState([]);
    const [lesson, setLesson] = useState("");
    const [date, setDate] = useState("");
            const API = "http://localhost:3000";


    useEffect(() => {
        const handleGetAssignments = async () => {
            try {
                const req = await axios.get(
                    `${API}/assignments/all/${assignment_type_id}`
                );
                setAssignments(req.data.assignments);
            } catch (e) {
                console.error(e);
            }
        };

        if (assignment_type_id) {
            handleGetAssignments();
        }
    }, [assignment_type_id]);

    const handlePost = async () => {
        try {
            const postData = {
                assignment_id: +lesson,
                when: date,
            };
            console.log(postData);

             await axios.post(
                `${API}/exams/create/${groupId}`,
                postData
            );
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Modal
            open={open}
            onCancel={onClose}
            onOk={handlePost}
            title='Assign Assignment'
        >
            <div>
                <select
                    name='select'
                    className='w-full border-2 border-black'
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
            <div>
                <input
                    type='date'
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>
        </Modal>
    );
};

export default AssignmentsModal;