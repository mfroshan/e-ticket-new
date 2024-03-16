import React, { useState, useEffect } from "react";
import { Container2, Heading, Table1 } from "./StationListContainerElements";
import Axios from "axios";
import Switch from "react-switch";
import { Button } from "react-bootstrap";
import AddTrainStationContainer from "../AddTrainStationContainer";
import AddTrainFare from "../AddFare";
import { IoIosAdd } from "react-icons/io";

// import Button from 'react-bootstrap/Button';

import { useNavigate } from "react-router-dom";



const TrainViewContainer = () => {
  const [TrainData, setTrainData] = useState([]);
  const [isAddTrainStationContainerVisible, setIsAddTrainStationContainerVisible] = useState(false);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [isAddTrainFairVisible,setisAddTrainFairVisible] = useState(false);

  const navigate = useNavigate();

  const fetchData = () => {
    Axios.get("http://localhost:3001/api/trainList", {}).then((res) => {
      setTrainData(res.data);
    });
  };

  
  useEffect(() => {
    fetchData();
  }, []);

  const addNewStationToPathPressed = (train) => {
    setSelectedTrain(train);
    setIsAddTrainStationContainerVisible(true);
  };


  const AddFair = (train) => {
    setSelectedTrain(train);
    setisAddTrainFairVisible(true);
  }

  const ViewCoach = (train) => {
    console.log(train);
    navigate(`/view-coachs/${train.Train_ID}`)
  }

  const trainStatusUpdate = (Train_ID, status) => {
    let updateStatus = 0;
    if (status === 0) {
      updateStatus = 1;
    }

    const Updatevalue = { Train_ID: Train_ID, updateStatus: updateStatus };
    Axios.post("http://localhost:3001/api/toggletrainStatus", {
      Updatevalue
    }).then((res) => {
      if (res.data.message) {
        alert("train status changed successfully!");
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
          Train List
        </h2>
      </Heading>

      {TrainData.length > 0 ? (
        <>
          <Table1>
            <tbody>
              <tr>
                <td>Train Name</td>
                <td>No of Classes</td>
                <td>No of coaches</td>
                <td>Status</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              {TrainData.map((train) => (
                <tr key={train.passenger_id}>
                  <td>{train.Name}</td>
                  <td>{train.No_of_classes}</td>
                  <td>{train.No_of_coaches}</td>
                  <td
                    style={{
                      color: train.active_status === 1 ? "green" : "red",
                    }}
                  >
                    {train.active_status === 1 ? "Active" : "Deactive"}
                  </td>
                  <td>
                    <Button onClick={() => addNewStationToPathPressed(train)}>Add Train Station</Button>
                  </td>
                  <td>
                    <Button onClick={() => addNewStationToPathPressed(train)}>View Train Station</Button>
                  </td>
                  <td>
                    <Button onClick={() => AddFair(train)}>Add Fare</Button>
                  </td>
                  <td>
                    <Button onClick={() => ViewCoach(train)}>View Fare Details</Button>
                  </td>
                  <td>
                    <Button onClick={() => ViewCoach(train)}>View Coach Details</Button>
                  </td>
                  <td>
                    <Switch
                      onChange={() =>
                        trainStatusUpdate(train.Train_ID, train.active_status)
                      }
                      checked={train.active_status === 1}
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

      {isAddTrainStationContainerVisible && selectedTrain && (
        <AddTrainStationContainer
          trainID={selectedTrain.Train_ID}
          trainName={selectedTrain.Name}
          setIsAddTrainStationContainerVisible={setIsAddTrainStationContainerVisible}
          // Pass other necessary props
        />
      )}


{isAddTrainFairVisible && selectedTrain && (
        <AddTrainFare
          trainID={selectedTrain.Train_ID}
          trainName={selectedTrain.Name}
          setisAddTrainFairVisible={setisAddTrainFairVisible}
          // Pass other necessary props
        />
      )}

    </Container2>
  );
};

export default TrainViewContainer;
