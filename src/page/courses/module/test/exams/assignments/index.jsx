import axios from "axios";
import { useEffect, useState } from "react";
import {  Link, useLocation, useParams } from "react-router-dom";
import useDrawer from "../../../../../../hooks/useDrawer";
import AssignmentsDrawer from "./drawer";
import { Dropdown, Space, Modal, Button } from "antd";

const AssignmentTypes = () => {
    const [data, setData] = useState([]);
    const [newName, setNewName] = useState("");
    const [editItem, setEditItem] = useState(null);
    const { open, onOpen, onClose } = useDrawer();
    const { assignmentID, moduleID } = useParams();
    const location = useLocation();
    const moduleName = location.state?.moduleName;
    const courseName = location.state?.courseName;
    const examName = location.state?.name;

    useEffect(() => {
        console.log(assignmentID, moduleID);

        const fetchData = async () => {
            try {
                const req = await axios.get(
                    `http://localhost:3000/assignments/all/${assignmentID}`
                );
                setData(req.data.assignments);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [assignmentID]);

    const handleSave = async () => {
        try {
            await axios.post(
                `http://localhost:3000/assignments/edit/${editItem.id}`,
                { name: newName },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const updatedData = data.map((item) =>
                item.id === editItem.id ? { ...item, name: newName } : item
            );

            setData(updatedData);
            setEditItem(null);
            setNewName("");
            alert("Subject successfully updated");
        } catch (error) {
            console.error(error);
            alert("Failed to update subject");
        }
    };

    const handleEdit = (item) => {
        setEditItem(item);
        setNewName(item.name);
    };

    const handleDelete = async (item) => {
        try {
            await axios.post(
                `http://localhost:3000/assignments/delete/${item.id}`
            );
            const updatedData = data.filter((i) => i.id !== item.id);
            setData(updatedData);
            alert("Subject successfully deleted");
        } catch (error) {
            console.error(error);
            alert("Failed to delete subject");
        }
    };

    const menuItems = (item) => [
        {
            key: "1",
            label: <p>Edit</p>,
            onClick: () => handleEdit(item),
        },
        {
            key: "2",
            label: <p>Delete</p>,
            onClick: () => handleDelete(item),
        },
    ];

    return (
        <div>
            <h1 className='flex text-4xl'>
                <p onClick={() => window.history.go(-3)}>Kurslar /</p>
                <p onClick={() => window.history.go(-2)}>
                    {courseName.charAt(0).toUpperCase() +
                        courseName.slice(1).toLowerCase()}{" "}
                    /
                </p>
                <p onClick={() => window.history.go(-1)}>
                    {moduleName.charAt(0).toUpperCase() +
                        moduleName.slice(1).toLowerCase()}{" "}
                    /
                </p>
                <p onClick={() => window.history.back()}>
                    {examName.charAt(0).toUpperCase() +
                        examName.slice(1).toLowerCase()}
                </p>
            </h1>
            <button
                onClick={onOpen}
                className='bg-green-700 w-10 h-10 text-xl ml-[95%] rounded-full mb-10 text-white text-xl'>
                +
            </button>
            <AssignmentsDrawer
                open={open}
                onClosed={onClose}
                onCreate={() => {}}
            />
            <table>
                <thead>
                    <tr className='text-center'>
                        <th>№</th>
                        <th>Name</th>
                        <th>Weight</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data &&
                        data.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>
                                    <Link
                                        to={`/modules/${moduleID}/types/${assignmentID}/assignments/${item.id}`}
                                        state={{ moduleID, typeId: item.id }}>
                                        {item.name}
                                    </Link>
                                </td>
                                <td>
                                    {item.weight
                                        ? String(item.weight).slice(0, 4)
                                        : ""}
                                </td>
                                <td>
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
                open={editItem !== null}
                onCancel={() => setEditItem(null)}
                footer={[
                    <Button key='cancel' onClick={() => setEditItem(null)}>
                        Cancel
                    </Button>,
                    <Button key='save' type='primary' onClick={handleSave}>
                        Save Changes
                    </Button>,
                ]}>
                <h2>Edit Assignment</h2>
                <div className='flex flex-col gap-2'>
                    <input
                        type='text'
                        className='border-2 border-black w-full'
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder='Assignment Name'
                    />
                </div>
            </Modal>
        </div>
    );
};

export default AssignmentTypes;
