import React, { useState } from 'react';
import { XCircleFill } from 'react-bootstrap-icons';
import ReactModal from 'react-modal';
import { userContext } from '../Contexts/UserContext';
import LoginBoxModal from './LoginBoxModal';
import ProfileBox from './ProfileBox';
import SignUpBoxModal from './SignUpBoxModal';

import './UserBox.scss'

const UserBox = () => {

    const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
    const [showSignUpModal, setShowSignUpModal] = useState<boolean>(false);




    return (
        <div className="userbox">
            <userContext.Consumer>
                {({user, onLogin, onLogout, onSignUp}) => {
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
                                        <LoginBoxModal onLogin={ onLogin } show={showLoginModal} setShow={setShowLoginModal}/>
                                    </li>
                                    <li className="nav-item">
                                        <a 
                                            className="nav-link" 
                                            href="/sign_up"
                                            onClick={(e) => {e.preventDefault(); setShowSignUpModal(true)}}>
                                                Sign Up
                                        </a>
                                        <SignUpBoxModal onSignup={ onSignUp } show={showSignUpModal} setShow={setShowSignUpModal}/>
                                    </li>
                                </ul>
                            </div>
                        )
                    } else {
                        return (
                            <ProfileBox user={ user } onLogin={ onLogin } onLogout={ onLogout } />
                        )
                    }
                }}
            </userContext.Consumer>
        </div>
    )
}

export default UserBox