import Dashboard from "../page/dashboard";
import Statics from "../page/statics";

export const MenuList = [
    {
        id: 1,
        path: "/",
        element: <Dashboard />,
    },
    {
        id: 2,
        path: "/static",
        element: <Statics />,
    }
]