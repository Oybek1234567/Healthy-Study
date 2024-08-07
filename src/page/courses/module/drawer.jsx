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
            open={open}>
            <label htmlFor="name">Modul nomi</label>
            <input
                name="name"
                id="name"
                value={inputValue}
                onChange={handleInputChange}
                placeholder='Type here'
                className='border-2 border-black'
            /><br /><br />
            <label htmlFor="weight">Modul og`irligi</label>
            <input type="text" name="weight" placeholder="Type here" id
                ="weight" className="border-2 border-black" />
            <label htmlFor="count">Darslar davomiyligi</label>
            <input type="text" />
            <button className="bg-green-800 p-2 text-white ml-3 rounded-lg" onClick={handleCreateClick}>
                Create
            </button>
        </Drawer>
    );
};

export default ModulesDrawer;
