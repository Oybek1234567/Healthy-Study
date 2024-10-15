// import { Link } from "react-router-dom";

import { useEffect } from "react";

const Logout = () => {
    useEffect(() => {
        localStorage.removeItem("token");
        window.location.href = "/";
    }, [])

    return <></>;
};

export default Logout;
