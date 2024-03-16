import React, { useState, useEffect } from "react";
import { Container2, Heading, Table1 ,Select} from "./ShowClerkContainerElements";
import Axios from "axios";
import Switch from "react-switch";
import { useParams } from "react-router-dom";
import { Button, Modal, Form } from "react-bootstrap";

const ViewCoachDetails = ({ train }) => {
  const { id } = useParams();

  const [oldCoachValue,setOldCoachValue] = useState([]);

  const [trainCoachData, setTrainCoachData] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [TrainClass, setTrainClass] = useState([]);


  const fetchData = () => {
    Axios.post("http://localhost:3001/api/getCoachDetailsByTrainID", {
      Train_ID: id
    }).then((response) => {
      setTrainCoachData(response.data.trainCoachData);
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/api/getTrainClass").then((response) => {
      setTrainClass(response.data);
    });

    fetchData();
  }, [id]);

  const coachStatusUpdate = (Train_ID, Coach_ID, status) => {
    let updateStatus = status === 0 ? 1 : 0;
    const updateValue = { Train_ID: Train_ID, Coach_ID: Coach_ID, updateStatus: updateStatus };
    Axios.post("http://localhost:3001/api/toggleCoachStatus", {
      updateValue
    }).then((res) => {
      if (res.data.message) {
        alert("Coach status changed successfully!");
        fetchData();
      } else {
        alert(`${res.data.message}`);
      }
    });
  };

  const editCoach = (coach) => {
    setOldCoachValue(coach)    
    setSelectedCoach(coach);
    setShowEditModal(true);
  };

  useEffect(()=>{
    console.log(selectedCoach);
  },[selectedCoach])

  const handleCloseCoachModal = () => {
    setShowEditModal(false);
    setSelectedCoach(null);
  };

  const handleClassChange = (e) => {
    setSelectedCoach(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSaveChanges = () => {

    Axios.post('http://localhost:3001/api/UpdateCoach',{
    selectedCoach,
    oldValues: oldCoachValue
    }).then((response)=>{
      alert(response.data.message)
      setShowEditModal(false);
      setSelectedCoach(null);
      fetchData();
    })
    
  };

  return (
    <Container2>
      <Heading>
        <h2 style={{ color: "#fff", textAlign: "center" }}>Coach Information</h2>
      </Heading>

      {trainCoachData.length > 0 ? (
        <Table1>
          <tbody>
            <tr>
              <th>SI.NO</th>
              <th>Coach Number</th>
              <th>Class Name</th>
              <th>No of Seats</th>
              <th>Status</th>
              <th></th>
            </tr>
            {trainCoachData.map((data, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{data.Coach_ID}</td>
                <td>{data.class_name}</td>
                <td>{data.No_of_seats}</td>
                <td style={{ color: data.coach_status === 1 ? "green" : "red" }}>
                  {data.active_status === 1 ? "Active" : "Inactive"}
                </td>
                <td>
                  <Button onClick={() => editCoach(data)}>Edit Coach Details</Button>
                </td>
                <td>
                  <Switch
                    onChange={() => coachStatusUpdate(data.Train_ID, data.Coach_ID, data.coach_status)}
                    checked={data.coach_status === 1}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table1>
      ) : (
        <p>No Data Found</p>
      )}

      <Modal show={showEditModal} onHide={handleCloseCoachModal} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Coach Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="coachNumber">
              <Form.Label>Coach Number</Form.Label>
              <Form.Control type="number" name="Coach_ID" defaultValue={selectedCoach?.Coach_ID} onChange={handleClassChange} required/>
            </Form.Group>
            <Form.Group controlId="className">
              <Form.Label>Class Name</Form.Label>
              <Select value={selectedCoach?.class_name} name="Class_ID" onChange={handleClassChange}>
                {TrainClass.map((trainClass, index) => (
                  <option key={index} value={trainClass.class_name}>
                    {trainClass.class_name}
                  </option>
                ))}
              </Select>
            </Form.Group>
            <Form.Group controlId="NoofSeats">
              <Form.Label>No of Seats</Form.Label>
              <Form.Control type="number" name="No_of_seats" onChange={handleClassChange} defaultValue={selectedCoach?.Coach_ID} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCoachModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container2>
  );
};

export default ViewCoachDetails;
