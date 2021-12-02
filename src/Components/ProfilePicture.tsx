import React, { Fragment } from "react";

type ProfilePictureProps = {
    imgPath: string;
}

const style = {
    width: "100%",
    height: "100%",
    borderRadius: "100%"
}

const ProfilePicture = (props: ProfilePictureProps) => {
    const { imgPath } = props;


    return (
        <Fragment>
            <img src={imgPath} style={style} />
        </Fragment>
    )
}

export default ProfilePicture;