import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { connect } from "react-redux";
import Init from "../web3client";

function LoginPage () {
    const [walletListButtonHandlerText, setWalletListButtonHandlerText] = useState('مشاهده همه');
    const [isConnected, setIsConnected] = useState(false);
    const connectWalletHandler = () => {
        if(!window.ethereum)
            window.open('https://metamask.io/download/');
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
        if(window.ethereum)
            window.ethereum.request({ method: 'eth_accounts' }).then(accounts => {
                if(accounts.length > 0)
                    setIsConnected(true);
                else
                    setIsConnected(false);
            })
    }, []);
    return (
        <div>
            {!isConnected && <div className="connect-wallet">{window.ethereum && Init()}
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
        </div>
    );
}
export default LoginPage;