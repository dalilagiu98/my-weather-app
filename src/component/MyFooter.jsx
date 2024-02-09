import Col from "react-bootstrap/esm/Col"
import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/esm/Row"

const MyFooter = () => {

    const currentYear = new Date().getFullYear()

    return (
        <Container fluid>
            <Row className="text-center bg-dark text-white p-3">
                <Col>
                    <div>
                        <h5>&copy;IlMeteo 2000 - <span>{currentYear}</span></h5>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default MyFooter