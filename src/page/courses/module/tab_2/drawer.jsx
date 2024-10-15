import { Drawer, Form } from "antd"
import axios from "axios"
import { useState } from "react"
import { useParams } from "react-router-dom"

const LevelDrawer = ({ open, onClose }) => {
    const [input, setInput] = useState([])
    const id = useParams()
    const API = "http://localhost:3000";
    const handlePost = async () => {
        try {
            const req = await axios.post(
                `${API}/questionlevels/create/${id.id}`,
                { name: input }
            )
            console.log(req.data)
            alert("Yaratildi")
            window.location.reload()
        } catch (e) {
            console.error(e);
            
        }
    }
  return (
    <div>
          <Drawer open={open} onClose={onClose}>
              <Form onFinish={handlePost}>
              <label htmlFor="name" className="mr-3">Name:</label>
              <input type="text" className="border-2 border-black" value={input} onChange={(e) => setInput(e.target.value)}/><br /><br />
              <button type="submit" className="bg-green-800 p-2 mt-3 text-white ml-3 rounded-lg">Save</button>
              </Form>
        </Drawer>
    </div>
  )
}

export default LevelDrawer
