import React, { useState, useRef, useEffect } from "react";
import "../assets/styles/create-nft.scss";
import { useMoralis, MoralisProvider } from "react-moralis";
import Moralis from "moralis";
import Web3 from "web3";
import { contractABI, contractAddress } from "../contract";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { Badge, Card, Form, Navbar, Nav, Container, Row, Col, Table, OverlayTrigger, Tooltip } from "react-bootstrap";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Divider } from "@mui/material";
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import ethereumIcon from '../assets/icons/ethereum-icon.svg';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const web3 = new Web3(Web3.givenProvider);
const Input = styled('input')({
    display: 'none',
});
function CreateNft() {
    const { authenticate, isAuthenticated, logout, user } = useMoralis();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState('');
    const [isUploadedFile, setIsUploadedFile] = useState(false);
    const [uploadText, setUploadText] = useState('بارگذاری اثر');
    const [file, setFile] = useState(null);
    const [externalLink, setExternalLink] = useState(null);
    const [collection, setCollection] = useState();
    const [isCreated, setIsCreated] = useState(false);
    const [tokenId, setTokenId] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setIsUploadedFile(true);
        setUploadText('تغییر اثر');
    };

    useEffect(() => {
        console.log('isAuthenticated', isAuthenticated);
    }, [isAuthenticated]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        let appId = "CuiIZavqoAaqG0qhrqx9BTxOxF7wT6okzOjEjlkj";
        let serverUrl = "https://ppkqibnytc17.usemoralis.com:2053/server";
        Moralis.start({ serverUrl, appId });

        try {
            // save image to IPFS
            const file1 = new Moralis.File(file.name, file);
            await file1.saveIPFS();
            const file1url = file1.ipfs();

            // generate metadata and save to ipfs
            const metadata = {
                name,
                description,
                image: file1url,
            };
            const file2 = new Moralis.File(`${name}metadata.json`, {
                base64: Buffer.from(JSON.stringify(metadata)).toString("base64"),
            });
            await file2.saveIPFS();
            const metadataurl = file2.ipfs();
            setImage(file1url)
            console.log(metadataurl);
            // interact with smart contract
            const contract = new web3.eth.Contract(contractABI, contractAddress);
            const response = await contract.methods
                .mint(metadataurl)
                .send({ from: user.get("ethAddress") });
            const tokenId = response.events.Transfer.returnValues.tokenId;

            setIsCreated(true);
            setTokenId(tokenId);
            console.log(`NFT successfully minted. Contract address - ${contractAddress} and Token ID - ${tokenId}`);

        } catch (err) {
            console.log("Something went wrong!");
        }
        setLoading(false)
    };

    return (
        <Container fluid className="create-nft">
            {isCreated && tokenId ?
                <div className="result">
                    <div className="success-created-container">
                        <div className="success-created">
                            <div>{`nft شما با موفقیت ساخته شد`}</div>
                            <div>{`آدرس کانترکت : ${contractAddress}`}</div>
                            <div>{`آیدی توکن : ${tokenId}`}</div>
                        </div>
                    </div>
                    <Link href='/' underline='none' color="inherit">
                        <Button variant="outlined">بازگشت به صفحه اصلی </Button>
                    </Link>
                </div>
                :
                <div className="form-container">
                    <div className="title">ساخت NFT جدید</div>
                    <label htmlFor="product">
                        <span className="label">عکس ،ویدیو ،صدا یا مدل 3D&nbsp;</span>
                        <span className="text">
                            (پشتیبانی از فرمت‌های: JPG، PNG، GIF، SVG، MP4، WEBM، MP3، WAV، OGG، GLB، GLTF. حداکثر حجم: 100 مگابایت)
                        </span>
                        <div className="upload-product">
                            <Input id="product" type="file" onChange={handleFileChange} />
                            <Button variant="outlined" component="span" classes={{ root: 'upload-btn' }}>
                                {uploadText}
                            </Button>&nbsp;&nbsp;&nbsp;
                            {file && <span>حجم فایل: {Math.floor(file.size / 1024)} کیلوبایت</span>}
                            <Snackbar open={isUploadedFile} autoHideDuration={5000} onClose={() => setIsUploadedFile(false)}>
                                <Alert onClose={() => setIsUploadedFile(false)} severity="success" sx={{ width: '100%' }}>اثر شما با موفقیت بارگذاری شد!</Alert>
                            </Snackbar>
                        </div>
                    </label>
                    <div className="product-info">
                        <div className="get-input">
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="نام اثر"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        helperText={"پر کردن نام اجباری است"}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="لینک خارجی"
                                        value={externalLink}
                                        onChange={e => setExternalLink(e.target.value)}
                                        helperText={"با گذاشتن لینک ‌می‌توانید جزئیات بیشتری از اثر خود ارائه دهید"}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="توضیحات"
                                        value={description}
                                        onChange={e => setDescription(e.target.value)}
                                        helperText={"توضیحات در صفحه جزئیات، در زیر اثر شما نمایش داده می‌شود"}
                                        multiline
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl sx={{ margin: '0px' }} fullWidth>
                                        <InputLabel>کلکسیون</InputLabel>
                                        <Select fullWidth value={collection} label="کلکسیون" onChange={e => setCollection(e.target.value)}>
                                            <MenuItem value="collection1">collection1</MenuItem>
                                            <MenuItem value="collection2">collection2</MenuItem>
                                            <MenuItem value="collection3">collection3</MenuItem>
                                        </Select>
                                        <FormHelperText>اثر شما در این کلکسیون نمایش داده می‌شود</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        disabled
                                        fullWidth
                                        label="بلاک چین"
                                        value={"اتریوم"}
                                        InputProps={{ startAdornment: <InputAdornment position="start"><img src={ethereumIcon} width={26} height={26} /></InputAdornment> }}
                                    />
                                </Grid>
                                <Divider sx={{ width: '100%', marginTop: '16px' }} />
                                <Grid item xs={12} classes={{ root: 'property-grid' }}>
                                    <div className="property-container">
                                        <div className="subject">
                                            <div className="property">
                                                <FormatListBulletedRoundedIcon />
                                                <span className="property-title">ویژگی‌ها</span>
                                            </div>
                                            <div className="property-subtitle">خصوصیات های متنی اثر</div>
                                        </div>
                                        <Button variant="outlined"><AddRoundedIcon /></Button>
                                    </div>
                                </Grid>
                                <Divider sx={{ width: '100%' }} />
                                <Grid item xs={12} classes={{ root: 'property-grid' }}>
                                    <div className="property-container">
                                        <div className="subject">
                                            <div className="property">
                                                <QueryStatsRoundedIcon />
                                                <span className="property-title">آمار</span>
                                            </div>
                                            <div className="property-subtitle">خصوصیات های عددی اثر</div>
                                        </div>
                                        <Button variant="outlined"><AddRoundedIcon /></Button>
                                    </div>
                                </Grid>
                                <Divider sx={{ width: '100%' }} />
                            </Grid>
                        </div>
                        <Button variant="contained" classes={{ root: 'action submit' }} onClick={onSubmit}>
                            {loading ? 'در حال ارسال ...' : 'بساز'}
                        </Button>
                        <Link href='/' underline='none' color="inherit">
                            <Button variant="outlined" classes={{ root: 'action cancel' }} >انصراف</Button>
                        </Link>
                    </div>
                </div>
            }
        </Container>
    );
}

export default CreateNft;