import React, {useEffect, useState} from 'react';
import './App.css';
import './assets/css/project.css'
import LoginForm from './components/Login'
import RegisterForm from './components/Register'
import Home from './components/Home'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

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
    <BrowserRouter>
    <Switch>
      <Route path="/home" render={props => <Home {...props} />} />
      <Route path="/login"><LoginForm/></Route>
      <Route path="/register"><RegisterForm/></Route>
      <Redirect from="/" to="/home/inventory" />
    </Switch>
  </BrowserRouter>
  );
}

export default App;
