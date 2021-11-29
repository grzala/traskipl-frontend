import React, { useEffect } from 'react';
import './App.scss';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Homepage from './Pages/Homepage';
import MotoRoutePage from './Pages/MotoRoutePage';

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
        <Router>
          <Routes>


            <Route path="/routes/:id" element={ <MotoRoutePage /> } />
            <Route path="/" element={ <Homepage /> } />
          </Routes>
        </Router>
      </div>
    
    </div>
  );
}

export default App;
