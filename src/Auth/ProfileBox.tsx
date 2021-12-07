import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import ProfilePicture from "../Components/ProfilePicture";
import { userContext } from "../Contexts/UserContext";
import { UserType } from "../Types/UserTypes";

import './UserBox.scss'

type ProfileBoxProps = {
    user: UserType,
    onLogout: () => void,
    onLogin: (userLoginData: {user: {email: string, password: string}}) => void
}

const ProfileBox = (props: ProfileBoxProps) => {
    const {user, onLogout, onLogin} = props

    return (
        <div className="profilebox d-flex flex-row">
            <div className="profile-pic-wrapper">
                <ProfilePicture imgPath={ "https://thumbs.mugshots.com/gallery/images/47/82/Nicole-Marty-mugshot-11381227.400x800.jpg" }/>
            </div>
            
            <div className="profile-info-container d-flex flex-column flex-align-items-baseline">
                <div className="profile-name">
                    <h4>{user.first_name} {user.last_name}</h4>
                </div>

                <div className="dropdown profile-other">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="profile-other-dropdown" data-bs-toggle="dropdown" aria-expanded="false">
                        More
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="profile-other-dropdown">
                        <li><a className="dropdown-item" href="#">My routes</a></li>
                        <li><a className="dropdown-item" href="#">My favourites</a></li>
                        <li><a className="dropdown-item" href="#">Edit profile</a></li>
                        <li><a className="dropdown-item" href="/#"
                                onClick={(e) => {
                                    e.preventDefault()
                                    onLogout()
                                }}>
                                    Logout
                                </a>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default ProfileBox;