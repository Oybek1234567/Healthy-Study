import Applications from "../page/applications";
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
import AssignmentTypes from "../page/courses/module/test/exams/assignments";
import SubjectTests from "../page/courses/module/test/subjects/test";
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
import AllStatics from "../page/statics";
import Profile from "../page/profile";
import VerifyPage from "../components/AuthRouters/signup/verify";
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
        path: "/groups/excisting",
        element: <Excisting />,
    },
    {
        id: 11,
        path: "/pending",
        element: <Pending />,
    },
    {
        id: 12,
        path: "/profile",
        element: <Profile />,
    },
    {
        id: 13,
        path: "/courses",
        element: <Courses />,
    },
    {
        id: 14,
        path: "/rooms",
        element: <Rooms />,
    },
    {
        id: 15,
        path: "/courses/:id",
        element: <ModulesTab />,
    },
    {
        id: 16,
        path: "/courses/:id/modules/:id",
        element: <Tests />,
    },
    {
        id: 17,
        path: "/modules/:moduleID/types/:assignmentID",
        element: <AssignmentTypes />,
    },
    {
        id: 18,
        path: "/modules/:moduleID/subjects/:id/test",
        element: <SubjectTests />,
    },
    {
        id: 19,
        path: "/static",
        element: <AllStatics />,
    },
    {
        id: 20,
        path: "/excisting/:id",
        element: <Page />,
    },
    {
        id: 21,
        path: "/excisting/:id/lesson_reports/:lessonReportId",
        element: <LessonReports />,
    },
    {
        id: 22,
        path: "/excisting/:id/assignmenttypes/:assignmentId",
        element: <Assignments />,
    },
    {
        id: 23,
        path: "/modules/:moduleID/types/:assignmentID/assignments/:id",
        element: <AssignmentLevels />,
    },
    {
        id: 24,
        path: "/exams",
        element: <Exams />,
    },
    {
        id: 25,
        path: "/auth",
        element: <AuthRouters />,
    },
    {
        id: 26,
        path: "/signup",
        element: <Signup />,
    },
    {
        id: 27,
        path: "/logout",
        element: <Logout />,
    },
    {
        id: 28,
        path: "/exams/:id",
        element: <ExamsTest />,
    },
    {
        id: 29,
        path: '/verify',
        element: <VerifyPage />
    }
];
