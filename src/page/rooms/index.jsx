import { useEffect, useState } from "react";
import useDrawer from "../../hooks/useDrawer"
import RoomsDrawer from "./drawer"
import axios from "axios";

const Rooms = () => {
  const { open, onOpen, onClose } = useDrawer()
  const [data, setData] = useState([]);
  useEffect(() => {
      const fetchData = async () => {
          try {
              const req = await axios.get("http://localhost:3000/rooms/all");
              setData(req.data.rooms);
          } catch (error) {
              console.error(error);
          }
      };

      fetchData();
  }, []);

  return (
      <div>
          <button
              onClick={onOpen}
              className='w-10 h-10 bg-[green] text-white rounded-full border-2 border-black ml-[90%]'>
              +
          </button>
          <RoomsDrawer open={open} onClose={onClose} />
          <div className='absolute flex gap-4 flex-wrap'>
              {data.map((item) => (
                  <div
                      key={item.id}
                      className='flex flex-col cursor-pointer mt-10 justify-center items-center w-[300px] h-40 border-4 border-black hover:text-black text-3xl'>
                      <p>Name: {item.name}</p>
                      <p>Max students:{item.max_students}</p>
                  </div>
              ))}
          </div>
      </div>
  );
}

export default Rooms
