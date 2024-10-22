import { useEffect, useState } from "react";
import useDrawer from "../../../../hooks/useDrawer";
import { useLocation } from "react-router-dom";
import axios from "axios";
import AssignmentsModal from "./modal";

const Assignments = () => {
      const [data, setData] = useState([]);
    //   const [lesson, setLesson] = useState([]);
    //   const [student, setStudent] = useState([]);
      const location = useLocation();
      const { groupId } = location.state;
      const { open, onOpen, onClose } = useDrawer();
      const API = "http://localhost:3000";

      useEffect(() => {
          const fetchData = async () => {
              try {
                  const response = await axios.get(
                      `${API}/users/all`,
                  );
                  setData(response.data);
                  console.log(response.data);
                  
              } catch (error) {
                  console.error("Xato yuz berdi:", error);
              }
          };
          fetchData();
      }, [groupId]);

    //   useEffect(() => {
    //       const handleGetLessons = async () => {
    //           try {
    //               const req = await axios.get(
    //                   `http://localhost:3000/grouplessons/all/${groupId}`
    //               );
    //               setLesson(req.data.group_lessons);
    //           } catch (e) {
    //               console.error(e);
    //           }
    //       };
    //       handleGetLessons();
    //   }, [groupId]);

    //   useEffect(() => {
    //       const handleGetStudent = async () => {
    //           try {
    //               const req = await axios.post(
    //                   `http://localhost:3000/lessonreportsbyuser/all/${groupId}`,
    //                   { lesson_report_type_id: lesson_report_type_id }
    //               );
    //               setStudent(req.data.data);
    //               console.log(req.data.data);
    //           } catch (e) {
    //               console.error(e);
    //           }
    //       };
    //       handleGetStudent();
    //   }, [groupId, lesson_report_type_id]);

      return (
          <div>
              <button
                  onClick={onOpen}
                  className='w-10 h-10 rounded-full bg-green-700 text-white text-2xl mt-5 mb-5 ml-[95%]'>
                  +
              </button>
              <AssignmentsModal open={open} onClose={onClose} />
              {data.length > 0 ? (
                  <div>
                      <table>
                          <thead>
                              <tr className='text-center'>
                                  <th>Talaba ismi</th>
                                  <th>Score</th>
                              </tr>
                          </thead>
                          {/* <tbody>
                              {student &&
                                  student.map((item) => (
                                      <tr key={item.id}>
                                          <td>{item.student_name}</td>
                                          <td className='flex gap-1'>
                                              {item.score.map(
                                                  (scoreItem, index) => (
                                                      <p key={scoreItem.id}>
                                                          {scoreItem.score}
                                                          {index ===
                                                          item.score.length - 1
                                                              ? ""
                                                              : " |"}
                                                      </p>
                                                  )
                                              )}
                                          </td>
                                      </tr>
                                  ))}
                          </tbody> */}
                      </table>
                  </div>
              ) : (
                  <p>Ma`lumotlar mavjud emas.</p>
              )}
          </div>
      );
}

export default Assignments
