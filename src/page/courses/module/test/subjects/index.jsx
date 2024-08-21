import useDrawer from "../../../../../hooks/useDrawer";
import SubjectsDrawer from "./drawer";

const Subjects = () => {
    const { open, onOpen, onClose } = useDrawer();
    return (
        <div>
            {" "}
            <button
                className='absolute w-14 h-14 -translate-y-[200px] ml-[94%] bg-green-700 rounded-full text-white'
                type='button'
                onClick={() => onOpen()}>
                +
            </button>
            <SubjectsDrawer open={open} onClosed={onClose} />
            Subjects
        </div>
    );
};

export default Subjects;
