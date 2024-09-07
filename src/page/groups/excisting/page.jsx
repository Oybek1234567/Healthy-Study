import { EditFilled } from "@ant-design/icons";
import { Tabs, Modal } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Page = () => {
    const location = useLocation();
    const { name, moduleId, groupId } = location.state;
    const [report, setReport] = useState([]);
    const [data, setData] = useState([]);
    const [reportData, setReportData] = useState([]);
    const [editingColumn, setEditingColumn] = useState(null);
    const [editedScores, setEditedScores] = useState({}); 
    const [isModalVisible, setIsModalVisible] = useState(false); 
    const [activeTabKey, setActiveTabKey] = useState(
        localStorage.getItem("activeTabKey") || "1"
    ); // For main tabs
    const [activeReportTabKey, setActiveReportTabKey] = useState(
        localStorage.getItem("activeReportTabKey") || "1"
    ); // For report tabs

    useEffect(() => {
        const fetchData = async () => {
            try {
                const req = await axios.get(
                    `http://localhost:3000/assignmenttypes/all/${moduleId}`
                );
                setData(req.data.assignmenttypes);
                const reportReq = await axios.get(
                    `http://localhost:3000/lessonreporttypes/all/${moduleId}`
                );
                setReport(reportReq.data.lesson_report_types);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [groupId, moduleId]);

    const handleTabChange = async (reportKey) => {
        setActiveReportTabKey(reportKey);  
        localStorage.setItem("activeReportTabKey", reportKey); 

        const reportItem = report.find(
            (item) => `report-${item.id}` === reportKey
        );

        if (reportItem) {
            try {
                const response = await axios.post(
                    `http://localhost:3000/lessonreportsbyuser/all/${groupId}`,
                    { id: reportItem.id }
                );
                
                setReportData(
                    Array.isArray(response.data.data) ? response.data.data : []
                );
                console.log(response.data.data);
            } catch (error) {
                console.error("Error fetching report data:", error);
            }
        }
    };

    // Handle Edit Icon Click
    const handleEditClick = (columnIndex) => {
        setEditingColumn(columnIndex); // Set the column being edited
        const initialScores = {};
        reportData.forEach((item) => {
            const scoreItem = item.score[columnIndex];
            if (scoreItem) {
                initialScores[scoreItem.id] = scoreItem.score;
            }
        });
        setEditedScores(initialScores); // Set initial score values
        setIsModalVisible(true); // Open the modal
    };

    const handleInputChange = (id, value) => {
        setEditedScores((prev) => ({ ...prev, [id]: value }));
    };

    const handleSaveClick = async () => {
        try {
            const updatedScores = Object.entries(editedScores).map(
                ([id, score]) => ({
                    id,
                    score,
                })
            );

            await Promise.all(
                updatedScores.map((item) =>
                    axios.post(
                        `http://localhost:3000/lessonreportsbyuser/edit/${item.id}`,
                        { score: item.score }
                    ).then(() => window.location.reload())   
                )
            );

            setIsModalVisible(false);
            console.log("Scores saved successfully");
        } catch (error) {
            console.error("Error saving scores:", error);
        }
    };

    const handleMainTabChange = (key) => {
        setActiveTabKey(key);
        localStorage.setItem("activeTabKey", key); 
    };

    const assignmentItems = data.map((dataItem, dataIndex) => ({
        label: dataItem.name,
        key: `data-${dataIndex}`,
        children: (
            <div>
                <p>{dataItem.name}</p>
            </div>
        ),
    }));

    const reportItems = report.map((reportItem) => {
        return {
            label: reportItem.name,
            key: `report-${reportItem.id}`,
            children: (
                <table style={{ borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ textAlign: "center" }}>
                            <th>User Name</th>
                            {[...Array(7)].map((_, i) => (
                                <th key={i}>
                                    <EditFilled
                                        onClick={() => handleEditClick(i)}
                                    />
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {reportData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.student_name}</td>
                                {item.score.map((scoreItem) => (
                                    <td key={scoreItem.id}>
                                        <p className='border-black w-[60px]'>
                                            {scoreItem.score || "-"}
                                        </p>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ),
        };
    });

    return (
        <div
            style={{
                width: "100%",
                padding: "24px",
                background: "#f5f5f5",
                borderRadius: "8px",
            }}>
            <h1
                className='text-4xl mb-4 cursor-pointer'
                onClick={() => window.history.back()}>
                {name}
            </h1>
            <div className='flex space-x-4 w-full'>
                <Tabs
                    activeKey={activeTabKey}
                    onChange={handleMainTabChange}
                    size='small'
                    style={{ flex: 1 }}>
                    <Tabs.TabPane tab='Assignments' key='1'>
                        <Tabs
                            defaultActiveKey='1'
                            type='card'
                            size='large'
                            style={{ width: "100%" }}>
                            {assignmentItems.map((item) => (
                                <Tabs.TabPane tab={item.label} key={item.key}>
                                    {item.children}
                                </Tabs.TabPane>
                            ))}
                        </Tabs>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab='Lesson Reports' key='2'>
                        <Tabs
                            activeKey={activeReportTabKey}
                            onChange={handleTabChange}
                            type='card'
                            size='large'
                            style={{ width: "100%" }}>
                            {reportItems.map((item) => (
                                <Tabs.TabPane tab={item.label} key={item.key}>
                                    {item.children}
                                </Tabs.TabPane>
                            ))}
                        </Tabs>
                    </Tabs.TabPane>
                </Tabs>
            </div>
            <Modal
                title='Edit Scores'
                visible={isModalVisible}
                onOk={handleSaveClick}
                onCancel={() => setIsModalVisible(false)}
                okText='Save'
                cancelText='Cancel'>
                {reportData.map((item, idx) => {
                    const scoreItem = item.score[editingColumn];
                    return scoreItem ? (
                        <div key={scoreItem.id} className=''>
                            <p className='border-black w-full'>
                                {scoreItem.group_lesson_id} / {idx + 1}
                            </p>
                            <input
                                className='border w-full mb-3 h-9'
                                value={editedScores[scoreItem.id] || ""}
                                onChange={(e) =>
                                    handleInputChange(
                                        scoreItem.id,
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                    ) : null;
                })}
            </Modal>
        </div>
    );
};

export default Page;
