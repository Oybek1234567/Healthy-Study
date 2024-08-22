import { useEffect, useState } from "react";
import useDrawer from "../../../../../hooks/useDrawer";
import ExamsDrawer from "./drawer";
import axios from "axios";
import { useParams } from "react-router-dom";

const Exams = () => {
    const {id} = useParams()
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const req = await axios.get(`http://localhost:3000/assignmenttypes/all/${id}`);
                setData(req.data.assignments);
                console.log(req.data.assignments);
                
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const { open, onOpen, onClose } = useDrawer();
    return (
        <div>
            <div>
                {" "}
                <button
                    className='absolute w-14 h-14  -translate-y-[200px] ml-[94%] bg-green-700 rounded-full text-white'
                    type='button'
                    onClick={() => onOpen()}>
                    +
                </button>
                <ExamsDrawer open={open} onClosed={onClose} />
                <div className='absolute flex gap-4 flex-wrap'>
                    {data.map((item) => (
                        <div
                            key={item.id}
                            className='flex flex-col text-2xl cursor-pointer mt-10 justify-center items-center w-[300px] h-40 border-4 border-black hover:text-black'>
                            <p>Exam name: {item.name}</p>
                            <p>Exam weight: {item.weight}</p>
                            <p>Tests total: {item.tests_total}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Exams;
