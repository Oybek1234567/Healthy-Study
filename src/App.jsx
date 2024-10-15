import { useEffect, useState } from "react";
import AppRouters from "./components/AppRouters";
import AuthRouters from "./components/AuthRouters/root";
import axios from "axios";

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const checkToken = async () => {
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

                    if (req.status === 200) {
                        setIsAuthenticated(true);
                    }
                } catch (error) {
                    if (error.response && error.response.status === 401) {
                        localStorage.removeItem("token");
                        setIsAuthenticated(false);
                        window.location.reload()
                        window.location.href = '/'   
                    }
                }
            } else {
                setIsAuthenticated(false); 
            }
        };
        checkToken();
    }, [token]);

    return isAuthenticated || token ? <AppRouters /> : <AuthRouters />;
};

export default App;
