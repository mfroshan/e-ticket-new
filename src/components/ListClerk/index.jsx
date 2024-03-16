import React, { useState, useEffect } from "react";
import {
  Container2,
  Heading,
  Table1,
  Select,
} from "./ShowClerkContainerElements";
import Axios from "axios";

import { FaEdit } from "react-icons/fa";

import BootstrapButton from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Switch from "react-switch";

const ShowClerkContainer = () => {
  const [clerkData, setClerkData] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedClerkData, setEditedClerkData] = useState({});
  const [stationList, setStationList] = useState([]);

  const fetchData = () => {
    Axios.get("http://localhost:3001/api/getClerk", {}).then((res) => {
      setClerkData(res.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const ClerkStatusUpdate = (clerkID, status) => {
    let updateStatus = 0;
    if (status === 0) {
      updateStatus = 1;
    }
    Axios.post("http://localhost:3001/api/toggleClerkStatus", {
      clerk_ID: clerkID,
      updateStatus: updateStatus,
    }).then((res) => {
      if (res.data.message) {
        alert("Clerk status changed successfully!");
        // setIsButtonToggled(!isButtonToggled);
        fetchData();
      } else {
        alert("Error");
      }
    });
  };

  const openEditModal = (clerkData) => {
    Axios.post("http://localhost:3001/api/getStationListFull", {})
      .then((res) => {
        setStationList(res.data); // set entire station list for later reference
        setIsEditModalOpen(true);
      })
      .catch((error) => {
        console.error("Error fetching station list:", error);
      });

    setEditedClerkData({
      Clerk_ID: clerkData.Clerk_ID,
      Name: clerkData.Name,
      Mobile: clerkData.Mobile,
      District: clerkData.District,
      Password: clerkData.Password,
      Station_ID: clerkData.Station_ID,
    });
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedClerkData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    closeEditModal();
    Axios.post("http://localhost:3001/api/updateClerk", editedClerkData)
      .then((res) => {
        console.log(res.data);
        if (res.data.message === "success") {
          alert("Changes saved successfully!");
          fetchData();
        } else {
          alert("Error");
        }
      })
      .catch((error) => {
        console.error("Error updating clerk data:", error);
        alert("Error updating clerk data");
      });
  };

  return (
    <Container2>
      <Heading>
        <h2 style={{ color: "#fff", textAlign: "center" }}>
          Clerk Information
        </h2>
      </Heading>

      {clerkData.length > 0 ? (
        <>
          <Table1>
            <tbody>
              <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Mobile</td>
                <td>Station</td>
                <td>Status</td>
                <td></td>
                <td></td>
              </tr>
              {clerkData.map((clerk) => (
                <tr key={clerk.Clerk_ID}>
                  <td>{clerk.Clerk_ID}</td>
                  <td>{clerk.Name}</td>
                  <td>{clerk.Mobile}</td>
                  <td>{clerk.stationName}</td>
                  <td
                    style={{
                      color: clerk.active_status === 1 ? "green" : "red",
                    }}
                  >
                    {clerk.active_status === 1 ? "Active" : "Deactive"}
                  </td>
                  <td>
                    <FaEdit onClick={() => openEditModal(clerk)} />
                    {/* <Button ></Button> */}
                  </td>
                  <td>
                    <Switch
                      onChange={() =>
                        ClerkStatusUpdate(clerk.Clerk_ID, clerk.active_status)
                      }
                      checked={clerk.active_status === 1}
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

      {/* Edit Modal */}
      <Modal show={isEditModalOpen} onHide={closeEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Clerk</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="Name"
                type="text"
                placeholder="name"
                value={editedClerkData.Name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="mobile">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                name="Mobile"
                type="number"
                placeholder="Mobile"
                maxLength={10}
                minLength={10}
                value={editedClerkData.Mobile}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="District">
              <Form.Label>District</Form.Label>
              <Form.Control
                name="District"
                type="text"
                placeholder="District"
                value={editedClerkData.District}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="station">
              <Form.Label>Station</Form.Label>
              <Select name="Station_ID" onChange={handleInputChange}>
                {stationList.map((station, index) => (
                  <option
                    key={index}
                    value={station.Station_ID}
                    selected={station.Station_ID === editedClerkData.Station_ID}
                  >
                    {station.Name}
                  </option>
                ))}
              </Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={editedClerkData.Password}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <BootstrapButton variant="secondary" onClick={closeEditModal}>
            Close
          </BootstrapButton>
          <BootstrapButton variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </BootstrapButton>
        </Modal.Footer>
      </Modal>
    </Container2>
  );
};

export default ShowClerkContainer;
