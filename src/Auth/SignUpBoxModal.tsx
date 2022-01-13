import React, { Fragment, useEffect, useState } from "react";
import { XCircleFill } from "react-bootstrap-icons";
import ReactModal from "react-modal";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ToasterStyles from '../ToasterStyles/ToasterStyles'
import { register } from "../Actions/AuthActions";
import { UserSignupType } from "../Types/UserTypes";
import AvatarEditor from 'react-avatar-editor'

import './UserBox.scss'
import { validateEmail } from "./Validations";

const avatarPlaceholderName = "placeholder.png"

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


type FieldErrorType = {
    email: string | null, 
    password: string | null,
    password_confirmation: string | null,
    first_name: string | null,
    last_name: string | null,
}

const blankError = {
    email: null, 
    password: null,
    password_confirmation: null,
    first_name: null,
    last_name: null
};

const MAX_ZOOM = 3

const SignUpBoxModal = (props: SignUpBoxModalProps) => {
    const { show, setShow, swapModals } = props;

    const [userSignUpData, setUserSignUpData] = useState<UserSignupType>(defaultNewUser);

    const handleChange = (e: any) => {
        setUserSignUpData({ 
            ...userSignUpData, 
            [e.target.name]: e.target.value 
        })
    }

    const [uploadedImg, setUploadedImg] = useState<{url: string, zoom: string}>({
        url: process.env.REACT_APP_THUMBNAIL_SOURCE + `/avatars/${avatarPlaceholderName}`,
        zoom: '1'
    })
    
    const handleProfilePicChange = (key: string, value: any) => {
        console.log("yyoyo")
        console.log(key)
        console.log(value)
        setUploadedImg((prevState) => (
            {
                ...prevState,
                [key]: value
            }
        ))
    }



    const [fieldErrs, setFieldErrs] = useState<FieldErrorType>(blankError)

    useEffect(() => {
        // If modal closed, reset errors
        if (show === false) {
            setFieldErrs(blankError)
            setUserSignUpData(defaultNewUser)
        }
    }, [show])

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        
        // Local check

        var newErrs: FieldErrorType = blankError;
        var valid = true;
        
        if (userSignUpData.email.length <= 0) {
            valid = false;
            newErrs = {...newErrs, email: "Email address field cannot be empty"}
        }

        if (valid && !validateEmail(userSignUpData.email)) {
            valid = false;
            newErrs = {...newErrs, email: "Email must follow format: \"user@domain.com\""}
        }

        if (userSignUpData.first_name.length <= 0) {
            valid = false;
            newErrs = {...newErrs, first_name: "Please provide a first name"}
        }

        if (userSignUpData.last_name.length <= 0) {
            valid = false;
            newErrs = {...newErrs, last_name: "Please provide a last name"}
        }

        if (userSignUpData.password.length <= 0) {
            valid = false;
            newErrs = {...newErrs, password: "Password field cannot be empty"}
        }

        if (userSignUpData.password_confirmation.length <= 0) {
            valid = false;
            newErrs = {...newErrs, password_confirmation: "Password confirmation field cannot be empty"}
        }

        setFieldErrs(newErrs)

        // Do not send API request if validation failed locally
        if (!valid)
            return;

        // API request
        var result = true;
        const response = await register(userSignUpData)
        const { data } = response

        if (response.status !== 200) {
            setFieldErrs(data.field_err_msg)
            result =  false;
        } 

        if (result) {
            toast.success("user" + userSignUpData.email + " has been created. You can now login", ToasterStyles);
            setShow(false)
        }
        
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
                        onSubmit={ handleSubmit }
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
                                { fieldErrs.email && (
                                    <div className="invalid-prompt">
                                        { fieldErrs.email }
                                    </div>
                                )}
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
                                { fieldErrs.first_name && (
                                    <div className="invalid-prompt">
                                        { fieldErrs.first_name }
                                    </div>
                                )}
                            </div>
                            <div className="form-group">
                                <label htmlFor="last_name">Last name:</label>
                                <input 
                                    className="loginbox-form-control form-control"
                                    name="last_name" 
                                    type="text" 
                                    placeholder="Last name" 
                                    value={userSignUpData.last_name} 
                                    onChange={handleChange} 
                                        
                                />
                                { fieldErrs.last_name && (
                                    <div className="invalid-prompt">
                                        { fieldErrs.last_name }
                                    </div>
                                )}
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
                                { fieldErrs.password && (
                                    <div className="invalid-prompt">
                                        { fieldErrs.password }
                                    </div>
                                )}
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
                                { fieldErrs.password_confirmation && (
                                    <div className="invalid-prompt">
                                        { fieldErrs.password_confirmation }
                                    </div>
                                )}
                            </div>



                            <div className="profile-pic-form-group">
                                <label htmlFor="profile_pic">Profile picture:</label><br/>
                                <div className="avatar-wrapper">
                                    <AvatarEditor 
                                        width={250} 
                                        height={250} 
                                        image={uploadedImg.url} 
                                        scale={parseFloat(uploadedImg.zoom)}
                                        border={10}
                                        borderRadius={10000}
                                    />
                                </div>

                                <div className="profile-pic-controls">
                                    <small>Click and drag on the image to move the image around</small>
                                    <br />
                                    
                                    New File:&nbsp;
                                    <input name="url" type="file" onChange={(e: any) => handleProfilePicChange(e.target.name, e.target.files[0])} />
                                    
                                    <br />

                                    <div className="zoom-group">
                                        <label id="zoom-label" className="d-inline">
                                        Zoom:&nbsp;</label>
                                        <input
                                            id="zoom-slider"
                                            name="zoom"
                                            type="range"
                                            onChange={(e: any) => handleProfilePicChange(e.target.name, e.target.value)}
                                            min={1}
                                            max={MAX_ZOOM}
                                            step="0.01"
                                            defaultValue="1"
                                        />
                                    </div>
                                </div>
        
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