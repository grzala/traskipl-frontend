import React, { useState } from "react";
import { XCircleFill } from "react-bootstrap-icons";
import ReactModal from "react-modal";
import { Link } from "react-router-dom";

import './UserBox.scss'

type LoginBoxModalProps = {
    onLogin: (userLoginData: {user: {email: string, password: string}}) => Promise<boolean>,
    show: boolean,
    setShow: (show: boolean) => void,
}

const LoginBoxModal = (props: LoginBoxModalProps) => {
    const { onLogin, show, setShow} = props;

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
        <ReactModal 
            isOpen={show}
            contentLabel="Login Box Modal"
            overlayClassName="login-register-modal-overlay d-flex align-items-center justify-content-center"
            className="login-register-modal"
            >
            <div className="d-flex w-100 justify-content-end">
                <div className="close-modal" onClick={() => setShow(false)}>
                    <XCircleFill />
                </div>
            </div>
            <div className="loginbox-container">

                <div className="loginbox d-flex justify-content-center">

                    <form 
                        onSubmit={ async (e) => {
                            e.preventDefault()
                            var result = await onLogin(userLoginData)
                            if (result) {
                                setShow(false)
                            }
                        }}>
                        <div className="d-flex flex-column">
                            <div className="login-header-wrapper">
                                <h2>Log In</h2>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                <input 
                                    className="loginbox-form-control"
                                    name="email" 
                                    type="email" 
                                    placeholder="example@domain.com" 
                                    value={userLoginData.user.email} 
                                    onChange={handleChange} 
                                        
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <input 
                                    className="loginbox-form-control"
                                    name="password" 
                                    type="password" 
                                    placeholder="*******" 
                                    value={userLoginData.user.password} 
                                    onChange={handleChange} 
                                        
                                />
                            </div>

                            <div className="d-grid">
                                <button type="submit" className="btn btn-block btn-primary">Login</button>
                            </div>
                            {/* <div className="signup-prompt">
                                <h6>Need an account? <Link to="/#">Sign up.</Link></h6>
                            </div> */}
                        </div>
                    </form>
                </div>
            </div>
        </ReactModal>
    )
}

export default LoginBoxModal;