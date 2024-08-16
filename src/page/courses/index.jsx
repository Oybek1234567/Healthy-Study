import { Route, Routes, useNavigate } from "react-router-dom";
import Modules from "./module/module";
import useDrawer from "../../hooks/useDrawer";
import { useState, useEffect } from "react";
import CoursesDrawer from "./drawer";
import axios from "axios";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import  Modal  from "react-bootstrap/Modal";
import  Button  from "react-bootstrap/Button";

const NewCourses = () => {
    const [courses, setCourses] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editCourse, setEditCourse] = useState(null);
    const [newName, setNewName] = useState("");
    useEffect(() => {
        const handleGet = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3000/courses/all"
                );
                setCourses(response.data.courses);
            } catch (error) {
                console.error(error);
            }
        };

        handleGet();
    }, []);

    // handleSave

    const handleSave = async () => {
        try {
            const response = await axios.post(
                `http://localhost:3000/courses/edit/${editCourse.id}`,
                { name: newName }
            );
            setCourses((prev) =>
                prev.map((c) =>
                    c.id === editCourse.id ? { ...c, name: newName } : c
                )
            );
            console.log(response.data);
            alert("Kurs muvaffaqiyatli yangilandi");
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    // Edit course

    const handleEdit = (nom) => {
        setEditCourse(nom);
        setNewName(nom.name);
        setShowEditModal(true);
    };

    // Handle deleting a course
    const handleDelete = async (course) => {
        const id = course.id;
        try {
            const response = await axios.post(
                `http://localhost:3000/courses/delete/${id}`
            );
            setCourses(response.data.courses);
            alert("Kurs o'chirildi");
            console.log(response.data);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    // Handle adding a new course
    const handleCreate = (newCourse) => {
        setCourses((prevCourses) => [...prevCourses, newCourse]);
    };

    const { open, onOpen, onClose } = useDrawer();
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate("/modules");
    };

    return (
        <   >
            <div className='flex gap-4 flex-wrap'>
                <h1 className='absolute text-4xl'>Kurslar</h1>
                {(courses ?? []).map((course, index) => (
                    <div key={index}>
                        <div
                            className='flex cursor-pointer mt-20 justify-center items-center w-[300px] h-40 border-4 border-black'
                            onClick={handleNavigation}>
                            {course.name}
                        </div>
                        <Dropdown as={ButtonGroup}>
                            <Dropdown.Toggle
                                split
                                variant='none'
                                id='dropdown-split-basic'
                            />
                            <Dropdown.Menu>
                                <Dropdown.Item
                                    onClick={() => handleEdit(course)}>
                                    Edit
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => handleDelete(course)}>
                                    Delete
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                ))}
                <button
                    className='absolute w-10 h-10 ml-[70%] bg-green-700 rounded-full text-white'
                    type='button'
                    onClick={onOpen}>
                    +
                </button>

                <CoursesDrawer
                    open={open}
                    onClose={onClose}
                    onCreate={handleCreate}
                />
                <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Course</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input
                            type='text'
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
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
                            onClick={handleSave}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
};

const App = () => (
    <Routes>
        <Route path='/' element={<NewCourses />} />
        <Route path='/modules' element={<Modules />} />
    </Routes>
);

export default App;
