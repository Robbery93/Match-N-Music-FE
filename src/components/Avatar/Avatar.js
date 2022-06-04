import React from 'react';
import styles from "./Avatar.module.css"

const Avatar = ({ photo, alt }) => {
    return (
        <img className={styles.avatar} src={photo} alt={alt} loading="lazy" />
    );
};

export default Avatar;