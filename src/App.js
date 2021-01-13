import React, { useEffect } from 'react';
import './App.css';
import { Token } from './services/apiConnection';

function App() {

  const currentToken = new Token();

  useEffect(() => {
    currentToken.loadToken();
  });

  return (
    <React.Fragment>
      <h1>Token</h1>
    </React.Fragment>
  );
}

export default App;
