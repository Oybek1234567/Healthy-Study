import { DownOutlined, UpOutlined } from "@ant-design/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSort } from "../../../../hooks/useSort";
import { Button, Input, Modal } from "antd";

const UsersPending = () => {
    const [data, setData] = useState([]);
    const [userData, setUserData] = useState([]);
    const { handleSort, sortConfig } = useSort(userData, setUserData);
    const [disabledButtons, setDisabledButtons] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editUser, setEditUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const req = await axios.get(
                    "http://localhost:3000/applications/pending"
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
            window.location.reload()
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
                "http://localhost:3000/users/create",
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
                `http://localhost:3000/applications/deny/${ids}`,
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
            `http://localhost:3000/applications/edit/${editUser.id}`,
            editUser
        );
        if (response.status === 200) {
            alert("Foydalanuvchi ma'lumotlari muvaffaqiyatli tahrirlandi");
            setData((prevData) =>
                prevData.map((user) =>
                    user.id === editUser.id ? response.data.user : user
                )
            );
            window.location.reload()
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
                    {data.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.surname}</td>
                            <td>{user.phone}</td>
                            <td>
                                {user.date_of_birth
                                    ? user.date_of_birth.slice(0, 10)
                                    : ""}
                            </td>
                            <td>{user.role}</td>
                            <td>{user.passport_series}</td>
                            <td>{user.expiration_date ? user.expiration_date.slice(0, 10) : ""}</td>
                            <td className='flex'>
                                <button onClick={() => handleEditClick(user)}>
                                    ✏️
                                </button>
                                <button
                                    className='border-none'
                                    onClick={() => handleDeleteClick(user)}
                                    disabled={disabledButtons[user.id]}>
                                    ❌
                                </button>
                                <Button
                                    type='default'
                                    onClick={() => handleSubmitClick(user)}
                                    className='border-none'
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
                    <div className='flex flex-col gap-2'>
                        <Input
                            name='name'
                            placeholder='Name'
                            value={editUser.name}
                            onChange={handleInputChange}
                        />
                        <Input
                            name='surname'
                            placeholder='Surname'
                            value={editUser.surname}
                            onChange={handleInputChange}
                        />
                        <Input
                            name='date_of_birth'
                            placeholder='Date of Birth'
                            value={editUser.date_of_birth}
                            onChange={handleInputChange}
                        />
                        <Input
                            name='phone'
                            placeholder='Phone'
                            value={editUser.phone}
                            onChange={handleInputChange}
                        />
                        <Input
                            name='role'
                            placeholder='Role'
                            value={editUser.role}
                            onChange={handleInputChange}
                        />
                        <Input
                            name='passport_series'
                            placeholder='Passport Series'
                            value={editUser.passport_series}
                            onChange={handleInputChange}
                        />
                        <Input
                            name='expiration_date'
                            type="date"
                            placeholder='Expiration Date'
                            value={editUser.expiration_date}
                            onChange={handleInputChange}
                        />
                        <Input
                            name='status'
                            placeholder='Status'
                            value={editUser.status}
                            onChange={handleInputChange}
                        />
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default UsersPending;
