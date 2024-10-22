import { useEffect, useState } from "react";
import useDrawer from "../../../hooks/useDrawer";
import ExcistingDrawer from "./drawer";
import axios from "axios";
import { Dropdown, Modal, Input, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const Pending = () => {
    const { open, onOpen, onClose } = useDrawer();
    const [data, setData] = useState([]);
    const [newData, setNewData] = useState([]);
    const [newStudent, setNewStudent] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [openNewModal, setOpenNewModal] = useState(false);
    const [daysModal, setDaysModal] = useState(false);
    const [days, setDays] = useState([]);
    const [allDays, setAllDays] = useState([]);
    const [newDay, setNewDay] = useState("");
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch initial data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const req = await axios.get(
                    "http://localhost:3000/groupenrolements/all"
                );
                setData(req.data.group_enrolements || []);
            } catch (error) {
                console.error("Initial data fetch error:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (selectedItem) {
            const fetchNewData = async () => {
                setLoading(true);
                try {
                    const req = await axios.get(
                        `${API}/groupenrolementsbystudent/all/${selectedItem.id}`
                    );
                    setNewData(req.data.group_enrolement_by_student || []);
                } catch (error) {
                    console.error("New data fetch error:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchNewData();
        }
    }, [selectedItem]);

    useEffect(() => {
        const handleGetDays = async () => {
            const id = data.length > 0 ? data[0].id : null;

            if (id) {
                try {
                    const res = await axios.get(
                        `${API}/groupenrolementdays/all/${id}`
                    );
                    setDays(res.data.Group_enrolement_days || []);
                } catch (error) {
                    console.error("Error fetching group days:", error);
                }
            } else {
                console.warn("No valid ID found in data");
            }
        };

        handleGetDays();
    }, [data]);

    useEffect(() => {
        const getGroups = async () => {
            try {
                const res = await axios.get(`${API}/days/all`);
                setAllDays(res.data.days);
            } catch (err) {
                console.error("Error fetching groups", err);
            }
        };
        getGroups();
    }, []);

    const handlePost = async (index) => {
        const {
            name,
            course_id,
            module_id,
            teacher_id,
            assistant_id,
            starting_date,
            time,
            room_id,
        } = data[index];
        const daysArray = Array.isArray(days)
            ? days.map((item) => ({ id: item.day_id }))
            : [];

        const payload = {
            name,
            course_id: course_id || null,
            module_id: module_id || null,
            teacher_id: teacher_id || null,
            assistant_id: assistant_id || null,
            starting_date,
            days: daysArray,

            time,
            room_id: room_id || null,
            students: Array.isArray(newData)
                ? newData.map((student) => ({ id: student.student_id }))
                : [],
        };

        console.log("Attempting to create group with payload:", payload);

        try {
            const res = await axios.post(
                "http://localhost:3000/groups/create",
                payload
            );
            console.log("Server response:", res.data);
            setGroups((prevGroups) => [...prevGroups, res.data.newGroup]);
            alert("Group and students created successfully");
        } catch (err) {
            console.error("Error creating group and students:", err);
            alert("Failed to create group");
        }
    };

const handleNewSave = async () => {
    const newDataPayload = {
        user_id: +newStudent, 
        group_enrolement_id: selectedItem.id,  
    };
    try {
        const req = await axios.post(
            "http://localhost:3000/groupenrolementsbystudent/create",
            newDataPayload
        );
        console.log("New student added:", req.data.group_enrolement_by_student);
        setNewData((prev) => [...prev, req.data.group_enrolement_by_student]);
        setNewStudent(""); 
        alert("Student added successfully");
        // window.location.reload(); // Sahifani qayta yuklash
    } catch (error) {
        console.error("Error saving new student:", error);
        alert("Failed to add student");
    }
};


    const handleNewDay = async () => {
        const groupEnrolementId = data[0].id;
        const newDayPayload = {
            group_enrolement_id: groupEnrolementId,
            day_id: +newDay,
        };

        console.log("New day payload:", newDayPayload);

        try {
            const res = await axios.post(
                `${API}/groupenrolementdays/create`,
                newDayPayload
            );
            console.log("New day added:", res.data);
            setNewDay("");
            alert("Day added successfully");
        } catch (error) {
            console.error("Error saving new day:", error);
            alert("Failed to add day");
        }
    };

    // Open modal for editing
    const handleOpenModal = (item) => {
        if (!item || !item.id) {
            alert("Iltimos, biror narsani tanlang.");
            return;
        }
        setSelectedItem(item);
        setOpenModal(true);
    };

    // Close modal
    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedItem(null);
    };

    // Save changes to the selected item
    const handleSave = async () => {
        try {
            await axios.post(
                `${API}/groupenrolements/edit/${selectedItem.id}`,
                selectedItem
            );
            const updatedData = data.map((item) =>
                item.id === selectedItem.id ? selectedItem : item
            );
            setData(updatedData);
            handleCloseModal();
        } catch (error) {
            console.error("Error saving changes:", error);
        }
    };

    // Update `selectedItem` fields
    const handleEditChange = (field, value) => {
        if (value === null || value === undefined) return;
        setSelectedItem({
            ...selectedItem,
            [field]: value,
        });
    };

    // Delete an item
    const handleDelete = async (item) => {
        try {
            await axios.post(
                `http://localhost:3000/groupenrolements/delete/${item.id}`
            );
            const updatedData = data.filter(
                (dataItem) => dataItem.id !== item.id
            );
            setData(updatedData);
            alert("Group successfully deleted");
        } catch (error) {
            console.error(`Error deleting item with ID: ${item.id}`, error);
        }
    };

    // Delete a student
    const handleDeleteStudent = async (studentId) => {
        try {
            await axios.post(
                `${API}/groupenrolementsbystudent/delete/${studentId}`
            );
            setNewData((prev) =>
                prev.filter((student) => student.id !== studentId)
            );
            alert("Student successfully deleted");
        } catch (error) {
            console.error("Error deleting student:", error);
            alert("Failed to delete student");
        }
    };
    const handleDeleteDays = async (id) => {
        try {
            await axios.post(
                `http://localhost:3000/groupenrolementdays/delete/${id}`
            );
            setDays((prev) => prev.filter((day) => day.id !== id));
            alert("Day successfully deleted");
        } catch (error) {
            console.error("Error deleting day:", error);
            alert("Failed to delete day");
        }
    };

    // Dropdown menu items for actions
    const menuItems = (item) => [
        {
            key: "edit",
            label: "Edit",
            onClick: () => handleOpenModal(item),
        },
        {
            key: "delete",
            label: "Delete",
            onClick: () => handleDelete(item),
        },
    ];
    console.log(data.map((item) => item.id));

    return (
        <div className='overflow-x-scroll w-full max-w-[100%]'>
            <button
                className='w-10 h-10 ml-[95%] bg-green-700 rounded-full text-white'
                type='button'
                onClick={onOpen}>
                +
            </button>
            <ExcistingDrawer open={open} onClosed={onClose} />
            <table className='table-auto w-full mt-10 shadow-md rounded overflow-hidden'>
                <thead>
                    <tr className='bg-gray-200 text-gray-700'>
                        <th className='p-4 text-left'>Students</th>
                        <th className='p-4 text-left'>Courses</th>
                        <th className='p-4 text-left'>Modules</th>
                        <th className='p-4 text-left'>Teacher</th>
                        <th className='p-4 text-left'>Assistant</th>
                        <th className='p-4 text-left'>Starting Date</th>
                        <th className='p-4 text-left'>Days</th>
                        <th className='p-4 text-left'>Time</th>
                        <th className='p-4 text-left'>Room</th>
                        <th className='p-4 text-center'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id} className='bg-white border-b'>
                            <td className='p-4'>
                                <div className='flex items-center'>
                                    <button
                                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                                        onClick={() => {
                                            setSelectedItem(item);
                                            setOpenNewModal(true);
                                        }}>
                                        Click
                                    </button>
                                </div>
                            </td>
                            <td className='p-4'>{item.course_name}</td>
                            <td className='p-4'>{item.module_name}</td>
                            <td className='p-4'>{item.teacher_name}</td>
                            <td className='p-4'>{item.assistant_name}</td>
                            <td className='p-4'>
                                {item.starting_date
                                    ? item.starting_date.slice(0, 10)
                                    : null}
                            </td>
                            <td className='p-4'>
                                <button
                                    className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
                                    onClick={() => setDaysModal(true)}>
                                    Click
                                </button>
                            </td>
                            <td className='p-4'>{item.time}</td>
                            <td className='p-4'>{item.room_name}</td>
                            <td className='flex items-center h-32'>
                                <Dropdown
                                    menu={{ items: menuItems(item) }}
                                    trigger={["click"]}>
                                    <a
                                        onClick={(e) => e.preventDefault()}
                                        className='rotate-90'>
                                        ...
                                    </a>
                                </Dropdown>
                                <button
                                    onClick={() => {
                                        if (!item) {
                                            alert(
                                                "Please select an item before proceeding."
                                            );
                                            return;
                                        }
                                        setSelectedItem(item);
                                        handlePost(data.indexOf(item));
                                    }}
                                    className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>
                                    Start
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal
                open={openNewModal}
                onCancel={() => setOpenNewModal(false)}
                footer={
                    <button
                        onClick={() => window.location.reload()}
                        className='ml-10 mt-10 w-12 h-10 bg-green-600 rounded-lg text-white'>
                        OK
                    </button>
                }>
                <Input
                    type='text'
                    placeholder='Type here'
                    className='w-[80%] border-2 border-black'
                    value={newStudent}
                    onChange={(e) => setNewStudent(e.target.value)}
                />
                <Button
                    type='primary'
                    onClick={handleNewSave}
                    className='ml-5 mb-5'>
                    Save
                </Button>
                <div>
                    {newData.length > 0 ? (
                        newData.map((student) =>
                            student ? (
                                <div
                                    key={student.id}
                                    className='flex justify-between items-center mb-2'>
                                    <span>
                                        {student.student_name ||
                                            "No name available"}
                                    </span>
                                    <Button
                                        type='danger'
                                        onClick={() =>
                                            handleDeleteStudent(student.id)
                                        }
                                        className='ml-2'>
                                        Delete
                                    </Button>
                                </div>
                            ) : null
                        )
                    ) : (
                        <p>No students available</p>
                    )}
                </div>
            </Modal>
            <Modal open={daysModal} onCancel={() => setDaysModal(false)}>
                <div>
                    {days.length > 0 ? (
                        <>
                            <select
                                className='w-[70%]'
                                name='days'
                                id='days'
                                value={newDay}
                                onChange={(e) => setNewDay(e.target.value)}>
                                <option value='select' className=''>
                                    Select day
                                </option>
                                {allDays.map((day) => (
                                    <option key={day.id} value={day.id}>
                                        {day.name}
                                    </option>
                                ))}
                            </select>
                            <button
                                onClick={handleNewDay}
                                type='button'
                                className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4'>
                                Add
                            </button>
                            <table className='min-w-full mt-6 bg-white shadow-md rounded-lg overflow-hidden'>
                                <thead>
                                    <tr className='bg-gray-200 text-gray-700 text-center text-lg'>
                                        <th className='px-6 py-4 border-b-2 border-gray-300'>
                                            Day Name
                                        </th>
                                        <th className='px-6 py-4 border-b-2 border-gray-300'>
                                            Actions
                                        </th>
                                    </tr>
                                </thead>



                                
                                <tbody>
                                    {days.map((day, index) => (
                                        <tr
                                            key={index}
                                            className='text-gray-700 text-center hover:bg-gray-50 transition duration-300'>
                                            <td className='px-6 py-4 border-b border-gray-300'>
                                                {day.day_name}
                                            </td>
                                            <td className='px-6 py-4 border-b border-gray-300'>
                                                <button
                                                    onClick={() =>
                                                        handleDeleteDays(day.id)
                                                    }
                                                    className='bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-200'>
                                                    <DeleteOutlined />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    ) : (
                        <p>No days assigned</p>
                    )}
                </div>
            </Modal>

            <Modal open={openModal} onCancel={handleCloseModal} footer={null}>
                {selectedItem && (
                    <div>
                        <h2>Edit Group Enrollment</h2>
                        <br />
                        <br />
                        <label>Group Name:</label>
                        <Input
                            value={selectedItem.name}
                            onChange={(e) =>
                                handleEditChange("name", e.target.value)
                            }
                            className='mb-2'
                        />
                        <label htmlFor='course'>Course</label>
                        <Input
                            value={selectedItem.course_name}
                            onChange={(e) =>
                                handleEditChange("course_name", e.target.value)
                            }
                        />
                        <label htmlFor='module'>Module</label>
                        <Input
                            value={selectedItem.module_name}
                            onChange={(e) =>
                                handleEditChange("module_name", e.target.value)
                            }
                            className='mb-2'
                        />
                        <label>Teacher</label>
                        <Input
                            value={selectedItem.teacher_name}
                            onChange={(e) =>
                                handleEditChange("teacher_name", e.target.value)
                            }
                            className='mb-2'
                        />
                        <label>Assistant</label>
                        <Input
                            value={selectedItem.assistant_name}
                            onChange={(e) =>
                                handleEditChange(
                                    "assistant_name",
                                    e.target.value
                                )
                            }
                            className='mb-2'
                        />
                        <label htmlFor='room'>Room</label>
                        <Input
                            value={selectedItem.room_name}
                            onChange={(e) =>
                                handleEditChange("room_name", e.target.value)
                            }
                            className='mb-2'
                        />
                        <label>Starting Date:</label>
                        <Input
                            value={
                                selectedItem.starting_date
                                    ? selectedItem.starting_date.slice(0, 10)
                                    : ""
                            }
                            onChange={(e) =>
                                handleEditChange(
                                    "starting_date",
                                    e.target.value
                                )
                            }
                            className='mb-2'
                        />
                        <label>Days:</label>
                        <Input
                            value={selectedItem.days}
                            onChange={(e) =>
                                handleEditChange("days", e.target.value)
                            }
                            className='mb-2'
                        />
                        <label>Time:</label>
                        <Input
                            value={selectedItem.time}
                            onChange={(e) =>
                                handleEditChange("time", e.target.value)
                            }
                            className='mb-2'
                        />

                        <div className='flex justify-end mt-4'>
                            <Button onClick={handleCloseModal} className='mr-2'>
                                Cancel
                            </Button>
                            <Button type='primary' onClick={handleSave}>
                                Save Changes
                            </Button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Pending;
