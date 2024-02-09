import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const SearchingCity = (props) => {
    return(
        <Container fluid  style={{ backgroundImage: 'url("/banner.jpeg")', backgroundSize: 'cover', backgroundPosition: 'center' }} className='h-25'>
            <Row className='justify-content-center p-6'>
                <Col xs={10}>
                    <InputGroup size="lg" className='mt-5'>
                        <Form.Control
                            aria-label="Large"
                            aria-describedby="inputGroup-sizing-sm"
                            placeholder='Insert the name of the city followed by , and the state acronym...'
                            value={props.searchValue}
                            onChange={(e)=> {
                                props.setSearchValue(e.target.value)
                            }}
                        />
                        <InputGroup.Text id="inputGroup-sizing-lg"><i className="bi bi-search"></i></InputGroup.Text>
                    </InputGroup>
                </Col>
            </Row>
        </Container>
   
    )
}

export default SearchingCity