import moment from "moment";
import React, { Fragment } from "react";
import { ReplyFill } from "react-bootstrap-icons";
import { useGetComments } from "../../Actions/CommentsActions";
import { CommentType } from "../../Types/MotoRoutesTypes";
import ProfilePicture from "../ProfilePicture";

import "./MotoRouteComments.scss"

type MotoRouteCommentsProps = {
    moto_route_id: number | null
}

const MotoRouteComments = (props: MotoRouteCommentsProps) => {
    const { moto_route_id } = props;

    const [comments, loadingComments] = useGetComments(moto_route_id);


    
    return (
        <div className="list-group">
            <div
                className="list-group-item list-group-item-action flex-column align-items-start active">
                Comments
            </div>

            <div className="comments-list-main">

                { moto_route_id !== null && comments && comments.length > 0 ? (
                        <Fragment>
                            {comments.map((comment) => (
                                <div className="list-group-item flex-column align-items-start comment">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">{ comment.author }</h5>
                                        <small className="text-muted">{ moment(comment.created_at,).format('DD/MM/YYYY HH:mm') }</small>
                                    </div>
                                    <p className="mb-1">{ comment.message }</p>
                                </div>
                            ))}
                        </Fragment>
                    ) : (
                        <div className="list-group-item flex-column align-items-start comment">
                            <div className="d-flex w-100 justify-content-between">
                                No comments to show
                            </div>
                        </div>
                    )}
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