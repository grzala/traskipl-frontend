import React, { useState } from "react";
import { XCircleFill } from "react-bootstrap-icons";
import ReactModal from "react-modal";
import { Link } from "react-router-dom";
import { UserSignupType } from "../Types/UserTypes";

import './UserBox.scss'

type SignUpBoxModalProps = {
    onSignup: (userData: UserSignupType) => Promise<boolean>,
    show: boolean,
    setShow: (show: boolean) => void,
}

const defaultNewUser: UserSignupType = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
}

const SignUpBoxModal = (props: SignUpBoxModalProps) => {
    const { onSignup, show, setShow} = props;

    const [userSignUpData, setUserSignUpData] = useState<UserSignupType>(defaultNewUser);

    const handleChange = (e: any) => {
        setUserSignUpData({ 
            ...userSignUpData, 
            [e.target.name]: e.target.value 
        })
    }
    return (
        <ReactModal 
            isOpen={show}
            contentLabel="Sign Up Box Modal"
            overlayClassName="login-signup-modal-overlay d-flex align-items-center justify-content-center"
            className="login-signup-modal"
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
                            var result = await onSignup(userSignUpData)
                            if (result) {
                                setShow(false)
                            }
                        }}>
                        <div className="d-flex flex-column">
                            <div className="login-header-wrapper">
                                <h2>Sign Up</h2>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email:<span dangerouslySetInnerHTML={{ __html: "&nbsp;".repeat(23) }} /></label>
                                <input 
                                    className="loginbox-form-control"
                                    name="email" 
                                    type="email" 
                                    placeholder="example@domain.com" 
                                    value={userSignUpData.email} 
                                    onChange={handleChange} 
                                        
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="first_name">First name:<span dangerouslySetInnerHTML={{ __html: "&nbsp;".repeat(13) + "&#8201;" }} /></label>
                                <input 
                                    className="loginbox-form-control"
                                    name="first_name" 
                                    type="text" 
                                    placeholder="First name" 
                                    value={userSignUpData.first_name} 
                                    onChange={handleChange} 
                                        
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Last name:<span dangerouslySetInnerHTML={{ __html: "&nbsp;".repeat(14) + "" }} /></label>
                                <input 
                                    className="loginbox-form-control"
                                    name="last_name" 
                                    type="text" 
                                    placeholder="Last name" 
                                    value={userSignUpData.last_name} 
                                    onChange={handleChange} 
                                        
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password:<span dangerouslySetInnerHTML={{ __html: "&nbsp;".repeat(15) + "&#8201;" }} /></label>
                                <input 
                                    className="loginbox-form-control"
                                    name="password" 
                                    type="password" 
                                    placeholder="*******" 
                                    value={userSignUpData.password} 
                                    onChange={handleChange} 
                                        
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password_confirmation">Confirm password:</label>
                                <input 
                                    className="loginbox-form-control"
                                    name="password_confirmation" 
                                    type="password" 
                                    placeholder="*******" 
                                    value={userSignUpData.password_confirmation} 
                                    onChange={handleChange} 
                                        
                                />
                            </div>

                            <div className="d-grid">
                                <button type="submit" className="btn btn-block btn-primary">Sign Up</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </ReactModal>
    )
}

export default SignUpBoxModal;