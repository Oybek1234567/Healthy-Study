import { useEffect, useState } from "react";
import useDrawer from "../../../../../../hooks/useDrawer";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { Button, Modal, Tabs, Input } from "antd";
import TestsDrawer from "./drawer";

const SubjectTests = () => {
    const { open, onOpen, onClose } = useDrawer();
    const [data, setData] = useState([]);
    const [item, setItem] = useState([]);
    const [selectedLevelId, setSelectedLevelId] = useState(null);
    const [editingQuestionId, setEditingQuestionId] = useState(null);
    const [editedQuestionText, setEditedQuestionText] = useState("");
    const [showModal, setShowModal] = useState(false);
    const { id } = useParams();
    const location = useLocation();
    const { moduleId } = location.state;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const req = await axios.get(
                    `http://localhost:3000/questionlevels/all/${moduleId}`
                );
                setData(req.data.question_levels);
                console.log(req.data);
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

            try {
                const req = await axios.post(
                    `http://localhost:3000/questions/all/${+id}`,
                    {
                        level_id: selectedLevel.id,
                    }
                );
                setItem(req.data.data || []);
                console.log("Selected Level Questions:", req.data.data);
            } catch (err) {
                console.error("Error fetching questions:", err);
            }
        }
    };

    const handleEditClick = (questionId, questionText) => {
        setEditingQuestionId(questionId);
        setEditedQuestionText(questionText);
        setShowModal(true);
    };

    const handleSaveClick = async () => {
        try {
            await axios.post(
                `http://localhost:3000/questions/edit/${editingQuestionId}`,
                {
                    question: editedQuestionText,
                }
            );
            setItem((prevQuestions) =>
                prevQuestions.map((q) =>
                    q.id === editingQuestionId
                        ? { ...q, question: editedQuestionText }
                        : q
                )
            );
            setShowModal(false);
            console.log("Question updated successfully");
        } catch (error) {
            console.error("Error updating question:", error);
        }
    };

    const handleDeleteClick = async (questionId) => {
        try {
            await axios.post(`http://localhost:3000/questions/delete/${questionId}`);
            setItem((prevQuestions) =>
                prevQuestions.filter((q) => q.id !== questionId)
            );
            console.log("Question deleted successfully");
        } catch (error) {
            console.error("Error deleting question:", error);
        }
    };

    return (
        <div>
            <Button
                className='bg-green-700 text-xl w-10 h-10 rounded-full text-white ml-[95%]'
                onClick={onOpen}>
                +
            </Button>
            <TestsDrawer open={open} onClosed={onClose} />

            {/* Tabs for each question level */}
            <Tabs defaultActiveKey='0' onChange={handleTabChange}>
                {data.map((level, index) => (
                    <Tabs.TabPane tab={level.name} key={index.toString()}>
                        {item.length > 0 ? (
                            <>
                                {item.map((question, qIndex) => (
                                    <div
                                        key={qIndex}
                                        className='mb-6 p-4 border border-gray-300 rounded-lg'>
                                        <p className='text-xl'>
                                            {qIndex + 1}. {question.question}
                                        </p>

                                        <div className='flex flex-wrap gap-4 mt-4'>
                                            {question.options.map((option) => (
                                                <div
                                                    key={option.id}
                                                    className='flex gap-2'>
                                                    <input
                                                        type='radio'
                                                        name={`question-${question.id}`}
                                                        id={`option-${option.id}`}
                                                        checked={
                                                            option.isRight ===
                                                            "right"
                                                        }
                                                        readOnly
                                                    />
                                                    <label
                                                        htmlFor={`option-${option.id}`}>
                                                        {option.option}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Edit va Delete tugmalari */}
                                        <div className='flex gap-4 mt-4'>
                                            <Button
                                                onClick={() =>
                                                    handleEditClick(
                                                        question.id,
                                                        question.question
                                                    )
                                                }>
                                                Edit
                                            </Button>
                                            <Button
                                                danger
                                                onClick={() =>
                                                    handleDeleteClick(
                                                        question.id
                                                    )
                                                }>
                                                🚯
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <p>Bu level uchun savollar mavjud emas.</p>
                        )}
                    </Tabs.TabPane>
                ))}
            </Tabs>

            {/* Modal for editing question */}
            <Modal
                title='Savolni tahrirlash'
                open={showModal}
                onCancel={() => setShowModal(false)}
                onOk={handleSaveClick}>
                <Input
                    value={editedQuestionText}
                    onChange={(e) => setEditedQuestionText(e.target.value)}
                />
            </Modal>
        </div>
    );
};

export default SubjectTests;
