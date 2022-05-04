import React, { useState } from "react";
import "../assets/styles/top-categories.scss";
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';

function Like() {
    const [isLiked, setIsLiked] = useState(false);
    const toggleLike = () => {
        setIsLiked(!isLiked);
    }
    return (
        <div onClick={toggleLike} style={{width:'100%'}}>
            {isLiked ?
                <FavoriteRoundedIcon sx={{ color: '#ff6d75' }} />
                :
                <FavoriteBorderRoundedIcon />
            }
        </div>
    );
}
export default Like;