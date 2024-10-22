import { Modal } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const LessonModal = ({ open, onClose }) => {
    const [data, setData] = useState([]);
    const [students, setStudents] = useState([]);
    const [selected, setSelected] = useState("");
    const [selectedInput, setSelectedInput] = useState({});
    const location = useLocation();
    const { groupId, lesson_report_type_id } = location.state;
    const API = "http://localhost:3000";


    useEffect(() => {
        const handleGet = async () => {
            try {
                const req = await axios.get(
                    `${API}/grouplessons/all/${groupId}`
                );
                setData(req.data.group_lessons);
            } catch (error) {
                console.error(error);
            }
        };
        handleGet();
    }, [groupId]); // Faqat `groupId` o'zgarganda ishlaydi

    useEffect(() => {
        const handleGetStudent = async () => {
            try {
                const req = await axios.get(
                    `${API}/groupstudents/all/${groupId}`
                );
                setStudents(req.data.group_student);
            } catch (e) {
                console.error(e);
            }
        };
        handleGetStudent();
    }, [groupId]);

    const handlePost = async () => {
        const studentsData = students.map((item) => ({
            group_student_id: item.id,
            score: selectedInput[item.id] || "",
        }));
        const postData = {
            lesson_report_type_id: lesson_report_type_id,
            group_lesson_id: +selected,
            students: studentsData,
        };
        console.log(postData);

        try {
            const res = await axios.post(
                `${API}/lessonreportsbyuser/create/${groupId}`,
                postData
            );
            console.log(res.data);
            // window.location.reload();
        } catch (err) {
            console.error(err);
        }
    };

    const handleInputChange = (id, value) => {
        setSelectedInput((prev) => ({ ...prev, [id]: value }));
    };

    return (
        <div>
            <Modal open={open} onCancel={onClose} onOk={handlePost}>
                <select
                    name=''
                    className='mb-10 w-full border-2 border-black'
                    value={selected}
                    onChange={(e) => setSelected(e.target.value)}>
                    <option value='' disabled={selected !== ""}>
                        Select Lesson
                    </option>
                    {data.map((item) => (
                        <option value={item.id} key={item.id} disabled={selected === item.id}> 
                            {item.lesson_name}
                        </option>
                    ))}
                </select>
                {students.map((item) => (
                    <div key={item.id} className='flex'>
                        <label htmlFor={item.id} className='w-56'>
                            {item.student_name}
                        </label>
                        <input
                            id={item.id}
                            type='text'
                            className='border-2 border-black mb-4'
                            value={selectedInput[item.id] || ""}
                            onChange={(e) =>
                                handleInputChange(item.id, e.target.value)
                            }
                        />
                    </div>
                ))}
            </Modal>
        </div>
    );
};

export default LessonModal;
