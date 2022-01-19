import React from "react";
import { NavLink } from "react-router-dom";
import ProfilePicture from "../Components/ProfilePicture";
import { UserType } from "../Types/UserTypes";

import './UserBox.scss'

type ProfileBoxProps = {
    user: UserType,
    onLogout: () => void,
    onLogin: (userLoginData: {user: {email: string, password: string}}) => void
}

const ProfileBox = (props: ProfileBoxProps) => {
    const {user, onLogout} = props


    return (
        <div className="profilebox d-flex flex-row">
            <div className="profile-pic-wrapper">
                <ProfilePicture imgPath={ process.env.REACT_APP_THUMBNAIL_SOURCE + `/avatars/${user.id}.png` }/>
            </div>

            <div className="profile-info-container d-flex flex-column flex-align-items-baseline">
                <div className="profile-name">
                    <h4>{user.full_name}</h4>
                </div>

                <div className="dropdown profile-other">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="profile-other-dropdown" data-bs-toggle="dropdown" aria-expanded="false">
                        More
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="profile-other-dropdown">
                        <li><NavLink className="dropdown-item" to={`/moto_route_list/user_routes/1/${user.id}`}>My routes</NavLink></li>
                        <li><NavLink className="dropdown-item" to="/moto_route_list/user_favourites/1">My favourites</NavLink></li>
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