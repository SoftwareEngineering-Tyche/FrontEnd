import React, { useState } from "react";
import "../assets/styles/top-categories.scss";
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { callAPI } from "../components/api-call";
import { hostUrl } from "../host-url";

function Like(props) {
    const [isLiked, setIsLiked] = useState(false);
    const toggleLike = () => {
        setIsLiked(!isLiked);
        if (window.ethereum) {
            window.ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
                const data = new FormData();
                data.append("WalletInfo", accounts[0]);
                callAPI({ method: "POST", url: `${hostUrl}/WorkArtLike/${props.product}`, data: data });
            }).catch((err) => { console.log(err); })
        }
    }
    return (
        <div onClick={toggleLike} style={{ width: '100%' }}>
            {isLiked ?
                <FavoriteRoundedIcon sx={{ color: '#ff6d75' }} />
                :
                <FavoriteBorderRoundedIcon />
            }
        </div>
    );
}
export default Like;