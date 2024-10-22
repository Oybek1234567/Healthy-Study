import axios from "axios";
import { useState } from "react";

const useEdit = () => {
    const [editedUserData, setEditedUserData] = useState({});
    const [editRowKey, setEditRowKey] = useState(null);
    const [userData, setUserData] = useState([]);
    const API = "http://localhost:3000/";
    const handleSave = async () => {
         console.log("userData:", userData);
         console.log("editedUserData.id:", editedUserData.id);

         const originalUser = userData.find((user) => {
             console.log(
                 `Checking user ID: ${user.id} against edited ID: ${editedUserData.id}`
             );
             return user.id === editedUserData.id;
         });

         if (!originalUser) {
             console.error("Foydalanuvchi topilmadi.");
             alert("Foydalanuvchi topilmadi.");
             return;
         }

        const updatedFields = Object.keys(editedUserData).reduce((acc, key) => {
            if (editedUserData[key] !== originalUser[key]) {
                acc[key] = editedUserData[key];
            }
            return acc;
        }, {});
        console.log("O'zgartirilgan ma'lumotlar:", updatedFields);
        console.log("Tahrirlangan foydalanuvchi ID:", editedUserData.id);

        if (!Object.keys(updatedFields).length) {
            alert("Hech qanday o'zgarishlar topilmadi.");
            setEditRowKey(null);
            return;
        }

        try {
            const response = await axios.post(
                `${API}applications/edit/${editedUserData.id}`,
                updatedFields
            );

            console.log("Server response:", response);

            alert("Foydalanuvchi muvaffaqiyatli yangilandi");

            setUserData((prevData) =>
                prevData.map((user) =>
                    user.id === editedUserData.id
                        ? { ...user, ...updatedFields }
                        : user
                )
            );
            setEditRowKey(null);
        } catch (error) {
            console.error("Foydalanuvchini tahrirlashda xato:", error.message);
            alert(
                "Foydalanuvchini tahrirlashda xatolik yuz berdi: " +
                    error.message
            );
        }
    };

    const handleEdit = (user) => {
        setEditRowKey(user.id);
        setEditedUserData(user);
    };

    return {
        editedUserData,
        setEditedUserData,
        handleSave,
        handleEdit,
        userData,
        setUserData,
        editRowKey,
        setEditRowKey,
    };
};

export { useEdit };
