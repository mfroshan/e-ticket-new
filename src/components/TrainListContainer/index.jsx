import React, { useState } from 'react';
import TrainInfoContainer from '../TrainInfoContainer';
import { Container, Heading } from './TrainListContainer';

const TrainListContainer = (props) => {
    const [styleHeading, setStyleHeading] = useState({
        color: "#fff",
        textAlign: "center",
    });

    return (
        <Container>
            <Heading>
                <h2 style={styleHeading}>Available Trains</h2>
            </Heading>

            {props.trainIDFromPositionToPositionList.map((trainIDFromPositionToPosition, index) => (
                <TrainInfoContainer
                    key={index}
                    setPassengerMail={props.setPassengerMail}
                    passengerMail={props.passengerMail}
                    setFromStationID={props.setFromStationID}
                    fromStationID={props.fromStationID}
                    setToStationID={props.setToStationID}
                    toStationID={props.toStationID}
                    setFromStationPosition={props.setFromStationPosition}
                    fromStationPosition={props.fromStationPosition}
                    setToStationPosition={props.setToStationPosition}
                    toStationPosition={props.toStationPosition}
                    setJourneyDate={props.setJourneyDate}
                    journeyDate={props.journeyDate}
                    setClassID={props.setClassID}
                    classID={props.classID}
                    setNoOfPassengers={props.setNoOfPassengers}
                    noOfPassengers={props.noOfPassengers}
                    setSelectedTrainID={props.setSelectedTrainID}
                    selectedTrainID={props.selectedTrainID}
                    trainIDFromPositionToPosition={trainIDFromPositionToPosition}
                    selectedTrainIDFromPositionToPosition={props.selectedTrainIDFromPositionToPosition}
                    setSelectedTrainIDFromPositionToPosition={props.setSelectedTrainIDFromPositionToPosition}
                    setClerkID={props.setClerkID}
                    clerkID={props.clerkID}
                />
            ))}
        </Container>
    );
};

export default TrainListContainer;
