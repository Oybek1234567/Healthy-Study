import useDrawer from "../../../../../hooks/useDrawer";
import AssignmentByGroupDrawer from "./drawer";

const AssignmentByGroup = () => {
    const { open, onOpen, onClose } = useDrawer()
    const handleOpenDrawer = () => {
        onOpen()
    }
    return (
        <div>
            <button className='bg-green-800 w-[50px] h-[50px] mt-3 text-white text-xl ml-[93%] rounded-full' onClick={handleOpenDrawer}>
                +
            </button>
            <AssignmentByGroupDrawer open={open} onClose={onClose}/>
        </div>
    );
};

export default AssignmentByGroup;
