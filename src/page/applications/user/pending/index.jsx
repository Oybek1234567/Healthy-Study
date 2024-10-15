import { DownOutlined, UpOutlined } from "@ant-design/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSort } from "../../../../hooks/useSort";
import { Button, Input, Modal, Select } from "antd";
import { Option } from "antd/es/mentions";

const UsersPending = () => {
    const [data, setData] = useState([]);
    const [userData, setUserData] = useState([]);
    const { handleSort, sortConfig } = useSort(userData, setUserData);
    const [disabledButtons, setDisabledButtons] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editUser, setEditUser] = useState(null);
    const API = "http://localhost:3000";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const req = await axios.get(
                    `${API}/applications/pending`
                );
                setData(req.data.users);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const handleDeleteClick = async (userId) => {
        try {
            await handleDelete(userId);
            setDisabledButtons((prev) => ({
                ...prev,
                [userId]: true,
            }));
            window.location.reload();
        } catch (error) {
            console.error("Error deleting user:", error.message);
        }
    };

    const handleSubmitClick = (user) => {
        window.location.reload();
        handleSubmit(user);
        setDisabledButtons((prev) => ({
            ...prev,
            [user.id]: true,
        }));
    };

    const handleSubmit = async (user) => {
        try {
            const res = await axios.post(
                `${API}/users/create`,
                user
            );
            alert("Success");
            setData(() => res.data.user);
        } catch (error) {
            console.error(
                "Error posting data",
                error.response ? error.response.data : error.message
            );
        }
    };

    const handleDelete = async (user) => {
        const ids = user.id;

        try {
            await axios.post(
                `${API}/applications/deny/${ids}`,
                user
            );
        } catch (error) {
            console.log("Error", error);
        }
    };

    const handleEditClick = (user) => {
        setEditUser(user);
        setIsModalVisible(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSaveClick = async () => {
        try {
            const response = await axios.post(
                `${API}/applications/edit/${editUser.id}`,
                editUser
            );
            if (response.status === 200) {
                alert("Foydalanuvchi ma'lumotlari muvaffaqiyatli tahrirlandi");
                setData((prevData) =>
                    prevData.map((user) =>
                        user.id === editUser.id ? response.data.user : user
                    )
                );
                setIsModalVisible(false);
            }
        } catch (error) {
            console.error(
                "Foydalanuvchini tahrirlashda xatolik yuz berdi:",
                error.response ? error.response.data : error.message
            );
            alert(
                error.response?.data?.msg ||
                    "Foydalanuvchini tahrirlashda xatolik yuz berdi"
            );
        }
    };

    return (
        <div className='p-4'>
            <table className='min-w-full bg-white border border-gray-300 rounded-lg shadow-md'>
                <thead className='bg-gray-200'>
                    <tr>
                        <th className='p-2 border-b'>ID</th>
                        <th
                            onClick={() => handleSort("name")}
                            className='p-2 border-b cursor-pointer'>
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
                            className='p-2 border-b cursor-pointer'>
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
                            className='p-2 border-b cursor-pointer'>
                            Date Of Birth
                            {sortConfig?.key === "date_of_birth" &&
                            sortConfig?.direction === "ascending" ? (
                                <UpOutlined />
                            ) : (
                                <DownOutlined />
                            )}
                        </th>
                        <th className='p-2 border-b'>Phone</th>
                        <th
                            onClick={() => handleSort("role")}
                            className='p-2 border-b cursor-pointer'>
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
                            className='p-2 border-b cursor-pointer'>
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
                            className='p-2 border-b cursor-pointer'>
                            Expiration Date
                            {sortConfig?.key === "expiration_date" &&
                            sortConfig?.direction === "ascending" ? (
                                <UpOutlined />
                            ) : (
                                <DownOutlined />
                            )}
                        </th>
                        <th className='p-2 border-b'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data &&
                        data.map((user) => (
                            <tr key={user.id} className='hover:bg-gray-100'>
                                <td className='p-2 border-b'>{user.id}</td>
                                <td className='p-2 border-b'>{user.name}</td>
                                <td className='p-2 border-b'>{user.surname}</td>
                                <td className='p-2 border-b'>{user.phone}</td>
                                <td className='p-2 border-b'>
                                    {user.date_of_birth
                                        ? user.date_of_birth.slice(0, 10)
                                        : ""}
                                </td>
                                <td className='p-2 border-b'>{user.role}</td>
                                <td className='p-2 border-b'>
                                    {user.passport_series}
                                </td>
                                <td className='p-2 border-b'>
                                    {user.expiration_date
                                        ? user.expiration_date.slice(0, 10)
                                        : ""}
                                </td>
                                <td className='p-2 border-b flex space-x-2'>
                                    <button
                                        onClick={() => handleEditClick(user)}
                                        className='text-blue-600 hover:text-blue-800'>
                                        ✏️
                                    </button>
                                    <button
                                        className='border-none text-red-600 hover:text-red-800'
                                        onClick={() => handleDeleteClick(user)}
                                        disabled={disabledButtons[user.id]}>
                                        ❌
                                    </button>
                                    <Button
                                        type='default'
                                        onClick={() => handleSubmitClick(user)}
                                        className='border-none text-green-600 hover:text-green-800'
                                        disabled={disabledButtons[user.id]}>
                                        ✅
                                    </Button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

            {/* Edit Modal */}
            {editUser && (
                <Modal
                    title='Edit User'
                    open={isModalVisible}
                    onCancel={() => setIsModalVisible(false)}
                    footer={[
                        <Button
                            key='save'
                            type='primary'
                            onClick={handleSaveClick}>
                            Save
                        </Button>,
                    ]}>
                    <div className='flex flex-col gap-4'>
                        <Input
                            name='name'
                            placeholder='Name'
                            value={editUser.name}
                            onChange={handleInputChange}
                            className='border border-gray-300 rounded p-2'
                        />
                        <Input
                            name='surname'
                            placeholder='Surname'
                            value={editUser.surname}
                            onChange={handleInputChange}
                            className='border border-gray-300 rounded p-2'
                        />
                        <Input
                            type='date'
                            name='date_of_birth'
                            value={editUser.date_of_birth}
                            onChange={handleInputChange}
                            className='border border-gray-300 rounded p-2'
                        />
                        <Input
                            name='phone'
                            placeholder='Phone'
                            value={editUser.phone}
                            onChange={handleInputChange}
                            className='border border-gray-300 rounded p-2'
                        />
                        <Select
                            className='w-full border border-gray-300 rounded'
                            value={editUser.role}
                            onChange={(value) =>
                                setEditUser({ ...editUser, role: value })
                            }>
                            <Option value='admin'>Admin</Option>
                            <Option value='user'>User</Option>
                        </Select>
                        <Input
                            name='passport_series'
                            placeholder='Passport Series'
                            value={editUser.passport_series}
                            onChange={handleInputChange}
                            className='border border-gray-300 rounded p-2'
                        />
                        <Input
                            type='date'
                            name='expiration_date'
                            value={editUser.expiration_date}
                            onChange={handleInputChange}
                            className='border border-gray-300 rounded p-2'
                        />
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default UsersPending;
