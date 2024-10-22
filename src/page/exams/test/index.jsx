import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ExamsTest = () => {
    const location = useLocation();
    const { name } = location.state;
    const { assignment_by_groupstudent_id } = location.state;

    const [data, setData] = useState([]);
    const [Answers, setAnswers] = useState([]);
    const API = "http://localhost:3000";

    useEffect(() => {
        const token = localStorage.getItem("token");
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        const fetchData = async () => {
            try {
                const req = await axios.post(
                    `${API}/exams/allquestions`,
                    { assignment_by_groupstudent_id },
                    { headers }
                );
                console.log("Data: ", req.data.data);

                // Shuffle options for each question once
                const shuffledData = req.data.data.map((item) => ({
                    ...item,
                    options: shuffleArray(item.options),
                }));

                setData(shuffledData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [assignment_by_groupstudent_id]);

    // Handle when an option is clicked
    const handleAnswerSelect = (question_id, option) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [question_id]: option, // Store selected answer for each question
        }));
    };

    const handlePost = async () => {
        const answers = Object.entries(Answers).map(
            ([question_id, answer]) => ({
                question_id: parseInt(question_id),
                answer,
            })
        );

        console.log("answers", answers);

        const responseData = {
            assignment_by_groupstudent_id: assignment_by_groupstudent_id,
            answers,
        };
        console.log(responseData);

        try {
            const token = localStorage.getItem("token");
            const headers = {
                Authorization: `Bearer ${token}`,
            };

             await axios.post(
                `${API}/exams/answers`,
                responseData,
                { headers }
            );
            window.history.back()
        } catch (e) {
            console.error(e);
        }
    };

    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };

    return (
        <div className='p-6 bg-gray-100 min-h-screen'>
            <h1
                className='text-4xl font-bold text-blue-600 cursor-pointer hover:underline mb-6'
                onClick={() => window.history.back()}>
                {name}
            </h1>

            {data.map((item) => (
                <div
                    key={item.question_id}
                    className='bg-white shadow-lg rounded-lg p-6 mb-6'>
                    <p className='text-lg font-semibold text-gray-800 mb-4'>
                        {item.question}
                    </p>
                    <div className='grid grid-cols-1 gap-2 md:grid-cols-2'>
                        {item.options.map((nestedItem) => (
                            <div
                                key={nestedItem.id}
                                className={`bg-blue-100 p-4 text-xl rounded-lg transition-colors cursor-pointer ${
                                    Answers[item.question_id] ===
                                    nestedItem.option
                                        ? "bg-[#eea929] text-[#fff]"
                                        : ""
                                }`}
                                onClick={() =>
                                    handleAnswerSelect(
                                        item.question_id,
                                        nestedItem.option
                                    )
                                }>
                                {nestedItem.option}
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            <button
                type='submit'
                className='bg-green-600 p-2 px-3 mt-3 font-semibold text-[#fff] ml-3 rounded-lg hover:opacity-70'
                onClick={handlePost}>
                Testni Yakunlash
            </button>
        </div>
    );
};

export default ExamsTest;
