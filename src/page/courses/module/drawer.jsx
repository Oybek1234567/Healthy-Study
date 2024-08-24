import { useState } from "react";
import { Drawer, Form } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";  

const ModulesDrawer = ({ open, onClosed, onCreate }) => {
    const { id: courseID } = useParams();  
    const [inputValue, setInputValue] = useState("");
    const [secondInput, setSecondInput] = useState("");

    const handlePost = async () => {
        const data = {
            name: inputValue,
            max_students: secondInput,
            course_id: courseID,
        };
        try {
            const res = await axios.post(
                "http://localhost:3000/modules/create",
                data
            );
            console.log(courseID);

            onCreate(data.name, data.weight);
            console.log(res.data);
            alert("Yaratildi");
        } catch (err) {
            console.error("Xato bor", err);
        }
        setInputValue("");
        setSecondInput("");
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSecondInputChange = (e) => {
        setSecondInput(e.target.value);
    };

    return (
        <Drawer
            title='Modul Yaratish'
            placement='right'
            onClose={onClosed}
            open={open}>
            <Form onFinish={handlePost}>
                <label htmlFor='name'>Modul nomi</label>
                <input
                    name='name'
                    id='name'
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder='Type here'
                    className='w-full mt-3 border-2 border-black'
                />
                <br />
                <br />
                <label htmlFor='weight' className='w-1/2'>
                    Max. № students
                </label>
                <input
                    type='number'
                    name='weight'
                    value={secondInput}
                    onChange={handleSecondInputChange}
                    placeholder='Type here'
                    id='weight'
                    className='w-full mt-3 mb-3 border-2 border-black'
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

export default ModulesDrawer;
