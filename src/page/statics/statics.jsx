import { Button, Table } from "antd";
import { data } from "./data";
import useDrawer from "../../hooks/useDrawer";
import UseDrawer from "./drawer";
import { DownloadOutlined } from "@ant-design/icons";

const Statics = () => {
    const {open, onOpen, onClose} = useDrawer()
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Age",
            dataIndex: "age",
        },
        {
            title: "Phone",
            dataIndex: "phone",
        },
        {
            title: "Edit",
            dataIndex: "editBtn",
            render: (text) => <button style={{border: "none", width: "70px", height: "30px", borderRadius: "5px", backgroundColor: "green", color: "white", cursor: "pointer"}}>{text}</button>,
        },
        {
            title: "Delete",
            dataIndex: "delete",
            render: (text) => <button style={{border: "none", width: "70px", height: "30px", borderRadius: "5px", backgroundColor: "red", color: "white", cursor: "pointer"}}>{text}</button>,
        }
    ];
    return (
        <div>
            <div className="flex gap-1">
            <a style={{marginLeft: '80%', marginRight: '10px', color: "blue", paddingTop: "20px"}} href="" download={"ma'lumotlar.xlsx"}>Download Excel <DownloadOutlined /></a>
            <Button style={{
                marginBottom: "20px", backgroundColor: "blue", color: "white", marginLeft: '0%'
            }}
            onClick={onOpen}>+Qo`shish</Button>
            </div>
            <UseDrawer open={open} onClosed={onClose}/>
            <Table columns={columns} dataSource={data} />
        </div>
    );
};

export default Statics;
