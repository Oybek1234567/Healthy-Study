import { Link, Route, Routes } from "react-router-dom";
import Modules from "./module/tab_1/module";
import useDrawer from "../../hooks/useDrawer";
import { useState, useEffect } from "react";
import CoursesDrawer from "./drawer";
import axios from "axios";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const NewCourses = () => {
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editCourse, setEditCourse] = useState(null);
    const [newName, setNewName] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const API = "http://localhost:3000";

    useEffect(() => {
        const handleGet = async () => {
            try {
                const response = await axios.get(
                    `${API}/courses/all`
                );
                setCourses(response.data.courses);
                setFilteredCourses(response.data.courses);
            } catch (error) {
                console.error(error);
            }
        };

        handleGet();
    }, []);

    const handleSave = async () => {
        try {
            await axios.post(
                `${API}/courses/edit/${editCourse.id}`,
                { name: newName }
            );
            setCourses((prev) =>
                prev.map((c) =>
                    c.id === editCourse.id ? { ...c, name: newName } : c
                )
            );
            setFilteredCourses((prev) =>
                prev.map((c) =>
                    c.id === editCourse.id ? { ...c, name: newName } : c
                )
            );
            setShowEditModal(false);
            alert("Kurs muvaffaqiyatli yangilandi");
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (course) => {
        setEditCourse(course);
        setNewName(course.name);
        setShowEditModal(true);
    };

    const handleDelete = async (course) => {
        const id = course.id;
        try {
            await axios.post(`${API}/courses/delete/${id}`);
            const updatedCourses = courses.filter((c) => c.id !== id);
            setCourses(updatedCourses);
            setFilteredCourses(updatedCourses);
            alert("Kurs o'chirildi");
        } catch (error) {
            console.error(error);
        }
    };

    const handleCreate = (newCourse) => {
        setCourses((prevCourses) => [...prevCourses, newCourse]);
        if (selectedStatus === "all" || newCourse.status === selectedStatus) {
            setFilteredCourses((prevCourses) => [...prevCourses, newCourse]);
        }
    };

    const handleStatusChange = (status) => {
        setSelectedStatus(status);
        if (status === "all") {
            setFilteredCourses(courses);
        } else {
            setFilteredCourses(
                courses.filter((course) => course.status === status)
            );
        }
    };

    const { open, onOpen, onClose } = useDrawer();
    return (
        <>
            <div className='relative p-8 bg-gray-50'>
                <h1 className='absolute text-4xl font-semibold text-gray-800 top-4 left-8'>
                    Kurslar
                </h1>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16'>
                    {filteredCourses.map((course, index) => (
                        <div key={index} className='relative'>
                            <Link
                                to={`/courses/${course.id}`}
                                state={{ name: course.name }}
                                className='relative flex flex-col justify-center items-center bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer mt-10 p-6 w-[300px] h-40 border-4 border-gray-300 rounded-lg hover:border-black hover:text-gray-700'>
                                <h2 className='text-lg font-semibold'>
                                    {course.name.charAt(0).toUpperCase() + course.name.slice(1)}
                                </h2>
                                <p className='absolute left-4 bottom-4 w-10 h-6 bg-green-600 text-center text-white rounded'>
                                    {course.id}
                                </p>
                                <p
                                    className={`absolute right-4 bottom-4 w-16 py-1 text-center text-white rounded-md ${
                                        course.status === "active"
                                            ? "bg-green-500"
                                            : "bg-red-500"
                                    }`}>
                                    {course.status === "active"
                                        ? "Active"
                                        : "Deleted"}
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
                </div>

                <div className='absolute top-4 right-16 flex items-center'>
                    <select
                        name='course'
                        onChange={(e) => handleStatusChange(e.target.value)}
                        className='border-2 border-black rounded-md px-2 py-1 focus:outline-none focus:border-gray-500'>
                        <option value='all'>All</option>
                        <option value='active'>Active</option>
                        <option value='deleted'>Deleted</option>
                    </select>
                    <button
                        className='ml-4 w-10 h-10 bg-green-700 rounded-full text-white flex items-center justify-center hover:bg-green-600 transition-colors'
                        type='button'
                        onClick={onOpen}>
                        +
                    </button>
                </div>

                <CoursesDrawer
                    open={open}
                    onClose={onClose}
                    onCreate={handleCreate}
                />

                <Modal
                    show={showEditModal}
                    onHide={() => setShowEditModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title className='font-semibold text-xl'>
                            Edit Course
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input
                            type='text'
                            className='w-full border-2 border-black rounded-md p-2 focus:outline-none focus:border-gray-500'
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
                            type='button'
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
        <Route path='/courses/:id' element={<Modules />} />
    </Routes>
);

export default App;
