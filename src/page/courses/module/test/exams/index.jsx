import { useEffect, useState } from "react";
import useDrawer from "../../../../../hooks/useDrawer";
import ExamsDrawer from "./drawer";
import axios from "axios";

const Exams = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const req = await axios.get("http://localhost:3000/assignmenttypes/all");
                setData(req.data.users);
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
                Assignments
            </div>
        </div>
    );
};

export default Exams;
