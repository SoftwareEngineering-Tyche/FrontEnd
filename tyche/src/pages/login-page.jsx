import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

function LoginPage () {
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [userBalance, setUserBalance] = useState(null);
    const connectWalletHandler = () => {
        if(window.ethereum) {
            window.ethereum.request({method: 'eth_requestAccounts'}).then(res => {
                accountChangedHandler(res[0]);
            })
        } else {
            window.location.href = 'https://metamask.io/download/'; 
        }
    }
    const accountChangedHandler = (newAccount) => {
        setDefaultAccount(newAccount);
        getUserBalance(newAccount.toString());
    }
    const getUserBalance = (address) => {
        window.ethereum.request({method: 'eth_getBalance', params: [address, 'latest']}).then(balance => {
            setUserBalance(ethers.utils.formatEther(balance));
        })
    }
    const chainChangedHandler = () => {
        window.location.reload();
    }
    useEffect(() => {
        if(window.ethereum) {
            window.ethereum.on('accountsChanged', accountChangedHandler);
            window.ethereum.on('chainChanged', chainChangedHandler);
        }
    });
    
    return (
        <div>
            <h1>ورود</h1>
            {!defaultAccount && <button onClick={connectWalletHandler}>
                اتصال به کیف پول
            </button>}
            {defaultAccount && <div>
                <span>آدرس اتریوم شما : {defaultAccount}</span>
            </div>}
            {userBalance && <div>
                <span>بالانس : {userBalance}</span>
            </div>}
        </div>
    );
}

export default LoginPage;