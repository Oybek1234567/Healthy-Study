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
                    const req = await axios.get(
                        `${API}/exams/allbystudentbymodule`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    console.log(req.data);
                    
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
        <div className='relative p-8 bg-gray-50'>
            <h1 className='text-3xl font-bold text-gray-800 mb-6'>Exams</h1>
            <table className='min-w-full border border-gray-300'>
                <thead>
                    <tr className='bg-gray-100 text-xl text-center'>
                        <th className='px-4 py-2 border border-gray-300'>
                            Group Name
                        </th>
                        <th className='px-4 py-2 border border-gray-300'>
                            Assignment Name
                        </th>
                        <th className='px-4 py-2 border border-gray-300'>
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody className='text-center text-xl'>
                    {data.length > 0 ? (
                        data.map((item) => (
                            <tr key={item.id} className='hover:bg-gray-50'>
                                <td className='px-4 py-2 border border-gray-300'>
                                    {item.status === "completed" ? (
                                        <span className='text-gray-800'>
                                            {item.group_name}
                                        </span>
                                    ) : (
                                        <Link
                                            to={`/exams/${item.id}`}
                                            state={{
                                                name: item.group_name,
                                                assignment_name: item.assignment_name,
                                                assignment_by_groupstudent_id:
                                                    item.id,
                                            }}
                                            className='text-blue-500 hover:underline'>
                                            {item.group_name}
                                        </Link>
                                    )}
                                </td>
                                <td className='px-4 py-2 border border-gray-300'>
                                    {item.assignment_name}
                                </td>
                                <td className='px-4 py-2 border border-gray-300'>
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
