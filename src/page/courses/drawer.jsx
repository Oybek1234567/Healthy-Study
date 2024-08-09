import { useState } from "react";
import { Drawer } from "antd";

const CoursesDrawer = ({ open, onClosed, onCreate }) => {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    const handleCreateClick = () => {
        onCreate(inputValue);
        setInputValue("");
    };

    return (
        <Drawer
            title='Modul Yaratish'
            placement='right'
            onClose={onClosed}
            open={open}
            className='flex'>
            <input
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
