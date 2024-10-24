import { DownOutlined, UpOutlined } from "@ant-design/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSort } from "../../../../hooks/useSort";

const Accepted = () => {
    const [data, setData] = useState([]);
    const [userData, setUserData] = useState([]);
    const API = "http://localhost:3000";

    const { handleSort, sortConfig } = useSort(userData, setUserData);
    useEffect(() => {
        const handleGet = async () => {
            try {
                const req = await axios.get(
                    `${API}/applications/accepted`
                );
                setData(req.data.users);
                console.log(req.data);
            } catch (error) {
                console.error(error);
            }
        };

        handleGet();
    }, [setData]);
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th
                            onClick={() => handleSort("name")}
                            className='cursor-pointer'>
                            Name
                            {sortConfig?.key === "name" &&
                            sortConfig?.direction === "ascending" ? (
                                <UpOutlined />
                            ) : (
                                <DownOutlined />
                            )}
                        </th>
                        <th
                            onClick={() => handleSort("surname")}
                            className='cursor-pointer'>
                            Surname
                            {sortConfig?.key === "surname" &&
                            sortConfig?.direction === "ascending" ? (
                                <UpOutlined />
                            ) : (
                                <DownOutlined />
                            )}
                        </th>
                        <th
                            onClick={() => handleSort("date_of_birth")}
                            className='cursor-pointer'>
                            Date Of Birth
                            {sortConfig?.key === "date_of_birth" &&
                            sortConfig?.direction === "ascending" ? (
                                <UpOutlined />
                            ) : (
                                <DownOutlined />
                            )}
                        </th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.surname}</td>
                            <td>
                                {user.date_of_birth
                                    ? user.date_of_birth.slice(0, 10)
                                    : ""}
                            </td>
                            <td>{user.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Accepted;
