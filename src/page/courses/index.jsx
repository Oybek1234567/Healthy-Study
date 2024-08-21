import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Modules from "./module/module";
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

     useEffect(() => {
         const handleGet = async () => {
             try {
                 const response = await axios.get(
                     "http://localhost:3000/courses/all"
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
                 `http://localhost:3000/courses/edit/${editCourse.id}`,
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
             await axios.post(`http://localhost:3000/courses/delete/${id}`);
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
     const navigate = useNavigate();

     const handleNavigation = () => {
         navigate("/courses");
     };
    return (
        <>
            <div className='flex gap-4 flex-wrap'>
                <h1 className='absolute text-4xl'>Kurslar</h1>
                {(filteredCourses ?? []).map((course, index) => (
                    <div key={index}>
                        <Link
                            to={`/courses/${course.id}`}
                            state={{ name: course.name }}
                            className='flex cursor-pointer mt-20 justify-center items-center w-[300px] h-40 border-4 border-black hover:text-black'
                            onClick={() => {
                                handleNavigation();
                            }}>
                            {course.name}
                            <p className='absolute -translate-x-[130px] mt-[120px] w-7 h-5 bg-[green] text-center text-white rounded-sm'>
                                {course.id}
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
                                    onClick={() => {
                                        handleDelete(course);
                                        window.location.reload()
                                    }}>
                                    Delete
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                ))}
                <select
                    name='course'
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className='absolute ml-[55%] mt-2 border-2 border-black'>
                    <option value='all'>All</option>
                    <option value='active'>Active</option>
                    <option value='deleted'>Deleted</option>
                </select>
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
                <Modal
                    show={showEditModal}
                    onHide={() => setShowEditModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Course</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input
                            type='text'
                            className='border-2 border-black'
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
                            onClick={() => {
                                handleSave();
                                setShowEditModal(false);
                                window.location.reload();
                            }}>
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
