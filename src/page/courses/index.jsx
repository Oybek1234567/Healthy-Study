import { Route, Routes, useNavigate } from "react-router-dom";
import Modules from "./module/module";
import useDrawer from "../../hooks/useDrawer";
import { useState } from "react";
import CoursesDrawer from "./drawer";

const NewCourses = () => {
    const { open, onOpen, onClose } = useDrawer();
    const [divContents, setDivContents] = useState([]);

    const handleCreate = (value) => {
        setDivContents([...divContents, value]);
        onClose();
    };

    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate("/modules");
    };

    return (
        <div className='flex gap-4 flex-wrap'>
            <h1 className="absolute text-4xl">Kurslar</h1>
            {divContents.map((content, index) => (
                <div
                    key={index}
                    className='flex cursor-pointer mt-20 justify-center items-center w-1/4 h-40 border-4 border-black'
                    onClick={handleNavigation}>
                    {content}
                </div>
            ))}
            <button
                className='absolute w-10 h-10 ml-[70%] bg-green-700 rounded-full text-white'
                type='button'
                onClick={onOpen}>
                +
            </button>
            <CoursesDrawer open={open} onClose={onClose} onCreate={handleCreate} />
        </div>
    );
};

const App = () => (
    <Routes>
        <Route path='/' element={<NewCourses />} />
        <Route path='/modules' element={<Modules />} />
    </Routes>
);

export default App;
