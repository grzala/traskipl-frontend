import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import { ReplyFill, TrashFill } from "react-bootstrap-icons";
import { toast } from "react-toastify";
import { useGetComments } from "../../Actions/CommentsActions";
import { currentUserType } from "../../Types/UserTypes";
import ProfilePicture from "../ProfilePicture";
import ToasterStyles from "../../ToasterStyles/ToasterStyles"
import ReactLoading from "react-loading";

import "./MotoRouteComments.scss"
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

type MotoRouteCommentsProps = {
    moto_route_id: number | null;
    current_user: currentUserType;
}


const MotoRouteComments = (props: MotoRouteCommentsProps) => {
    const { moto_route_id, current_user } = props;

    const [comments, loadingComments, insertComment, removeComment] = useGetComments(moto_route_id);
    const [commentsLoadedOnce, setCommentsLoadedOnce] = useState<boolean>(false)
    useEffect(() => {
        console.log("LOADED ONCE: " + commentsLoadedOnce)
        console.log("LOADEDING: " + loadingComments)
        console.log("comments len: " + comments.length)
        if (!loadingComments && comments.length > 0) {
            setCommentsLoadedOnce(true)
        }
    }, [comments, loadingComments])

    const [newCommentMessage, setNewCommentMessage] = useState<string>("")

    const handleChange = (e: any) => {
        setNewCommentMessage(e.target.value)
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        var result = await insertComment(moto_route_id, newCommentMessage)
        
        if (result) {
            setNewCommentMessage("")
            toast.success("Your comment has been posted.", ToasterStyles)
            document.getElementById(`comments-list-main`)?.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
              });
        }
    }

    const handleRemoveClick = (id: number) => {
        confirmAlert({
            title: 'Delete comment',
            message: 'Are you sure you want to delete this comment?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => removeComment(id)
              },
              {
                label: 'No',
                onClick: () => {}
              }
            ]
          });
    }
    
    return (
        <div className="list-group comments-wrapper">
            <div
                className="list-group-item list-group-item-action flex-column align-items-start active">
                Comments
            </div>

            <div id="comments-list-main" className="comments-list-main">
                { (!commentsLoadedOnce && loadingComments) && (
                    <div className="vertical-align-placeholder">
                        <ReactLoading type={ 'spokes' } className="loading-placeholder" />
                    </div>
                )}

                { (commentsLoadedOnce || !loadingComments) && (
                    <Fragment>
                        { moto_route_id !== null && comments && comments.length > 0 ? (
                            <Fragment>
                                {comments.map((comment) => (
                                    <div key={ `comment_${comment.id}` }className="list-group-item align-items-start comment">
                                        <div className="profile-pic-wrapper">
                                            <ProfilePicture 
                                                imgPath={ process.env.REACT_APP_THUMBNAIL_SOURCE + `/avatars/${comment.user_id}.png` }
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
                                                                onClick={() => handleRemoveClick(comment.id)}
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
                    </Fragment>
                )}
            </div>

                
            {/* cannot reply if no current user (not logged in) */}
            {current_user && (
                    <form id="comment-reply-form" onSubmit={handleSubmit}>
                    <div className="comments-reply-wrapper">
                        <div className="profile-pic-wrapper">
                            <ProfilePicture 
                                imgPath={ process.env.REACT_APP_THUMBNAIL_SOURCE + `/avatars/${current_user.id}.png` }
                            />
                        </div>
                        
                            <textarea 
                                className="form-control-inline comments-reply" 
                                value={newCommentMessage}
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