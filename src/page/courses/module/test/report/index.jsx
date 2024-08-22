import axios from "axios";
import { useEffect, useState } from "react";
import useDrawer from "../../../../../hooks/useDrawer";
import ReportsDrawer from "./drawer";
import { useParams } from "react-router-dom";

const Report = () => {
    const {id} = useParams()
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const req = await axios.get(`http://localhost:3000/lessonreporttypes/all/${id}`);
                setData(req.data.lesson_report_types);  
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
          <ReportsDrawer open={open} onClosed={onClose} />
          <div className='absolute flex gap-4 flex-wrap'>
              {data.map((item, index) => (
                  <div
                      key={index}
                      className='flex flex-row cursor-pointer mt-20 justify-center items-center w-[300px] h-40 border-4 border-black hover:text-black'>
                      {item.name}
                  </div>
              ))}
          </div>
      </div>
  );
}

export default Report
