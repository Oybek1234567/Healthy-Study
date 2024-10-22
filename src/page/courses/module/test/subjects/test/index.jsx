import { useContext, useEffect, useState } from "react";
import useDrawer from "../../../../../../hooks/useDrawer";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { Button, Modal, Tabs, Input } from "antd";
import TestsDrawer from "./drawer";
import { AuthContext } from "../../../../../../context/authContext";

const SubjectTests = () => {
    const { open, onOpen, onClose } = useDrawer();
    const [data, setData] = useState([]);
    const [item, setItem] = useState([]);
    const [selectedLevelId, setSelectedLevelId] = useState(null);
    const [editingQuestionId, setEditingQuestionId] = useState(null);
    const [editedQuestionText, setEditedQuestionText] = useState("");
    const [editedLevels, setEditedLevels] = useState("");
    const [editedStatus, setEditedStatus] = useState("active");
    const [status, setStatus] = useState("active");
    const [editedOptions, setEditedOptions] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const { id } = useParams();
    const location = useLocation();
    const { moduleId, moduleName, courseName, name } = location.state;
    const API = "http://localhost:3000";

    const { role } = useContext(AuthContext);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const req = await axios.get(
                    `${API}/questionlevels/all/${moduleId}`
                );
                setData(req.data.question_levels);

                if (req.data.question_levels.length > 0) {
                    handleTabChange(0);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [moduleId]);

    const handleTabChange = async (key) => {
        const index = Number(key);
        const selectedLevel = data[index];

        if (selectedLevel) {
            setSelectedLevelId(selectedLevel.id);
            setEditedLevels(selectedLevel.id);
            try {
                const req = await axios.post(`${API}/questions/all/${id}`, {
                    level_id: selectedLevel.id,
                });
                setItem(req.data.data || []);
            } catch (err) {
                console.error("Error fetching questions:", err);
            }
        }
    };

    const handleEditClick = (
        questionId,
        questionText,
        questionOptions,
        questionLevelId,
        questionStatus
    ) => {
        setEditingQuestionId(questionId);
        setEditedQuestionText(questionText);
        setEditedLevels(questionLevelId);
        setEditedStatus(questionStatus);
        setEditedOptions(questionOptions);
        setShowModal(true);
    };

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...editedOptions];
        updatedOptions[index].option = value;
        setEditedOptions(updatedOptions);
    };
    const handleSaveClick = async () => {
        try {
            const response = {
                question: editedQuestionText,
                options: editedOptions,
                level_id: editedLevels,
                status: editedStatus,
            };

            await axios.post(
                `${API}/questions/edit/${editingQuestionId}`,
                response
            );

            setItem((prevQuestions) =>
                prevQuestions.map((q) =>
                    q.id === editingQuestionId
                        ? {
                              ...q,
                              question: editedQuestionText,
                              options: editedOptions,
                              status: editedStatus,
                          }
                        : q
                )
            );
            setShowModal(false);
        } catch (error) {
            console.error("Error updating question and options:", error);
        }
    };

    const filteredItems =
        status === "active"
            ? item.filter((question) => question.status === "active")
            : status === "deleted"
            ? item.filter((question) => question.status === "deleted")
            : item;

    return (
        <div className='relative p-8 bg-gray-50'>
            <div className='flex items-center justify-between'>
                <h1 className='text-3xl font-bold text-gray-800 mb-6'>
                    <span
                        className='mr-2 cursor-pointer'
                        onClick={() => window.history.go(-3)}>
                        Kurslar
                    </span>
                    <span
                        className='mr-2 cursor-pointer'
                        onClick={() => window.history.go(-2)}>
                        / {courseName} /
                    </span>
                    <span
                        className='mr-2 cursor-pointer'
                        onClick={() => window.history.go(-1)}>
                        {moduleName} /
                    </span>
                    <span
                        className='cursor-pointer'
                        onClick={() => window.history.back()}>
                        {name}
                    </span>
                </h1>

                {(role === "super" || role === "head_teacher") && (
                    <>
                        <select
                            name='status'
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className='border-2 border-black rounded-md px-2 py-1 focus:outline-none focus:border-gray-500 -translate-y-2 ml-[30%]'>
                            <option value='active'>Active</option>
                            <option value='deleted'>Deleted</option>
                            <option value='all'>All</option>
                        </select>

                        <button
                            className='bg-green-700 text-xl w-12 h-12 rounded-full text-white -translate-y-3'
                            onClick={onOpen}>
                            +
                        </button>
                    </>
                )}
            </div>
            <TestsDrawer open={open} onClosed={onClose} />
            <Tabs defaultActiveKey='0' onChange={handleTabChange} type='card'>
                {data.map((level, index) => (
                    <Tabs.TabPane
                        tab={level.name}
                        key={index.toString()}
                        className='w-full h-[400px] gap-6'>
                        {filteredItems.length > 0 &&
                            filteredItems.map((question, qIndex) => (
                                <div
                                    key={qIndex}
                                    className='mb-6 p-4 pb-5 border shadow-lg rounded-lg'>
                                    <p className='text-xl'>
                                        {qIndex + 1}. {question.question}
                                    </p>
                                    <div className='flex flex-col w-[100%] gap-4 mt-4 '>
                                        {question.options.map((option) => (
                                            <div
                                                key={option.id}
                                                className='flex gap-2 border border-black p-2 rounded-lg'>
                                                <p
                                                    className={`${
                                                        option.isRight ===
                                                        "right"
                                                            ? "text-[green]"
                                                            : "text-[red]"
                                                    } font-semibold`}>
                                                    {option.option}
                                                </p>
                                            </div>
                                        ))}
                                        <div className='flex gap-4 mt-4'>
                                            {(role === "super" ||
                                                role === "head_teacher") && (
                                                <Button
                                                    onClick={() =>
                                                        handleEditClick(
                                                            question.id,
                                                            question.question,
                                                            question.options,
                                                            question.levels,
                                                            question.status
                                                        )
                                                    }>
                                                    Edit
                                                </Button>
                                            )}
                                            <p
                                                className={`absolute w-[80px] ml-[88%] font-semibold h-[30px] pl-5 rounded-lg text-white pt-1 ${
                                                    question.status === "active"
                                                        ? "bg-[green]"
                                                        : "bg-[red] p-2"
                                                }`}>
                                                {question.status}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </Tabs.TabPane>
                ))}
            </Tabs>

            <Modal
                title='Savolni tahrirlash'
                open={showModal}
                onCancel={() => setShowModal(false)}
                onOk={handleSaveClick}>
                <Input
                    value={editedQuestionText}
                    onChange={(e) => setEditedQuestionText(e.target.value)}
                    placeholder='Enter question text'
                />
                <p className='text-lg mt-4'>Options: </p>
                {editedOptions.map((option, index) => (
                    <div key={index} className='mt-4 flex items-center'>
                        <span className='mr-2'>
                            {option.isRight === "right" ? "✔" : "❌"}
                        </span>
                        <Input
                            value={option.option}
                            onChange={(e) =>
                                handleOptionChange(index, e.target.value)
                            }
                        />
                    </div>
                ))}
                <h3 className='text-lg mt-3'>Levels:</h3>
                <select
                    name='level'
                    className='border border-gray-300 w-full p-2 rounded-lg mt-1'
                    value={editedLevels || selectedLevelId}
                    onChange={(e) => setEditedLevels(e.target.value)}>
                    <option value='' disabled>
                        Select level
                    </option>
                    {data.map((item) => (
                        <option value={item.id} key={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>
                <p className='text-lg mt-3'>Status:</p>
                <select
                    name='status'
                    className='border border-gray-300 w-full p-2 rounded-lg mt-1'
                    value={editedStatus}
                    onChange={(e) => setEditedStatus(e.target.value)}>
                    <option value='active'>Active</option>
                    <option value='deleted'>Deleted</option>
                </select>
            </Modal>
        </div>
    );
};

export default SubjectTests;
