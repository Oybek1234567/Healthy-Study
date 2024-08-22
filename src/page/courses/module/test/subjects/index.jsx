import { useEffect, useState } from "react";
import useDrawer from "../../../../../hooks/useDrawer";
import SubjectsDrawer from "./drawer";
import axios from "axios";
import { useParams } from "react-router-dom";

const Subjects = () => {
    const { id } = useParams();
    const { open, onOpen, onClose } = useDrawer();
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const req = await axios.get(
                    `http://localhost:3000/subjects/all/${id}`
                );
                setData(req.data.units);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {" "}
            <button
                className='absolute w-14 h-14 -translate-y-[200px] ml-[94%] bg-green-700 rounded-full text-white'
                type='button'
                onClick={() => onOpen()}>
                +
            </button>
            <SubjectsDrawer open={open} onClosed={onClose} />
            <table>
                <thead>
                    <tr className='text-center'>
                        <th>ID</th>
                        <th>Name</th>
                        {/* <th>Surname</th>
                            <th>Date Of Birth</th>
                            <th>Phone</th>
                            <th>Role</th>
                            <th>Passport Series</th>
                            <th>Expiration Date</th> */}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index +1}</td>
                            <td>{item.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Subjects;