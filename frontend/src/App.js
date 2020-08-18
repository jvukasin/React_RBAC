import React from 'react';
import './App.css';
import './assets/css/project.css'
import { Container, Row, Col } from 'react-bootstrap';
import Routes from './routes/Routes'

function App() {
  return (
    <Container fluid>
		<Row>
			<Col>
				<Routes/>
			</Col>
		</Row>
	</Container>
  );
}

export default App;
