import { useEffect, useState } from "react";
import { Drawer, Form } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";

const LessonSubjectsDrawer = ({ open, onClosed, onCreate }) => {
    const { id: moduleID } = useParams();
    const [inputValue, setInputValue] = useState("");
    const [checkedSubjects, setCheckedSubjects] = useState([]);
    const [lesson, setLesson] = useState([]);
    const [subject, setSubject] = useState([]);
    const [nameValue, setNameValue] = useState("")
    useEffect(() => {
        const handleGetLesson = async () => {
            try {
                const req = await axios.get(
                    `http://localhost:3000/lessons/all/${moduleID}`
                );
                setLesson(req.data.lessons);
            } catch (error) {
                console.error("Xato bor:", error);
            }
        };

        if (moduleID) {
            handleGetLesson();
        }
    }, [moduleID]);

    useEffect(() => {
        const handleGetSubject = async () => {
            try {
                const req = await axios.get(
                    `http://localhost:3000/subjects/all/${moduleID}`
                );
                setSubject(req.data.units);
            } catch (error) {
                console.error("Xato bor:", error);
            }
        };
        handleGetSubject();
    }, []);

    const handlePost = async () => {
        const data = {
            lesson_id: inputValue,
            module_id: moduleID,
            selected_subjects: checkedSubjects, 
        };
        console.log(data);
        
        try {
            window.location.reload()
            const res = await axios.post(
                "http://localhost:3000/lessonunits/create",
                data
            );

            onCreate(data);
            console.log(res.data);
            alert("Yaratildi");
            setInputValue("");
            setCheckedSubjects([]); 
            handleReload();
        } catch (err) {
            console.error("Xato bor", err);
        }
    };

    const handleLessonCreate = () => {
        const data = {
            name: nameValue,
            module_id: moduleID,
        };
        try {
            axios.post(
                "http://localhost:3000/lessons/create",
                data
            );
            alert("Yaratildi");
        } catch (err) {
            console.error("Xato bor", err);
        }
        setInputValue("");
    };

    const handleNameChange = (e) => {
        setNameValue(e.target.value);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleCheckboxChange = (id) => {
        setCheckedSubjects((prevCheckedSubjects) => {
            if (prevCheckedSubjects.includes(id)) { 
                return prevCheckedSubjects.filter((item) => item !== id);
            } else { 
                return [...prevCheckedSubjects, id];
            }
        });
    };

    const handleReload = () => {
        window.location.reload();
    };

    return (
        <Drawer
            title='Dars Yaratish'
            placement='right'
            onClose={onClosed}
            open={open}>
            <Form onFinish={handlePost} className='flex flex-col space-y-4 p-4'>
                <div className='flex flex-col space-y-2'>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name"  className="p-2 border rounded-lg" value={nameValue} onChange={handleNameChange}/>
                    <button className="p-2 rounded-lg bg-[green] w-1/4 text-white" onClick={handleLessonCreate}>Create</button>
                    <label htmlFor='name' className='text-xl font-semibold'>
                        Lesson
                    </label>
                    <select
                        value={inputValue}
                        onChange={handleInputChange}
                        className='p-2 border rounded-lg'>
                        {lesson.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='flex flex-col space-y-2'>
                    <label className='text-xl font-semibold'>Subjects</label>
                    <div className='flex flex-wrap flex-col space-x-4'>
                        {subject.map((item) => (
                            <label
                                key={item.id}
                                className='flex items-center justify-center gap-2 space-x-2'>
                                <input
                                    type='checkbox'
                                    checked={checkedSubjects.includes(item.id)}
                                    onChange={() =>
                                        handleCheckboxChange(item.id)
                                    }
                                    className='form-checkbox'
                                />
                                <span>{item.name}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <button
                    type='submit'
                    className='bg-green-800 p-2 mt-3 text-white rounded-lg hover:bg-green-700'>
                    Create
                </button>
            </Form>
        </Drawer>
    );
};

export default LessonSubjectsDrawer;
