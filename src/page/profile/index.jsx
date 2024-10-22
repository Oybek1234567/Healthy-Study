import axios from "axios";
import { useEffect, useState } from "react";

const Profile = () => {
    const [data, setData] = useState({});
    const token = localStorage.getItem("token");
    const API = "http://localhost:3000";

    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                try {
                    const req = await axios.get(`${API}/users/me`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setData(req.data.user);
                    console.log(req.data.user);
                } catch (e) {
                    console.error("Error", e);
                }
            } else {
                console.log("Token not found");
            }
        };
        fetchData();
    }, [API, token]);

    return (
        <div className='max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-10'>
            <h2 className='text-2xl font-semibold text-center mb-4'>Profile</h2>
            <div className='space-y-3'>
                <div className='flex justify-between'>
                    <span className='font-medium'>ID:</span>
                    <span>{data.id}</span>
                </div>
                <div className='flex justify-between'>
                    <span className='font-medium'>Name:</span>
                    <span>{data.name}</span>
                </div>
                <div className='flex justify-between'>
                    <span className='font-medium'>Surname:</span>
                    <span>{data.surname}</span>
                </div>
                <div className='flex justify-between'>
                    <span className='font-medium'>Phone:</span>
                    <span>{data.phone}</span>
                </div>
                <div className='flex justify-between'>
                    <span className='font-medium'>Date of Birth:</span>
                    <span>{data.date_of_birth?.slice(0, 10)}</span>
                </div>
                <div className='flex justify-between'>
                    <span className='font-medium'>Role:</span>
                    <span>{data.role}</span>
                </div>
            </div>
        </div>
    );
};

export default Profile;
