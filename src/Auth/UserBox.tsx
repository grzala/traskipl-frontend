import React, { useState } from 'react';
import { userContext } from '../Contexts/UserContext';
import LoginBoxModal from './LoginBoxModal';
import ProfileBox from './ProfileBox';
import SignUpBoxModal from './SignUpBoxModal';

import './UserBox.scss'

const UserBox = () => {

    const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
    const [showSignUpModal, setShowSignUpModal] = useState<boolean>(false);


    const swapModals = () => {
        setShowLoginModal(!showLoginModal)
        setShowSignUpModal(!showSignUpModal)
    }


    return (
        <div className="userbox">
            <userContext.Consumer>
                {({user, onLogin, onLogout}) => {
                    if (user === null) {
                        return (
                            <div className="d-flex align-items-end">
                                <ul className="nav nav-tabs">
                                    <li className="nav-item">
                                        <a 
                                            className="nav-link" 
                                            href="/login"
                                            onClick={(e) => {e.preventDefault(); setShowLoginModal(true)}}>
                                                Login
                                        </a>
                                        <LoginBoxModal onLogin={ onLogin } show={showLoginModal} setShow={setShowLoginModal} swapModals={ swapModals }/>
                                    </li>
                                    <li className="nav-item">
                                        <a 
                                            className="nav-link" 
                                            href="/sign_up"
                                            onClick={(e) => {e.preventDefault(); setShowSignUpModal(true)}}>
                                                Sign Up
                                        </a>
                                        <SignUpBoxModal show={showSignUpModal} setShow={setShowSignUpModal} swapModals={ swapModals }/>
                                    </li>
                                </ul>
                            </div>
                        )
                    } else {
                        return (
                            <ProfileBox user={ user } onLogin={ onLogin } onLogout={ onLogout }/>
                        )
                    }
                }}
            </userContext.Consumer>
        </div>
    )
}

export default UserBox