import { createContext, useState } from "react";
 
export const AuthContext = createContext({
    isAuthenticated: false, // default value
    role: null, // default value
    setIsAuthenticated: () => {}, // default function
    setRole: () => {},  
});
 
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState(null);

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, role, setIsAuthenticated, setRole }}>
            {children}
        </AuthContext.Provider>
    );
};
