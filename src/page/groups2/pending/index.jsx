import { Modal } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const Pending = () => {
    const [data, setData] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [assistants, setAssistants] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [selectedTeachers, setSelectedTeachers] = useState("");
    const [selectedAssistants, setSelectedAssistants] = useState("");
    const [date, setDate] = useState("");
    const [selectedRooms, setSelectedRooms] = useState("");
    const [module, setModule] = useState();
    const [course, setCourse] = useState();
    const [value, setValue] = useState();
    const [openModal, setOpenModal] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [inputs, setInputs] = useState([{ date: "", number: "" }]);
    const API = "http://localhost:3000";

    const handleOpenModal = (students) => {
        setSelectedStudents(students);
        setOpenModal(true);
        setModule(students.module_id);
        setCourse(students.course_id);
    };

    const fetchData = async () => {
        try {
            const req = await axios.get(
                `${API}/moduleenrolementsbystudent/all`
            );
            setData(req.data.modules);
        } catch (e) {
            console.error(e);
        }
    };
    useEffect(() => {
        const handleGetTeachers = async () => {
            try {
                const req = await axios.get(`${API}/users/all/teachers`);
                setTeachers(req.data.teachers);
            } catch (e) {
                console.error(e);
            }
        };
        handleGetTeachers();
    }, [API]);

    useEffect(() => {
        const fetchAssistants = async () => {
            try {
                const req = await axios.get(`${API}/users/all/assistants`);
                setAssistants(req.data.assistants);
            } catch (e) {
                console.error(e);
            }
        };
        fetchAssistants();
    }, [API]);
    useEffect(() => {
        const handleGetRooms = async () => {
            try {
                const req = await axios.get(`${API}/rooms/all`);
                setRooms(req.data.rooms);
            } catch (e) {
                console.error(e);
            }
        };
        handleGetRooms();
    }, [API]);

    useEffect(() => {
        fetchData();
    }, []);

    const handleAdd = async () => {
        const data = {
            module_id: module,
            course_id: course,
        };
        try {
            await axios.post(
                `${API}/moduleenrolementsbystudent/createbyadmin/${value}`,
                data
            );
        } catch (e) {
            console.error(e);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(
                `${API}/moduleenrolementsbystudent/delete/${id}`
            );
        } catch (e) {
            console.error(e);
        }
    };
    const handleNextStep = () => {
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        } else {
            setOpenModal(false);
        }
    };

    const handleReturn = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        } else {
            setOpenModal(false);
        }
    };
    const handleAddInput = () => {
        setInputs([...inputs, { date: "", number: "" }]);
    };

    const handleInputChange = (index, field, value) => {
        const newInputs = [...inputs];
        newInputs[index][field] = value;
        setInputs(newInputs);
    };

    const handleDeleteInput = (index) => {
        const newInputs = inputs.filter((_, i) => i !== index);
        setInputs(newInputs);
    };

    const handleCreate = async () => {
         const formattedFields = inputs.map((input) => ({
             date: input.date,
             number: input.number,
         }));
        const data = {
            module_id: module,
            course_id: course,
            students: selectedStudents.students.map((item) => ({
                enrolement_id: item.id,
                user_id: item.user_id,
            })),
            teacher_id: selectedTeachers,
            assistant_id: selectedAssistants,
            starting_date: date,
            room_id: selectedRooms,
            schedule: formattedFields,
        };

        console.log(data);

        try {
            await axios.post(`${API}/groups/create`, data);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className='p-4'>
            <h1 className='text-xl font-bold mb-4'>Pending Enrollments</h1>
            <table className='table-auto border-collapse border border-gray-300 w-full text-left'>
                <thead>
                    <tr className='bg-gray-200'>
                        <th className='border border-gray-300 px-4 py-2'>ID</th>
                        <th className='border border-gray-300 px-4 py-2'>
                            Module Name
                        </th>
                        <th className='border border-gray-300 px-4 py-2'>
                            Students Applied
                        </th>
                        <th className='border border-gray-300 px-4 py-2'>
                            Course Name
                        </th>
                        <th className='border border-gray-300 px-4 py-2'>
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.length > 0 ? (
                        data.map((item, idx) => (
                            <tr
                                key={item.id}
                                className='cursor-pointer hover:bg-gray-100'>
                                <td className='border border-gray-300 px-4 py-2'>
                                    {idx + 1}
                                </td>
                                <td className='border border-gray-300 px-4 py-2'>
                                    {item.module_name}
                                </td>
                                <td className='border border-gray-300 px-4 py-2'>
                                    {item.total_students}/{item.max_students}
                                </td>
                                <td className='border border-gray-300 px-4 py-2'>
                                    {item.course_name}
                                </td>
                                <td className='border border-gray-300 px-4 py-2 text-center'>
                                    <button
                                        onClick={() => handleOpenModal(item)}
                                        className={`text-white font-bold py-2 px-3 rounded bg-${
                                            item.total_students >=
                                            item.max_students
                                                ? "[green]"
                                                : "[red]"
                                        }`}>
                                        Start
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan='5'
                                className='border border-gray-300 px-4 py-2 text-center'>
                                No data available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <Modal
                open={openModal}
                onCancel={() => setOpenModal(false)}
                footer={null}>
                <div className='overflow-x-auto'>
                    {currentStep === 1 && (
                        <div>
                            <div className='flex items-center'>
                                <input
                                    type='number'
                                    placeholder='Search by ID'
                                    className='border border-black rounded-md px-2 py-1 w-[78%]'
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                />
                                <button
                                    className='absolute right-0 mr-[40px] bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded'
                                    onClick={handleAdd}>
                                    Add
                                </button>
                            </div>
                            <p className='font-bold mt-2 text-[20px]'>
                                Student List
                            </p>
                            <table className='min-w-full table-auto'>
                                <thead>
                                    <tr className='bg-gray-100'>
                                        <th className='px-4 py-2 text-left'>
                                            №
                                        </th>
                                        <th className='px-4 py-2 text-left'>
                                            Name
                                        </th>
                                        <th className='px-4 py-2 text-left'>
                                            Surname
                                        </th>
                                        <th className='px-4 py-2 text-left'>
                                            ID
                                        </th>
                                        <th className='px-4 py-2 text-left'>
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedStudents.students &&
                                    selectedStudents.students.length > 0 ? (
                                        selectedStudents.students.map(
                                            (student, index) => (
                                                <tr
                                                    key={index}
                                                    className='border-t hover:bg-gray-50'>
                                                    <td className='px-4 py-2'>
                                                        {index + 1}
                                                    </td>
                                                    <td className='px-4 py-2'>
                                                        {student.name}
                                                    </td>
                                                    <td className='px-4 py-2'>
                                                        {student.surname}
                                                    </td>
                                                    <td className='px-4 py-2'>
                                                        {student.user_id}
                                                    </td>
                                                    <td className='px-4 py-2'>
                                                        <button
                                                            className='bg-red-500 py-2 px-3 text-white rounded-lg'
                                                            onClick={() =>
                                                                handleDelete(
                                                                    student.id
                                                                )
                                                            }>
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        )
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan='3'
                                                className='px-4 py-2 text-center'>
                                                No students available
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className='p-6 bg-white rounded-lg shadow-lg space-y-6'>
                            <h2 className='text-xl font-semibold text-gray-700'>
                                Step 2
                            </h2>
                            <div>
                                <label className='block text-sm font-medium text-gray-600 mb-2'>
                                    Teachers:
                                </label>
                                <select
                                    className='w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    value={selectedTeachers}
                                    onChange={(e) =>
                                        setSelectedTeachers(e.target.value)
                                    }>
                                    {teachers?.map((teacher) => (
                                        <option
                                            key={teacher.id}
                                            value={teacher.id}>
                                            {teacher.name} {teacher.surname}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-600 mb-2'>
                                    Assistants:
                                </label>
                                <select
                                    className='w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    value={selectedAssistants}
                                    onChange={(e) =>
                                        setSelectedAssistants(e.target.value)
                                    }>
                                    {assistants?.map((assistant) => (
                                        <option
                                            key={assistant.id}
                                            value={assistant.id}>
                                            {assistant.name} {assistant.surname}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-gray-600 mb-2'>
                                    Date:
                                </label>
                                <input
                                    type='date'
                                    className='w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </div>

                            {/* Rooms Dropdown */}
                            <div>
                                <label className='block text-sm font-medium text-gray-600 mb-2'>
                                    Rooms:
                                </label>
                                <select
                                    className='w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    value={selectedRooms}
                                    onChange={(e) =>
                                        setSelectedRooms(e.target.value)
                                    }>
                                    {rooms?.map((room) => (
                                        <option key={room.id} value={room.id}>
                                            {room.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}
                    {currentStep === 3 && (
                        <div className='space-y-4'>
                            <div className='flex justify-between items-center'>
                                <h3 className='text-2xl font-semibold text-gray-800'>
                                    Step 3
                                </h3>
                                <button
                                    className='bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full transition-all duration-300 ease-in-out'
                                    onClick={handleAddInput}>
                                    +
                                </button>
                            </div>
                            {inputs.map((input, index) => (
                                <div key={index} className='flex space-x-4'>
                                    <input
                                        type='date'
                                        className='border border-gray-300 px-3 py-2 rounded-md'
                                        value={input.date}
                                        onChange={(e) =>
                                            handleInputChange(
                                                index,
                                                "date",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <input
                                        type='number'
                                        className='border border-gray-300 px-3 py-2 rounded-md'
                                        value={input.number}
                                        onChange={(e) =>
                                            handleInputChange(
                                                index,
                                                "number",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <button
                                        className='text-red-500'
                                        onClick={() =>
                                            handleDeleteInput(index)
                                        }>
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className='flex flex-col items-center mt-6'>
                        <div className='flex space-x-2'>
                            {[1, 2, 3].map((step) => (
                                <div
                                    key={step}
                                    className={`w-4 h-4 rounded-full ${
                                        currentStep === step
                                            ? "bg-blue-500"
                                            : "bg-gray-300"
                                    }`}></div>
                            ))}
                        </div>
                        <div className='flex justify-between mt-4 w-full px-4'>
                            {currentStep > 1 ? (
                                <button
                                    className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'
                                    onClick={handleReturn}>
                                    Previous
                                </button>
                            ) : (
                                <div className='w-[100px]'></div>
                            )}

                            {currentStep < 3 ? (
                                <button
                                    className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'
                                    onClick={handleNextStep}>
                                    Next
                                </button>
                            ) : (
                                <button
                                    className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded'
                                    onClick={() => {
                                        handleCreate();
                                        setOpenModal(false);
                                    }}>
                                    Start
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Pending;
