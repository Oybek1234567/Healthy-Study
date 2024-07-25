import { Drawer } from "antd";

const UseDrawer = ({ open, onClosed }) => {
    return (
        <div>
            <Drawer open={open} onClose={onClosed}>
                <h1 style={{fontSize: "30px", fontWeight: "bold", marginBottom: "20px   "}}> Qo`shish</h1>
                <form action='#'>
                    <label htmlFor='name'>Ism familiya qo`shish</label>
                    <br />
                    <input
                        type='text'
                        id='name'
                        placeholder='Input your name...'
                        style={{border: "none", width: "100%", height: "30px", borderRadius: "5px", padding: "4px", border: "2px solid #000", marginTop: "10px", marginBottom: "20px"}}
                        required
                    />
                    <br />
                    <label htmlFor='age'>Yosh qo`shish</label>
                    <br />
                    <input
                        type='text'
                        id='age'
                        placeholder='Input your age...'
                        style={{border: "none", width: "100%", height: "30px", borderRadius: "5px", padding: "4px", border: "2px solid #000", marginTop: "10px", marginBottom: "20px"}}
                        required
                    />
                    <label htmlFor='phone'>
                        Telefon raqam qo`shish
                    </label>
                    <input
                        type='number'
                        id='phone'
                        placeholder='Input your phone...'
                        style={{border: "none", width: "100%", height: "30px", borderRadius: "5px", padding: "4px", border: "2px solid #000", marginTop: "10px", marginBottom: "20px"}}
                        pattern='w/{1, 17}'
                        required
                    />
                    <button
                        type='submit'
                        style={{border: "none", width: "70px", height: "30px", borderRadius: "5px", backgroundColor: "blue", color: "white", cursor: "pointer", marginLeft: "78%"}}
                        >
                        Yaratish
                    </button>
                    <button></button>
                </form>
            </Drawer>
        </div>
    );
};

export default UseDrawer;
