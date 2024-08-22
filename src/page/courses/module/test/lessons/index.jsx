import { useEffect, useState } from "react";
import useDrawer from "../../../../../hooks/useDrawer";
import LessonsDrawer from "./drawer";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Dropdown, Space } from "antd";
import { items } from "./items";

const Lessons = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const req = await axios.get(`http://localhost:3000/lessons/all/${id}`);
                setData(req.data.lessons);
                console.log(req.data.lessons);
                
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
                          <td>{index + 1}</td>
                          <td>{item.name}</td>
                          <td>
                              <Dropdown trigger={["hover"]} menu={{ items }}>
                                  <a onClick={(e) => e.preventDefault()}>            
                              <Space>
                                  <p className="rotate-90 text-4xl cursor-pointer">...</p>                    
                            </Space>
                                  </a>
                              </Dropdown>
                          
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
  );
}

export default Lessons
