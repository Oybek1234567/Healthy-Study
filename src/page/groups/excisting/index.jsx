import { Table } from "antd";
import { excistingData } from "./data";

const Excisting = () => {
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
        title: "Number of Application",
        dataIndex: "N_of_App",
      },
    ];

    return (
        <div>
            <Table columns={columns} dataSource={excistingData} />
        </div>
    );
};

export default Excisting;
