import AppRouters from "./components/AppRouters";
import AuthRouters from "./components/AuthRouters";

const App = () => {
    const login = true;
    return login ? <AppRouters /> : <AuthRouters />;
};

export default App;
