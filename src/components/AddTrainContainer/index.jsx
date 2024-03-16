// import React, { useState, useEffect } from 'react';
// import { Container, Button, Heading, Form, Select, ButtonAndNavLinkBox, Button1 } from './AddTrainContainerElements';
// import Axios from 'axios';
// import AddTrainCoachContainer from '../AddTrainCoachContainer';
// import AddTrainStationContainer from '../AddTrainStationContainer';

// function AddTrainContainer(props) {
//   const [trainName, setTrainName] = useState("");
//   const [noOfCoaches, setNoOfCoaches] = useState(0);
//   const [noOfClasses, setNoOfClasses] = useState(2);
//   const [isAddTrainCoachContainerVisible, setIsAddTrainCoachContainerVisible] = useState(false);
//   const [isAddTrainStationContainerVisible, setIsAddTrainStationContainerVisible] = useState(false);
//   const [coachList, setCoachList] = useState([]);
//   const [stationCount, setStationCount] = useState(0);
//   const [stationList, setStationList] = useState([]);

//   useEffect(() => {
//     Axios.post("http://localhost:3001/api/getStationList", {})
//       .then((res) => {
//         const stations = res.data.map(station => station.Name);
//         setStationList(stations);
//       });
//   }, []);

//   const addPressed = (event) => {
//     event.preventDefault();

//     Axios.post("http://localhost:3001/api/addNewTrain", {
//       trainName: trainName,
//       noOfCoaches: noOfCoaches,
//       noOfClasses: noOfClasses,
//     })
//       .then((res) => {
//         if (res.data.isValid) {
//           alert("Train Added Successfully!");
//           setIsAddTrainCoachContainerVisible(true);

//           const newCoachList = Array.from({ length: noOfCoaches }, (_, index) => index + 1);
//           setCoachList(newCoachList);
//         } else {
//           alert("Train already exists!");
//         }
//       });
//   };

//   const addNewStationToPathPressed = (event) => {
//     event.preventDefault();
//     setStationCount(stationCount + 1);
//     setIsAddTrainStationContainerVisible(true);
//   };

//   const decrementStationCount = () => {
//     setStationCount(stationCount - 1);
//   };

//   const setIsAddTrainStationContainerVisibleToFalse = () => {
//     setIsAddTrainStationContainerVisible(false);
//   };

//   return (
//     <div style={{ display: "flex", flexDirection: "column", padding: "0px 0px 80px 0px", justifyContent: "center", alignItems: "center" }}>
//       {!isAddTrainCoachContainerVisible &&
//         <Container>
//           <Heading>
//             <h2 style={{ color: "#fff", textAlign: "center" }}>Add New Train</h2>
//           </Heading>
//           <Form>
//             <label style={{ padding: "0px 0px 0px 0px" }}>Train Name</label>
//             <hr style={{ background: "transparent", color: "transparent", margin: "0", borderStyle: "none", height: "1vw" }}></hr>
//             <input style={{ height: "40px", padding: "0px 0px 0px 10px" }} onChange={(e) => setTrainName(e.target.value)} type="text" placeholder="Enter Name" />
//             <br></br>

//             <label style={{ padding: "0px 0px 0px 0px" }}>No of Coaches</label>
//             <hr style={{ background: "transparent", color: "transparent", margin: "0", borderStyle: "none", height: "1vw" }}></hr>
//             <input style={{ height: "40px", padding: "0px 0px 0px 10px" }} onChange={(e) => setNoOfCoaches(e.target.value)} type="number" placeholder="Enter no of coaches" />
//             <br></br>

//             <hr style={{ background: "transparent", color: "transparent", margin: "0", borderStyle: "none", height: "1vw" }}></hr>
//             <ButtonAndNavLinkBox>
//               <Button onClick={addPressed}>Add</Button>
//             </ButtonAndNavLinkBox>
//           </Form>
//         </Container>
//       }

//       {isAddTrainCoachContainerVisible && coachList.map((coach, index) => (
//         <AddTrainCoachContainer
//           key={index}
//           coach={coach}
//           trainName={trainName}
//         />
//       ))}

//       <Button1 onClick={addNewStationToPathPressed}>Add Next Station to Path</Button1>

//       {isAddTrainStationContainerVisible &&
//         <AddTrainStationContainer
//           trainName={trainName}
//           stationList={stationList}
//           stationCount={stationCount}
//           decrementStationCount={decrementStationCount}
//           setIsAddTrainStationContainerVisibleToFalse={setIsAddTrainStationContainerVisibleToFalse}
//         />
//       }
//     </div>
//   );
// }

// export default AddTrainContainer;

import React, { useState, useEffect } from 'react';
import { Container, Button, Heading, Form, ButtonAndNavLinkBox, Button1 } from './AddTrainContainerElements';
import Axios from 'axios';
import AddTrainCoachContainer from '../AddTrainCoachContainer';
import AddTrainStationContainer from '../AddTrainStationContainer';
import { useNavigate } from 'react-router-dom';

function AddTrainStepper() {
  const [currentStep, setCurrentStep] = useState(1);
  const [trainName, setTrainName] = useState("");
  const [noOfCoaches, setNoOfCoaches] = useState(0);
  const [noOfClasses, setNoOfClasses] = useState(2);
  const [isAddTrainCoachContainerVisible, setIsAddTrainCoachContainerVisible] = useState(false);
  const [isAddTrainStationContainerVisible, setIsAddTrainStationContainerVisible] = useState(false);
  const [coachList, setCoachList] = useState([]);
  const [stationCount, setStationCount] = useState(0);
  const [stationList, setStationList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    Axios.post("http://localhost:3001/api/getStationList", {})
      .then((res) => {
        const stations = res.data.map(station => station.Name);
        setStationList(stations);
      });
  }, []);

  const handleStepChange = (step) => {
    setCurrentStep(step);
  };

  const addTrain = (event) => {
    event.preventDefault();
    Axios.post("http://localhost:3001/api/addNewTrain", {
      trainName: trainName,
      noOfCoaches: noOfCoaches,
      noOfClasses: noOfClasses,
    })
      .then((res) => {
        if (res.data.isValid) {
          alert("Train Added Successfully!");
          setIsAddTrainCoachContainerVisible(true);

          const newCoachList = Array.from({ length: noOfCoaches }, (_, index) => index + 1);
          setCoachList(newCoachList);
          setCurrentStep(2);
        } else {
          alert("Train already exists!");
        }
      });
  };

  const addNewStationToPathPressed = (event) => {
    event.preventDefault();
    setStationCount(stationCount + 1);
    setIsAddTrainStationContainerVisible(true);
    setCurrentStep(3);
  };

  const decrementStationCount = () => {
    setStationCount(stationCount - 1);
  };

  const setIsAddTrainStationContainerVisibleToFalse = () => {
    setIsAddTrainStationContainerVisible(false);
  };

  const addCoach = () => {
    setIsAddTrainCoachContainerVisible(false);
    setCurrentStep(1);
  };

  const addPressed = () => {
    Axios.post("http://localhost:3001/api/addNewTrain", {
      trainName: trainName,
      noOfCoaches: noOfCoaches,
      noOfClasses: noOfClasses,
    })
      .then((res) => {
        if (res.data.isValid) {
          alert("Train Added Successfully!");
          setIsAddTrainCoachContainerVisible(true);

          const newCoachList = Array.from({ length: noOfCoaches }, (_, index) => index + 1);
          setCoachList(newCoachList);
          setCurrentStep(2);
        } else {
          alert("Train already exists!");
        }
      });
  };

  const savePressed = (coachID, classID, noOfSeats) => {
    // alert("Saving");
    Axios.post("http://localhost:3001/api/addNewTrainCoach", {
      trainName: trainName,
      coachID: coachID,
      classID: classID,
      noOfSeats: noOfSeats,
    })
    .then((res) => {
      console.log(res)
        setCurrentStep(3);
        setIsAddTrainCoachContainerVisible(false);
        navigate('')
    });
  };

  const addPressedStation = (selectedStationName, selectedUpTime, selectedDownTime) => {
    Axios.post("http://localhost:3001/api/addTrainStation", {
      trainName: trainName,
      selectedStationName: selectedStationName,
      selectedUpTime: selectedUpTime,
      selectedDownTime: selectedDownTime,
      position: stationCount,
    })
    .then((res) => {
      setIsAddTrainStationContainerVisibleToFalse();
    });
  };

  const cancelPressed = () => {
    decrementStationCount();
    setIsAddTrainStationContainerVisibleToFalse();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "0px 0px 80px 0px", justifyContent: "center", alignItems: "center" }}>
      {currentStep === 1 && (
        <Container>
          <Heading>
            <h2 style={{ color: "#fff", textAlign: "center" }}>Add New Train</h2>
          </Heading>
          <Form>
            <label style={{ padding: "0px 0px 0px 0px" }}>Train Name</label>
            <hr style={{ background: "transparent", color: "transparent", margin: "0", borderStyle: "none", height: "1vw" }}></hr>
            <input style={{ height: "40px", padding: "0px 0px 0px 10px" }} onChange={(e) => setTrainName(e.target.value)} type="text" placeholder="Enter Name" />
            <br></br>

            <label style={{ padding: "0px 0px 0px 0px" }}>No of Coaches</label>
            <hr style={{ background: "transparent", color: "transparent", margin: "0", borderStyle: "none", height: "1vw" }}></hr>
            <input style={{ height: "40px", padding: "0px 0px 0px 10px" }} onChange={(e) => setNoOfCoaches(e.target.value)} type="number" placeholder="Enter no of coaches" />
            <br></br>

            <hr style={{ background: "transparent", color: "transparent", margin: "0", borderStyle: "none", height: "1vw" }}></hr>
            <ButtonAndNavLinkBox>
              <Button onClick={addTrain}>Add</Button>
            </ButtonAndNavLinkBox>
          </Form>
        </Container>
      )}

      {currentStep === 2 && coachList.map((coach, index) => (
        <AddTrainCoachContainer
          key={index}
          coach={coach}
          trainName={trainName}
          totalCoach={coachList}
          savePressed={savePressed}
        />
      ))}

      {currentStep === 3 && (
        <>
          <Button1 onClick={addNewStationToPathPressed}>Add Next Station to Path</Button1>

          {isAddTrainStationContainerVisible && (
            <AddTrainStationContainer
              trainName={trainName}
              stationList={stationList}
              stationCount={stationCount}
              decrementStationCount={decrementStationCount}
              setIsAddTrainStationContainerVisibleToFalse={setIsAddTrainStationContainerVisibleToFalse}
              addPressed={addPressedStation}
              cancelPressed={cancelPressed}
            />
          )}
        </>
      )}
      {currentStep === 4 && (
        <Button1 onClick={addCoach}>Add Coach</Button1>
      )}
      {currentStep !== 1 && (
        <Button1 onClick={() => handleStepChange(currentStep - 1)}>Previous</Button1>
      )}
    </div>
  );
}

export default AddTrainStepper;
