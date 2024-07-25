import Dashboard from "../page/dashboard/dashboard";
import Groups from "../page/groups";
import Education from "../page/reports/education";
import Expense from "../page/reports/expense";
import Map from "../page/reports/map";
import Reports from "../page/reports/reports";
import Revenue from "../page/reports/revenue";
import Statics from "../page/statics/statics";
import Timetable from "../page/timetable";

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
    },
    {
        id: 3,
        path: "/reports",
        element: <Reports />,
    },
    {
        id: 4,
        path: "/education",
        element: <Education />,
    },
    {
        id: 5,
        path: "/revenue",
        element: <Revenue />,
    },
    {
        id: 6,
        path: "/expense",
        element: <Expense />,
    },
    {
        id: 7,
        path: "/map",
        element: <Map />,
    },
    {
        id: 8,
        path: "/groups",
        element: <Groups />
    },
    {
        id: 9,
        path: "/timetable",
        element: <Timetable />
    }
]