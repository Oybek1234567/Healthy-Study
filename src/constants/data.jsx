import {
    HomeOutlined,
    UserOutlined,
    UnorderedListOutlined,
    SolutionOutlined,
    DollarOutlined,
    ShoppingOutlined,
    FundOutlined,
    UsergroupAddOutlined,
    FileDoneOutlined,
} from "@ant-design/icons";

export const menu = [
    {
        id: 1,
        title: "Dashboard",
        path: "/",
        icon: <HomeOutlined />,
    },
    {
        id: 2,
        title: "Arizalar",
        path: "/applications",
        icon: <FileDoneOutlined />,
        children: [
            {
                id: 3,
                title: "User",
                path: "/user",
                icon: <UsergroupAddOutlined />,
            },
            {
                id: 4,
                title: "Accepted",
                path: "/accepted",
                icon: <UserOutlined />,
            },
            {
                id: 5,
                title: "Pending",
                path: "/user_pending",
                icon: <UsergroupAddOutlined />,
            },
            {
                id: 6,
                title: "Denied",
                path: "/denied",
                icon: <SolutionOutlined />,
            },
        ],
    },
    {
        id: 7,
        title: "Foydalanuvchilar",
        path: "/static",
        icon: <UserOutlined />,
        children: [
            {
                id: 8,
                title: "All",
                path: "/all_statics",
                icon: <UsergroupAddOutlined />,
            },
            {
                id: 9,
                title: "Super",
                path: "/super",
                icon: <UsergroupAddOutlined />,
            },
            {
                id: 10,
                title: "Staff",
                path: "/staff",
                icon: <UsergroupAddOutlined />,
            },
            {
                id: 11,
                title: "Module Leader",
                path: "/module_leader",
                icon: <UsergroupAddOutlined />,
            },
            {
                id: 12,
                title: "Teacher",
                path: "/teacher",
                icon: <UsergroupAddOutlined />,
            },
            {
                id: 13,
                title: "Assistant",
                path: "/assistant",
                icon: <UsergroupAddOutlined />,
            },
            {
                id: 14,
                title: "Student",
                path: "/student",
                icon: <UsergroupAddOutlined />,
            },
            {
                id: 15,
                title: "Guest",
                path: "/guest",
                icon: <UsergroupAddOutlined />,
            },
        ],
    },
    {
        id: 16,
        title: "Kurslar",
        path: "/courses",
        icon: <UnorderedListOutlined />,
    },
    {
        id: 17,
        title: "Xonalar",
        path: "/rooms",
        icon: <FundOutlined />,
    },
    {
        id: 18,
        title: "Guruhlar",
        path: "/groups",
        icon: <UsergroupAddOutlined />,
        children: [
            {
                id: 19,
                title: "Mavjud",
                path: "/excisting",
                icon: <FileDoneOutlined />,
            },
            {
                id: 20,
                title: "Kutilayotgan",
                path: "/pending",
                icon: <FileDoneOutlined />,
            },
        ],
    },
    {
        id: 21,
        title: "Dars jadvali",
        path: "/timetable",
        icon: <FileDoneOutlined />,
    },
    {
        id: 22,
        title: "Hisobotlar",
        path: "/reports",
        icon: <UnorderedListOutlined />,
        children: [
            {
                id: 23,
                title: "Education",
                path: "/education",
                icon: <SolutionOutlined />,
            },
            {
                id: 24,
                title: "Revenue",
                path: "/revenue",
                icon: <DollarOutlined />,
            },
            {
                id: 25,
                title: "Expense",
                path: "/expense",
                icon: <ShoppingOutlined />,
            },
            {
                id: 26,
                title: "Map",
                path: "/map",
                icon: <FundOutlined />,
            },
        ],
    },
    {
        id: 27,
        title: "Registratsiya",
        path: "/login",
        icon: <FundOutlined />,
    },
];
