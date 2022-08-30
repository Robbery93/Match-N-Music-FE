import React from 'react';
import "./Avatar.css";
import skeleton from "../../assets/skeleton.jpg";

const Avatar = ({ photo, alt, big }) => {

    return (
        <img
            className={big === "yes" ? "avatar big_avatar" : "avatar"}
            src={photo ? photo : skeleton}
            alt={alt}
            loading="lazy"
        />
    );
};

export default Avatar;