import { stringify } from 'querystring';
import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../Contexts/UserContext';

import './UserBox.scss'

const UserBox = () => {

    const [userLoginData, setUserLoginData] = useState<{user: {email: string, password: string}}>({user: {email: "", password: ""}});

    const handleChange = (e: any) => {
        setUserLoginData({ 
            user: { 
                ...userLoginData.user, 
                [e.target.name]: e.target.value 
            }
            
        })
    }

    return (
        <div className="userbox">
            <userContext.Consumer>
                {({user, onLogin, onLogout}) => {
                    if (true || user === null) {
                        return (
                            <Fragment>
                                <form onSubmit={
                                    (e) => {
                                        e.preventDefault()
                                        onLogin(userLoginData)
                                    }
                                }>
                                    <div className="d-flex flex-column">
                                        <div className="login-header-wrapper">
                                            <h6>Currently not logged in.</h6>
                                        </div>
                                        <div className="form-group mb-1">
                                            <label htmlFor="email">email:&nbsp;&nbsp;&nbsp;</label>
                                            <input 
                                                className="userbox-form-control"
                                                name="email" 
                                                type="email" 
                                                placeholder="example@domain.com" 
                                                value={userLoginData.user.email} 
                                                onChange={handleChange} 
                                                 
                                            />
                                        </div>
                                        <div className="form-group mb-1">
                                            <label htmlFor="password">password:</label>
                                            <input 
                                                className="userbox-form-control"
                                                name="password" 
                                                type="password" 
                                                placeholder="*******" 
                                                value={userLoginData.user.password} 
                                                onChange={handleChange} 
                                                 
                                            />
                                        </div>
                    
                                        <div className="d-grid mb-1">
                                            <button type="submit" className="btn btn-block btn-primary">Login</button>
                                        </div>
                                        <div className="signup-prompt">
                                            <h6>Need an account? <Link to="/#">Sign up.</Link></h6>
                                        </div>
                                    </div>
                                </form>

                            </Fragment>
                        )
                    } else {
                        return (
                            <Fragment>
                                yooooo
                            </Fragment>
                        )
                    }
                }}
            </userContext.Consumer>
        </div>
    )
}

export default UserBox