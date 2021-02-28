import { authService, dbService } from 'fbase';
import React, { useEffect } from 'react';
// import { useHistory } from "react-router-dom";

const Profile = ({userObj}) => {
    // const history = useHistory();
    const onLogOutClick = () => 
        authService.signOut();
       // history.push('/');                                                   
    ;
    const getMySweets = async() => {
        const sweets = await dbService
            .collection("sweets")
            .where("creatorId", "==", userObj.uid)
            .orderBy("createdAt", "desc")
            .get();
        console.log(sweets.docs.map(doc => doc.data()));
    };
    useEffect(() => {
        getMySweets();
    }, []);
    return (
    <>
        <button onClick={onLogOutClick}>Log Out</button>
    </>
)};

export default Profile;