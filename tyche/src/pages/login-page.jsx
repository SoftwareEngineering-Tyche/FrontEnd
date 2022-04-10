import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { connect } from "react-redux";
import { login } from "../store/authentication/action";
import { useDispatch, useSelector } from 'react-redux'

function LoginPage () {
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [userBalance, setUserBalance] = useState(null);
    const [walletListButtonHandlerText, setWalletListButtonHandlerText] = useState('مشاهده همه');
    const connectWalletHandler = () => {
        if(window.ethereum) {
            window.ethereum.request({method: 'eth_requestAccounts'}).then(res => {
                accountChangedHandler(res[0]);
            })
        } else {
            window.open('https://metamask.io/download/');
        }
    }
    const dispatch = useDispatch();
    const accountChangedHandler = (newAccount) => {
        setDefaultAccount(newAccount);
        getUserBalance(newAccount.toString());
        dispatch(login(newAccount));
    }
    const getUserBalance = (address) => {
        window.ethereum.request({method: 'eth_getBalance', params: [address, 'latest']}).then(balance => {
            setUserBalance(ethers.utils.formatEther(balance));
        })
    }
    const chainChangedHandler = () => {
        window.location.reload();
    }
    const walletListClassHandler = () => {
        if(document.getElementById('wallet-list').className.includes('open')){
            setWalletListButtonHandlerText('مشاهده همه');
            document.getElementById('wallet-list').classList.remove('open');
        }else{
            setWalletListButtonHandlerText('مشاهده کمتر');
            document.getElementById('wallet-list').classList.add('open');
        }
    }
    useEffect(() => {
        if(window.ethereum) {
            window.ethereum.on('accountsChanged', accountChangedHandler);
            window.ethereum.on('chainChanged', chainChangedHandler);
        }
    });
    return (
        <div>
            {!defaultAccount && <div className="connect-wallet">
                <h3>برای استفاده از تایکی شما به یک کیف پول اتریوم نیاز دارید</h3>
                <p>به یکی از کیف پول های فعال ما متصل شوید و یا کیف پول جدیدی ایجاد کنید</p>
                <div id="wallet-list" className="wallet-list">
                    <div className="wallet-item" onClick={connectWalletHandler}>
                        <i className="ty ty-meta-mask"></i>
                        <span>MetaMask</span>
                        <span className="wallet-tag">Popular</span>
                    </div>
                    <div className="wallet-item disable">
                        <i className="ty ty-coin-base"></i>
                        <span>Coinbase Wallet</span>
                    </div>
                    <div className="wallet-item disable">
                        <i className="ty ty-wallet-connect"></i>
                        <span>WalletConnect</span>
                    </div>
                    <div className="wallet-item disable">
                        <i className="ty ty-formatic"></i>
                        <span>Fortmatic</span>
                    </div>
                    <div className="wallet-item disable">
                        <i className="ty ty-kaikas"></i>
                        <span>Kaikas</span>
                    </div>
                    <div className="wallet-item disable">
                        <i className="ty ty-bitski"></i>
                        <span>Bitski</span>
                    </div>
                    <div className="wallet-item disable">
                        <i className="ty ty-venly"></i>
                        <span>Venly</span>
                    </div>
                    <div className="wallet-item disable">
                        <i className="ty ty-dapper"></i>
                        <span>Dapper</span>
                    </div>
                    <div className="wallet-item disable">
                        <i className="ty ty-authereum"></i>
                        <span>Authereum</span>
                    </div>
                    <div className="wallet-item disable">
                        <i className="ty ty-torus"></i>
                        <span>Torus</span>
                    </div>
                    <div className="wallet-item disable">
                        <i className="ty ty-portis"></i>
                        <span>Portis</span>
                    </div>
                    <div className="wallet-item disable">
                        <i className="ty ty-opera-touch"></i>
                        <span>Opera Touch</span>
                    </div>
                    <div className="wallet-item disable">
                        <i className="ty ty-trust"></i>
                        <span>Trust</span>
                    </div>
                    <button className="wallet-list-handler" onClick={walletListClassHandler}>{walletListButtonHandlerText}</button>
                </div>
            </div>}
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