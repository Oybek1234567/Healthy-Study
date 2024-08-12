import {
    DeleteOutlined,
    DownOutlined,
    EditFilled,
    UpOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import useDrawer from "../../../hooks/useDrawer";
import UserDrawer from "./drawer";

const User = () => {
    const [userData, setUserData] = useState([]);
    const [sortConfig, setSortConfig] = useState(null);
    const { open, onOpen, onClose } = useDrawer();

    // Axios POST method
    const handleAlert = async () => {
        try {
            const res = await axios.post(
                "http://localhost:3000/users/create",
                userData
            );
            console.log(res);
            alert("Success");
        } catch (error) {
            console.error("Error posting data", error);
        }
    };

    // Axios GET method
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3000/applications/all"
                );
                setUserData(response.data.users || []);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    // Sorting function
    const handleSort = (key) => {
        let direction = "ascending";

        if (sortConfig?.key === key && sortConfig.direction === "ascending") {
            direction = "descending";
        }

        setSortConfig({ key, direction });

        const sortedData = [...userData].sort((a, b) => {
            if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
            if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
            return 0;
        });

        setUserData(sortedData);
    };

    // Download Excel
    const handleDownloadExcel = () => {
        const filteredData = userData.map(({ show, ...rest }) => rest);

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(filteredData);

        XLSX.utils.book_append_sheet(wb, ws, "Data");

        const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });

        const blob = new Blob([s2ab(wbout)], {
            type: "application/octet-stream",
        });

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "ma'lumotlar.xlsx";
        a.click();
        URL.revokeObjectURL(url);
    };

    const s2ab = (s) => {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i < s.length; i++) {
            view[i] = s.charCodeAt(i) & 0xff;
        }
        return buf;
    };

    return (
        <div>
            <a
                href='#'
                onClick={handleDownloadExcel}
                style={{ marginBottom: "10px" }}>
                Download Excel
            </a>
            <button
                type='button'
                className='ml-[80%] w-10 h-10 bg-[green] rounded-full text-white'
                onClick={onOpen}>
                +
            </button>
            <UserDrawer open={open} onClosed={onClose} />
            <table className='mt-5'>
                <thead>
                    <tr>
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
                        <th
                            onClick={() => handleSort("role")}
                            className='cursor-pointer'>
                            Role
                            {sortConfig?.key === "role" &&
                            sortConfig?.direction === "ascending" ? (
                                <UpOutlined />
                            ) : (
                                <DownOutlined />
                            )}
                        </th>
                        <th
                            onClick={() => handleSort("passport_series")}
                            className='cursor-pointer'>
                            Passport Series
                            {sortConfig?.key === "passport_series" &&
                            sortConfig?.direction === "ascending" ? (
                                <UpOutlined />
                            ) : (
                                <DownOutlined />
                            )}
                        </th>
                        <th
                            onClick={() => handleSort("expiration_date")}
                            className='cursor-pointer'>
                            Expiration Date
                            {sortConfig?.key === "expiration_date" &&
                            sortConfig?.direction === "ascending" ? (
                                <UpOutlined />
                            ) : (
                                <DownOutlined />
                            )}
                        </th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {userData.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.surname}</td>
                            <td>
                                {user.date_of_birth
                                    ? user.date_of_birth.slice(0, 10)
                                    : "No date"}
                            </td>
                            <td>{user.phone}</td>
                            <td>{user.role}</td>
                            <td>{user.passport_series || "Undefined"}</td>
                            <td>{user.expiration_date || "Undefined"}</td>
                            <td className='flex'>
                                <Button
                                    type='primary'
                                    icon={<EditFilled />}
                                    style={{
                                        backgroundColor: "yellow",
                                        color: "white",
                                        marginRight: "10px",
                                        borderRadius: "50%",
                                    }}
                                />
                                <Button
                                    type='default'
                                    icon={<DeleteOutlined />}
                                    className='rounded-full bg-[red] text-white'
                                />
                                <Button
                                    type='default'
                                    onClick={handleAlert}
                                    className='border-none'>
                                    ✅
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default User;
