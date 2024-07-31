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
            render: () => {
                return (
                    <div className='relative z-10 flex  items-center w-[100px] h-[20px] bg-white border-2 border-black'>
                        <div
                            className='absolute z-1 w-1/2 h-full bg-[green]'
                            style={{
                                clipPath:
                                    "polygon(0 0, 100% 0%, 80% 100%, 0% 100%)",
                            }}></div>
                    </div>
                );
            },
        },
    ];

    return (
        <div>
            <Table columns={columns} dataSource={pendingData} />
            <div className='w-40 mt-32 h-10 bg-white border-2'>
                <div className='w-1/2 h-10 bg-black'></div>
            </div>
        </div>
    );
};

export default Pending;
