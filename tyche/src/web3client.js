import React, { useEffect, useState } from "react";
import Web3 from 'web3';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} {...props} />;
});
let provider = window.ethereum;
const web3 = new Web3(provider);

export function connectToWallet() {
    let account = "";
    if(window.ethereum !== undefined) {
        window.ethereum.request({ method: 'eth_requestAccounts' })
            .then(accounts => {
                console.log(`selected account is ${accounts[0]}`);
                toast.success('Wow so easy 1!', {position: 'top-center' });
                account =  accounts[0];
            })
            .catch((err) => {
                console.log(err);
            })
        window.ethereum.on('accountsChanged', function (accounts) {
            console.log(`selected account changed to ${accounts[0]}`);
            toast.success('Wow so easy 2!', {position: 'top-center' });
            account = accounts[0];
        })
    }
    toast.success('Wow so easy 3!', {position: 'top-center' });
    return account;
}
function checkConnection() {
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
export default function Init () {
    
    checkConnection();
    connectToWallet();
    
    // const [selectedAcccount, setSelectedAcccount] = useState(connectToWallet);
    
    // useEffect(() => {
    //     alert(connectToWallet())
    // }, []);
    // const [isOpenModal, setIsOpenModal] = useState(!selectedAcccount);

    // return (<>
    //     <Snackbar open={isOpenModal} autoHideDuration={5000} onClose={() => setIsOpenModal(false)}>
    //         <Alert severity="warning" sx={{ width: '100%' }}>کیف پول شما متصل نیست
    //             <div style={{marginTop:'8px', display:'flex', justifyContent:'space-between'}}>
    //                 <Button sx={{color:'white', backgroundColor:'#2F3A8F'}} onClick={connectToWallet}>اتصال کیف پول</Button>
    //                 <Button sx={{color:'white', backgroundColor:'gray', marginLeft:'8px'}} onClick={() => setIsOpenModal(false)}>بیخیال</Button>
    //             </div>
    //         </Alert>
    //     </Snackbar>
    // </>)
    
}