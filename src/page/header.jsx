import axios from "axios";
import { useEffect, useState } from "react";

const HeaderPage = () => {
    const [data, setData] = useState(null); // Boshlang'ich qiymatni null qilish, massiv emas
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                try {
                    const req = await axios.get(
                        "http://localhost:3000/users/me",
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    setData(req.data.user);
                } catch (e) {
                    console.error("Error", e);
                }
            } else {
                console.log("Token not found");
            }
        };
        fetchData();
    }, [token]);

    return (
        <div>
            {data && (
                <div className="ml-[55%] absolute">
                    <p>
                        {data.name} <span>{data.surname}</span>
                    </p>
                </div>
            )}
        </div>
    );
};

export default HeaderPage;
