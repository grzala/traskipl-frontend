import moment from "moment";
import React, { Fragment, useState } from "react";
import { ReplyFill, TrashFill } from "react-bootstrap-icons";
import { toast } from "react-toastify";
import { useGetComments } from "../../Actions/CommentsActions";
import { CommentType } from "../../Types/MotoRoutesTypes";
import { currentUserType } from "../../Types/UserTypes";
import ProfilePicture from "../ProfilePicture";
import ToasterStyles from "../../ToasterStyles/ToasterStyles"

import "./MotoRouteComments.scss"
import { userContext } from "../../Contexts/UserContext";

type MotoRouteCommentsProps = {
    moto_route_id: number | null;
    current_user: currentUserType;
}

const MotoRouteComments = (props: MotoRouteCommentsProps) => {
    const { moto_route_id, current_user } = props;

    const [comments, loadingComments, insertComment, removeComment] = useGetComments(moto_route_id);

    const [newCommentMessage, setNewCommentMessage] = useState<string>("")

    const handleChange = (e: any) => {
        setNewCommentMessage(e.target.value)
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        var result = await insertComment(moto_route_id, newCommentMessage)
        
        if (result) {
            toast.success("Your comment has been posted.", ToasterStyles)
            document.getElementById(`comments-list-main`)?.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
              });
        }
    }
    
    return (
        <div className="list-group">
            <div
                className="list-group-item list-group-item-action flex-column align-items-start active">
                Comments
            </div>

            <div id="comments-list-main" className="comments-list-main">

                { moto_route_id !== null && comments && comments.length > 0 ? (
                        <Fragment>
                            {comments.map((comment) => (
                                <div key={ `comment_${comment.id}` }className="list-group-item align-items-start comment">
                                    <div className="profile-pic-wrapper">
                                        <ProfilePicture 
                                            imgPath="https://thumbs.mugshots.com/gallery/images/84/5c/NOEL-DAWSON-JR-mugshot-43097934.jpeg.400x800.jpg"
                                        />
                                    </div>
                                    <div className="d-flex flex-column comment-content-wrapper">
                                        <div className="d-flex justify-content-between">
                                            <h5 className="mb-1">{ comment.author }</h5>
                                            <small className="text-muted">
                                                { moment(comment.created_at,).format('DD/MM/YYYY HH:mm') }
                                                {current_user && current_user.id === comment.user_id && (
                                                    <Fragment>
                                                        &nbsp;&nbsp;
                                                        <TrashFill 
                                                            style={{
                                                                color: "#bd3327",
                                                                cursor: "pointer"
                                                            }}
                                                            onClick={() => removeComment(comment.id)}
                                                        />
                                                    </Fragment>
                                                )}
                                            </small>
                                        </div>
                                        <p className="comment-message">{ comment.message }</p>
                                    </div>
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

                
            {/* cannot reply if no current user (not logged in) */}
            {current_user && (
                    <form id="comment-reply-form" onSubmit={handleSubmit}>
                    <div className="comments-reply-wrapper">
                        <div className="profile-pic-wrapper">
                            <ProfilePicture 
                                imgPath="https://thumbs.mugshots.com/gallery/images/84/5c/NOEL-DAWSON-JR-mugshot-43097934.jpeg.400x800.jpg"
                            />
                        </div>
                        
                            <textarea 
                                className="form-control-inline comments-reply" 
                                onChange={handleChange}
                                maxLength={400}>
                                </textarea>
                            <button className="btn send-reply" type="submit"><ReplyFill /></button>
                    </div>
                </form>
            )}
        </div>
    )
}

export default MotoRouteComments;