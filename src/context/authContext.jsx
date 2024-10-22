import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState(null);
    const token = localStorage.getItem("token");
    const API = "http://localhost:3000";
    const navigate = useNavigate();

    useEffect(() => {
        const checkToken = async () => {
            if (token) {
                try {
                    const response = await axios.get(`${API}/users/me`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (response.status === 200) {
                        setIsAuthenticated(true);
                        setRole(response.data.user.role);
                    }
                } catch (error) {
                    if (error.response && error.response.status === 401) {
                        // Token noto'g'ri yoki yaroqsiz
                        localStorage.removeItem("token");
                        setIsAuthenticated(false);
                        navigate("/"); // Bosh sahifaga yo'naltirish
                    } else {
                        console.error("Xatolik: ", error); // Boshqa xatoliklar
                    }
                }
            } else {
                setIsAuthenticated(false);
            }
        };

        checkToken();
    }, [token, navigate]);

    const login = (userRole) => {
        setIsAuthenticated(true);
        setRole(userRole);
        localStorage.setItem("token", userRole.token); // Tokenni saqlash (agar bunday bo'lsa)
    };

    const logout = () => {
        setIsAuthenticated(false);
        setRole(null);
        localStorage.removeItem("token");
        navigate("/"); // Bosh sahifaga yo'naltirish
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                role,
                login,
                logout,
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
