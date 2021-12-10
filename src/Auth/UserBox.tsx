import React, { useState } from 'react';
import { XCircleFill } from 'react-bootstrap-icons';
import ReactModal from 'react-modal';
import { userContext } from '../Contexts/UserContext';
import LoginBox from './LoginBox';
import ProfileBox from './ProfileBox';

import './UserBox.scss'

const UserBox = () => {

    const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
    const [showSignUpModal, setShowSignUpModal] = useState<boolean>(false);

    


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
                                        <ReactModal 
                                            isOpen={showLoginModal}
                                            contentLabel="Login Box Modal"
                                            overlayClassName="login-register-modal-overlay d-flex align-items-center justify-content-center"
                                            className="login-register-modal"
                                            >
                                            <div className="d-flex w-100 justify-content-end">
                                                <div className="close-modal" onClick={() => setShowLoginModal(false)}>
                                                    <XCircleFill />
                                                </div>
                                            </div>
                                            <div className="login-box-container">
                                                <LoginBox onLogin={ onLogin } />
                                            </div>
                                        </ReactModal>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/signup">Sign up</a>
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