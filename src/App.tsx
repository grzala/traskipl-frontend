import React, { useContext, useEffect, useState } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Homepage from './Pages/Homepage';
import MotoRoutePage from './Pages/MotoRoutePage';
import Header from './Pages/Layout/Header';
import { userContext } from './Contexts/UserContext';
import { UserType, userContextType } from './Types/UserTypes';
import { checkLoggedIn } from './Actions/AuthActions';

import './App.scss';


const sampleUser: UserType = {
  first_name: "bayo",
  last_name: "yayo",
  email: "bayoyayo@yayo.yo"
}


function App() {


  useEffect(() => { // apply css to body
    document.body.className = 'default-body';

    return () => {
      document.body.className = '';
    }
  }, [])

  const onLogin = () => {
    console.log("login")
    checkLoggedIn();
  }

  const onLogout = () => {
    console.log("loagout")
  }

  const [currentUser, setCurrentUser] = useState<UserType>(
    sampleUser
  );



  return (
    <div className="App">


      <userContext.Provider value={{
        user: currentUser,
        login: onLogin,
        logout: onLogout
        }}>

        <div className="container-fluid" >
          <Router>

            <Header />

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
