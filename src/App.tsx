import React, { useEffect } from 'react';
import './App.scss';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Homepage from './Pages/Homepage';

function App() {

  useEffect(() => {
    document.body.className = 'default-body';

    return () => {
      document.body.className = '';
    }
  }, [])

  return (
    <div className="App">
      <div className="container-fluid" >
          <Homepage />
      </div>
    
    </div>
  );
}

export default App;
