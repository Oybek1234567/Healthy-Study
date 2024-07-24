import { Drawer } from "antd";

const UseDrawer = ({ open, onClosed }) => {
    return (
        <div>
            <Drawer open={open} onClose={onClosed}>
                <h1 className='text-3xl mb-[20px]'> Qo`shish</h1>
                <form action='#'>
                    <label htmlFor='name'>Ism familiya qo`shish</label>
                    <br />
                    <input
                        type='text'
                        id='name'
                        placeholder='Input your name...'
                        className='w-full border-2 border-[#000] p-1 mt-4 mb-4'
                        required
                    />
                    <br />
                    <label htmlFor='age'>Yosh qo`shish</label>
                    <br />
                    <input
                        type='text'
                        id='age'
                        placeholder='Input your age...'
                        className='w-full border-2 border-[#000] p-1 mt-4 mb-4'
                        required
                    />
                    <label htmlFor='phone'>
                        Telefon raqam qo`shish
                    </label>
                    <input
                        type='number'
                        id='phone'
                        placeholder='Input your phone...'
                        className='w-full  border-2 border-[#000] p-1 mt-4'
                        pattern='w/{1, 17}'
                        required
                    />
                    <button
                        type='submit'
                        className='bg-[blue] text-[white] mt-10 ml-[80%] p-2 rounded-[8px] valid:bg-[green] invalid:bg-[red]'>
                        Yaratish
                    </button>
                    <button></button>
                </form>
            </Drawer>
        </div>
    );
};

export default UseDrawer;
