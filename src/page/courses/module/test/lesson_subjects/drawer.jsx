import { useEffect, useState } from "react";
import { Drawer, Form, Button, Checkbox, Select } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";

const { Option } = Select;

const LessonSubjectsDrawer = ({ open, onClosed, onCreate }) => {
    const { id: moduleID } = useParams();
    const [inputValue, setInputValue] = useState("");
    const [checkedSubjects, setCheckedSubjects] = useState([]);
    const [lesson, setLesson] = useState([]);
    const [subject, setSubject] = useState([]);
    const [form] = Form.useForm();
    const API = "http://localhost:3000";
    useEffect(() => {
        const handleGetLesson = async () => {
            try {
                const req = await axios.get(
                    `${API}/lessons/all/${moduleID}`
                );
                setLesson(req.data.lessons);
            } catch (error) {
                console.error("Error:", error);
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
                    `${API}/subjects/all/${moduleID}`
                );
                setSubject(req.data.units);
            } catch (error) {
                console.error("Error:", error);
            }
        };
        handleGetSubject();
    }, [moduleID]);

    const handlePost = async (values) => {
        const data = {
            lesson_id: values.lesson,
            module_id: moduleID,
            selected_subjects: checkedSubjects,
        };
        console.log(data);

        try {
            await axios.post(
                `${API}/lessonunits/create`,
                data
            );

            onCreate(data.lesson_id, data.module_id, data.selected_subjects);
            setInputValue("");
            window.location.reload()
            setCheckedSubjects([]);
            form.resetFields();
        } catch (err) {
            console.error("Error:", err);
        }
    };

    const handleInputChange = (value) => {
        setInputValue(value);
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

    return (
        <Drawer
            title='Create Lesson'
            placement='right'
            onClose={onClosed}
            open={open}>
            <Form
                form={form}
                onFinish={handlePost}
                className='flex flex-col space-y-4 p-4'>
                <Form.Item
                    name='lesson'
                    label='Lesson'
                    rules={[
                        { required: true, message: "Please select a lesson!" },
                    ]}>
                    <Select
                        value={inputValue}
                        onChange={handleInputChange}
                        >
                        <Option value=''>Select a lesson</Option>
                        {lesson &&
                            lesson.map((c) => (
                                <Option key={c.id} value={c.id}>
                                    {c.name}
                                </Option>
                            ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name='subjects'
                    label='Subjects'
                    rules={[
                        {
                            required: true,
                            message: "Please select at least one subject!",
                        },
                    ]}>
                    <div className='flex flex-wrap flex-col space-x-4'>
                        {subject &&
                            subject.map((item) => (
                                <Form.Item
                                    key={item.id}
                                    valuePropName='checked'>
                                    <Checkbox
                                        checked={checkedSubjects.includes(
                                            item.id
                                        )}
                                        onChange={() =>
                                            handleCheckboxChange(item.id)
                                        }>
                                        {item.name}
                                    </Checkbox>
                                </Form.Item>
                            ))}
                    </div>
                </Form.Item>

                <Button
                    type='primary'
                    htmlType='submit'
                    className='bg-green-800 p-2 mt-3 text-white rounded-lg hover:bg-green-700'>
                    Create
                </Button>
            </Form>
        </Drawer>
    );
};

export default LessonSubjectsDrawer;
