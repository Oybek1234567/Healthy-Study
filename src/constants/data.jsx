import { DollarOutlined, FileDoneOutlined, FundOutlined, HomeOutlined, ShoppingOutlined, SolutionOutlined, UnorderedListOutlined, UsergroupAddOutlined, UserOutlined } from "@ant-design/icons";

export const menu = [
    {
        id: 1,
        title: "Dashboard",
        path: "/",
        icon: <HomeOutlined />,
        roles: [
            "super",
            "admin",
            "head_teacher",
            "teacher",
            "assistant",
            "student",
            "guest",
        ],
    },
    {
        id: 2,
        title: "Profile",
        path: "/profile",
        icon: <UserOutlined />,
        roles: [
            "super",
            "admin",
            "head_teacher",
            "teacher",
            "assistant",
            "student",
            "guest",
        ],
    },
    {
        id: 3,
        title: "Arizalar",
        path: "/applications",
        icon: <FileDoneOutlined />,
        roles: ["super", "admin"],
    },
    {
        id: 4,
        title: "Foydalanuvchilar",
        path: "/static",
        icon: <UserOutlined />,
        roles: ["super"],
    },
    {
        id: 5,
        title: "Kurslar",
        path: "/courses",
        icon: <UnorderedListOutlined />,
        roles: [
            "super",
            "admin",
            "head_teacher",
            "teacher",
            "assistant",
            "student",
            "guest",
        ],
    },
    {
        id: 6,
        title: "Xonalar",
        path: "/rooms",
        icon: <FundOutlined />,
        roles: ["super"],
    },
    {
        id: 7,
        title: "Guruhlar",
        path: "/groups",
        icon: <UsergroupAddOutlined />,
        roles: ["super", "admin", "guest"],
        children: [
            {
                id: 8,
                title: "Mavjud",
                path: "/groups/excisting",
                icon: <FileDoneOutlined />,
                roles: ["super", "admin"],
            },
            {
                id: 9,
                title: "Kutilayotgan",
                path: "/pending",
                icon: <FileDoneOutlined />,
                roles: ["super", "admin", "guest"],
            },
        ],
    },
    {
        id: 10,
        title: "Exams",
        path: "/exams",
        icon: <FundOutlined />,
        roles: ["super","student"],
    },
    {
        id: 11,
        title: "Dars jadvali",
        path: "/timetable",
        icon: <FileDoneOutlined />,
        roles: [
            "super",
            "admin",
            "head_teacher",
            "teacher",
            "assistant",
            "student",
        ],
    },
    {
        id: 12,
        title: "Hisobotlar",
        path: "/reports",
        icon: <UnorderedListOutlined />,
        roles: [
            "super",
            "admin",
            "head_teacher",
            "teacher",
            "assistant",
            "student",
        ],
        children: [
            {
                id: 13,
                title: "Education",
                path: "/education",
                icon: <SolutionOutlined />,
                roles: [
                    "super",
                    "admin",
                    "head_teacher",
                    "teacher",
                    "assistant",
                    "student",
                ],
            },
            {
                id: 14,
                title: "Revenue",
                path: "/revenue",
                icon: <DollarOutlined />,
                roles: [
                    "super",
                    "admin",
                    "head_teacher",
                    "teacher",
                    "assistant",
                    "student",
                ],
            },
            {
                id: 15,
                title: "Expense",
                path: "/expense",
                icon: <ShoppingOutlined />,
                roles: [
                    "super",
                    "admin",
                    "head_teacher",
                    "teacher",
                    "assistant",
                    "student",
                ],
            },
            {
                id: 16,
                title: "Map",
                path: "/map",
                icon: <FundOutlined />,
                roles: [
                    "super",
                    "admin",
                    "head_teacher",
                    "teacher",
                    "assistant",
                    "student",
                ],
            },
        ],
    },
    {
        id: 17,
        title: "Logout",
        path: "/logout",
        icon: <UserOutlined />,
        roles: [
            "super",
            "admin",
            "head_teacher",
            "teacher",
            "assistant",
            "student",
        ],
    },
];