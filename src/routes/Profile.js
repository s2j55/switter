import React, { useState } from 'react';
import { authService } from 'fbase';
// import { useHistory } from "react-router-dom";

const Profile = ({userObj}) => {
    // const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => 
        authService.signOut();
       // history.push('/');                                                   
    ;
    const onChange = event => {
        const {
            target: { value },
        } = event;
        setNewDisplayName(value);
    };
    /* const getMySweets = async() => {
        const sweets = await dbService
            .collection("sweets")
            .where("creatorId", "==", userObj.uid)
            .orderBy("createdAt", "desc")
            .get();
        console.log(sweets.docs.map(doc => doc.data()));
    }; */
    /* useEffect(() => {
        getMySweets();
    }, []);
    const onSubmit = (event) => {
        event.preventDefault();
    }; */
// Edit my name(my profile)
    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({
                // TODO photoURL도 만들어서 넣어보기
                displayName: newDisplayName,
            });
        }
    };
    return (
    <>
    <form onSubmit={onSubmit}>
        <input 
        onChange={onChange}
        type="text" 
        placeholder="Display name"
        value={newDisplayName} />
        <input type="submit" value="Update Profile" />
    </form>
        <button onClick={onLogOutClick}>Log Out</button>
    </>
)};

export default Profile;