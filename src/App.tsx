import React, { useEffect } from 'react';
import './App.scss';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Homepage from './Pages/Homepage';
import MotoRoutePage from './Pages/MotoRoutePage';
import Header from './Pages/Layout/Header';

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
        <Header />
        <Router>

          <div className="main-content-wrapper container">
            <Routes>


              <Route path="/routes/:id" element={ <MotoRoutePage /> } />
              <Route path="/" element={ <Homepage /> } />
            </Routes>
          </div>
        </Router>
      </div>
    
    </div>
  );
}

export default App;
