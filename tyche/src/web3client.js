import React, { useEffect, useState, memo } from "react";
import Web3 from 'web3';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { login } from "./store/authentication/action";
import { hostUrl } from "./host-url";
import { callAPI } from "./components/api-call";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} {...props} />;
});
let provider = window.ethereum;
const web3 = new Web3(provider);

export function ConnectToWallet() {
    const dispatch = useDispatch();
    let account = "";
    if(window.ethereum !== undefined) {
        window.ethereum.request({ method: 'eth_requestAccounts' })
            .then(accounts => {
                console.log(`selected account is ${accounts[0]}`);
                account =  accounts[0];
                dispatch(login(accounts[0]));
                const data = new FormData();
                data.append("WalletInfo", accounts[0]);
                callAPI({ method: "POST", url: `${hostUrl}/Account/`, data: data });
            })
            .catch((err) => {
                console.log(err);
            })
        window.ethereum.on('accountsChanged', function (accounts) {
            console.log(`selected account changed to ${accounts[0]}`);
            account = accounts[0];
            dispatch(login(accounts[0]));
        })
        window.ethereum.on('chainChanged', () => window.location.reload());
    }
    return account;
}
function CheckConnection() {
    provider.request({ method: 'eth_accounts' }).then(accounts => {
        if(accounts.length > 0) {
            console.log("wallet is connected");
            return true;
        } 
        else {
            console.log("wallet is not connected");
            return false;
        }
    })
}
function Init () {
    CheckConnection();
    ConnectToWallet();
}
export default memo(Init);