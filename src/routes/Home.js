import { dbService } from 'fbase';
import React, { useEffect, useState } from 'react';
import Sweet from 'components/Sweet';

const Home = ({ userObj }) => {
        // console.log(userObj);
        const [sweet, setSweet] = useState("");
        const [sweets, setSweets] = useState([]);
        const [attachment, setAttachment] = useState();
        // -----------------------------old way---------------
        // const getSweets = async() => {
        //    const dbSweets = await dbService.collection("sweets").get()
        //    dbSweets.forEach((document) => {
        //        const sweetObject = {
        //             ...document.data(),
        //             id: document.id,
        //        };
        //         setSweets((prev) => [sweetObject, ...prev]);
        //    });
        // };
        useEffect(() => {
            // getSweets();
            dbService.collection("sweets").onSnapshot(snapshot => {
                const sweetArray = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setSweets(sweetArray);
            });
        }, []);
        const onSubmit = async (event) => {
            event.preventDefault();
            await dbService.collection("sweets").add({
                text: sweet,
                createdAt: Date.now(),
                creatorId: userObj.uid,
            });
            setSweet("");
        };
        const onChange = (event) => {
            const { 
                target: {value},
            } = event;
            // event로 부터라는 의미. 즉, event 안에 있는 target 안에 있는 value를 달라고 하는 것.
            setSweet(value);
        };
        const onFileChange = (event) => {
            const {
                target: { files },
            } = event;
            const theFile = files[0];
            // FileReader API 사용
            const reader = new FileReader();
            // Eventlistener를 fileReader에 붙임
            reader.onloadend = (finishedEvent) => {
                // finishedEvent의 result를 setAttachment로 설정
                const {
                    currentTarget: { result },
                } = finishedEvent;
                setAttachment(result);
            };
            reader.readAsDataURL(theFile);
        };
    const onClearAttachment = () => {
        setAttachment(null);
    };

    return (
    <div>
        <form onSubmit={onSubmit}>
            <input 
                value={sweet} 
                onChange={onChange} 
                type="text" 
                placeholder="What's on your mind?" 
                maxLength={120} 
            />
            <input type="file" accept="image/*" onChange={onFileChange} />
            <input type="submit" value="Sweet" />
            {attachment && (
            <div>
                <img src={attachment} width="50px" height="50px" alt="" />
                <button onClick={onClearAttachment}>Clear</button>
            </div>    
            )}
        </form>
        <div>
            {sweets.map((sweet) => (
                <Sweet 
                    key={sweet.id} 
                    sweetObj={sweet} 
                    isOwner={sweet.creatorId === userObj.uid} 
                />
                ))}
        </div>
    </div>
)};
export default Home;