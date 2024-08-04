import { Drawer } from "antd";

const SetDrawer = ({ open, onClosed }) => {
    return (
        <div>
            <Drawer open={open} onClose={onClosed}>
                <h1 className='mb-4 text-2xl font-semibold'>Kurs Qo`shish</h1>
                <input type='text' className='border-2 border-black' />
                <br />
                <br />
                <button
                    className='bg-green-800 p-2 text-white ml-3 rounded-lg'
                    onClick={onClosed}>
                    Create
                </button>
            </Drawer>
        </div>
    );
};

export default SetDrawer;
