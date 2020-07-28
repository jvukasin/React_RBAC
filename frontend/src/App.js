import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import TestService from './services/TestService';

function App() {

  const [data, setData] = useState([]);

  useEffect(() => {
    TestService.testRetrieve()
    .then(response => {
      console.log(response.data)
      setData(response.data)
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {data.map(
          d => <h3 key={d.id}>{d.name}</h3>
        )}
      </header>
    </div>
  );
}

export default App;
