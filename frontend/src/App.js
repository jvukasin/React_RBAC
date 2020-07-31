import React, {useEffect, useState} from 'react';
import './App.css';
import LoginForm from './components/Login/Login'
import RegisterForm from './components/Register/Register'

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
    <div className="container">
      {/* <LoginForm /> */}
      <RegisterForm />
    </div>
  );
}

export default App;
