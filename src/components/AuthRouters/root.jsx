import { Route, Routes } from "react-router-dom";
import Signup from "./signup/signup";
import Signin from "./signup/signin";
import ForgotPassword from "./signup/forgotPassword";
import VerifyPage from "./signup/verify";

const AuthRouters = () => {
    return (
        <Routes>
            <Route path='/' element={<Signin />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/forgot_password' element={<ForgotPassword />} />
            <Route path='/verify' element={<VerifyPage/>} />
        </Routes>
    );
};

export default AuthRouters;
