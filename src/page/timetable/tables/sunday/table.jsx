import { Table as AntdTable } from "antd";
import { data } from "./data";

const TableSunday = () => {
    const columns = [
        {
            title: "Room",
            dataIndex: "room",
        },
        {
            title: "8:00",
            dataIndex: "firstGroup",
        },
        {
            title: "9:00",
        },
        {
            title: "10:00",
        },
        {
            title: "11:00",
        },
        {
            title: "12:00",
        },
        {
            title: "13:00",
        },
        {
            title: "14:00",
        },
        {
            title: "15:00",
        },
        {
            title: "16:00",
        },
        {
            title: "17:00",
        },
    ];

    return (
        <div>
            <AntdTable
                pagination={{
                    pageSize: 100,
                }}
                columns={columns}
                dataSource={data}
            />
        </div>
    );
};

export default TableSunday;
