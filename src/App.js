import React, { useEffect } from 'react';
import './App.css';
import { Token, Things } from './services/apiConnection';

function App() {

  const CurrentToken = new Token();
  const CurrentThings = new Things();

  useEffect(() => {
    CurrentToken.loadToken();
    CurrentThings.showThings();
  });

  return (
    <React.Fragment>
      <h1>Token</h1>
    </React.Fragment>
  );
}

export default App;
