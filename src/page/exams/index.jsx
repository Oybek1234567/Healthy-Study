import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Exams = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");

                if (token) {
                    const req = await axios.get(
                        "http://localhost:3000/exams/allbystudent",
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );                    
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
        <div>
            <table>
                <thead>
                    <tr className='text-center'>
                        <th>Group Name</th>
                        <th>Assignment Name</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    <Link
                                        to={`/exams/${item.id}`}
                                        state={{
                                            name: item.group_name,
                                            assignment_by_groupstudent_id:
                                                item.id,
                                        }}>
                                        {item.group_name}
                                    </Link>
                                </td>
                                <td>{item.assignment_name}</td>
                                <td>{item.status}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan='3'>No exams available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Exams;
