import { useState } from "react";
import { Drawer, Form } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
const ExamsDrawer = ({ open, onClosed, onCreate }) => {
    const { id: moduleID } = useParams();
    const [inputValue, setInputValue] = useState("");
    const [secondInput, setSecondInput] = useState("");
    const [thirdInput, setThirdInput] = useState("");

    const handlePost = async () => {
        const data = {
            name: inputValue,
            weight: secondInput,
            tests_total: thirdInput,
            course_id: moduleID,
        };
        try {
             await axios.post(
                "http://localhost:3000/assignmenttypes/create",
                data
            );
            console.log(moduleID);

            onCreate(data.name, data.weight, data.total);
            alert("Yaratildi");
        } catch (err) {
            console.error("Xato bor", err);
        }
        setInputValue("");
        setSecondInput("");
        setThirdInput("");
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSecondInputChange = (e) => {
        setSecondInput(e.target.value);
    };

    const handleThirdInputChange = (e) => {
        setThirdInput(e.target.value);
    };

    return (
        <Drawer
            title='Imtihon Yaratish'
            placement='right'
            onClose={onClosed}
            open={open}>
            <Form onFinish={handlePost}>
                <label htmlFor='name'>Name</label>
                <input
                    name='name'
                    id='name'
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder='Type here'
                    className='w-full mt-3 p-1 border-2 border-black'
                />
                <br />
                <br />
                <label htmlFor='weight'>Weight</label>
                <input
                    type='number'
                    value={thirdInput}
                    onChange={handleThirdInputChange}
                    className='w-full mt-3 p-1 border-2 border-black'
                    placeholder='Type here'
                    id='weight'
                />
                <label htmlFor='tests_total'>Tests total</label>
                <input
                    type='number'
                    name='tests_total'
                    value={secondInput}
                    onChange={handleSecondInputChange}
                    placeholder='Type here'
                    id='tests_total'
                    className='w-full mt-3 mb-3 p-1 border-2 border-black'
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
