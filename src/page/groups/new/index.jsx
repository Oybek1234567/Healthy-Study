import "./style.css"
const New = () => {
    return (
        <>
            <div className='flex flex-col w-[400px] gap-2'>
                <span>
                    <label htmlFor='name' className=''>
                        Name
                    </label>
                    <input
                        type='text'
                        id='name'
                        className='border-neutral-900 border-2'
                    /><input type="checkbox"/>
                </span>
                <span>
                    <label htmlFor='course'>Course</label>
                    <select name='course' id='course'>
                        <option value='1'>Course 1</option>
                        <option value='2'>Course 2</option>
                        <option value='3'>Course 3</option>
                        <option value='4'>Course 4</option>
                        <option value='5'>Course 5</option>
                        <option value='6'>Course 6</option>
                        <option value='7'>Course 7</option>
                        <option value='8'>Course 8</option>
                    </select>
                </span>
                <span>
                    <label htmlFor='date'>Date</label>
                    <input type='date' id='date' />
                </span>
                <span>
                    <label htmlFor="when">When</label>
                    <input type="text" className="border-neutral-900 border-2"/>
                    <select name="course" id="when" className="ml-28"> 
                        <option value="1">Juft kunlar - 2:00</option>
                        <option value="2">Toq kunlar - 4:00</option>
                        <option value="3">Juft kunlar - 6:00</option>
                    </select>
                </span>
                <span>
                    <label htmlFor='teacher'>Teacher</label>
                    <select name='teacher' id='teacher'>
                        <option value='Otabek'>Otabek</option>
                        <option value='Doston'>Doston</option>
                        <option value='Maftuna'>Maftuna</option>
                    </select>
                </span>
                <span>
                    <label htmlFor='assistent'>Assistent</label>
                    <select name='assistent' id='assistent'>
                        <option value='Aziza'>Aziza</option>
                        <option value='Guloyim'>Guloyim</option>
                        <option value='Sardor'>Sardor</option>
                    </select>
                </span>
            </div>
            <button className='bg-green-500 p-3 mt-4 rounded-md text-white ml-20'>
                Create
            </button>
        </>
    );
};

export default New;
