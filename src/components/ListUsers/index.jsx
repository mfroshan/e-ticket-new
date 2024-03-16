import React, { useState, useEffect } from "react";
import {
  Container2,
  Heading,
  Table1,
} from "./ShowClerkContainerElements";
import Axios from "axios";



import Switch from "react-switch";

const ShowUserContainer = () => {
  const [UserData, setUserData] = useState([]);


  const fetchData = () => {
    Axios.get("http://localhost:3001/api/getUserList", {}).then((res) => {
      setUserData(res.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const UserStatusUpdate = (passenger_id, status) => {
    let updateStatus = 0;
    if (status === 0) {
      updateStatus = 1;
    }

    const Updatevalue = { passenger_id: passenger_id, updateStatus: updateStatus };
    Axios.post("http://localhost:3001/api/toggleUserStatus", {
      Updatevalue
    }).then((res) => {
      if (res.data.message) {
        alert("User status changed successfully!");
        // setIsButtonToggled(!isButtonToggled);
        fetchData();
      } else {
        alert(`${res.data.message}`);
      }
    });
  };


  return (
    <Container2>
      <Heading>
        <h2 style={{ color: "#fff", textAlign: "center" }}>
          User Information
        </h2>
      </Heading>

      {UserData.length > 0 ? (
        <>
          <Table1>
            <tbody>
              <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Email</td>
                <td>Mobile</td>
                <td>Status</td>
                <td></td>
              </tr>
              {UserData.map((user) => (
                <tr key={user.passenger_id}>
                  <td>{user.passenger_id}</td>
                  <td>{user.Email}</td>
                  <td>{user.Name}</td>
                  <td>{user.Mobile}</td>
                  <td
                    style={{
                      color: user.active_status === 1 ? "green" : "red",
                    }}
                  >
                    {user.active_status === 1 ? "Active" : "Deactive"}
                  </td>
                  <td>
                    <Switch
                      onChange={() =>
                        UserStatusUpdate(user.passenger_id, user.active_status)
                      }
                      checked={user.active_status === 1}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table1>
        </>
      ) : (
        <p>No Data Found</p>
      )}

     
    </Container2>
  );
};

export default ShowUserContainer;
