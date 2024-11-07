import { DownOutlined, UpOutlined } from "@ant-design/icons";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import * as XLSX from "xlsx";
import UserDrawer from "./drawer";
import useDrawer from "../../hooks/useDrawer";
import { Modal } from "antd";
import { AuthContext } from "../../context/authContext";

const Applications = () => {
    const [userData, setUserData] = useState([]);
    const [sortConfig, setSortConfig] = useState(null);
    const [statusFilter, setStatusFilter] = useState("pending");
    const [openModal, setOpenModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const { role } = useContext(AuthContext);
    const API = "http://localhost:3000";

    const { open, onOpen, onClose } = useDrawer();

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
                const response = await axios.get(`${API}/applications/all`);
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

    const handleStatusChange = (e) => {
        setStatusFilter(e.target.value);
    };

    const filteredUserData = userData.filter((user) => {
        if (statusFilter === "all") return true;
        return user.status === statusFilter;
    });

    const handleEdit = (user) => {
        setSelectedUser(user);
        setOpenModal(true);
    };

    const handleSave = async () => {
        try {
            await axios.post(
                `${API}/applications/edit/${selectedUser.id}`,
                selectedUser
            );
            const updatedUserData = userData.map((user) =>
                user.id === selectedUser.id ? selectedUser : user
            );
            setUserData(updatedUserData);
            setOpenModal(false);
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    };

    const handleDeny = async (id) => {
        try {
            await axios.post(`${API}/applications/deny/${id}`);
            window.location.reload();
        } catch (e) {
            console.error(e);
        }
    };
    const handleAccept = async (id, user) => {
        const { name, surname, phone, date_of_birth, password } = user;
        console.log(password);
        try {
            await axios.post(`${API}/users/create/${id}`, {
                name,
                surname,
                phone,
                date_of_birth,
                password
                
            });
            window.location.reload();
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className='relative p-8 bg-gray-50'>
            <h1 className='text-3xl font-bold text-gray-800 mb-6'>Arizalar</h1>

            {(role === "super") && (
                <div className='ml-[84%] -translate-y-[61px]'>
                    <select
                        id='status'
                        name='status'
                        value={statusFilter}
                        onChange={handleStatusChange}
                        className='border-2 border-black rounded-md px-2 py-1 focus:outline-none focus:border-gray-500'>
                        <option value='pending'>Pending</option>
                        <option value='accepted'>Accepted</option>
                        <option value='denied'>Denied</option>
                        <option value='all'>All</option>
                    </select>
                </div>
            )}
            {role === "super" && (
                <a
                    href='#'
                    onClick={handleDownloadExcel}
                    className='mb-4 inline-block px-4 ml-[68%] -translate-y-24 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition hover:text-white'>
                    Download Excel
                </a>
            )}

            {(role === "super" || role === "admin") && (
                <button
                    type='button'
                    className='bg-green-600 mt-2 w-12 h-12 text-white rounded-full absolute top-4 right-10 flex items-center justify-center shadow-lg hover:bg-green-700 transition'
                    onClick={onOpen}>
                    +
                </button>
            )}

            <UserDrawer open={open} onClosed={onClose} />

            <table className='min-w-full border border-gray-300 -translate-y-20'>
                <thead>
                    <tr className='bg-gray-100 text-center text-xl'>
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
                        {(role === "super" || role === "admin") && (
                            <th className='px-4 py-2 border border-gray-300 cursor-pointer'>
                                Status
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {filteredUserData.map((user) => (
                        <tr key={user.id} className='hover:bg-gray-50 text-xl'>
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
                            {(role === "super" || role === "admin") && (
                                <td className='px-4 py-2 border border-gray-300'>
                                    {user.status === "pending" && (
                                        <div>
                                            <button
                                                onClick={() => handleEdit(user)}
                                                className='text-black rounded-lg p-2'>
                                                ✏
                                            </button>
                                            <button
                                                className='mr-2'
                                                onClick={() =>
                                                    handleDeny(user.id)
                                                }>
                                                ❌
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleAccept(user.id, user)
                                                }>
                                                ✔
                                            </button>
                                        </div>
                                    )}
                                    {user.status === "accepted" && (
                                        <span className='text-green-600'>
                                            Accepted
                                        </span>
                                    )}
                                    {user.status === "denied" && (
                                        <span className='text-red-600'>
                                            Denied
                                        </span>
                                    )}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal
                title='Edit User'
                open={openModal}
                onCancel={() => setOpenModal(false)}
                footer={[
                    <button
                        key='back'
                        onClick={() => setOpenModal(false)}
                        className='px-4 py-2 mr-4 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition'>
                        Cancel
                    </button>,
                    <button
                        key='submit'
                        type='primary'
                        onClick={handleSave}
                        className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'>
                        Save
                    </button>,
                ]}
                style={{ padding: "20px", borderRadius: "0.5rem" }} // Optional style for the modal body
            >
                <div className='space-y-4'>
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>
                            Name:
                        </label>
                        <input
                            type='text'
                            name='name'
                            value={selectedUser?.name || ""}
                            onChange={(e) =>
                                setSelectedUser({
                                    ...selectedUser,
                                    name: e.target.value,
                                })
                            }
                            className='mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-400'
                            placeholder='Enter name'
                        />
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>
                            Surname:
                        </label>
                        <input
                            type='text'
                            name='surname'
                            value={selectedUser?.surname || ""}
                            onChange={(e) =>
                                setSelectedUser({
                                    ...selectedUser,
                                    surname: e.target.value,
                                })
                            }
                            className='mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-400'
                            placeholder='Enter surname'
                        />
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>
                            Date of Birth:
                        </label>
                        <input
                            type='date'
                            name='date_of_birth'
                            value={selectedUser?.date_of_birth || ""}
                            onChange={(e) =>
                                setSelectedUser({
                                    ...selectedUser,
                                    date_of_birth: e.target.value,
                                })
                            }
                            className='mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-400'
                        />
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>
                            Phone:
                        </label>
                        <input
                            type='text'
                            name='phone'
                            value={selectedUser?.phone || ""}
                            onChange={(e) =>
                                setSelectedUser({
                                    ...selectedUser,
                                    phone: e.target.value,
                                })
                            }
                            className='mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-400'
                            placeholder='Enter phone number'
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Applications;
