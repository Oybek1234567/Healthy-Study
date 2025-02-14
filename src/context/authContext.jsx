import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
    isAuthenticated: false,
    role: null,
    setIsAuthenticated: () => {},
    setRole: () => {},
});

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState(null);
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
                    const userData = req.data.user;
                    setData(userData);
                    setRole(userData.role);
                    setIsAuthenticated(true);
                    console.log(userData);
                } catch (e) {
                    console.error("Error fetching user data:", e);
                }
            } else {
                console.log("Token not found");
            }
        };
        fetchData();
    }, [API, token]);

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, role, setIsAuthenticated, setRole }}>
            {children}
        </AuthContext.Provider>
    );
};
