import React, { useState } from "react";
import { Container, Table, Button } from "./StationListContainerElements";
import Axios from "axios";

import { FaEdit } from "react-icons/fa";

import BootstrapButton from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Switch from "react-switch";

const StationListContainer = (props) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedStationData, setEditedSationData] = useState({});

  const styleRow = {
    borderTop: "1px solid #a4b0af",
  };
  const styleCol1 = {
    fontSize: "16px",
    padding: "10px 0px 10px 10px",
    width: "45%",
    verticalAlign: "top",
    borderRight: "1px solid #a4b0af",
  };
  const styleCol2 = {
    display: "flex",
    fontSize: "16px",
    padding: "10px 0px 10px 0px",
    justifyContent: "center",
    alignItems: "center",
  };
  const styleCol3 = {
    fontSize: '18px',
    fontWeight: 'bold',
    padding: '10px 0px 10px 10px',
    verticalAlign: 'top',
    justifyContent: "center",
    alignItems: "center",
  };

  const StationStatusUpdate = (Station_ID, status) => {
    let updateStatus = 0;
    if (status === 0) {
      updateStatus = 1;
    }
    Axios.post("http://localhost:3001/api/toggleStationStatus", {
      Station_ID: Station_ID,
      updateStatus: updateStatus,
    }).then((res) => {
      if (res.data.message) {
        alert("Clerk status changed successfully!");
        // setIsButtonToggled(!isButtonToggled);
        props.getStation()
      } else {
        alert("Error");
      }
    });
  };

  const openEditModal = () => {
    setEditedSationData({
      Name: props.item.Name,
      District: props.item.District,
      Station_ID: props.item.Station_ID
    });
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedSationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    closeEditModal();
    Axios.post("http://localhost:3001/api/updateStation", editedStationData)
      .then((res) => {
        console.log(res.data);
        if (res.data.message === "success") {
          alert("Changes saved successfully!");
          props.getStation()
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
    <Container>
      <Table>
        <tr>
          <td style={styleCol1}>{props.item.Name}</td>
          <td style={styleCol2}>{props.item.District}</td>
          <td
            style={{
              ...styleCol3,
              color: props.item.station_status === 1 ? "green" : "red"
            }}
          >
            {props.item.station_status === 1 ? "Active" : "Deactive"}
          </td>
          <td>
            <FaEdit onClick={openEditModal} />
          </td>
          <td>
            <Switch
              onChange={() => StationStatusUpdate(props.item.Station_ID,props.item.station_status)}
              checked={props.item.station_status === 1}
            />
          </td>
        </tr>
      </Table>

      {/* Edit Modal */}
      <Modal show={isEditModalOpen} onHide={closeEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Station</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="Name"
                type="text"
                placeholder="name"
                value={editedStationData.Name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="District">
              <Form.Label>District</Form.Label>
              <Form.Control
                name="District"
                type="text"
                placeholder="District"
                value={editedStationData.District}
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
    </Container>
  );
};

export default StationListContainer;
