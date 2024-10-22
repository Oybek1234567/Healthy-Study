import { Modal } from "antd";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/authContext";

const AllStatics = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [roleFilter, setRoleFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all"); // Default value
    const [openModal, setOpenModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const { role } = useContext(AuthContext);
    const API = "http://localhost:3000";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API}/users/all`);
                console.log("Fetched user data:", response.data.users);
                setData(response.data.users || []);
                setFilteredData(response.data.users || []); // Set initial filtered data
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    // Function to filter data based on selected role and status
    useEffect(() => {
        const filtered = data.filter((item) => {
            const roleMatches =
                roleFilter === "all" || item.role === roleFilter;
            const statusMatches = statusFilter === 'all' ||  item.access === statusFilter; // Filter by access
            return roleMatches && statusMatches;
        });
        setFilteredData(filtered);
    }, [roleFilter, statusFilter, data]);

    const handleRoleChange = (e) => {
        setRoleFilter(e.target.value);
    };

    const handleStatusChange = (e) => {
        setStatusFilter(e.target.value);
    };

    // Function to handle opening the modal and setting the user to edit
    const handleEditClick = (user) => {
        setEditingUser(user); // Set the selected user data for editing
        setOpenModal(true); // Open the modal
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditingUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSaveChanges = async () => {
        try {
            const response = await axios.post(
                `${API}/users/edit/${editingUser.id}`,
                editingUser
            );
            console.log("User updated:", response.data);
            const fetchData = async () => {
                try {
                    const response = await axios.get(`${API}/users/all`);
                    setData(response.data.users || []);
                    setFilteredData(response.data.users || []); // Reset filtered data
                } catch (error) {
                    console.error("Error fetching updated data:", error);
                }
            };
            await fetchData();
        } catch (error) {
            console.error("Error updating user:", error);
        } finally {
            setOpenModal(false);
        }
    };

    console.log(editingUser);

    return (
        <div className='relative p-8 bg-gray-50'>
            <div className='flex justify-between'>
                <h1 className='text-3xl font-bold text-gray-800 mb-6'>
                    Foydalanuvchilar
                </h1>

                {role === "super" && (
                    <div className='flex gap-4'>
                        <div className='mb-6 flex justify-between items-center'>
                            <select
                                name='role'
                                id='role'
                                value={roleFilter}
                                onChange={handleRoleChange}
                                className='block w-32 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'>
                                <option value='all'>All</option>
                                <option value='super'>Super</option>
                                <option value='admin'>Admin</option>
                                <option value='head_teacher'>
                                    Head Teacher
                                </option>
                                <option value='teacher'>Teacher</option>
                                <option value='assistant'>Assistant</option>
                                <option value='student'>Student</option>
                                <option value='guest'>Guest</option>
                            </select>
                        </div>
                        <div className='mb-6'>
                            <select
                                name='access'
                                value={statusFilter}
                                onChange={handleStatusChange}
                                className='block w-32 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'>
                                <option value='allowed'>Allowed</option>
                                <option value='restricted'>Restricted</option>
                                <option value='all'>All</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>

            <div className='overflow-x-auto shadow-md rounded-lg'>
                <table className='min-w-full border border-gray-300 '>
                    <thead>
                        <tr className='bg-gray-100 text-center text-xl'>
                            <th className='px-4 py-2 border border-gray-300 cursor-pointer'>
                                ID
                            </th>
                            <th className='px-4 py-2 border border-gray-300 cursor-pointer'>
                                Name
                            </th>
                            <th className='px-4 py-2 border border-gray-300 cursor-pointer'>
                                Surname
                            </th>
                            <th className='px-4 py-2 border border-gray-300 cursor-pointer'>
                                Date of Birth
                            </th>
                            <th className='px-4 py-2 border border-gray-300 cursor-pointer'>
                                Phone
                            </th>
                            <th className='px-4 py-2 border border-gray-300 cursor-pointer'>
                                Role
                            </th>
                            <th className='px-4 py-2 border border-gray-300 cursor-pointer'>
                                Access
                            </th>
                            {role === "super" && (
                                <th className='px-4 py-2 border border-gray-300 cursor-pointer'>
                                    Action
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className='text-xl'>
                        {filteredData.map((item) => (
                            <tr key={item.id}>
                                <td className='px-4 py-2 border border-gray-300'>
                                    {item.id}
                                </td>
                                <td className='px-4 py-2 border border-gray-300'>
                                    {item.name}
                                </td>
                                <td className='px-4 py-2 border border-gray-300'>
                                    {item.surname}
                                </td>
                                <td className='px-4 py-2 border border-gray-300'>
                                    {item.date_of_birth
                                        ? item.date_of_birth.slice(0, 10)
                                        : "Undefined"}
                                </td>
                                <td className='px-4 py-2 border border-gray-300'>
                                    {item.phone}
                                </td>
                                <td className='px-4 py-2 border border-gray-300'>
                                    {item.role}
                                </td>
                                <td className='px-4 py-2 border border-gray-300'>
                                    {item.access}
                                </td>
                                {role === "super" && (
                                    <td className='px-4 py-2 border border-gray-300 text-center'>
                                        <button
                                            onClick={() =>
                                                handleEditClick(item)
                                            }>
                                            ✏
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal
                open={openModal}
                onCancel={() => setOpenModal(false)}
                onOk={handleSaveChanges} // Save changes on 'OK'
            >
                {editingUser && (
                    <div className='w-full max-w-lg p-6 mx-auto bg-white rounded-lg shadow-lg space-y-4'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>
                                Name:
                            </label>
                            <input
                                name='name'
                                value={editingUser.name || ""}
                                onChange={handleInputChange}
                                className='block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-4 py-2'
                            />
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>
                                Surname:
                            </label>
                            <input
                                name='surname'
                                value={editingUser.surname || ""}
                                onChange={handleInputChange}
                                className='block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-4 py-2'
                            />
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>
                                Date of Birth:
                            </label>
                            <input
                                type='date'
                                name='date_of_birth'
                                value={editingUser.date_of_birth || ""}
                                onChange={handleInputChange}
                                className='block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-4 py-2'
                            />
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>
                                Phone:
                            </label>
                            <input
                                name='phone'
                                value={editingUser.phone || ""}
                                onChange={handleInputChange}
                                className='block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-4 py-2'
                            />
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>
                                Role:
                            </label>
                            <select
                                name='role'
                                value={editingUser.role || ""}
                                onChange={handleInputChange}
                                className='block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-4 py-2'>
                                <option value='super'>Super</option>
                                <option value='admin'>Admin</option>
                                <option value='assistant'>Assistant</option>
                                <option value='teacher'>Teacher</option>
                                <option value='student'>Student</option>
                                <option value='guest'>Guest</option>
                            </select>
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>
                                Access:
                            </label>
                            <select
                                name='access'
                                value={editingUser.access || ""}
                                onChange={handleInputChange}
                                className='block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-4 py-2'>
                                <option value='restricted'>Restricted</option>
                                <option value='allowed'>Allowed</option>
                            </select>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default AllStatics;
