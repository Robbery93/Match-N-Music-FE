import React from 'react';
import "./Avatar.css";
import skeleton from "../../assets/skeleton.jpg";

const Avatar = ({ photo, alt, big }) => {

    // const axiosConfig = { headers: {
    //         'Content-Type' : 'application/json',
    //         'Authorization' : `Bearer ${localStorage.getItem("token")}`
    //     }};

    // useEffect(() => {
    //     async function fetchAvatar(){
    //         try {
    //             const {data} = await axios.get(`http://localhost:8080/files/download/Dcent.jpg`, axiosConfig);
    //
    //             setAvatar(data);
    //         } catch (e) {
    //             console.error(e);
    //         }
    //     }
    //
    //     fetchAvatar();
    // } ,[])

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