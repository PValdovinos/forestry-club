import './App.css';

import AppRouter from './router/AppRouter';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function App() {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <AppRouter />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App