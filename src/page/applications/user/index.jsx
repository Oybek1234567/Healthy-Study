import { DownOutlined, UpOutlined } from "@ant-design/icons";
// import { Input, Modal } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import useDrawer from "../../../hooks/useDrawer";
import UserDrawer from "./drawer";
import { useSort } from "../../../hooks/useSort";
const User = () => {
    const [selectedStatuses, setSelectedStatuses] = useState([]);
    const { open, onOpen, onClose } = useDrawer();
    const [userData, setUserData] = useState([]);
    // useSort
    const { handleSort, sortConfig } = useSort(userData, setUserData);

    // useDelete

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
    }, [setUserData]);

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
    const handleCheckboxChange = (status) => {
        setSelectedStatuses((prevStatuses) =>
            prevStatuses.includes(status)
                ? prevStatuses.filter((s) => s !== status)
                : [...prevStatuses, status]
        );
    };
    const filteredUserData = userData.filter(
        (user) =>
            selectedStatuses.length === 0 ||
            selectedStatuses.includes(user.status)
    );

    return (
        <div>
            <a
                href='#'
                onClick={handleDownloadExcel}
                style={{ marginBottom: "10px" }}>
                Download Excel
            </a>
            <div className='flex mt-2 text-xl gap-3'>
                <label htmlFor='accepted'>Accepted</label>
                <input
                    type='checkbox'
                    id='accepted'
                    onChange={() => handleCheckboxChange("accepted")}
                    className='cursor-pointer'
                />
                <label htmlFor='pending'>Pending</label>
                <input
                    type='checkbox'
                    id='pending'
                    onChange={() => handleCheckboxChange("pending")}
                    className='cursor-pointer'
                />
                <label htmlFor='denied'>Denied</label>
                <input
                    type='checkbox'
                    id='denied'
                    onChange={() => handleCheckboxChange("denied")}
                    className='cursor-pointer'
                />
            </div>
            <button
                type='button'
                className='ml-[95%] w-10 h-10 bg-[green] rounded-full text-white'
                onClick={onOpen}>
                +
            </button>
            <UserDrawer open={open} onClosed={onClose} />
            <table className='mt-5'>
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
                    </tr>
                </thead>
                <tbody>
                    {filteredUserData && filteredUserData.map((user) => (
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
                            <td>{user.role}</td>
                            <td>{user.passport_series}</td>
                            <td>
                                {user.expiration_date
                                    ? user.expiration_date.slice(0, 10)
                                    : ""}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default User;
