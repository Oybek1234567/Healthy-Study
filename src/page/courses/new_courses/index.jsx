import { useState } from "react";

const NewCourses = () => {
    const [test, setTest] = useState([
        {
            id: 1,
            name: "",
            numberOfTests: "",
            weight: "",
            responsibility: "",
        },
    ]);
    const addTest = (e) => {
        e.preventDefault();
        const newTest = {
            id: test.length + 1,
            name: "",
            numberOfTests: "",
            weight: "",
            responsibility: "",
        };
        setTest([...test, newTest]);
    };
    const updateTestField = (id, field, value) => {
        setTest((prevTests) =>
            prevTests.map((test) =>
                test.id === id ? { ...test, [field]: value } : test
            )
        );
    };
    return (
        <div>
            <label htmlFor='course'>Course Name: </label>
            <input
                type='text'
                id='course'
                className='border-2 border-black pl-1'
            />
            <div className='flex flex-col justify-between w-[400px] mt-8 p-4 items-center border-[6px] border-black'>
                <form action='/' className=''>
                    <span>
                        <label htmlFor='module' className='w-40'>
                            Module 1 Name:{" "}
                        </label>
                        <input
                            type='text'
                            id='module'
                            name='module'
                            className='border-2 border-black'
                        />
                    </span>
                    <span className='flex mt-[3px]'>
                        <label htmlFor='max' className='w-1/2'>
                            Max № of Students
                        </label>
                        <input
                            type='text'
                            id='max'
                            name='max'
                            className='border-2 border-black'
                        />
                    </span>
                    <span>
                        <label
                            htmlFor='lesson'
                            className='w-1/3 mr-[70px] mt-4'>
                            № Lessons
                        </label>
                        <input
                            type='text'
                            id='lesson'
                            name='lesson'
                            className='border-2 border-black'
                        />
                    </span>
                    <p>Test 1</p>
                </form>

                <div
                    style={{
                        border: "2px solid black",
                        padding: "10px",
                        marginTop: "10px",
                    }}>
                    <label>Name:</label>
                    <input
                        type='text'
                        value={test[0].name}
                        onChange={(e) =>
                            updateTestField(1, "name", e.target.value)
                        }
                        className='border-2 border-black'
                    />
                    <label>Number of tests:</label>
                    <input
                        type='text'
                        value={test[0].numberOfTests}
                        onChange={(e) =>
                            updateTestField(1, "numberOfTests", e.target.value)
                        }
                        className='border-2 border-black'
                    />
                    <label>Weight:</label>
                    <input
                        type='text'
                        value={test[0].weight}
                        onChange={(e) =>
                            updateTestField(1, "weight", e.target.value)
                        }
                        className='border-2 border-black mt-3'
                    />
                    <label>Whose Responsibility:</label>
                    <input
                        type='text'
                        value={test[0].responsibility}
                        onChange={(e) =>
                            updateTestField(1, "responsibility", e.target.value)
                        }
                        className='border-2 border-black'
                    />
                </div>
                <button
                    className='w-10 h-10 bg-green-700 m-4 ml-auto text-white rounded-full'
                    onClick={addTest}
                    type='submit'>
                    +
                </button>
                {test.slice(1).map((test) => (
                    <>
                    
                    <div
                        key={test.id}
                        style={{
                            border: "2px solid black",
                            padding: "10px",
                            marginTop: "10px",
                        }}>
                        <label>Name:</label>
                        <input
                            type='text'
                            value={test.name}
                            onChange={(e) =>
                                updateTestField(test.id, "name", e.target.value)
                            }
                            className='border-2 border-black'
                        />
                        <label>Number of tests:</label>
                        <input
                            type='text'
                            value={test.numberOfTests}
                            onChange={(e) =>
                                updateTestField(
                                    test.id,
                                    "numberOfTests",
                                    e.target.value
                                )
                            }
                            className='border-2 border-black'
                        />
                        <label>Weight:</label>
                        <input
                            type='text'
                            value={test.weight}
                            onChange={(e) =>
                                updateTestField(
                                    test.id,
                                    "weight",
                                    e.target.value
                                )
                            }
                            className='border-2 border-black mt-3'
                        />
                        <label>Whose Responsibility:</label>
                        <input
                            type='text'
                            value={test.responsibility}
                            onChange={(e) =>
                                updateTestField(
                                    test.id,
                                    "responsibility",
                                    e.target.value
                                )
                            }
                            className='border-2 border-black'
                        />
                        
                    </div>
                    <button
                            className='w-10 h-10 ml-auto bg-green-700 m-4 text-white rounded-full'
                            onClick={addTest}
                            type='submit'>
                            +
                        </button>
                    </>
                ))}
            </div>
        </div>
    );
};
export default NewCourses;
