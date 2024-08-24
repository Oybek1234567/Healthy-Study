import { useEffect, useState } from "react";
import { Link, Route, Routes, useLocation, useParams } from "react-router-dom";
import useDrawer from "../../../hooks/useDrawer";
import ModulesDrawer from "./drawer";
import Tests from "./test";
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
            console.log(newName, newStudent, newLength);
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
    console.log(courseName);

    return (
        <div>
            <h1 className='absolute text-4xl'>
                <Link to='/courses' className='hover:text-black'>
                    Kurslar /
                </Link>
                <span className='hover:text-black'>
                    {courseName.charAt(0).toUpperCase() + courseName.slice(1)}
                </span>
            </h1>
            <div className='absolute flex flex-wrap gap-4 mt-8 p-4'>
                {filteredCourses.map((module) => (
                    <div key={module.id}>
                        <Link
                            to={`/courses/${id}/modules/${module.id}`}
                            state={{
                                courseName,
                                moduleName: module.name,
                            }}
                            className='flex flex-wrap gap-2 mt-8 p-4 text-xl w-[300px] border-4 border-black hover:text-black'>
                            <p>Modul ID: {module.id}</p>
                            <p>Modul nomi: {module.name}</p>
                            <p>Max № studentlar: {module.max_students}</p>
                            <p>Darslar davomiyligi: {module.length}</p>
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
                className='absolute w-10 h-10 ml-[70%] bg-green-700 rounded-full text-white'
                type='button'
                onClick={() => onOpen()}>
                +
            </button>
            <ModulesDrawer
                open={open}
                onClosed={onClose}
                onCreate={handleCreate}
            />
            <select
                name='course'
                onChange={(e) => handleStatusChange(e.target.value)}
                className='absolute ml-[50%] mt-2 border-2 border-black'>
                <option value='all'>All</option>
                <option value='active'>Active</option>
                <option value='deleted'>Deleted</option>
            </select>
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Course</Modal.Title>
                </Modal.Header>
                <Modal.Body className='flex flex-col gap-2'>
                    <input
                        type='text'
                        className='border-2 border-black w-full'
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                    <input
                        type='number'
                        className='border-2 border-black w-full'
                        value={newStudent}
                        onChange={(e) => setNewStudent(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant='secondary'
                        onClick={() => setShowEditModal(false)}>
                        Close
                    </Button>
                    <Button
                        variant='primary'
                        type='button'
                        onClick={handleSave}>
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
