import React, { useState, useEffect } from 'react';
import './App.css';
import { Token, Things } from './services/apiConnection';

function App() {
  const [light, setLight] = useState(localStorage.getItem("light"));
  const [axis, setAxis] = useState(localStorage.getItem("axis"));
  const [air, setAir] = useState(localStorage.getItem("air"));

  const CurrentToken = new Token();
  const CurrentThings = new Things();

  useEffect(() => {
    CurrentToken.loadToken();
    
    console.log("Loading values.")
    CurrentThings.showThings();

    setLight(localStorage.getItem("light"));
    setAxis(localStorage.getItem("axis"));
    setAir(localStorage.getItem("air"));

    setInterval(() => {
      console.log("updating values")
      CurrentThings.showThings();

      setLight(localStorage.getItem("light"));
      setAxis(localStorage.getItem("axis"));
      setAir(localStorage.getItem("air"));
    }, 10000);
  });

  return (
    <React.Fragment>
      <div id="main-container">
        <h1>Sensorcube</h1>
        <p>
          light: {light}
        </p>
        <p>
          axis: {axis}
        </p>
        <p>
          air: {air}
        </p>
      </div>
    </React.Fragment>
  );
}

export default App;
