import { useState } from "react";
import { Drawer } from "antd";

const ModulesDrawer = ({ open, onClosed, onCreate }) => {
    const [inputValue, setInputValue] = useState("");
    const [secondInput, setSecondInput] = useState("");
    const [thirdInput, setThirdInput] = useState("");

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSecondInputChange = (e) => {
        setSecondInput(e.target.value);
    };
    const handleThirdInputChange = (e) => {
        setThirdInput(e.target.value);
    };
    const handleCreate = () => {
        onCreate(inputValue, secondInput, thirdInput);

        setInputValue("");
        setSecondInput("");
        setThirdInput("");
    };
    const handleCreateClick = () => {
        handleCreate();
    };

    return (
        <Drawer
            title='Modul Yaratish'
            placement='right'
            onClose={onClosed}
            open={open}>
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
            <label htmlFor='weight'>Modul og`irligi</label>
            <input
                type='text'
                name='weight'
                value={secondInput}
                onChange={handleSecondInputChange}
                placeholder='Type here'
                id='weight'
                className='w-full mt-3 mb-3 border-2 border-black'
            />
            <label htmlFor='count' className='w-1/2'>
                Darslar davomiyligi
            </label>
            <input
                type='date'
                value={thirdInput}
                onChange={handleThirdInputChange}
                className='w-full mt-3 border-2 border-black'
                placeholder='Type here'
                id='count'
            />
            <button
                className='bg-green-800 p-2 mt-3 text-white ml-3 rounded-lg'
                onClick={handleCreateClick}>
                Create
            </button>
        </Drawer>
    );
};

export default ModulesDrawer;
