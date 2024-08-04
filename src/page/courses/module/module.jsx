import { useState } from "react";
import useDrawer from "../../../hooks/useDrawer";
import ModulesDrawer from "./drawer";

const Modules = () => {
    const { open, onOpen, onClose } = useDrawer();
    const [divContents, setDivContents] = useState([]);

    const handleCreate = (value) => {
        setDivContents([...divContents, value]);
        onClose();
    };

  return (
        <div>
            <div className='absolute flex flex-wrap gap-4 mt-8 p-4'>
                {divContents.map((content, index) => (
                    <div
                        key={index}
                        className='flex flex-col justify-center items-center w-[200px] h-[100px] p-4 border-[6px] border-black'>
                        {content}
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

export default Modules;
