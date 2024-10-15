import { Drawer, Form, Button } from "antd";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

const AssignmentsDrawer = ({ open, onClosed, onCreate }) => {
    const [input, setInput] = useState("");
    const { moduleID, assignmentID } = useParams();
    const API = "http://localhost:3000";

    const handlePost = async () => {
        const data = {
            name: input,
            module_id: moduleID,
            assignment_type_id: assignmentID,
        };

        try {
            const res = await axios.post(
                `${API}/assignments/create`,
                data
            );
            onCreate(data.name, data.module_id, data.assignment_type_id); 
            console.log(res.data);
            alert("Yaratildi");
            window.location.reload()
        } catch (err) {
            console.error("Xato bor", err);
        }
        setInput("");
        onClosed(); 
    };

    return (
        <div>
            <Drawer open={open} onClose={onClosed}>
                <Form onFinish={handlePost}>
                    <Form.Item label='Name'>
                        <input
                            type='text'
                            className='border-2 border-black'
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            required
                        />
                    </Form.Item>

                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: "Please, fill this input!",
                            },
                        ]}>
                        <Button
                            type='primary'
                            htmlType='submit'
                            className='bg-green-800 p-2 mt-3 text-white ml-3 rounded-lg'>
                            Create
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </div>
    );
};

export default AssignmentsDrawer;
