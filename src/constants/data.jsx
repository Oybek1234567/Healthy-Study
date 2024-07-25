import { HomeOutlined, RiseOutlined } from "@ant-design/icons";

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
        icon: <RiseOutlined />,
    },{
        id: 3,
        title: "Hisobotlar",
        path: "/reports",
        icon: <RiseOutlined/>,
        children: [
            {
                id: 4,
                title: "Education",
                path: "/education",
        icon: <RiseOutlined/>,

            },
            {
                id: 5,
                title: "Revenue",
                path: "/revenue",
        icon: <RiseOutlined/>,

            },
            {
                id: 6,
                title: "Expense",
                path: "/expense",
        icon: <RiseOutlined/>,

            },
            {
                id: 7,
                title: "Map",
                path: "/map",
        icon: <RiseOutlined/>,

            }
        ] 
    },
    {
        id: 8,
        title: "Guruhlar",
        path: "/groups",
        icon: <RiseOutlined/>
    },
    {
        id: 9,
        title: "Dars jadvali",
        path: "/timetable",
        icon: <RiseOutlined/>
    }

];
