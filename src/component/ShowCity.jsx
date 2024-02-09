import { useEffect, useState } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from "react-bootstrap/Spinner"
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";

const ShowCity = (props) => {
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);

    const fetchCity = () => {
        setLoading(true);
        setError(null); // Reimposta l'errore su null prima di ogni nuova ricerca
        setCities([]); // Pulisce l'array delle città prima di ogni nuova ricerca
    
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${props.searchValue}&appid=d673b2e920e3a8dd681cb2f4c9488e84`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("City not found");
                }
            })
            .then((data) => {
                console.log(data)
                setCities([data]);
                setLoading(false);
            })
            .catch((error) => {
                setError(true);
                setLoading(false);
            });
    };

    useEffect(() => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        if (props.searchValue) {
            const id = setTimeout(fetchCity, 500); // Ritardo di 500ms prima di eseguire la fetch
            setTimeoutId(id);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.searchValue]);


    return (
        <Container>
            <Row className='justify-content-center mt-5'>
                <Col xs={10}>
                    <ListGroup>
                        {loading && ( <Spinner animation="border" variant="primary" className="ms-auto me-auto "></Spinner>) }
                        {cities.length === 0 && loading === false && error === true ? ( <Alert variant="dark">No city found, try type new city</Alert>) : (cities.map((city, index) => (
                            <Link className="list-group-item" key={index} to={"/details/" + city.name}>{city.name}, {city.sys.country}</Link>
                        )))}
                      
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default ShowCity;