import axios from "axios";
import { useEffect, useState } from "react";

const Super = () => {
  const [data, setData] = useState([]);
          const API = "http://localhost:3000";

  useEffect(() => {
      const fetchData = async () => {
          try {
              const req = await axios.get(`${API}/users/supers`);
            setData(req.data.users);
            console.log(req.data);
            
          } catch (error) {
              console.error(error);
          }
      };

      fetchData();
  }, []);

  return (
      <div>
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
}

export default Super
