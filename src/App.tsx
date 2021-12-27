import React, { useEffect, useState } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Homepage from './Pages/Homepage';
import MotoRoutePage from './Pages/MotoRoutePage';
import Header from './Pages/Layout/Header';
import { userContext } from './Contexts/UserContext';
import { UserSignupType, UserType } from './Types/UserTypes';
import { login, checkLoggedIn as checkedLoggedInAction, logout, register } from './Actions/AuthActions';

import './App.scss';

import { toast, ToastContainer } from 'react-toastify';
import ToasterStyles from "./ToasterStyles/ToasterStyles"
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
import MotoRouteCreator from './Pages/MotoRouteCreator';
axios.defaults.withCredentials = true;

function App() {

  const [currentUser, setCurrentUser] = useState<UserType | null>(
    null
  );

  useEffect(() => { 
    document.body.className = 'default-body'; // apply css to body


    // Login, Logout and CheckIsLoggedIn 
    const fetchLoggedIn = async () => {
      const response = await checkedLoggedInAction()
      const { data } = response

      if (response.status !== 200) {
        if (data?.messages) {
          toast.error(`Login unsuccessful: ${data.messages.join(", ")}`, ToasterStyles);
        }
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

  const onLogin = async (userLoginData: {user: {email: string, password: string}}): Promise<boolean> =>  {
    const response = await login(userLoginData);

    const { data } = response
    if (response.status !== 200) {
      if (data?.messages) {
        toast.error(`Login unsuccessful: ${data.messages.join(", ")}`, ToasterStyles);
      }
      return false
    } 

    const user = data.user
    setCurrentUser(user);
    console.log(user)
    toast.success(data.messages.join(", "), ToasterStyles);
    return true
  }

  const onLogout = async () => {
    const response = await logout()
    const { data } = response

    if (response.status !== 200) {
      if (data?.messages) {
        toast.error(`Logout unsuccessful: ${data.messages.join(", ")}`, ToasterStyles);
      }
      return
    } 
    
    // set user to null if successful logout
    setCurrentUser(null);
    toast.success(data.messages.join(", "), ToasterStyles);
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

            <Header />

            <div className="main-content-wrapper container">
              <Routes>


                <Route path="/routes/:id/*" element={ <MotoRoutePage /> } />
                <Route path="/routes/:id" element={ <MotoRoutePage /> } />
                <Route path="/routes/creator/*" element={ <MotoRouteCreator /> } />
                <Route path="/routes/creator" element={ <MotoRouteCreator /> } />
                <Route path="/" element={ <Homepage /> } />
              </Routes>
            </div>
          </Router>
        </div>

      <ToastContainer />
    
      </userContext.Provider>

    </div>
  );
}

export default App;
