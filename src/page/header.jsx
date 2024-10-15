import axios from "axios";
import { useEffect, useState } from "react";

const HeaderPage = () => {
    const [data, setData] = useState(null);
    const token = localStorage.getItem("token");
    let API = "http://localhost:3000";
    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                try {
                    const req = await axios.get(
                        `${API}/users/me`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
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
