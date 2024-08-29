import { useEffect, useState } from "react";
import useDrawer from "../../../hooks/useDrawer";
import ExcistingDrawer from "./drawer";
import axios from "axios";
import { Dropdown, Modal, Space, Input, Button } from "antd";

const Excisting = () => {
    const { open, onOpen, onClose } = useDrawer();
    const [data, setData] = useState([]);
    const [newData, setNewData] = useState([]);
    const [newStudent, setNewStudent] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [openNewModal, setOpenNewModal] = useState(false);
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

    // Fetch new data when selectedItem changes
    useEffect(() => {
        if (selectedItem) {
            const fetchNewData = async () => {
                setLoading(true);
                try {
                    const req = await axios.get(
                        `http://localhost:3000/groupenrolementsbystudent/all/${selectedItem.id}`
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

    const handleNewSave = async () => {
        const newDataPayload = {
            user_id: newStudent,
            group_enrolement_id: selectedItem.id,
        };

        try {
            const req = await axios.post(
                "http://localhost:3000/groupenrolementsbystudent/create",
                newDataPayload
            );
            setNewData((prev) => [
                ...prev,
                req.data.group_enrolement_by_student,
            ]);
            setOpenNewModal(false);
            setNewStudent("");
            alert("Student added successfully");
        } catch (error) {
            console.error("Error saving new student:", error);
            alert("Failed to add student");
        }
    };

    // Open modal for editing
    const handleOpenModal = (item) => {
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
                `http://localhost:3000/groupenrolements/edit/${selectedItem.id}`,
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
                `http://localhost:3000/groupenrolementsbystudent/delete/${studentId}`
            );
            setNewData((prev) => prev.filter((student) => student.id !== studentId));
            alert("Student successfully deleted");
        } catch (error) {
            console.error("Error deleting student:", error);
            alert("Failed to delete student");
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

    return (
        <div>
            <button
                className='absolute w-10 h-10 ml-[65%] bg-green-700 rounded-full text-white'
                type='button'
                onClick={onOpen}>
                +
            </button>
            <ExcistingDrawer open={open} onClosed={onClose} />
            <table className='table-auto border-collapse border border-gray-300 w-full translate-y-14'>
                <thead>
                    <tr className='bg-gray-100'>
                        <th>ID</th>
                        <th className='border border-gray-300 px-4 py-2'>
                            Group Name
                        </th>
                        <th>Students</th>
                        <th className='border border-gray-300 px-4 py-2'>
                            Modules
                        </th>
                        <th className='border border-gray-300 px-4 py-2'>
                            Teacher ID
                        </th>
                        <th className='border border-gray-300 px-4 py-2'>
                            Assistant ID
                        </th>
                        <th className='border border-gray-300 px-4 py-2'>
                            Starting Date
                        </th>
                        <th className='border border-gray-300 px-4 py-2'>
                            Days
                        </th>
                        <th className='border border-gray-300 px-4 py-2'>
                            Time
                        </th>
                        <th className='border border-gray-300 px-4 py-2'>
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td className='border border-gray-300 px-4 py-2'>
                                {item.name}
                            </td>
                            <td className='border border-gray-300 px-4 py-2'>
                                {newData.length > 0 ? (
                                    newData.map((student, index) => (
                                        <p key={`${student.user_id}-${index}`}>
                                            {student.user_id}
                                        </p>
                                    ))
                                ) : (
                                    <p>No students available</p>
                                )}
                                <button
                                    className='ml-4'
                                    onClick={() => {
                                        setSelectedItem(item);
                                        setOpenNewModal(true);
                                    }}>
                                    ✏
                                </button>
                            </td>
                            <td className='border border-gray-300 px-4 py-2'>
                                {item.module_id}
                            </td>
                            <td className='border border-gray-300 px-4 py-2'>
                                {item.teacher_id}
                            </td>
                            <td className='border border-gray-300 px-4 py-2'>
                                {item.assistant_id}
                            </td>
                            <td className='border border-gray-300 px-4 py-2'>
                                {item.starting_date
                                    ? item.starting_date.slice(0, 10)
                                    : null}
                            </td>
                            <td className='border border-gray-300 px-4 py-2'>
                                {item.days}
                            </td>
                            <td className='border border-gray-300 px-4 py-2'>
                                {item.time}
                            </td>
                            <td className='border border-gray-300 px-4 py-2'>
                                <Dropdown
                                    menu={{ items: menuItems(item) }}
                                    trigger={["click"]}>
                                    <a onClick={(e) => e.preventDefault()}>
                                        <Space>
                                            <p className='rotate-90 text-4xl cursor-pointer'>
                                                ...
                                            </p>
                                        </Space>
                                    </a>
                                </Dropdown>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal
                open={openNewModal}
                onCancel={() => setOpenNewModal(false)}
                footer={null}>
                <Input
                    type='text'
                    placeholder='Type here'
                    className='w-[80%] border-2 border-black'
                    value={newStudent}
                    onChange={(e) => setNewStudent(e.target.value)}
                />
                <Button type='primary' onClick={handleNewSave} className="ml-5 mb-5">
                    Save
                </Button>
                <div>
                    <h3>Students</h3>
                    {newData.length > 0 ? (
                        newData.map((student) => (
                            <div
                                key={student.id}
                                className='flex justify-between items-center mb-2'>
                                <span>{student.user_id}</span>
                                <Button
                                    type='danger'
                                    onClick={() =>
                                        handleDeleteStudent(student.id)
                                    }
                                    className='ml-2'>
                                    Delete
                                </Button>
                            </div>
                        ))
                    ) : (
                        <p>No students available</p>
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
                        <label htmlFor='module'>Module</label>
                        <Input
                            value={selectedItem.module_id}
                            onChange={(e) =>
                                handleEditChange("module_id", e.target.value)
                            }
                            className='mb-2'
                        />
                        <label>Teacher</label>
                        <Input
                            value={selectedItem.teacher_id}
                            onChange={(e) =>
                                handleEditChange("teacher_id", e.target.value)
                            }
                            className='mb-2'
                        />
                        <label>Assistant ID:</label>
                        <Input
                            value={selectedItem.assistant_id}
                            onChange={(e) =>
                                handleEditChange("assistant_id", e.target.value)
                            }
                            className='mb-2'
                        />
                        <label htmlFor='room'>Room</label>
                        <Input
                            value={selectedItem.room_id}
                            onChange={(e) =>
                                handleEditChange("room_id", e.target.value)
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

export default Excisting;
