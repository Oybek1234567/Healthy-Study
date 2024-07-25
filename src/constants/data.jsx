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
        title: "Foydalanuvchilar",
        path: "/static",
        icon: <UserOutlined />,
    },
    {
        id: 3,
        title: "Hisobotlar",
        path: "/reports",
        icon: <UnorderedListOutlined />,
        children: [
            {
                id: 4,
                title: "Education",
                path: "/education",
                icon: <SolutionOutlined />,
            },
            {
                id: 5,
                title: "Revenue",
                path: "/revenue",
                icon: <DollarOutlined />,
            },
            {
                id: 6,
                title: "Expense",
                path: "/expense",
                icon: <ShoppingOutlined />,
            },
            {
                id: 7,
                title: "Map",
                path: "/map",
                icon: <FundOutlined />,
            },
        ],
    },
    {
        id: 8,
        title: "Guruhlar",
        path: "/groups",
        icon: <UsergroupAddOutlined />,
    },
    {
        id: 9,
        title: "Dars jadvali",
        path: "/timetable",
        icon: <FileDoneOutlined />,
    },
];
