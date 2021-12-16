import React, { Fragment } from "react";
import { UserType } from "../../Types/UserTypes";
import ProfilePicture from "../ProfilePicture";
import moment from 'moment';

import "./MotoRouteAuthor.scss"

type MotoRouteAuthorProps = {
    author: UserType | null
}

const MotoRouteAuthor = (props: MotoRouteAuthorProps) => {
    const { author } = props

    return (
        <Fragment>
                <div className="moto-route-author">
                    <div
                        className="list-group-item flex-column align-items-start active author-header">
                        Author
                    </div>

                    {/* TODO: make this a link to authors page */}
                    { author ? (
                        <a href="/#" className="list-group-item list-group-item-action flex-column align-items-start">
                            <div className="row">
                                <div className="profile-pic-col">
                                    <div className="profile-pic-wrapper">
                                        <ProfilePicture 
                                            imgPath="https://thumbs.mugshots.com/gallery/images/b4/86/LAWRENCE-SULLIVAN-mugshot-46777547-hidden-c2fa0003.jpeg.400x800.jpg"
                                        />
                                    </div>
                                </div>
                                <div className="col-5 author-info">
                                    <h1>{ author.full_name }</h1>
                                    <p>Joined: { moment(author.created_at,).format('MMMM YYYY')}</p>
                                    <p>Routes added: {author.total_routes_added}</p>
                                </div>
                            </div>
                        </a>

                    ) : (
                        <div className="list-group-item list-group-item-action flex-column align-items-start">
                            <h5>There is no author to display</h5>
                        </div>
                    )}
                </div>
        </Fragment>
    )
}

export default MotoRouteAuthor;