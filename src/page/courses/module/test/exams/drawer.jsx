import { useState } from "react";
import { Drawer, Form } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
const ExamsDrawer = ({ open, onClosed, onCreate }) => {
    const { id: moduleID } = useParams();
    const [inputValue, setInputValue] = useState("");
    const [secondInput, setSecondInput] = useState("");
    const API = "http://localhost:3000";
    const handlePost = async () => {
        const data = {
            name: inputValue,
            weight: secondInput,
            module_id: moduleID,
        };
        try {
            await axios.post(       
                `${API}/assignmenttypes/create`,
                data
            );
            console.log(moduleID);
            onCreate(data.name, data.weight);
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

    const handleReload = () => {
        window.location.reload();
    };
    return (
        <Drawer
            title='Imtihon Yaratish'
            placement='right'
            onClose={onClosed}
            open={open}>
            <Form
                onFinish={() => {
                    handlePost();
                    handleReload();
                }}>
                <label htmlFor='name'>Name</label>
                <input
                    name='name'
                    id='name'
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder='Type here'
                    className='w-full mt-3 p-1 border-2 border-black'
                    required
                />
                <br />
                <br />
                <label htmlFor='weight'>Weight</label>
                <input
                    name='weight'
                    type='number'
                    value={secondInput}
                    onChange={handleSecondInputChange}
                    className='w-full mt-3 p-1 border-2 border-black'
                    placeholder='Type here'
                    id='weight'
                    required
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

export default ExamsDrawer;
