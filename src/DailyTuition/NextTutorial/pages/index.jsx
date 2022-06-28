import { useState } from "react";

export default function Homepage() {
    const [likes, setLikes] = useState(0);

    return (
        <div>
            <h1>Like: {likes}</h1>
            <button onClick={() => setLikes(likes + 1)}>Likes</button>
        </div>
    )
}