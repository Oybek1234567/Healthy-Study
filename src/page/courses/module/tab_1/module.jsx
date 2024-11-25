import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import useDrawer from "../../../../hooks/useDrawer";
import ModulesDrawer from "./drawer";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { AuthContext } from "../../../../context/authContext";
import {Dropdown, Menu } from "antd";

const Modules = () => {
    const [modules, setModules] = useState([]);
    const { open, onOpen, onClose } = useDrawer();
    const [editModule, setEditModule] = useState(null);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [newName, setNewName] = useState("");
    const [newStudent, setNewStudent] = useState("");
    const [newStatus, setNewStatus] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("active");
    const { id } = useParams();
    const location = useLocation();
    const courseName = location.state?.name;

    const { role } = useContext(AuthContext);

    const API = "http://localhost:3000";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const req = await axios.get(`${API}/modules/all/${id}`);
                const modulesData = req.data.modules;
                setModules(modulesData);
                setFilteredCourses(
                    modulesData.filter((course) => course.status === "active")
                );
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);

    const handleSave = async () => {
        try {
            await axios.post(
                `${API}/modules/edit/${editModule.id}`,
                { name: newName, max_students: newStudent, status: newStatus },
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
                              status: newStatus,
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
                              status: newStatus,
                          }
                        : c
                )
            );

            alert("Kurs muvaffaqiyatli yangilandi");
            setShowEditModal(false);
        } catch (error) {
            console.error(error);
            alert("Failed");
        }
    };

    const handleEdit = (module) => {
        setEditModule(module);
        setNewName(module.name);
        setNewStudent(module.max_students);
        setNewStatus(module.status);
        setShowEditModal(true);
    };

    const handleStatusChange = (status) => {
        setSelectedStatus(status);
        if (status === "active") {
            setFilteredCourses(
                modules.filter((course) => course.status === "active")
            );
        } else if (status === "deleted") {
            setFilteredCourses(
                modules.filter((course) => course.status === "deleted")
            );
        } else {
            setFilteredCourses(modules);
        }
    };

    const handleCreate = (newModule) => {
        setModules((prev) => [...prev, newModule]);
        setFilteredCourses((prev) => [...prev, newModule]);
        onClose();
    };

    return (
        <div className='container mx-auto p-6'>
            {(role === "super" || role === "head_teacher") && (
                <select
                    name='course'
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className='p-2 ml-[89%] border border-gray-300 rounded-md'>
                    <option value='active'>Active</option>
                    <option value='deleted'>Deleted</option>
                    <option value='all'>All</option>
                </select>
            )}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {filteredCourses.map((module) => (
                    <div key={module.id}>
                        <Link
                            style={{ textDecoration: "none", color: "black" }}
                            to={`/courses/${id}/modules/${module.id}`}
                            state={{ courseName, moduleName: module.name }}
                            className='relative flex flex-col justify-center bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer mt-4 pt-2 p-7 w-[300px] h-44 border-4 border-gray-300 rounded-lg hover:border-black hover:text-gray-700'>
                            <p className='text-gray-600 text-lg mt-4'>
                                Modul nomi: {module.name}
                            </p>
                            <p className='text-gray-600 text-lg -translate-y-3'>
                                Max № studentlar: {module.max_students}
                            </p>
                            <p className='text-gray-600 text-lg -translate-y-7'>
                                Darslar soni: {module.length}
                            </p>
                            <p className='absolute left-7 bottom-2 w-10 h-6 bg-green-600 text-center text-white rounded'>
                                {module.id}
                            </p>
                            <p
                                className={`absolute right-4 bottom-1 w-16 py-1 text-center text-white rounded-md ${
                                    module.status === "active"
                                        ? "bg-green-500"
                                        : "bg-red-500"
                                }`}>
                                {module.status === "active"
                                    ? "Active"
                                    : "Deleted"}
                            </p>
                        </Link>
                        {(role === "super" || role === "head_teacher") && (
                            <Dropdown
                                overlay={
                                    <Menu>
                                        <Menu.Item
                                            key='1'
                                            onClick={() => handleEdit(module)}>
                                            Edit
                                        </Menu.Item>
                                    </Menu>
                                }>
                                <a className='absolute rotate-90 text-3xl translate-x-[270px] -translate-y-[160px]'>
                                    ...
                                </a>
                            </Dropdown>
                        )}
                    </div>
                ))}
            </div>

            {(role === "super" || role === "head_teacher") && (
                <button
                    className='fixed top-36 right-14 text-2xl w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-green-600'
                    type='button'
                    onClick={() => onOpen()}>
                    +
                </button>
            )}

            <Modal
                show={showEditModal}
                onHide={() => setShowEditModal(false)}
                backdrop='static'
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Module</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        type='text'
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder='New Name'
                        className='w-full p-2 border border-gray-300 rounded-md mb-2'
                    />
                    <input
                        type='text'
                        value={newStudent}
                        onChange={(e) => setNewStudent(e.target.value)}
                        placeholder='New Max Students'
                        className='w-full p-2 border border-gray-300 rounded-md mb-2'
                    />
                    <select
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                        className='w-full p-2 border border-gray-300 rounded-md'>
                        <option value='active'>Active</option>
                        <option value='deleted'>Deleted</option>
                    </select>
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-primary' onClick={handleSave}>
                        Save Changes
                    </button>
                    <button
                        className='btn btn-secondary'
                        onClick={() => setShowEditModal(false)}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>

            <ModulesDrawer open={open} onCreate={handleCreate} />
        </div>
    );
};

export default Modules;
