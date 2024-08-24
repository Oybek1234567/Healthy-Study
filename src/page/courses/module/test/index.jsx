import axios from "axios";
import { useState, useEffect } from "react";
import { Button, ButtonGroup, Dropdown, Modal } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { Tabs } from "antd";
import Exams from "./exams";
import Themes from "./subjects";
import Lessons from "./lessons";
import Report from "./report";
import LessonSubjects from "./lesson_subjects";

const Tests = () => {
    const [modules, setModules] = useState([]);
    const [editModule, setEditModule] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [newName, setNewName] = useState("");
    const [newStudent, setNewStudent] = useState("");
    const [newLength, setNewLength] = useState("");
    const location = useLocation();
    const courseName = location.state?.courseName;
    const moduleName = location.state?.moduleName;
    const [activeTabKey, setActiveTabKey] = useState("lessons");

    useEffect(() => {
        const storedTabKey = localStorage.getItem("activeTabKey");
        if (storedTabKey) {
            setActiveTabKey(storedTabKey);
        }
    }, []);

    const handleTabChange = (key) => {
        setActiveTabKey(key);
        localStorage.setItem("activeTabKey", key);
    };

    const handleBack = () => {
        window.history.back();
    };
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
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1 className='absolute text-4xl'>
                <a href='/courses' className='hover:text-black'>
                    Kurslar /
                </a>
                <button onClick={handleBack}>{courseName} /</button>
                <button href='/modules' className='hover:text-black'>
                    <p style={{ display: "none" }}>/</p> {moduleName}
                </button>
            </h1>
            <div className='absolute flex flex-wrap gap-4 mt-8 p-4'>
                {modules.map((module) => (
                    <div key={module.id}>
                        <div className='flex flex-wrap gap-2 mt-8 p-4 text-xl w-[300px] border-4 border-black hover:text-black'>
                            <p>Modul ID: {module.id}</p>
                            <p>Modul nomi: {module.name}</p>
                            <p>Max № studentlar: {module.max_students}</p>
                            <p>Darslar davomiyligi: {module.length}</p>
                        </div>
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
                    <input
                        type='number'
                        className='border-2 border-black w-full'
                        value={newLength}
                        onChange={(e) => setNewLength(e.target.value)}
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

            <Tabs
                type='card'
                activeKey={activeTabKey}
                onChange={handleTabChange}
                items={[
                    {
                        label: "Assignment Types",
                        key: "assignment_types",
                        children: <Exams />,
                    },
                    {
                        label: "Subjects",
                        key: "subjects",
                        children: <Themes />,
                    },
                    {
                        label: "Lessons",
                        key: "lessons",
                        children: <Lessons />,
                    },
                    {
                        label: "Lesson Subjects",
                        key: "lesson_subjects",
                        children: <LessonSubjects />,
                    },
                    {
                        label: "Lesson Report Types",
                        key: "reports",
                        children: <Report />,
                    },
                ]}
                size='large'
                style={{
                    width: "98%",
                    fontSize: "30px",
                    paddingTop: "100px",
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                }}
            />
        </div>
    );
};

export default Tests;
