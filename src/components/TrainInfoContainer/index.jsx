import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Table, Button } from './TrainInfoContainerElements';
import Axios from 'axios';

const TrainInfoContainer = (props) => {
    const [trainInfo, setTrainInfo] = useState({
        trainName: '',
        fromStationName: '',
        toStationName: '',
        departureTime: '',
    });

    const history = useNavigate();

    useEffect(() => {
        Axios.post('http://localhost:3001/api/getTrainName', {
            trainID: props.trainIDFromPositionToPosition.trainID,
        }).then((res) => {
            setTrainInfo((prev) => ({ ...prev, trainName: res.data[0].Name }));
        });

        Axios.post('http://localhost:3001/api/getStationNameFromTrainIDAndPosition', {
            trainID: props.trainIDFromPositionToPosition.trainID,
            position: props.trainIDFromPositionToPosition.fromStationPosition,
        }).then((res) => {
            setTrainInfo((prev) => ({ ...prev, fromStationName: res.data[0].Name }));
        });

        Axios.post('http://localhost:3001/api/getStationNameFromTrainIDAndPosition', {
            trainID: props.trainIDFromPositionToPosition.trainID,
            position: props.trainIDFromPositionToPosition.toStationPosition,
        }).then((res) => {
            setTrainInfo((prev) => ({ ...prev, toStationName: res.data[0].Name }));
        });

        const timeEndpoint =
            props.trainIDFromPositionToPosition.fromStationPosition <
            props.trainIDFromPositionToPosition.toStationPosition
                ? 'http://localhost:3001/api/getUpTime'
                : 'http://localhost:3001/api/getDownTime';

        Axios.post(timeEndpoint, {
            trainID: props.trainIDFromPositionToPosition.trainID,
            position: props.trainIDFromPositionToPosition.fromStationPosition,
        }).then((res) => {
            setTrainInfo((prev) => ({ ...prev, departureTime: res.data[0].Up_time }));
        });
    }, [props]);

    const seeDetailsPressed = (event) => {
        event.preventDefault();

        props.setSelectedTrainID(props.trainIDFromPositionToPosition.trainID);
        props.setFromStationPosition(props.trainIDFromPositionToPosition.fromStationPosition);
        props.setToStationPosition(props.trainIDFromPositionToPosition.toStationPosition);
        props.setSelectedTrainIDFromPositionToPosition(props.trainIDFromPositionToPosition);

        if (props.clerkID !== 0) history('/traincoach-clerk' );
        else history('/traincoach' );
    };

    return (
        <Container>
            <Table style={styleTable}>
                <tr>
                    <td style={styleCol1}>Train Name:</td>
                    <td style={styleCol2}>{trainInfo.trainName}</td>
                </tr>

                <tr style={styleRow}>
                    <td style={styleCol1}>From Station:</td>
                    <td style={styleCol2}>{trainInfo.fromStationName}</td>
                </tr>

                <tr style={styleRow}>
                    <td style={styleCol1}>To Station:</td>
                    <td style={styleCol2}>{trainInfo.toStationName}</td>
                </tr>

                <tr style={styleRow}>
                    <td style={styleCol1}>Departure time:</td>
                    <td style={styleCol2}>{trainInfo.departureTime}</td>
                </tr>
            </Table>

            <Button onClick={seeDetailsPressed}>See Details</Button>
        </Container>
    );
};

export default TrainInfoContainer;
