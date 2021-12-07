import { stringify } from 'querystring';
import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../Contexts/UserContext';
import LoginBox from './LoginBox';
import ProfileBox from './ProfileBox';

import './UserBox.scss'

const UserBox = () => {



    return (
        <div className="userbox">
            <userContext.Consumer>
                {({user, onLogin, onLogout}) => {
                    if (user === null) {
                        return (
                            <LoginBox onLogin={ onLogin } />
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