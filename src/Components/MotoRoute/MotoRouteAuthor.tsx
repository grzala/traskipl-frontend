import React from "react";
import ProfilePicture from "../ProfilePicture";

import "./MotoRouteAuthor.scss"

const MotoRouteAuthor = () => {


    return (
        <div className="moto-route-author">
            <div
                className="list-group-item list-group-item-action flex-column align-items-start active">
                Author
            </div>

            {/* make this a link to authors page */}
            <a href="/#" className="list-group-item list-group-item-action flex-column align-items-start">
                <div className="row">
                    <div className="col-md-3">
                        <div className="profile-pic-wrapper">
                            <ProfilePicture 
                                imgPath="https://thumbs.mugshots.com/gallery/images/b4/86/LAWRENCE-SULLIVAN-mugshot-46777547-hidden-c2fa0003.jpeg.400x800.jpg"
                            />
                        </div>
                    </div>
                    <div className="col-md-9 author-info">
                        <h1>John Kowalski</h1>
                        <p>Joined: October 2021</p>
                        <p>Routes added: 12</p>
                    </div>
                </div>
            </a>
        </div>
    )
}

export default MotoRouteAuthor;