import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Exams = () => {
    const [data, setData] = useState([]);
    const API = "http://localhost:3000";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");

                if (token) {
                    const req = await axios.get(`${API}/exams/allbystudent`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    if (Array.isArray(req.data.exams)) {
                        setData(req.data.exams);
                    } else {
                        console.error(
                            "Data is not in expected format:",
                            req.data
                        );
                    }
                }
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }, []);

    return (
        <div className='container mx-auto mt-10 p-4'>
            <h1 className='text-3xl font-bold text-center mb-6'>Exams</h1>
            <table className='min-w-full bg-white shadow-md rounded-lg overflow-hidden'>
                <thead className='bg-gray-200'>
                    <tr>
                        <th className='py-3 px-4 text-gray-600'>Group Name</th>
                        <th className='py-3 px-4 text-gray-600'>
                            Assignment Name
                        </th>
                        <th className='py-3 px-4 text-gray-600'>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((item) => (
                            <tr key={item.id} className='hover:bg-gray-100'>
                                <td className='py-3 px-4'>
                                    {item.status === "completed" ? (
                                        <span className='text-gray-800'>
                                            {item.group_name}
                                        </span>
                                    ) : (
                                        <Link
                                            to={`/exams/${item.id}`}
                                            state={{
                                                name: item.group_name,
                                                assignment_by_groupstudent_id:
                                                    item.id,
                                            }}
                                            className='text-blue-500 hover:underline'>
                                            {item.group_name}
                                        </Link>
                                    )}
                                </td>
                                <td className='py-3 px-4 text-gray-800'>
                                    {item.assignment_name}
                                </td>
                                <td className='py-3 px-4 text-gray-800'>
                                    {item.status === "completed" ? (
                                        <span>
                                            {(item.result * 100).toFixed(2) +
                                                "%"}
                                        </span>
                                    ) : (
                                        item.status
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan='3'
                                className='text-center py-3 text-gray-600'>
                                No exams available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Exams;