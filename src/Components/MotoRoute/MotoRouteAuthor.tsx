import React, { Fragment } from "react";
import { UserType } from "../../Types/UserTypes";
import ProfilePicture from "../ProfilePicture";
import moment from 'moment';
import ReactLoading from "react-loading";

import "./MotoRouteAuthor.scss"
import { Link } from "react-router-dom";

type MotoRouteAuthorProps = {
    author: UserType | null;
    isLoading: boolean;
}

const MotoRouteAuthor = (props: MotoRouteAuthorProps) => {
    const { author, isLoading } = props

    return (
        <Fragment>
            <Link style={{ textDecoration: "none" }} to={`/moto_route_list/user_routes/1/${author?.id}`}>
                <div className="moto-route-author">
                    <div
                        className="list-group-item flex-column align-items-start active author-header">
                        Author
                    </div>

                    <div className="list-group-item list-group-item-action flex-column align-items-start">
                        { !isLoading && (
                            <Fragment>
                                {/* TODO: make this a link to authors page */}
                                { author ? (
                                    <div className="d-flex flex-row">
                                        <div className="profile-pic-col">
                                            <div className="profile-pic-wrapper">
                                                <ProfilePicture 
                                                    imgPath={ process.env.REACT_APP_THUMBNAIL_SOURCE + `/avatars/${author.id}.png` }
                                                />
                                            </div>
                                        </div>
                                        <div className="flex-grow ms-1">
                                            <h1>{ author.full_name }</h1>
                                            <p>Joined: { moment(author.created_at,).format('MMMM YYYY')}</p>
                                            <p>Routes added: {author.total_routes_added}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <h5>There is no author to display</h5>
                                )}
                            </Fragment>
                        )}

                        { isLoading && (
                            <div className="vertical-align-placeholder">
                                <ReactLoading type={ 'spokes' } className="loading-placeholder" />
                            </div>
                        )}
                    </div>
                </div>
            </Link>
        </Fragment>
    )
}

export default MotoRouteAuthor;