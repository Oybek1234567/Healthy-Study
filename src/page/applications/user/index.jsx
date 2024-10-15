import { DownOutlined, UpOutlined } from "@ant-design/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import useDrawer from "../../../hooks/useDrawer";
import UserDrawer from "./drawer";

const User = () => {
    const [selectedStatuses, setSelectedStatuses] = useState([]);
    const { open, onOpen, onClose } = useDrawer();
    const [userData, setUserData] = useState([]);
    const [sortConfig, setSortConfig] = useState(null);
    const API = "http://localhost:3000";

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${API}/applications/all`
                );
                setUserData(response.data.users || []);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

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
        <div className='p-5'>
            <a
                href='#'
                onClick={handleDownloadExcel}
                className='mb-4 inline-block px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition hover:text-white'>
                Download Excel
            </a>

            <div className='flex items-center gap-4 text-lg my-5'>
                <label className='cursor-pointer'>
                    <input
                        type='checkbox'
                        onChange={() => handleCheckboxChange("accepted")}
                        className='mr-2'
                    />
                    Accepted
                </label>
                <label className='cursor-pointer'>
                    <input
                        type='checkbox'
                        onChange={() => handleCheckboxChange("pending")}
                        className='mr-2'
                    />
                    Pending
                </label>
                <label className='cursor-pointer'>
                    <input
                        type='checkbox'
                        onChange={() => handleCheckboxChange("denied")}
                        className='mr-2'
                    />
                    Denied
                </label>
            </div>

            <button
                type='button'
                className='bg-green-600 w-12 h-12 mt-32 text-white rounded-full absolute top-4 right-10 flex items-center justify-center shadow-lg hover:bg-green-700 transition'
                onClick={onOpen}>
                +
            </button>

            <UserDrawer open={open} onClosed={onClose} />

            <table className='w-full mt-8 table-auto border-collapse border border-gray-300'>
                <thead>
                    <tr className='bg-gray-100 text-left'>
                        <th className='px-4 py-2 border border-gray-300'>ID</th>
                        <th
                            onClick={() => handleSort("name")}
                            className='px-4 py-2 border border-gray-300 cursor-pointer'>
                            Name
                            {sortConfig?.key === "name" &&
                            sortConfig?.direction === "ascending" ? (
                                <UpOutlined className='ml-2 inline-block' />
                            ) : (
                                <DownOutlined className='ml-2 inline-block' />
                            )}
                        </th>
                        <th
                            onClick={() => handleSort("surname")}
                            className='px-4 py-2 border border-gray-300 cursor-pointer'>
                            Surname
                            {sortConfig?.key === "surname" &&
                            sortConfig?.direction === "ascending" ? (
                                <UpOutlined className='ml-2 inline-block' />
                            ) : (
                                <DownOutlined className='ml-2 inline-block' />
                            )}
                        </th>
                        <th
                            onClick={() => handleSort("date_of_birth")}
                            className='px-4 py-2 border border-gray-300 cursor-pointer'>
                            Date Of Birth
                            {sortConfig?.key === "date_of_birth" &&
                            sortConfig?.direction === "ascending" ? (
                                <UpOutlined className='ml-2 inline-block' />
                            ) : (
                                <DownOutlined className='ml-2 inline-block' />
                            )}
                        </th>
                        <th className='px-4 py-2 border border-gray-300'>
                            Phone
                        </th>
                        <th
                            onClick={() => handleSort("role")}
                            className='px-4 py-2 border border-gray-300 cursor-pointer'>
                            Role
                            {sortConfig?.key === "role" &&
                            sortConfig?.direction === "ascending" ? (
                                <UpOutlined className='ml-2 inline-block' />
                            ) : (
                                <DownOutlined className='ml-2 inline-block' />
                            )}
                        </th>
                        <th
                            onClick={() => handleSort("passport_series")}
                            className='px-4 py-2 border border-gray-300 cursor-pointer'>
                            Passport Series
                            {sortConfig?.key === "passport_series" &&
                            sortConfig?.direction === "ascending" ? (
                                <UpOutlined className='ml-2 inline-block' />
                            ) : (
                                <DownOutlined className='ml-2 inline-block' />
                            )}
                        </th>
                        <th
                            onClick={() => handleSort("expiration_date")}
                            className='px-4 py-2 border border-gray-300 cursor-pointer'>
                            Expiration Date
                            {sortConfig?.key === "expiration_date" &&
                            sortConfig?.direction === "ascending" ? (
                                <UpOutlined className='ml-2 inline-block' />
                            ) : (
                                <DownOutlined className='ml-2 inline-block' />
                            )}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUserData &&
                        filteredUserData.map((user) => (
                            <tr key={user.id} className='hover:bg-gray-50'>
                                <td className='px-4 py-2 border border-gray-300'>
                                    {user.id}
                                </td>
                                <td className='px-4 py-2 border border-gray-300'>
                                    {user.name}
                                </td>
                                <td className='px-4 py-2 border border-gray-300'>
                                    {user.surname}
                                </td>
                                <td className='px-4 py-2 border border-gray-300'>
                                    {user.date_of_birth
                                        ? user.date_of_birth.slice(0, 10)
                                        : ""}
                                </td>
                                <td className='px-4 py-2 border border-gray-300'>
                                    {user.phone}
                                </td>
                                <td className='px-4 py-2 border border-gray-300'>
                                    {user.role}
                                </td>
                                <td className='px-4 py-2 border border-gray-300'>
                                    {user.passport_series}
                                </td>
                                <td className='px-4 py-2 border border-gray-300'>
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
