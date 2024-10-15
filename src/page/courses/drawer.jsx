import { useState } from "react";
import { Drawer, Form } from "antd";
import axios from "axios";

const CoursesDrawer = ({ open, onClose, onCreate }) => {
    const [inputValue, setInputValue] = useState("");
    const API = "http://localhost:3000";
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleCreateClick = async () => {
        const data = { name: inputValue };
        try {
            const res = await axios.post(
                `${API}/courses/create`,
                data
            );
            onCreate(res.data); 
            console.log(res.data);

            
            window.location.reload();
        } catch (err) {
            console.error("Xato bor", err);
        }
        setInputValue("");
    };

    return (
        <Drawer
            title='Kurs Yaratish'
            placement='right'
            onClose={onClose}
            open={open} >
            <Form onFinish={handleCreateClick}>
                <label htmlFor='name' className="mr-5">Name:</label>
                <input
                    id='name'
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder='Type here'
                    className='border-2 border-black p-1 w-[80%]'
                    required
                />
                <br />
                <br />
                <button
                    className='bg-green-800 p-2 w-full text-white ml-3 rounded-lg'
                    type='submit' >
                    Create
                </button>
            </Form>
        </Drawer>
    );
};

export default CoursesDrawer;
