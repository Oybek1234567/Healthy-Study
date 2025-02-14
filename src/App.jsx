import AppRouters from "./components/AppRouters";
import AuthRouters from "./components/AuthRouters/root";
import axios from "axios"
const App = () => {
    const token = localStorage.getItem("token");
     axios.interceptors.response.use(
         (response) => response,
         (error) => {
             if (error.response && error.response.status === 401) {
                 localStorage.removeItem("token");
                 window.location.reload();
             }
             return Promise.reject(error);
         }
     );
    return token ? <AppRouters /> : <AuthRouters />
};

export default App;
