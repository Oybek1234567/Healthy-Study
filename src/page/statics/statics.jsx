
import { Button, Table } from "antd";
import useDrawer from "../../hooks/useDrawer";
import UseDrawer from "./drawer";
import {
    DownloadOutlined,
    EditFilled,
    DeleteOutlined,
} from "@ant-design/icons";
import * as XLSX from "xlsx";
import { userData } from "../applications/user/data";

const Statics = () => {
    const { open, onOpen, onClose } = useDrawer();

    const handleDownloadExcel = () => {
        // Filter out the 'show' key from the data
        const filteredData = userData.map(({ show, ...rest }) => rest);

        // Create a new workbook and add a worksheet
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(filteredData);

        // Append the worksheet to the workbook
        XLSX.utils.book_append_sheet(wb, ws, "Data");

        // Generate a binary string of the workbook
        const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });

        // Convert the binary string to a Blob
        const blob = new Blob([s2ab(wbout)], {
            type: "application/octet-stream",
        });

        // Create a download link and trigger the download
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "ma'lumotlar.xlsx";
        a.click();
        URL.revokeObjectURL(url);
    };

    const s2ab = (s) => {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i < s.length; i++) {
            view[i] = s.charCodeAt(i) & 0xff;
        }
        return buf;
    };

    const columns = [
        {
            dataIndex: "show",
        },
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Date of Birth",
            dataIndex: "dateOfBirth",
        },
        {
            title: "Phone",
            dataIndex: "phone",
        },
        {
            title: "Role",
            dataIndex: "role",
        },
    ];

    return (
        <div>
            <div style={{display: "flex", marginBottom: "20px"}}>
                <button
                    style={{
                        width: "35px",
                        height: "35px",
                        backgroundColor: "yellow",
                        color: "white",
                        marginRight: "10px",
                        borderRadius: "50%",
                    }}>
                    <EditFilled />
                </button>
                <button
                    style={{
                        width: "35px",
                        height: "35px",
                        backgroundColor: "red",
                        marginRight: "10px",
                        color: "white",
                        borderRadius: "50%",
                    }}>
                    <DeleteOutlined />
                </button>
                <Button
                    style={{
                        width: "35px",
                        height: "35px",
                        backgroundColor: "lightgreen",
                        color: "white",
                        borderRadius: "50%",
                    }}
                    onClick={onOpen}>
                    +
                </Button>
                <select name="phone" id="phone" className="absolute ml-[800px]">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
                <button
                    style={{
                        marginLeft: "75%",
                        marginRight: "10px",
                        border: "none",
                        backgroundColor: "inherit",
                        color: "blue",
                        paddingBottom: "20px",
                    }}
                    onClick={handleDownloadExcel}>
                    Download Excel <DownloadOutlined />
                </button>
            </div>
            <UseDrawer open={open} onClosed={onClose} />
            <Table columns={columns} dataSource={userData} />
        </div>
    );
};

export default Statics;
