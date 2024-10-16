import Applications from "../page/applications";
import User from "../page/applications/user";
import Profile from "../page/applications/user/profile";
import Courses from "../page/courses";
import Dashboard from "../page/dashboard/dashboard";
import Groups from "../page/groups";
import Pending from "../page/groups/pending";
import Education from "../page/reports/education";
import Expense from "../page/reports/expense";
import Map from "../page/reports/map";
import Reports from "../page/reports/reports";
import Revenue from "../page/reports/revenue";
import Rooms from "../page/rooms";
import Timetable from "../page/timetable";
import Tests from "../page/courses/module/test";
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
import Excisting from "../page/groups/excisting";
import Page from "../page/groups/excisting/page";
import LessonReports from "../page/groups/excisting/lesson_reports";
import Assignments from "../page/groups/excisting/assignments";
import ModulesTab from "../page/courses/module";
import AssignmentLevels from "../page/courses/module/test/exams/assignments/levels";
import Exams from "../page/exams";
import Signup from "../components/AuthRouters/signup/signin";
import Logout from "../page/logout";
import AuthRouters from "../components/AuthRouters/root";
import ExamsTest from "../page/exams/test";
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
        path: "/groups/excisting",
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
        element: <ModulesTab />,
    },
    {
        id: 18,
        path: "/courses/:id/modules/:id",
        element: <Tests />,
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
        path: "/modules/:moduleID/types/:assignmentID",
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
    {
        id: 33,
        path: "/excisting/:id",
        element: <Page />,
    },
    {
        id: 34,
        path: "excisting/:id/lesson_reports/:lessonReportId",
        element: <LessonReports />,
    },
    {
        id: 35,
        path: "excisting/:id/assignmenttypes/:assignmentId",
        element: <Assignments />,
    },
    {
        id: 36,
        path: "modules/:moduleID/types/:assignmentID/assignments/:id",
        element: <AssignmentLevels />,
    },
    {
        id: 37,
        path: "/exams",
        element: <Exams />,
    },
    {
        id: 38,
        path: "/auth",
        element: <AuthRouters />
    },
    {
        id: 39,
        path: "/signup",
        element: <Signup />,
    },
    {
        id: 40,
        path: "/logout",
        element: <Logout />,
    },
    {
        id: 41,
        path: "exams/:id",
        element: <ExamsTest />
    }
];