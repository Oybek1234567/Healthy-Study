import { useState } from "react";
import { Drawer } from "antd";

const ModulesDrawer = ({ open, onClosed, onCreate }) => {
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
            visible={open}>
            <input
                value={inputValue}
                onChange={handleInputChange}
                placeholder='Type here'
                className='border-2 border-black'
            /><br /><br />
            <button className="bg-green-800 p-2 text-white ml-3 rounded-lg" onClick={handleCreateClick}>
                Create
            </button>
        </Drawer>
    );
};

export default ModulesDrawer;
