import { useState } from "react";
import { Drawer } from "antd";
import axios from "axios";

const CoursesDrawer = ({ open, onClose, onCreate }) => {
    const [inputValue, setInputValue] = useState("");
    const [data, setData] = useState([])
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    const handleCreateClick = async() => {
        try {
            const res = axios.get("http://localhost:3000/courses/create", data);
            console.log(res);
            alert('Muvaffaqiyatli bajarildi')
            setData(res.data);
        } catch (err) {
            console.error("Xato bor", err);
        }
        onCreate(inputValue);
        setInputValue("");
    };

    return (
        <Drawer
            title='Kurs Yaratish'
            placement='right'
            onClose={onClose} 
            open={open}
        >
            <label htmlFor="name">Name:</label>
            <input
                id="name"
                value={inputValue}
                onChange={handleInputChange}
                placeholder='Type here'
                className='border-2 border-black p-1'
                required
            />
            <br />
            <br />
            <button
                className='bg-green-800 p-2 text-white ml-3 rounded-lg'
                onClick={handleCreateClick}>
                Create
            </button>
        </Drawer>
    );
};

export default CoursesDrawer;
