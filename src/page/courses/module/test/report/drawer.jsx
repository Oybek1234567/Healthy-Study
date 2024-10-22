import { useState } from "react";
import { Drawer, Form, Input, Button, message } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";

const ReportsDrawer = ({ open, onClosed, onCreate }) => {
    const { id: moduleID } = useParams();
    const [inputValue, setInputValue] = useState("");
    const [secondInput, setSecondInput] = useState("");
    const [loading, setLoading] = useState(false);
    const API = "http://localhost:3000";
    const handlePost = async () => {
        const data = {
            name: inputValue,
            weight: secondInput,
            module_id: moduleID,
        };

        setLoading(true);

        try {
            window.location.reload()
            const res = await axios.post(
                `${API}/lessonreporttypes/create`,
                data
            );
            console.log(moduleID);
            console.log(res.data);  
            
            onCreate(data.name, data.weight);

            message.success("Yaratildi");
        } catch (err) {
            console.error("Xato bor", err);
        } finally {
            setLoading(false);
            setInputValue("");
            setSecondInput("");
        }
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSecondInputChange = (e) => {
        setSecondInput(e.target.value);
    };
    return (
        <Drawer
            title="Dars bo'yicha hisobot turi Yaratish"
            placement='right'
            onClose={onClosed}
            open={open}>
            <Form onFinish={handlePost}>
                <Form.Item
                    label='Name'
                    name='name'
                    rules={[
                        { required: true, message: "Please input the name!" },
                    ]}>
                    <Input
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder='Type here'
                        rules={[
                            { required: true, message: "Please input the name!" },
                        ]}
                    />
                </Form.Item>
                <Form.Item
                    label='Weight'
                    name='weight'
                    rules={[
                        { required: true, message: "Please input the weight!" },
                    ]}>
                    <Input
                        value={secondInput}
                        onChange={handleSecondInputChange}
                        placeholder='Type here'
                    />
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit' loading={loading}>
                        Create
                    </Button>
                </Form.Item>
            </Form>
        </Drawer>
    );
};

export default ReportsDrawer;
