import Applications from "../page/applications";
import Register from "../page/applications/register";
import User from "../page/applications/user";
import Profile from "../page/applications/user/profile";
import Courses from "../page/courses";
import Modules from "../page/courses/module/module";
import Dashboard from "../page/dashboard/dashboard";
import Groups from "../page/groups";
import Excisting from "../page/groups/excisting";
import New from "../page/groups/new";
import Pending from "../page/groups/pending";
import Education from "../page/reports/education";
import Expense from "../page/reports/expense";
import Map from "../page/reports/map";
import Reports from "../page/reports/reports";
import Revenue from "../page/reports/revenue";
import Rooms from "../page/rooms";
import ExistingRoom from "../page/rooms/existing_room";
import NewRooms from "../page/rooms/new_room";
import Statics from "../page/statics/statics";
import Timetable from "../page/timetable";
import Login from "../page/register";

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
    },
    {
        id: 10,
        path: "/applications",
        element: <Applications />,
    },
    {
        id: 11,
        path: "/user",
        element: <User />,
    },
    {
        id: 12,
        path: "/register",
        element: <Register />
    },
    {
        id: 13,
        path: "/new",
        element: <New />
    },
    {
        id: 14,
        path: "/excisting",
        element: <Excisting />
    },
    {
        id: 15,
        path: "/pending",
        element: <Pending />
    },
    {
        id: 16,
        path: '/profile',
        element: <Profile />
    },
    {
        id: 17,
        path: "/courses",
        element: <Courses />
    },
    {
        id: 18,
        path: '/rooms',
        element: <Rooms />
    },
    {
        id: 19,
        path: '/new_room',
        element: <NewRooms />
    },
    {
        id: 20,
        path: '/modules',
        element: <Modules />
    },
    {
        id: 21,
        path: '/existing_room',
        element: <ExistingRoom />
    },
    {
        id: 22,
        path: '/login',
        element: <Login />
    }
]