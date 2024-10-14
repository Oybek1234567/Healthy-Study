// import { Link } from "react-router-dom";

import { useEffect } from "react";

const Logout = () => {
    useEffect(() => {
        localStorage.removeItem("token");
        window.location.href = "/";
    }, [])

    return <div>
        {/* <Link onClick={handleLogout} className="underline cursor-pointer">Logout</Link> */}
    </div>;
};

export default Logout;
