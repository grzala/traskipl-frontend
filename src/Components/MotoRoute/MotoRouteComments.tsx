import React from "react";
import { ReplyFill } from "react-bootstrap-icons";
import ProfilePicture from "../ProfilePicture";

import "./MotoRouteComments.scss"

const MotoRouteComments = () => {

    
    return (
        <div className="list-group">
            <div
                className="list-group-item list-group-item-action flex-column align-items-start active">
                Comments
            </div>

            <div className="comments-list-main">
                <a href="/#" className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">List group item heading</h5>
                        <small className="text-muted">3 d1ays ago</small>
                    </div>
                    <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                    <small className="text-muted">Donec id elit non mi porta.</small>
                </a>
                <a href="/#" className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">List group item heading</h5>
                        <small className="text-muted">3 days ago</small>
                    </div>
                    <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                    <small className="text-muted">Donec id elit non mi porta.</small>
                </a>
                <a href="/#" className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">List group item heading</h5>
                        <small className="text-muted">3 days ago</small>
                    </div>
                    <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                    <small className="text-muted">Donec id elit non mi porta.</small>
                </a>
                <a href="/#" className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">List group item heading</h5>
                        <small className="text-muted">3 days ago</small>
                    </div>
                    <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                    <small className="text-muted">Donec id elit non mi porta.</small>
                </a>
                <a href="/#" className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">List group item heading</h5>
                        <small className="text-muted">3 days ago</small>
                    </div>
                    <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                    <small className="text-muted">Donec id elit non mi porta.</small>
                </a>
                <a href="/#" className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">List group item heading</h5>
                        <small className="text-muted">3 days ago</small>
                    </div>
                    <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                    <small className="text-muted">Donec id elit non mi porta.</small>
                </a>
                <a href="/#" className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">List group item heading</h5>
                        <small className="text-muted">3 days ago</small>
                    </div>
                    <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                    <small className="text-muted">Donec id elit non mi porta.</small>
                </a>
                <a href="/#" className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">List group item heading</h5>
                        <small className="text-muted">3 days ago</small>
                    </div>
                    <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                    <small className="text-muted">Donec id elit non mi porta.</small>
                </a>
                <a href="/#" className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">List group item heading</h5>
                        <small className="text-muted">3 days ago</small>
                    </div>
                    <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                    <small className="text-muted">Donec id elit non mi porta.</small>
                </a>
                <a href="/#" className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">List group item heading</h5>
                        <small className="text-muted">3 days ago</small>
                    </div>
                    <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                    <small className="text-muted">Donec id elit non mi porta.</small>
                </a>
            </div>

            <div className="comments-reply-wrapper">

                <div className="profile-pic-wrapper">
                    <ProfilePicture 
                        imgPath="https://thumbs.mugshots.com/gallery/images/84/5c/NOEL-DAWSON-JR-mugshot-43097934.jpeg.400x800.jpg"
                    />
                </div>
                <textarea className="form-control-inline comments-reply"></textarea>
                <button className="btn send-reply"><ReplyFill /></button>
            </div>
        </div>
    )
}

export default MotoRouteComments;