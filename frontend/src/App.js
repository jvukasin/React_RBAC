import React, {useEffect, useState} from 'react';
import './App.css';
import './assets/css/project.css'
import PublicRoutes from './routes/PublicRoutes';
import PrivateRoutes from './routes/PrivateRoutes';
import history from './util/history';
import { Container, Row, Col } from 'react-bootstrap';
import { Router, Route, Switch, Redirect } from "react-router-dom";

const authentication = () =>
	JSON.parse(localStorage.getItem('roles')) ? (
		<Redirect to="/app" />
	) : (
		<PublicRoutes />
	);

function App() {

  const [data, setData] = useState([]);

  // useEffect(() => {
  //   TestService.testRetrieve()
  //   .then(response => {
  //     console.log(response.data)
  //     setData(response.data)
  //   })
  // }, [])

  return (
    <Container fluid>
				<Row>
					<Col>
						<Router history={history}>
							<Switch>
								<Route path="/app" component={PrivateRoutes} />
								<Route path="" render={authentication} />
							</Switch>
						</Router>
					</Col>
				</Row>
			</Container>
  );
}

export default App;
