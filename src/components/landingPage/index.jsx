import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import { useState } from "react";

const LandingPage = () => {
    const [visible, setVisible] = useState(true);
    const navigate = useNavigate();

    const handleSignInClick = () => {
        setVisible(false);
        navigate("/login");
    };

    return (
        <div className={visible ? "opacity-100" : "hidden"}>
            <Navbar handleSignInClick={handleSignInClick} />
        </div>
    );
};

export default LandingPage;
