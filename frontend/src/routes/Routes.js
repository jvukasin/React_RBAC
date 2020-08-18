import React from 'react';
import PrivateRoutes from './PrivateRoutes';
import history from '../util/history';
import { Router, Route, Switch } from "react-router-dom";
import Auth from '../components/Auth'

function Routes() {
    return (
        <Router history={history}>
            <Switch>
                <Route path="/app" component={PrivateRoutes}/>
                <Route path="" render={Auth}/>
            </Switch>
        </Router>
    );
  }
  
  export default Routes;