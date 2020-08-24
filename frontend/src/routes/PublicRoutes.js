import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from '../components/Login';
// import Register from '../components/Register'
import NotFound from '../components/NotFound';

const PublicRoutes = ({ match }) => (
	<Fragment>
		<Switch>
			{/* <Route path="/register" component={Register} /> */}
            <Route path="/login" component={Login} />
            <Redirect from="/" to="/login" />
			<Route component={NotFound} />
		</Switch>
	</Fragment>
);

export default PublicRoutes;
