import { Drawer, Form } from "antd";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

const LessonsDrawer = ({ open, onClosed, onCreate }) => {
    const [input, setInput] = useState("");
    const { id: moduleID } = useParams();
    const API = "http://localhost:3000";
    const handlePost = async () => {
        const data = {
            module_id: moduleID,
            name: input,
        };
        try {
            alert("Yaratildi");
            window.location.reload();
            const res = await axios.post(
                `${API}/lessons/create`,
                data
            );
            onCreate(data.name);
            console.log(res.data);
            alert("Yaratildi");
        } catch (err) {
            console.error("Xato bor", err);
        }
    };
    return (
        <div>
            <Drawer open={open} onClose={onClosed}>
                <Form onFinish={handlePost}>
                    <label htmlFor='name'>Name</label>
                    <input
                        type='text'
                        className='border-2 border-black'
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        required
                    />
                    <button
                        type='submit'
                        className='bg-green-800 p-2 mt-3 text-white ml-3 rounded-lg'>
                        Create
                    </button>
                </Form>
            </Drawer>
        </div>
    );
};

export default LessonsDrawer;
