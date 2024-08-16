import { useState } from "react";
import useDrawer from "../../../hooks/useDrawer";
import ModulesDrawer from "./drawer";
import { Route, Routes, useNavigate } from "react-router-dom";
import Tests from "./test";

const Modules = () => {
    const { open, onOpen, onClose } = useDrawer();
    const [divContents, setDivContents] = useState([]);

    const handleCreate = (name, weight, count) => {
        setDivContents([...divContents, { name, weight, count }]);
        onClose();
    };

    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate("/tests");
    }

  return (
      <div>
          <div className='absolute flex flex-wrap gap-4 mt-8 p-4'>
              {divContents.map((content, index) => (
                  <div
                      key={index}
                      className='flex flex-col justify-center items-center w-[300px] h-[100px] p-4 border-[6px] border-black cursor-pointer'
                      onClick={handleNavigate}>
                      <p>Module Name: {content.name}</p>
                      <p>Module Weight: {content.weight}</p>
                      <p>Module Count: {content.count}</p>
                  </div>
              ))}
          </div>
          <button
              className='ml-[93%] -translate-y-8 bg-black text-white rounded-md p-2 mt-8'
              type='button'
              onClick={onOpen}>
              Yaratish
          </button>
          <ModulesDrawer
              open={open}
              onClosed={onClose}
              onCreate={handleCreate}
          />
      </div>
  );
};
const App = () => (
    <Routes>
        <Route path='/' element={<Modules />} />
        <Route  path='/tests' element={<Tests />}/>
    </Routes>
)
export default App;