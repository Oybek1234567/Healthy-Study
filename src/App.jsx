import { Routes, Route } from "react-router-dom";
import AppRouters from "./components/AppRouters";
import AuthRouters from "./components/AuthRouters/root"; // AuthRoutersni import qiling
import LandingPage from "./components/landingPage";

const App = () => {
    const token = localStorage.getItem("token");

    return (
        <Routes>
            <Route
                path='*'
                element={
                    token ? (
                        <AppRouters /> 
                    ) : (
                        <>
                            <AuthRouters/>  
                            <LandingPage />
                        </>
                    )
                }
            />
        </Routes>
    );
};

export default App;
