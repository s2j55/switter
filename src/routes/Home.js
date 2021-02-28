import { dbService } from 'fbase';
import React, { useEffect, useState } from 'react';

const Home = ({ userObj }) => {
        console.log(userObj);
        const [sweet, setSweet] = useState("");
        const [sweets, setSweets] = useState([]);
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
    return (
    <div>
        <form onSubmit={onSubmit}>
            <input value={sweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
            <input type="submit" value="Sweet" />
        </form>
        <div>
            {sweets.map((sweet) => 
                (
                <div key={sweet.id}>
                    <h4>{sweet.text}</h4>
                </div>
                )
            )}
        </div>
    </div>
)};
export default Home;