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
    const courseId = location.state?.courseId;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const req = await axios.get(
                    `${API}/questionlevels/all/${courseId}`
                );
                setData(req.data.question_levels);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [courseId]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const req = await axios.get(`${API}/subjects/all/${moduleID}`);
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
            <Drawer open={open} onClose={onClose} width={400} className='p-6'>
                <h2 className='text-2xl font-bold mb-4 text-gray-800'>
                    Create Assignment Level
                </h2>
                <div className='mb-4'>
                    <label
                        htmlFor='subject'
                        className='block text-gray-700 font-medium mb-2'>
                        Subject
                    </label>
                    <select
                        id='subject'
                        className='w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
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
                </div>
                <div className='mb-4'>
                    <label
                        htmlFor='lvl'
                        className='block text-gray-700 font-medium mb-2'>
                        Level
                    </label>
                    <select
                        id='lvl'
                        className='w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
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
                </div>
                <div className='mb-4'>
                    <label
                        htmlFor='quantity'
                        className='block text-gray-700 font-medium mb-2'>
                        Quantity
                    </label>
                    <input
                        type='number'
                        id='quantity'
                        className='w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </div>
                <button
                    className='bg-green-700 text-white w-full py-2 rounded-lg hover:bg-green-800 transition'
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
