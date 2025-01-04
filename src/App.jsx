import AppRouters from "./components/AppRouters";
import AuthRouters from "./components/AuthRouters/root";
const App = () => {
    const token = localStorage.getItem("token");
    return token ? <AppRouters /> : <AuthRouters />
};

export default App;
