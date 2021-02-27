import React, { useState } from 'react';

const Home = () => {
        const [sweet, setSweet] = useState("");
        const onSubmit = (event) => {
            event.preventDefault();
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
    </div>
)};
export default Home;