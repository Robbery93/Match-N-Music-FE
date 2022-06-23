import React from 'react';
import "./Avatar.css"

const Avatar = ({ photo, alt, big }) => {
    return (
        <img
            className={big === "yes" ? "avatar big_avatar" : "avatar"}
            src={photo} alt={alt}
            loading="lazy"
        />
    );
};

export default Avatar;