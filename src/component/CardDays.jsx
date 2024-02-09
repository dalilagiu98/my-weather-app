import { Col } from "react-bootstrap"
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

const CardDays = (props) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // funzione per convertire il valore della temperatura da kelvin a celsius
    const convertKelvinToCelsius = (tempKelvin) => {
        return tempKelvin - 273.15;
    }
    // funzione per formattare la data
    const formatDate = (unixTimestamp) => {
        const date = new Date(unixTimestamp * 1000); // Moltiplica per 1000 per convertire secondi in millisecondi
        const options = { day: "numeric", month: "long" };
        return date.toLocaleDateString("en-EN", options);
    };

    // funzione per formattare l'orario
    const formatTime = (unixTimestamp) => {
        const date = new Date(unixTimestamp * 1000); // Moltiplica per 1000 per convertire secondi in millisecondi
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
    };

    return (
        <Col  xs={12} lg={2}>
            <div className="border border-dark rounded bg-info-subtle p-2 h-100" onClick={handleShow} style={{ cursor: 'pointer' }}>
                <h4>{formatDate(props.day.dt)}</h4>
                <h4>{formatTime(props.day.dt)}</h4>
                <img src={`https://openweathermap.org/img/wn/${props.day.weather[0].icon}@2x.png`} alt="icon"/> 
                <h5>Temperature:</h5>
                <h6>{convertKelvinToCelsius(props.day.main.temp).toFixed(1)}°C</h6> 
                <h5>Description:</h5>
                <h6> {props.day.weather[0].description}</h6>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Weather forecast for the day {formatDate(props.day.dt)} at {formatTime(props.day.dt)}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Temperature:</h4>
                    <h5>{convertKelvinToCelsius(props.day.main.temp).toFixed(1)}°C</h5>
                    <h4>Description:</h4>
                    <h5> {props.day.weather[0].description}</h5>
                    <h4>MAX:</h4>
                    <h5> {convertKelvinToCelsius(props.day.main.temp_max).toFixed(1)}°C</h5>
                    <h4>MIN:</h4>
                    <h5> {convertKelvinToCelsius(props.day.main.temp_min).toFixed(1)}°C</h5>
                    <h4>Pressure:</h4>
                    <h5> {props.day.main.pressure} hPa</h5>
                    <h4>Humidity:</h4>
                    <h5> {props.day.main.humidity}%</h5>
                    <h4> Visibility:</h4>
                    <h5> {props.day.visibility / 1000}km</h5>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </Col> 
    )
}

export default CardDays