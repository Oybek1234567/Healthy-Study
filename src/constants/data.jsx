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
                title: "Yangi Foydalanuvchi",
                path: "/user",
                icon: <UsergroupAddOutlined />,
            },
            {
                id: 4,
                title: "Guruh qo'shish",
                path: "/register",
                icon: <SolutionOutlined />,
            },
        ],
    },
    {
        id: 5,
        title: "Foydalanuvchilar",
        path: "/static",
        icon: <UserOutlined />,
    },
    {
        id: 6,
        title: "Kurslar",
        path: "/courses",
        icon: <UnorderedListOutlined />,
    },
    {
        id: 7,
        title: "Guruhlar",
        path: "/groups",
        icon: <UsergroupAddOutlined />,
        children: [
            {
                id: 8,
                title: "Yangi",
                path: "/new",
                icon: <SolutionOutlined />,
            },
            {
                id: 9,
                title: "Kutilayotgan",
                path: "/excisting",
                icon: <FileDoneOutlined />,
            },
            {
                id: 10,
                title: "Mavjud",
                path: "/pending",
                icon: <FileDoneOutlined />,
            },
        ],
    },
    {
        id: 11,
        title: "Xonalar",
        path: '/rooms',
        icon: <FundOutlined />,
        children: [
            {
                id: 12,
                title: "Yangi",
                path: "/new_room",
                icon: <SolutionOutlined />,
            },
            {
                id: 13,
                title: "Mavjud",
                path: "/existing_room",
                icon: <FileDoneOutlined />,
            },
        ],
    },
    {
        id: 14,
        title: "Dars jadvali",
        path: "/timetable",
        icon: <FileDoneOutlined />,
    },
    {
        id: 15,
        title: "Hisobotlar",
        path: "/reports",
        icon: <UnorderedListOutlined />,
        children: [
            {
                id: 16,
                title: "Education",
                path: "/education",
                icon: <SolutionOutlined />,
            },
            {
                id: 17,
                title: "Revenue",
                path: "/revenue",
                icon: <DollarOutlined />,
            },
            {
                id: 18,
                title: "Expense",
                path: "/expense",
                icon: <ShoppingOutlined />,
            },
            {
                id: 19,
                title: "Map",
                path: "/map",
                icon: <FundOutlined />,
            },
        ],
    },
    {
        id: 20,
        title: "Registratsiya",
        path: "/login",
        icon: <FundOutlined />
    }
];
