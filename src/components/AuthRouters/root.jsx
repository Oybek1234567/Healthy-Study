import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./sign/signup";
import ForgotPassword from "./sign/forgotPassword";
import VerifyPage from "./sign/verify";
import Signin from "./sign/login";

const AuthRouters = () => {
    return (
        <div>
            <div>
                <Routes>
                    <Route path='/login' element={<Signin />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route
                        path='/forgot_password'
                        element={<ForgotPassword />}
                    />
                    <Route path='/verify' element={<VerifyPage />} />
                    <Route path="*" element={<Navigate to={'/login'}/>} />
                </Routes>
            </div>
        </div>
    );
};

export default AuthRouters;
