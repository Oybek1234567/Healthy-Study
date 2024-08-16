import axios from "axios";
import { useState } from "react";

const useDelete = () => {
    const [userData, setUserData] = useState([]);

    const handleDelete = async (user) => {
        const phoneNum = user.phone;
        try {
            const res = await axios.post(
                `http://localhost:3000/applications/deny/${phoneNum}`
            );
            if (res.data && res.data.user) {
                alert("User deleted successfully");
                setUserData((prevData) =>
                    prevData.filter((u) => u.phone !== user.phone)
                );
            } else {
                alert("User deleted successfully");
            }
        } catch (error) {
            const errorMsg = error.response
                ? error.response.data.message
                : error.message;
            console.error("Error denying user:", errorMsg);
            alert("Failed to deny user: " + errorMsg);
        }
    };

    return { handleDelete, userData, setUserData };
};

export default useDelete;
