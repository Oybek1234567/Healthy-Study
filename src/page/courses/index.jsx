import { Route, Routes, useNavigate } from "react-router-dom";
import Modules from "./module/module";
import useDrawer from "../../hooks/useDrawer";
import SetDrawer from "./drawer";

const NewCourses = () => {
    const { open, onOpen, onClose } = useDrawer();

    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate("/modules");
    };

    return (
        <div className='flex gap-24 flex-wrap'>
            <h1 className='w-full text-4xl font-semibold mb-0'>Kurslar</h1>
            <div
                className='flex cursor-pointer justify-center items-center w-1/4 h-[15vh] border-4 border-black'
                onClick={handleNavigation}>
                <b className='text-lg font-semibold'>English</b>
            </div>
            <div
                className='flex cursor-pointer justify-center items-center w-1/4 h-[15vh] border-4 border-black'
                onClick={handleNavigation}>
                <b className='text-lg font-semibold'>Chemistry</b>
            </div>
            <div
                className='flex cursor-pointer justify-center items-center w-1/4 h-[15vh] border-4 border-black'
                onClick={handleNavigation}>
                <b className='text-lg font-semibold'>Math</b>
            </div>
            <div
                className='flex cursor-pointer justify-center items-center w-1/4 h-[15vh] border-4 border-black'
                onClick={handleNavigation}>
                <b className='text-lg font-semibold'>Other Subject</b>
            </div>
            <div
                className='flex cursor-pointer justify-center items-center w-1/4 h-[15vh] border-4 border-black'
                onClick={handleNavigation}>
                <b className='text-lg font-semibold'>More</b>
            </div>
            <div
                className='flex cursor-pointer justify-center items-center w-1/4 h-[15vh] border-4 border-black'
                onClick={handleNavigation}>
                <b className='text-lg font-semibold'>And More</b>
            </div>
            <button
                className='w-14 h-10 bg-green-700 ml-[1100px] rounded-full text-white translate-y-[-550px]'
                type='button'
                onClick={onOpen}>
                +
            </button>
            <SetDrawer open={open} onClosed={onClose} />
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
