import React, { useContext, useEffect, useState } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Homepage from './Pages/Homepage';
import MotoRoutePage from './Pages/MotoRoutePage';
import Header from './Pages/Layout/Header';
import { userContext } from './Contexts/UserContext';
import { UserType, userContextType } from './Types/UserTypes';
import { login, checkLoggedIn as checkedLoggedInAction, logout } from './Actions/AuthActions';

import './App.scss';


function App() {

  const [currentUser, setCurrentUser] = useState<UserType | null>(
    null
  );

  useEffect(() => { 
    document.body.className = 'default-body'; // apply css to body

    const fetchLoggedIn = async () => {
      const response = await checkedLoggedInAction()
      const { data } = response

      if (response.status != 200) {
        console.log("error");
        console.log(data.error_msgs)
        return
      } 
  
      const user = data.user
      setCurrentUser(user);

    }

    fetchLoggedIn();

    return () => {
      document.body.className = '';
    }
  }, [])



  const onLogin = async (userLoginData: {user: {email: string, password: string}}) => {
    const response = await login(userLoginData);

    const { data } = response
    if (response.status != 200) {
      console.log("error");
      console.log(data.error_msgs)
      return
    } 

    const user = data.user
    setCurrentUser(user);
  }

  const onLogout = async () => {
    const response = await logout()
    const { data } = response

    if (response.status != 200) {
      console.log("error");
      console.log(data.error_msgs)
      return
    } 
    
    // set user to null if successful logout
    setCurrentUser(null);
  }




  return (
    <div className="App">


      <userContext.Provider value={{
          user: currentUser,
          onLogin: onLogin,
          onLogout: onLogout
        }}>

        <div className="container-fluid" >
          <Router>

            <button className="btn btn-primary" onClick={onLogout}>Logout</button>
            <span>Logged in user: { JSON.stringify(currentUser) }</span>

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
