import React, { useContext, useEffect, useState } from 'react';
import './App.scss';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Homepage from './Pages/Homepage';
import MotoRoutePage from './Pages/MotoRoutePage';
import Header from './Pages/Layout/Header';
import { userContext } from './Contexts/UserContext';
import { User, currentUserType } from './Types/UserTypes';



function App() {


  useEffect(() => { // apply css to body
    document.body.className = 'default-body';

    return () => {
      document.body.className = '';
    }
  }, [])


  const [currentUser, setCurrentUser] = useState<currentUserType>(null);



  return (
    <div className="App">


      <userContext.Provider value={{user: currentUser}}>

        <div className="container-fluid" >
          <Header />
          <Router>

            <div className="main-content-wrapper container">
              <Routes>


                <Route path="/routes/:id/*" element={ <MotoRoutePage /> } />
                <Route path="/routes/:id" element={ <MotoRoutePage /> } />
                <Route path="/" element={ <Homepage /> } />
              </Routes>
            </div>
          </Router>
        </div>
    
      </userContext.Provider>
    </div>
  );
}

export default App;
