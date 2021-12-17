import React, { useState } from "react";
import { XCircleFill } from "react-bootstrap-icons";
import ReactModal from "react-modal";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ToasterStyles from '../ToasterStyles/ToasterStyles'
import { register } from "src/Actions/AuthActions";
import { UserSignupType } from "../Types/UserTypes";

import './UserBox.scss'

type SignUpBoxModalProps = {
    show: boolean,
    setShow: (show: boolean) => void,
    swapModals: () => void,
}

const defaultNewUser: UserSignupType = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
}

const SignUpBoxModal = (props: SignUpBoxModalProps) => {
    const { show, setShow, swapModals } = props;

    const [userSignUpData, setUserSignUpData] = useState<UserSignupType>(defaultNewUser);

    const handleChange = (e: any) => {
        setUserSignUpData({ 
            ...userSignUpData, 
            [e.target.name]: e.target.value 
        })
    }
    return (
        <ReactModal 
            ariaHideApp={false}
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
                        id="signup-form"
                        onSubmit={ async (e) => {
                            e.preventDefault()
                            
                            var result = true;
                            
                            const response = await register(userSignUpData)
                            const { data } = response

                            if (response.status !== 200) {
                                // if (data?.messages) {
                                //     toast.error(`Registration unsuccessful: ${data.messages.join(", ")}`, ToasterStyles);
                                // }

                                console.log("bruh, we got some to do")

                                result =  false;
                            } 

                            if (result) {
                                toast.success("user" + userSignUpData.email + " has been created. You can now login", ToasterStyles);
                                setShow(false)
                            }
                        }}
                        noValidate>

                        <div className="d-flex flex-column">
                            <div className="login-header-wrapper">
                                <h2>Sign Up</h2>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input 
                                    className="loginbox-form-control form-control"
                                    name="email" 
                                    type="email" 
                                    placeholder="example@domain.com" 
                                    value={userSignUpData.email} 
                                    onChange={handleChange} 
                                />
                                <div className="invalid-feedback">
                                    Please choose a username.
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="first_name">First name:</label>
                                <input 
                                    className="loginbox-form-control form-control"
                                    name="first_name" 
                                    type="text" 
                                    placeholder="First name" 
                                    value={userSignUpData.first_name} 
                                    onChange={handleChange} 
                                    
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Last name:</label>
                                <input 
                                    className="loginbox-form-control form-control"
                                    name="last_name" 
                                    type="text" 
                                    placeholder="Last name" 
                                    value={userSignUpData.last_name} 
                                    onChange={handleChange} 
                                        
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <input 
                                    className="loginbox-form-control form-control"
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
                                    className="loginbox-form-control form-control"
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

                            <div className="signup-prompt">
                                <h6>Already have an account? <Link to="/#" onClick={(e: any) => {e.preventDefault(); swapModals(); }}>Log in</Link>.</h6>
                            </div> 
                        </div>
                    </form>
                </div>
            </div>
        </ReactModal>
    )
}

export default SignUpBoxModal;