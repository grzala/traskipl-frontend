import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../Contexts/UserContext";
import { UserType } from "../Types/UserTypes";

import './UserBox.scss'

type ProfileBoxProps = {
    user: UserType,
    onLogout: () => void,
    onLogin: (userLoginData: {user: {email: string, password: string}}) => void
}

const ProfileBox = (props: ProfileBoxProps) => {
    return (
        <Fragment>
            <div className="profilebox">

            </div>
        </Fragment>
    )
}

export default ProfileBox;