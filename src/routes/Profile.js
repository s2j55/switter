import React, { useState } from 'react';
import { authService } from 'fbase';
import { useHistory } from "react-router-dom";

const Profile = ({ refreshUser, userObj }) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        history.push('/');                                                   
    };
    const onChange = (event) => {
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
            refreshUser();
        }
    };
    return (
    <div className="container">
        <form onSubmit={onSubmit} classNAme="profileForm">
            <input 
                onChange={onChange}
                type="text"
                autoFocus 
                placeholder="Display name"
                value={newDisplayName}
                className="formInput" 
            />
            <input 
                type="submit" 
                value="Update Profile"
                className="formBtn"
                style={{
                    marginTop: 10,
                }} 
            />
        </form>
        <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
            Log Out
        </span>
    </div>
    );
};

export default Profile;