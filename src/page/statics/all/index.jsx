// import { DeleteOutlined, DownloadOutlined, EditFilled } from "@ant-design/icons";
// import { Button } from "antd";
import axios from "axios";
import { useState, useEffect } from "react";
import "../style.css";
import useDrawer from "../../../hooks/useDrawer";
import UserDrawer from "./drawer";
// import XLSX from "xlsx";
const AllStatics = () => {
    const [data, setData] = useState([]);
    const { open, onOpen, onClose } = useDrawer();
            const API = "http://localhost:3000";


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${API}/users/all`
                );
                console.log("Fetched user data:", response.data.users);
                setData(response.data.users || []);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    console.log(data);

    // const handleDownloadExcel = () => {
    //     const filteredData = data.map(({ show, ...rest }) => rest);

    //     const wb = XLSX.utils.book_new();
    //     const ws = XLSX.utils.json_to_sheet(filteredData);

    //     XLSX.utils.book_append_sheet(wb, ws, "Data");

    //     const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });

    //     const blob = new Blob([s2ab(wbout)], {
    //         type: "application/octet-stream",
    //     });

    //     const url = URL.createObjectURL(blob);
    //     const a = document.createElement("a");
    //     a.href = url;
    //     a.download = "ma'lumotlar.xlsx";
    //     a.click();
    //     URL.revokeObjectURL(url);
    // };

    // const s2ab = (s) => {
    //     const buf = new ArrayBuffer(s.length);
    //     const view = new Uint8Array(buf);
    //     for (let i = 0; i < s.length; i++) {
    //         view[i] = s.charCodeAt(i) & 0xff;
    //     }
    //     return buf;
    // };

    return (
        <div>
            <button className="w-10 h-10 bg-green-700 text-xl text-white rounded-full ml-[90%] mb-5" onClick={onOpen}>+</button>
            <UserDrawer open={open} onClosed={onClose}/>
            {/* <div style={{ display: "flex", marginBottom: "20px" }}>
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
                    <select name='phone' id='phone' className='absolute ml-[800px]'>
                        <option value='5'>5</option>
                        <option value='10'>10</option>
                        <option value='15'>15</option>
                        <option value='20'>20</option>
                        <option value='50'>50</option>
                        <option value='100'>100</option>
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
                </div> */}
            {/* <UseDrawer open={open} onClosed={onClose} /> */}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Date Of Birth</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Passport Series</th>
                        <th>Expiration Date</th>
                        {/* <th>Passport Photo</th> */}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.surname}</td>
                            <td>
                                {item.date_of_birth
                                    ? item.date_of_birth.slice(0, 10)
                                    : "Undefined"}
                            </td>
                            <td>{item.phone}</td>
                            <td>{item.role}</td>
                            <td>{item.passport_series}</td>
                            <td>
                                {item.expiration_date
                                    ? item.expiration_date.slice(0, 10)
                                    : "Undefined"}
                            </td>
                            {/* <td>{item.passport_photo}</td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllStatics
