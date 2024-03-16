import React, { useEffect, useState } from "react";
import {
  Container,
  Button,
  Heading,
  Form,
  ButtonAndNavLinkBox,
  Select,
} from "./AddTrainCoachContainerElements";
import Axios from "axios";

function AddTrainCoachContainer({coach,trainName,totalCoach,savePressed}) {
  const [classID, setClassID] = useState("");
  const [noOfSeats, setNoOfSeats] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [TrainClass, setTrainClass] = useState([]);

  // console.log(props);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/getTrainClass").then((response) => {
      setTrainClass(response.data);
    });
    console.log({coach,trainName,totalCoach,savePressed})
  }, []);


  // console.log(props)

  // if()


  const handleSaveCoach = () => {
      Axios.post("http://localhost:3001/api/addNewTrainCoach", {
      trainName: trainName,
      coachID: coach,
      classID: classID,
      noOfSeats: noOfSeats,
    })
    .then((res) => {
      setIsVisible(false);
    });
  };
  
  const handleSave = () => {
    console.log(coach, classID, noOfSeats);
    if (totalCoach.length === coach) {
      console.log("if");
      savePressed(coach,classID,noOfSeats);
    } else {
      console.log("else");
      handleSaveCoach();
    }
  };
  
  

  return (
    <div style={{ width: "70%" }}>
      {isVisible && (
        <Container>
          <br></br>
          <br></br>
          <Heading>
            <h2 style={{ color: "#fff", textAlign: "center" }}>
              Coach no {coach}
            </h2>
          </Heading>
          <Form>
            <label style={{ padding: "0px 0px 0px 0px" }}>Class ID</label>
            <hr
              style={{
                background: "transparent",
                color: "transparent",
                margin: "0",
                borderStyle: "none",
                height: "1vw",
              }}
            ></hr>
            <Select
              value={classID}
              style={{ height: "40px", padding: "0px 0px 0px 10px" }}
              onChange={(e) => setClassID(e.target.value)}
              required
            >
              {TrainClass.map((data) => (
                <option key={data.class_id} value={data.class_id}>
                  {data.class_name}
                </option>
              ))}
            </Select>
            <br></br>

            <label style={{ padding: "0px 0px 0px 0px" }}>No of Seats</label>
            <hr
              style={{
                background: "transparent",
                color: "transparent",
                margin: "0",
                borderStyle: "none",
                height: "1vw",
              }}
            ></hr>
            <input
              style={{ height: "40px", padding: "0px 0px 0px 10px" }}
              onChange={(e) => setNoOfSeats(e.target.value)}
              type="number"
              placeholder="Enter No of Seats"
              required
            />
            <br></br>

            <ButtonAndNavLinkBox>
              <Button  type="button" onClick={handleSave}>Save</Button>
            </ButtonAndNavLinkBox>
          </Form>
        </Container>
      )}
    </div>
  );
}

export default AddTrainCoachContainer;
