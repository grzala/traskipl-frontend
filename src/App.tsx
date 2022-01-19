import React, { useEffect, useState } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Homepage from './Pages/Homepage';
import MotoRoutePage from './Pages/MotoRoutePage';
import Header from './Pages/Layout/Header';
import { userContext } from './Contexts/UserContext';
import { UserType } from './Types/UserTypes';
import { login, checkLoggedIn as checkedLoggedInAction, logout } from './Actions/AuthActions';

import './App.scss';

import { toast, ToastContainer } from 'react-toastify';
import ToasterStyles from "./ToasterStyles/ToasterStyles"
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
import MotoRouteEditor from './Pages/MotoRouteEditor';
import AccidentMap from './Pages/AccidentMap';
import MotoRouteBigListPage from './Pages/MotoRouteBigListPage';
axios.defaults.withCredentials = true;

function App() {

  const [currentUser, setCurrentUser] = useState<UserType | null>(
    JSON.parse(window.localStorage.getItem('current_user') || 'null')
  );

  useEffect(() => { 
    document.body.className = 'default-body'; // apply css to body

    // Keep this value for quicker access, but checked logged in anyway
    let storedUser = window.localStorage.getItem('current_user')
    if (storedUser)
      setCurrentUser(JSON.parse(storedUser));

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
      window.localStorage.setItem('current_user', JSON.stringify(user));
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
    window.localStorage.setItem('current_user', JSON.stringify(user));
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
    window.localStorage.setItem('current_user', JSON.stringify(null));
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
                <Route path="/routes/editor/*" element={ <MotoRouteEditor /> } />
                <Route path="/routes/editor" element={ <MotoRouteEditor /> } />

                <Route path="/accidentsmap" element={ <AccidentMap /> } />

                <Route path="/moto_route_list/:type/:page/:user_id" element={ <MotoRouteBigListPage /> } />
                <Route path="/moto_route_list/:type/:page" element={ <MotoRouteBigListPage /> } />
                <Route path="/moto_route_list/:type" element={ <MotoRouteBigListPage /> } />

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
