import { Form } from "antd";
import axios from "axios";
import { useState } from "react";
const App = () => {
    const [data, setData] = useState();

    console.log(data);
    const onFinish = (item) => {
        console.log(item);
        axios
            .post("http://localhost:3000/users/create", item)
            .then(function (response) {
                setData(response);
                console.log(response.data);
                
            })
            .catch(function (error) {
                console.log(error, "Xato bor")
            });
    };
    return (
        <>
            <Form onFinish={onFinish}>
                <label htmlFor='phone'>Phone</label>
                <input
                    type='number'
                    name='phone'
                    id='phone'
                    className='border-2 border-black'
                />{" "}
                <br />
                <label htmlFor='password'>Password</label>
                <input
                    type='password'
                    name='password'
                    id='password'
                    className='border-2 border-black'
                    autoComplete="additional-name"
                />
                <br />
                <label htmlFor='name'>Name</label>
                <input
                    type='text'
                    name='name'
                    id='name'
                    className='border-2 border-black'
                />
                <br />
                <label htmlFor='surname'>Surname</label>
                <input
                    type='text'
                    name='surname'
                    id='surname'
                    className='border-2 border-black'
                />
                <br />
                <label htmlFor='date'>Date of Birthday</label>
                <input type='date' name='dob' id='date' />
                <br />
                <label htmlFor='role'>Role</label>
                <select name='role' id='role' className='border-2 border-black'>
                    <option value='Super'>Super</option>
                    <option value='teacher'>O`qituvchi</option>
                    <option value='student'>Student</option>
                </select>
                <br />
                <button
                    type='submit'
                    onClick={onFinish}
                    className='w-14 h-10 rounded-sm bg-green-700 text-white mt-10'>
                    Submit
                </button>
            </Form>
        </>
    );
};
export default App;
