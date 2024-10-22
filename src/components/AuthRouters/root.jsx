import { Route, Routes } from "react-router-dom";
import Signup from "./signup/signup";
import Signin from "./signup/signin";
import ForgotPassword from "./signup/forgotPassword";

const AuthRouters = () => {
    return (
        <Routes>
            <Route path='/' element={<Signin />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/forgot_password' element={<ForgotPassword />} />
        </Routes>
    );
};

export default AuthRouters;
