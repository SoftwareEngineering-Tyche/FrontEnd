import React from "react";
import { Link } from 'react-router-dom';

function HomePage () {
    return (
        <div>
            <h1>خانه</h1>
            <button>شروع خرید nft</button>
            <Link to='/login'>
                <button>ساخت nft</button>
            </Link>
        </div>
    );
}

export default HomePage;