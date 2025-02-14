import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
// import LessonModal from "./drawer";
// import useDrawer from "../../../../hooks/useDrawer";
// import { Dropdown, Space } from "antd";
// import { AuthContext } from "../../../../context/authContext";

const LessonReports = () => {
    // const [data, setData] = useState([]);
    // const [lesson, setLesson] = useState([]);
    // const [student, setStudent] = useState([]);
    const [filteredReports, setFilteredReports] = useState([]);
    const location = useLocation();
    const { moduleId, groupId } = location.state;
    console.log(moduleId)
    // const { open, onOpen, onClose } = useDrawer();
    const API = "http://localhost:3000";

    // const { role } = useContext(AuthContext);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${API}/lessonreporttypes/all/${moduleId}`
                );
                // const lessonReports = response.data.lesson_report_types;
                // const activeReports = lessonReports.filter(
                //     (report) => report.status === "active"
                // );
                setFilteredReports(response.data.lesson_report_types);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [moduleId]);

    // useEffect(() => {
    //     const fetchLessonReports = async () => {
    //         try {
    //             const response = await axios.post(
    //                 `${API}/lessonreportsbyuser/all/${groupId}`,
    //                 { lesson_report_type_id }
    //             );
    //             setData(response.data.data);
    //         } catch (error) {
    //             console.error("Xato yuz berdi:", error);
    //         }
    //     };
    //     fetchLessonReports();
    // }, [groupId, lesson_report_type_id]);

    // useEffect(() => {
    //     const fetchLessons = async () => {
    //         try {
    //             const req = await axios.get(
    //                 `${API}/grouplessons/all/${groupId}`
    //             );
    //             setLesson(req.data.group_lessons);
    //         } catch (e) {
    //             console.error(e);
    //         }
    //     };
    //     fetchLessons();
    // }, [groupId]);

    // useEffect(() => {
    //     const fetchStudents = async () => {
    //         try {
    //             const req = await axios.post(
    //                 `${API}/lessonreportsbyuser/all/${groupId}`,
    //                 { lesson_report_type_id }
    //             );
    //              setStudent(req.data.data);
    //         } catch (e) {
    //             console.error(e);
    //         }
    //     };
    //     fetchStudents();
    // }, [groupId, lesson_report_type_id]);

    return (
        <div className='flex gap-8 p-6 bg-gray-100 rounded-lg shadow-md'>
            {filteredReports.map((item) => (
                <Link
                    to={`/groups/${groupId}/lesson_report_types/${item.id}`}
                    state={{
                        groupId,
                        lesson_report_type_id: item.id,
                        moduleId: moduleId
                    }}
                    key={item.id}
                    style={{textDecoration: "none", color: 'black'}}
                    className='relative flex flex-col justify-center items-center bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer mt-10 p-6 w-[300px] h-40 border-4 border-gray-300 rounded-lg hover:border-black hover:text-gray-700'>
                    <p className='text-3xl font-semibold'>{item.name}</p>
                </Link>
            ))}
        </div>
    );
};

export default LessonReports;
