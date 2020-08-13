import React, { Component, Fragment, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { uniqBy } from 'lodash';
import * as Routes from './ComponentRoutes';
import NotFound from '../components/NotFound';
import routes from '../mockRoutes/routes'
import Navigation from '../components/Navigation'
import Inventory from '../components/Inventory'

class PrivateRoutes extends Component {

	state = { allowedRoutes: [] };

	componentDidMount() {
		/*
      TODO: Replace hardcoded roles with redux,
       localStorage, or get from server.
     */
		// let roles = JSON.parse(localStorage.getItem('roles'));
		// if (roles) {
		// 	roles = ['common', ...roles];
            
        //     //TODO ovde izvuci iz baze sve "routes" za rolu + common
		// 	let allowedRoutes = roles.reduce((acc, role) => {
		// 		return [...acc, ...rolesConfig[role].routes];
		// 	}, []);

		// 	// For removing duplicate entries, compare with 'url'.
		// 	allowedRoutes = routes;
		// 	allowedRoutes = uniqBy(allowedRoutes, 'url');
		// 	this.setState({ allowedRoutes });
		// } else {
		// 	this.props.history.push('/');
		// }
		let allowedRoutes = routes;
		allowedRoutes = uniqBy(allowedRoutes, 'url');
		this.setState({ allowedRoutes });

	}

	render() {
		return (
			<Fragment>
				<Navigation
					routes={this.state.allowedRoutes}
					path={this.props.match.path}
				/>
				<Switch>
					{this.state.allowedRoutes.map((route) => {

						const Component = Routes[route.component];
						return (
							<Route
								exact
								key={route.url}
								path={`${this.props.match.path}${route.url}`}
							>
								<Component allowedActions={route.actions}/>
							</Route>
						)
					})}
					<Route component={NotFound} />
				</Switch>
			</Fragment>
		);
	}
}

export default PrivateRoutes;
