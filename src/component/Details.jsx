import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from "react-bootstrap/Spinner"
import CardDays from "./CardDays";

const Details = () => {

    const [cityDetails, setCityDetails] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const[threeHours, setThreeHours] = useState(null)
    // eslint-disable-next-line no-unused-vars
    const [loading, setLoading] = useState(true);

    const params = useParams()

    useEffect(() => {
        getDetails()
        getThreeHours()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getDetails = () => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${params.cityId}&appid=d673b2e920e3a8dd681cb2f4c9488e84`)
        .then((response)=> {
            if(response.ok) {
                return response.json()
            } else {
                throw new Error("error in promise")
            }
        })
        .then((data) => {
            console.log("i dettagli sono i seguenti:",data)
            setCityDetails(data)
            setLoading(false)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const getThreeHours = () => {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${params.cityId}&appid=d673b2e920e3a8dd681cb2f4c9488e84`)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log("le previsioni ogni tre ore sono le seguenti:", data)
            setThreeHours(data)
        })
        .catch((error)=> {
            console.log(error)
        })
    }

    // funzione per convertire il valore della temperatura da kelvin a celsius
    const convertKelvinToCelsius = (tempKelvin) => {
        return tempKelvin - 273.15;
    }

 
    // Gestione dell'errore
    if (!cityDetails) {
        return (
            <Container className='mt-4'>
                <Row className='justify-content-center'>
                    <Col>
                        <Spinner animation="border" variant="primary" />
                    </Col>
                </Row>
            </Container>
        );
    }


    return (
        <Container className='mt-4'>
        <Row className="g-3">
            <Col xs={10} md={4} >
            <div className="border border-dark rounded bg-info-subtle h-100 p-2">
                <h1>{cityDetails.name}</h1>
                <h2>{convertKelvinToCelsius(cityDetails.main.temp).toFixed(1)}°C</h2>
                <h4>{cityDetails.weather[0].description}</h4>
                <img src={`https://openweathermap.org/img/wn/${cityDetails.weather[0].icon}@2x.png`} alt="icon"/> 
                <h5><strong>MAX:</strong> {convertKelvinToCelsius(cityDetails.main.temp_max).toFixed(1)}°C - <strong>MIN:</strong> {convertKelvinToCelsius(cityDetails.main.temp_min).toFixed(1)}°C </h5>
            </div>
            </Col>
         
            <Col xs={10} md={4}>
            <div className="border border-dark rounded bg-info-subtle  h-100 p-2">
                <h1>Pressure:</h1>
                <h2>{cityDetails.main.pressure} hPa</h2>
                <h1>Humidity:</h1>
                <h2>{cityDetails.main.humidity}%</h2>
            </div>
            </Col>
            <Col xs={10} md={4} >
            <div className="border border-dark rounded bg-info-subtle h-100 p-2">
                <h1>Perceived temperature:</h1>
                <h2>{convertKelvinToCelsius(cityDetails.main.feels_like).toFixed(1)}°C </h2>
              
            </div>
            </Col>
        </Row>
        <Row className="mt-4 gx-0 mb-4">
            {threeHours && threeHours.list && threeHours.list.slice(0,6).map((day, index) => {
                return (
                    <CardDays key={index} day={day}/>
                )}
                )}
        </Row>
    </Container>      
    )
}

export default Details