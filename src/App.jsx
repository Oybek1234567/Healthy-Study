import { useContext } from "react";
import { AuthContext, AuthProvider } from "./context/authContext";
import AppRouters from "./components/AppRouters";
import AuthRouters from "./components/AuthRouters/root";

const App = () => {
    const { isAuthenticated, role } = useContext(AuthContext);

    return isAuthenticated && role ? (
        <AppRouters role={role} />
        
    ) : (
        <AuthRouters />
    );
};

const WrappedApp = () => (
    <AuthProvider>
        <App />
    </AuthProvider>
);

export default WrappedApp; 
