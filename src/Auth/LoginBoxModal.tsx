import React, { useEffect, useState } from "react";
import { XCircleFill } from "react-bootstrap-icons";
import ReactModal from "react-modal";
import { Link } from "react-router-dom";

import './UserBox.scss'
import { validateEmail } from "./Validations";

type LoginBoxModalProps = {
    onLogin: (userLoginData: {user: {email: string, password: string}}) => Promise<boolean>,
    show: boolean,
    setShow: (show: boolean) => void,
    swapModals: () => void,
}

const LoginBoxModal = (props: LoginBoxModalProps) => {
    const { onLogin, show, setShow, swapModals } = props;

    const [userLoginData, setUserLoginData] = useState<{user: {email: string, password: string}}>({user: {email: "", password: ""}});

    const handleChange = (e: any) => {
        setUserLoginData({ 
            user: { 
                ...userLoginData.user, 
                [e.target.name]: e.target.value 
            }
            
        })
    }

    const [fieldErrs, setFieldErrs] = useState<{email: string | null, password: string | null}>({email: null, password: null})

    const resetErrors = () => {
        setFieldErrs({email: null, password: null});
    }

    useEffect(() => {
        // If modal closed, reset errors
        if (show == false) {
            resetErrors()
        }
    }, [show])

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        resetErrors()

        var valid = true;
        
        if (userLoginData.user.email.length <= 0) {
            valid = false;
            setFieldErrs({...fieldErrs, email: "Email address field cannot be empty"})
        }

        console.log("validating user email")
        if (valid && !validateEmail(userLoginData.user.email)) {
            console.log("bruh this no good")
            valid = false;
            setFieldErrs({...fieldErrs, email: "Email must follow format: \"user@domain.com\""})
        }

        if (userLoginData.user.password.length <= 0) {
            valid = false;
            setFieldErrs({...fieldErrs, password: "Password field cannot be empty"})
        }
        
        if (valid) {
            var result = await onLogin(userLoginData)
            if (result) {
                setShow(false)
            }
        }
    }



    return (
        <ReactModal 
            ariaHideApp={false}
            isOpen={show}
            contentLabel="Login Box Modal"
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
                        onSubmit={ handleSubmit }>
                        <div className="d-flex flex-column">
                            <div className="login-header-wrapper">
                                <h2>Log In</h2>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input 
                                    className={ `loginbox-form-control form-control ${ fieldErrs.email ? "invalid" : "" }` }
                                    name="email" 
                                    type="text" 
                                    placeholder="example@domain.com" 
                                    value={ userLoginData.user.email } 
                                    onChange={ handleChange } 
                                        
                                />
                                <div className="invalid-prompt" style={{display: fieldErrs.email ? "block" : "none"}}>
                                    { fieldErrs.email }
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <input 
                                    className={ `loginbox-form-control form-control ${ fieldErrs.password ? "invalid" : "" }` }
                                    name="password" 
                                    type="password" 
                                    placeholder="*******" 
                                    value={userLoginData.user.password} 
                                    onChange={handleChange} 
                                        
                                />
                                <div className="invalid-prompt" style={{display: fieldErrs.password ? "block" : "none"}}>
                                    { fieldErrs.password }
                                </div>
                            </div>

                            <div className="d-grid submit-btn-wrapper">
                                <button type="submit" className="btn btn-block btn-primary">Login</button>
                            </div>

                            <div className="signup-prompt">
                                <h6>Need an account? <Link to="/#" onClick={(e: any) => {e.preventDefault(); swapModals(); }}>Sign up</Link>.</h6>
                            </div> 
                        </div>
                    </form>
                </div>
            </div>
        </ReactModal>
    )
}

export default LoginBoxModal;