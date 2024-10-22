import { useState } from "react";
import { Drawer, Form } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
const SubjectsDrawer = ({ open, onClosed, onCreate }) => {
    const { id: moduleID } = useParams();
    const [inputValue, setInputValue] = useState("");
    const API = "http://localhost:3000";
    const handlePost = async () => {
        const data = {
            name: inputValue,
            module_id: moduleID,
        };
        try {
            const res = await axios.post(
                `${API}/subjects/create`,
                data
            );
            console.log(moduleID);

            onCreate(data.name);
            console.log(res.data);
            alert("Yaratildi");
        } catch (err) {
            console.error("Xato bor", err);
        }
        setInputValue("");
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleReload = () => {
        window.location.reload();
    }
    return (
        <Drawer
            title='Mavzu Yaratish'
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
                    className='w-full mt-3 border-2 border-black'
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

export default SubjectsDrawer;
