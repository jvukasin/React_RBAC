import React, { Fragment, useState, useEffect } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import * as Routes from './ComponentRoutes';
import NotFound from '../components/NotFound';
import Navigation from '../components/Navigation'
import UserService from '../services/UserService'
import { Redirect } from 'react-router-dom';

function PrivateRoutes() {
	const match = useRouteMatch('/app');
	const [allowedRoutes, setAllowedRoutes] = useState([]);
	const [hasRoutes, setHasRoutes] = useState(false);

	
	useEffect(() => {
		UserService.isUserLoggedIn().then(response => {
				let isit = response.data
			    if(isit) {
					UserService.getUserRoutes().then(response => {
						if(response != null) {
							setAllowedRoutes(response.data)
							setHasRoutes(true);
						}
					})
				} else {
					return <Redirect to="/" />;
				}
			})
	}, [])


	if({hasRoutes}) {
		return (<Fragment>
			<Navigation routes={allowedRoutes} path={match.path} />
			<Switch>
				{allowedRoutes.map((route) => {
		
					const Component = Routes[route.component];
					return (
						<Route
							exact
							key={route.url}
							path={`${match.path}${route.url}`}
						>
							<Component allowedActions={route.actions}/>
						</Route>
					)
				})}
				<Route component={NotFound} />
			</Switch>
		</Fragment>
		)
	} else {
		return (
			<div style={{textAlign: 'center'}}>
				<h1 style={{marginTop: '15%'}}>Loading...</h1>
			</div>
			)
	}

}

export default PrivateRoutes;
