import React from 'react'
import PublicRoutes from '../routes/PublicRoutes'
import {Redirect} from 'react-router-dom';
import {isLoggedIn} from '../helperFunctions/Functions'

export default function Auth() {

	return isLoggedIn() ? (
			<Redirect to="/app" />
		) : (
			<PublicRoutes />
		)
};
