import { Drawer } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const AssignmentLvlDrawer = ({ open, onClose }) => {
    const { moduleID } = useParams();
    const location = useLocation();
    const typeId = location.state?.typeId;
    const [data, setData] = useState([]);
    const [units, setUnits] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState("");
    const [selectedLevel, setSelectedLevel] = useState("");
    const [quantity, setQuantity] = useState("");
    const API = "http://localhost:3000";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const req = await axios.get(
                    `${API}/questionlevels/all/${moduleID}`
                );
                setData(req.data.question_levels);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [moduleID]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const req = await axios.get(
                    `${API}/subjects/all/${moduleID}`
                );
                setUnits(req.data.units);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [moduleID]);

    const handlePost = async () => {
        try {
            const req = await axios.post(
                `${API}/assignmentlevels/create/${typeId}`,
                {
                    unit_id: selectedSubject,
                    level_id: selectedLevel,
                    quantity: quantity,
                }
            );
            console.log(req.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Drawer open={open} onClose={onClose}>
                <label htmlFor='subject'>Subject</label>
                <select
                    id='subject'
                    className='mb-4 w-full border-2 border-black'
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}>
                    <option value=''>Select a subject</option>
                    {units &&
                        units.map((item) => (
                            <option value={item.id} key={item.id}>
                                {item.name}
                            </option>
                        ))}
                </select>
                <label htmlFor='lvl'>Level</label>
                <select
                    id='lvl'
                    className='w-full border-2 border-black'
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}>
                    <option value=''>Select a level</option>
                    {data &&
                        data.map((item) => (
                            <option value={item.id} key={item.id}>
                                {item.name}
                            </option>
                        ))}
                </select>
                <label htmlFor='quantity' className='mr-1'>
                    Quantity
                </label>
                <input
                    type='number' // Use number type for numeric input
                    id='quantity'
                    className='border-2 border-black mt-3'
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <br />
                <button
                    className='bg-green-800 w-14 h-10 mt-3 text-white rounded-lg'
                    type='button'
                    onClick={() => {
                        handlePost();
                        window.location.reload();
                    }}>
                    Create
                </button>
            </Drawer>
        </div>
    );
};

export default AssignmentLvlDrawer;
