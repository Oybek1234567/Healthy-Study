import { Table } from "antd";
import { pendingData } from "./data";

const Pending = () => {
    const columns = [
        {
            title: "#",
            dataIndex: "id",
        },
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Course",
            dataIndex: "course",
        },
        {
            title: "Starting Date",
            dataIndex: "startingDate",
        },
        {
            title: "Ending Date",
            dataIndex: "endingDate",
        },
        {
            title: "When",
            dataIndex: "when",
        },
        {
            title: "Teacher",
            dataIndex: "teacher",
        },
        {
            title: "Assistant",
            dataIndex: "assistant",
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (status) => {
                <div className='w-10'>{status}</div>;
            },
        },
    ];

    return (
        <div>
            <Table columns={columns} dataSource={pendingData} />
        </div>
    );
};

export default Pending;
