import { Drawer } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"

const AssignmentByGroupDrawer = ({ open, onClose }) => {
    const [assignment, setAssignment] = useState([])
    const [assignmentId, setAssignmentId] = useState(null)
    const API = "http://localhost:3000"
    const { id } = useParams()
    const location = useLocation();
    const { groupId, moduleId } = location.state
    console.log(moduleId);
    
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const req = await axios.get(`${API}/assignments/all/${id}`);
                setAssignment(req.data.assignments);
                console.log(req.data);
                
            } catch (e) {
                console.error(e);
                
            }
        }
        fetchData()
    }, [id])
    const handlePost = () => {
        try {
            const postedData = {
                assignment_id: Number(assignmentId),
                assignment_type_id: Number(id),
                module_id: Number(moduleId),
            };
            console.log(postedData);
            
            const numberedGroupId = Number(groupId);
            axios.post(`${API}/exams/create/${numberedGroupId}`, postedData);
        } catch (e) {
            console.error(e);
            
        }
    }
  return (
      <Drawer open={open} onClose={onClose}>
          <h1 className="text-2xl font-bold mb-4">Assignments</h1>
          <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={assignmentId} onChange={(e) => setAssignmentId(e.target.value)}>
              <option selected>Select Assignment</option>
              {assignment.map((item) => (
                  <option key={item.id} value={item.id}>{item.name}</option>
              ))}
          </select>
          <button className="bg-green-800 w-full p-2 mt-3 text-white rounded-lg" onClick={handlePost}>Start</button>
    </Drawer>
  )
}

export default AssignmentByGroupDrawer
