import { useEffect, useState } from "react";
import useDrawer from "../../hooks/useDrawer";
import RoomsDrawer from "./drawer";
import axios from "axios";

const Rooms = () => {
    const { open, onOpen, onClose } = useDrawer();
    const [data, setData] = useState([]);
            const API = "http://localhost:3000";


    useEffect(() => {
        const fetchData = async () => {
            try {
                const req = await axios.get(`${API}/rooms/all`);
                setData(req.data.rooms);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='p-4'>
            <button
                onClick={onOpen}
                className='w-12 h-12 bg-green-600 text-white rounded-full border-2 border-black transition-all duration-300 ease-in-out hover:bg-green-700 hover:shadow-lg fixed bottom-10 right-9'>
                +
            </button>
            <RoomsDrawer open={open} onClose={onClose} />
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4'>
                {data.map((item) => (
                    <div
                        key={item.id}
                        className='flex flex-col cursor-pointer bg-white border-2 border-gray-300 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 p-4'>
                        <h2 className='text-xl font-semibold mb-2'>
                            Room Name: {item.name}
                        </h2>
                        <p className='text-gray-700'>
                            Max Students: {item.max_students}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Rooms;
