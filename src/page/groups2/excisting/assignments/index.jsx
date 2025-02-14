import { useEffect, useState } from "react";
import useDrawer from "../../../../hooks/useDrawer";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import AssignmentsModal from "./modal";
// import { Modal } from "antd";

const Assignments = () => {
    const location = useLocation();
    const { groupId, id, name, moduleId } = location.state;
    const { open,  onClose } = useDrawer();
    const [assignments, setAssignments] = useState([]);
    const API = "http://localhost:3000";
    console.log(moduleId);
    

    useEffect(() => {
        const handlePostAssignments = async () => {
            try {
                const response = await axios.post(
                    `${API}/exams/allbygroup/${groupId}`,
                    {
                        assignment_type_id: id,
                    }
                );
                // setAssignment(response.data.exams);
                console.log(response.data.exams);
            } catch (error) {
                console.error("Error fetching assignments data:", error);
            }
        };
        handlePostAssignments();
    }, [groupId, id]);

    // useEffect(() => {
    //     const handlePostData = async () => {
    //         try {
    //             if (selectedAssignment.id) {
    //                 const response = await axios.post(
    //                     `${API}/exams/allforgroup/${groupId}`,
    //                     {
    //                         assignment_id: selectedAssignment.id,
    //                     }
    //                 );
    //                 setData(response.data.exams);
    //                 console.log(response.data.exams);
    //             }
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //         }
    //     };
    //     handlePostData();
    // }, [groupId, selectedAssignment]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const assignmentTypes = await axios.get(
                    `${API}/assignmenttypes/all/${moduleId}`
                );
                setAssignments(assignmentTypes.data.assignmenttypes);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [moduleId]);

    return (
        <div className='relative p-8 bg-gray-50'>
            <div className="flex gap-5">
            {assignments.map((item) => (
                <Link
                    to={`/groups/${groupId}/assignmenttypes/${item.id}`}
                    state={{
                        groupId,
                        id: item.id,
                        assignment_name: item.name,
                        name: name,
                        assignment_type_id: item.id,
                        moduleId
                    }}
                    key={item.id}
                    className='relative flex flex-col justify-center items-center bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer mt-10 p-6 w-[300px] h-40 border-4 border-gray-300 rounded-lg hover:border-black hover:text-gray-700 no-underline text-black'>
                    <p className='text-3xl font-semibold'>{item.name}</p>
                </Link>
            ))}
            </div>

            <AssignmentsModal open={open} onClose={onClose} />

            {/* <Modal
                width={"80%"}
                open={showModal}
                onCancel={() => setShowModal(false)}
                footer={null}>
                <div className='p-1'>
                    <h1 className='text-3xl font-bold text-gray-800 mb-6'>
                        {name} / {selectedAssignment.assignment_name}
                    </h1>
                    <div className='grid grid-cols-4 gap-4 bg-gray-200 p-2 font-medium text-gray-700 rounded-t-md'>
                        <p>#</p>
                        <p>Name</p>
                        <p>ID</p>
                        <p>Result</p>
                    </div>

                    {sortedData.map((item, idx) => (
                        <div
                            key={item.id}
                            className='grid grid-cols-4 gap-4 p-2 border-b border-gray-200'>
                            <p className='text-gray-600'>{idx + 1}</p>
                            <p className='text-gray-700 font-medium'>
                                {item.user_name} {item.user_surname}
                            </p>
                            <p className='text-gray-600'>{item.user_id}</p>
                            <p
                                className={`font-semibold ${
                                    item.result
                                        ? "text-green-600"
                                        : "text-red-500"
                                }`}>
                                {item.result
                                    ? Math.floor(item.result * 100) + "%"
                                    : "Not completed"}
                            </p>
                        </div>
                    ))}
                </div>
            </Modal> */}
        </div>
    );
};

export default Assignments;
