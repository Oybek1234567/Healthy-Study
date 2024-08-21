import { useEffect, useState } from "react";
import useDrawer from "../../../../../hooks/useDrawer";
import LessonsDrawer from "./drawer";
import axios from "axios";

const Lessons = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const req = await axios.get("API");
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
          <button
              className='absolute w-14 h-14 -translate-y-[200px] ml-[94%] bg-green-700 rounded-full text-white'
              type='button'
              onClick={() => onOpen()}>
              +
          </button>
          <LessonsDrawer open={open} onClosed={onClose} />
          Lessons
      </div>
  );
}

export default Lessons
