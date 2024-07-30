import { Table,Button } from "antd";
import UseDrawer from "../../statics/drawer";
import useDrawer from "../../../hooks/useDrawer";
import * as XLSX from "xlsx";
import { DownloadOutlined, EditFilled, DeleteOutlined } from "@ant-design/icons";
import { userData } from "./data";
const User = () => {
 const { open, onOpen, onClose } = useDrawer();

 const handleDownloadExcel = () => {
     const filteredData = userData.map(({show, ...rest }) => rest);

     const wb = XLSX.utils.book_new();
     const ws = XLSX.utils.json_to_sheet(filteredData);

     
     XLSX.utils.book_append_sheet(wb, ws, "Data");

     
     const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });

     
     const blob = new Blob([s2ab(wbout)], {
         type: "application/octet-stream",
     });
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
         title: "Passport Series",
         dataIndex: "series",
     },
     {
         title: "Passport Image",
         dataIndex: "passportImg",
         render: (img) => {
             return <img src={img} aria-hidden='true' width={50} height={50} />;
         },
     },
     {
         title: "Action",
         key: "action",
         render: () => (
             <div style={{ display: "flex", justifyContent: "space-between" }}>
                 <Button
                     type='primary'
                     icon={<EditFilled />}
                     style={{
                         width: "35px",
                         height: "35px",
                         backgroundColor: "yellow",
                         color: "white",
                         marginRight: "10px",
                         borderRadius: "50%",
                     }}
                 />
                 <Button
                     type='default'
                     icon={<DeleteOutlined />}
                     style={{
                         width: "35px",
                         height: "35px",
                         backgroundColor: "red",
                         marginRight: "10px",
                         color: "white",
                         borderRadius: "50%",
                     }}
                 />
                 <Button
                     type='dashed'
                     style={{
                         width: "35px",
                         height: "35px",
                         backgroundColor: "lightgreen",
                         color: "white",
                         borderRadius: "50%",
                     }}>
                     +
                 </Button>
             </div>
         ),
     },
 ];

 return (
     <div>
         <div style={{ display: "flex", marginBottom: "20px" }}>
             <select name='phone' id='phone' style={{ left: "50px" }}>
                 <option value='5'>5</option>
                 <option value='10'>10</option>
                 <option value='15'>15</option>
                 <option value='20'>20</option>
                 <option value='50'>50</option>
                 <option value='100'>100</option>
             </select>
             <button
                 style={{
                     marginLeft: "60%",
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
}

export default User
