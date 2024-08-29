import Applications from "../page/applications";
import User from "../page/applications/user";
import Profile from "../page/applications/user/profile";
import Courses from "../page/courses";
import Modules from "../page/courses/module/module";
import Dashboard from "../page/dashboard/dashboard";
import Groups from "../page/groups";
import Excisting from "../page/groups/excisting";
import Pending from "../page/groups/pending";
import Education from "../page/reports/education";
import Expense from "../page/reports/expense";
import Map from "../page/reports/map";
import Reports from "../page/reports/reports";
import Revenue from "../page/reports/revenue";
import Rooms from "../page/rooms";
import Timetable from "../page/timetable";
import Login from "../page/register";
import Tests from "../page/courses/module/test";
import Success from "../page/register/success";
import Accepted from "../page/applications/user/accepted";
import UsersPending from "../page/applications/user/pending";
import Denied from "../page/applications/user/denied";
import Super from "../page/statics/super";
import Staff from "../page/statics/staff";
import ModuleLeader from "../page/statics/module-leader";
import Teacher from "../page/statics/teacher";
import Assistant from "../page/statics/assistant";
import Student from "../page/statics/student";
import Guest from "../page/statics/guest";
import AssignmentTypes from "../page/courses/module/test/exams/assignments";
import SubjectTests from "../page/courses/module/test/subjects/test";
import AllStatics from "../page/statics/all";
export const MenuList = [
    {
        id: 1,
        path: "/",
        element: <Dashboard />,
    },
    {
        id: 2,
        path: "/reports",
        element: <Reports />,
    },
    {
        id: 3,
        path: "/education",
        element: <Education />,
    },
    {
        id: 4,
        path: "/revenue",
        element: <Revenue />,
    },
    {
        id: 5,
        path: "/expense",
        element: <Expense />,
    },
    {
        id: 6,
        path: "/map",
        element: <Map />,
    },
    {
        id: 7,
        path: "/groups",
        element: <Groups />,
    },
    {
        id: 8,
        path: "/timetable",
        element: <Timetable />,
    },
    {
        id: 9,
        path: "/applications",
        element: <Applications />,
    },
    {
        id: 10,
        path: "/user",
        element: <User />,
    },
    {
        id: 11,
        path: "/excisting",
        element: <Excisting />,
    },
    {
        id: 12,
        path: "/pending",
        element: <Pending />,
    },
    {
        id: 13,
        path: "/profile",
        element: <Profile />,
    },
    {
        id: 14,
        path: "/courses",
        element: <Courses />,
    },
    {
        id: 15,
        path: "/rooms",
        element: <Rooms />,
    },
    {
        id: 16,
        path: "/courses/:id",
        element: <Modules />,
    },
    {
        id: 17,
        path: "/login",
        element: <Login />,
    },
    {
        id: 18,
        path: "/courses/:id/modules/:id",
        element: <Tests />,
    },
    {
        id: 19,
        path: "/success",
        element: <Success />,
    },
    {
        id: 20,
        path: "/accepted",
        element: <Accepted />,
    },
    {
        id: 21,
        path: "/user_pending",
        element: <UsersPending />,
    },
    {
        id: 22,
        path: "/denied",
        element: <Denied />,
    },
    {
        id: 23,
        path: "/super",
        element: <Super />,
    },
    {
        id: 24,
        path: "/staff",
        element: <Staff />,
    },
    {
        id: 25,
        path: "/assistant",
        element: <Assistant />,
    },
    {
        id: 26,
        path: "/module_leader",
        element: <ModuleLeader />,
    },
    {
        id: 27,
        path: "/teacher",
        element: <Teacher />,
    },
    {
        id: 28,
        path: "/student",
        element: <Student />,
    },
    {
        id: 29,
        path: "/guest",
        element: <Guest />,
    },
    {
        id: 30,
        path: "/modules/:moduleID/assignments/:assignmentID",
        element: <AssignmentTypes />,
    },
    {
        id: 31,
        path: "/modules/:moduleID/subjects/:id",
        element: <SubjectTests />,
    },
    {
        id: 32,
        path: "/all_statics",
        element: <AllStatics />,
    },
];
