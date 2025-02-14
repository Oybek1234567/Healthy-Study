import ReactDOM from "react-dom/client";
import "./index.css";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import App from "./App.jsx";
import { AuthProvider } from "./context/authContext.jsx";

const history = createBrowserHistory();

ReactDOM.createRoot(document.getElementById("root")).render(
    <HistoryRouter history={history} basename='/'>
        <AuthProvider>
            <App />
        </AuthProvider>
    </HistoryRouter>
);
