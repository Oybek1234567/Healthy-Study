import { useEffect, useState } from "react";
import { Link, Route, Routes, useLocation, useParams } from "react-router-dom";
import useDrawer from "../../../../hooks/useDrawer";
import ModulesDrawer from "./drawer";
import Tests from "../test";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Modal from "react-bootstrap/Modal";

const Modules = () => {
    const [modules, setModules] = useState([]);
    const { open, onOpen, onClose } = useDrawer();
    const [data, setData] = useState([]);
    const [editModule, setEditModule] = useState(null);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [newName, setNewName] = useState("");
    const [newStudent, setNewStudent] = useState("");
    const [newLength, setNewLength] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const { id } = useParams();
    const location = useLocation();
    const courseName = location.state?.name;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const req = await axios.get(
                    `http://localhost:3000/modules/all/${id}`
                );
                setData(req.data.modules);
                setModules(req.data.modules);
                setFilteredCourses(req.data.modules);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);

    const handleSave = async () => {
        try {
            alert("Kurs muvaffaqiyatli yangilandi");
            setShowEditModal(false);
            window.location.reload();
            await axios.post(
                `http://localhost:3000/modules/edit/${editModule.id}`,
                { name: newName, max_students: newStudent, length: newLength },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            setModules((prev) =>
                prev.map((c) =>
                    c.id === editModule.id
                        ? {
                              ...c,
                              name: newName,
                              max_students: newStudent,
                              length: newLength,
                          }
                        : c
                )
            );
            setFilteredCourses((prev) =>
                prev.map((c) =>
                    c.id === editModule.id
                        ? {
                              ...c,
                              name: newName,
                              max_students: newStudent,
                              length: newLength,
                          }
                        : c
                )
            );
        } catch (error) {
            console.error(error);
            alert("Failed");
        }
    };

    const handleEdit = (module) => {
        setEditModule(module);
        setNewName(module.name);
        setNewStudent(module.max_students);
        setNewLength(module.length);
        setShowEditModal(true);
    };

    const handleDelete = async (module) => {
        try {
            alert("Kurs o'chirildi");
            window.location.reload();
            await axios.post(
                `http://localhost:3000/modules/delete/${module.id}`
            );
            const updatedCourses = module.filter((c) => c.id !== module.id);
            setModules(updatedCourses);
            setFilteredCourses(updatedCourses);
        } catch (error) {
            console.error(error);
        }
    };

    const handleStatusChange = (status) => {
        setSelectedStatus(status);
        if (status === "all") {
            setFilteredCourses(modules);
        } else {
            setFilteredCourses(
                modules.filter((course) => course.status === status)
            );
        }
    };

    const handleCreate = (newModule) => {
        const updatedCourses = [...filteredCourses, newModule];
        setFilteredCourses(updatedCourses);
        setModules(updatedCourses);
        onClose();
    };

    return (
        <div className='container mx-auto p-6'>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-3xl font-semibold'>
                    {courseName || "Modules"}
                </h1>
                <select
                    name='course'
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className='p-2 border border-gray-300 rounded-md'>
                    <option value='all'>All</option>
                    <option value='active'>Active</option>
                    <option value='deleted'>Deleted</option>
                </select>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {filteredCourses &&
                    filteredCourses.map((module) => (
                        <div
                            key={module.id}
                            className='p-4  bg-white shadow-md rounded-lg'>
                            <Link
                                to={`/courses/${id}/modules/${module.id}`}
                                state={{
                                    courseName,
                                    moduleName: module.name,
                                }}
                                className='block'>
                                <p className='text-2xl font-semibold'>
                                    Modul ID: {module.id}
                                </p>
                                <p className='text-gray-600 text-lg'>
                                    Modul nomi: {module.name}
                                </p>
                                <p className='text-gray-600 text-lg'>
                                    Max № studentlar: {module.max_students}
                                </p>
                                <p className='text-gray-600 text-lg'>
                                    Darslar davomiyligi: {module.length}
                                </p>
                            </Link>
                            <Dropdown as={ButtonGroup}>
                                <Dropdown.Toggle
                                    split
                                    variant='none'
                                    id='dropdown-split-basic'
                                />
                                <Dropdown.Menu>
                                    <Dropdown.Item
                                        onClick={() => handleEdit(module)}>
                                        Edit
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() => handleDelete(module)}>
                                        Delete
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    ))}
            </div>

            <button
                className='fixed top-36 right-11 w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-green-600'
                type='button'
                onClick={() => onOpen()}>
                +
            </button>

            <ModulesDrawer
                open={open}
                onClosed={onClose}
                onCreate={handleCreate}
            />

            <Modal
                show={showEditModal}
                onHide={() => setShowEditModal(false)}
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Course</Modal.Title>
                </Modal.Header>
                <Modal.Body className='flex flex-col gap-4'>
                    <input
                        type='text'
                        className='p-2 border border-gray-300 rounded-md'
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder='Module Name'
                    />
                    <input
                        type='number'
                        className='p-2 border border-gray-300 rounded-md'
                        value={newStudent}
                        onChange={(e) => setNewStudent(e.target.value)}
                        placeholder='Max Students'
                    />
                    <input
                        type='text'
                        className='p-2 border border-gray-300 rounded-md'
                        value={newLength}
                        onChange={(e) => setNewLength(e.target.value)}
                        placeholder='Module Length'
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant='secondary'
                        onClick={() => setShowEditModal(false)}>
                        Close
                    </Button>
                    <Button variant='primary' onClick={handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

const App = () => (
    <Routes>
        <Route path='/' element={<Modules />} />
        <Route path='/courses/:id/modules/:id' element={<Tests />} />
    </Routes>
);

export default App;
