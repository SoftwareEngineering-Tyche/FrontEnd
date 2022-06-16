import React, { useState, useRef, useEffect } from "react";
import "../assets/styles/create-nft.scss";
import { useMoralis, MoralisProvider } from "react-moralis";
import Moralis from "moralis";
import Web3 from "web3";
import { contractABI, contractAddress } from "../contract";
import { styled } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Button, Divider, Link, TextField, Grid, InputLabel, MenuItem, FormHelperText, FormControl, Select, InputAdornment, Modal, Box } from "@mui/material";
import ethereumIcon from '../assets/icons/ethereum-icon.svg';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import { hostUrl } from "../host-url";
import { callAPI } from "../components/api-call";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const web3 = new Web3(Web3.givenProvider);
const Input = styled('input')({
    display: 'none',
});
const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: window.innerWidth > 768 ? '35%' : '95%',
    bgcolor: 'background.paper',
    borderRadius: '12px',
    boxShadow: 24,
    p: 4,
};
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
    const [price, setPrice] = useState(null);
    const [collection, setCollection] = useState("");
    const [isCreated, setIsCreated] = useState(false);
    const [tokenId, setTokenId] = useState(null);
    const [collectionsNames, setCollectionsNames] = useState([]);
    const [collectionsIDs, setCollectionsIDs] = useState([]);
    const [isOpenPropertyModal, setIsOpenPropertyModal] = useState(false);
    const [isOpenStatisticsModal, setIsOpenStatisticsModal] = useState(false);
    const [propertiesType, setPropertiesType] = useState([]);
    const [properties, setProperties] = useState([""]);
    const [statisticsType, setStatisticsType] = useState([]);
    const [statistics, setStatistics] = useState([""]);
    const [product, setProduct] = useState();
    const [ethAccount, setEthAccount] = useState();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setIsUploadedFile(true);
        setUploadText('تغییر اثر');
    };

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
                if (window.ethereum) {
                    window.ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
                        setEthAccount(accounts[0]);
                        callAPI({ method: "GET", url: `${hostUrl}/Accountcollection/${accounts[0]}` }).then(response => {
                            if (response.status === 200) {
                                let names = [], ids = [];
                                response.payload.map(collection => {
                                    names.push(collection.Name);
                                    ids.push(collection.id);
                                });
                                setCollectionsNames(names);
                                setCollectionsIDs(ids);
                            }
                        });
                    }).catch((err) => { console.log(err); })
                }
            }).catch((err) => { console.log(err); })
        }
    }, []);

    useEffect(() => {
        console.log('isAuthenticated', isAuthenticated);
    }, [isAuthenticated]);

    const getPropertiesField = (mode) => {
        const fieldsArray = mode === "statistics" ? statistics : properties;
        return (<>
            {fieldsArray.map((p, index) => {
                return (
                    <Grid container spacing={2} className="mb-3">
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="موضوع"
                                defaultValue={mode === "statistics" ? statisticsType[index] : propertiesType[index]}
                                onChange={e => { mode === "statistics" ? statisticsType[index] = e.target.value : propertiesType[index] = e.target.value }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label={mode === "statistics" ? "مقدار عددی" : "خصوصیت"}
                                defaultValue={mode === "statistics" ? statistics[index] : properties[index]}
                                onChange={e => { mode === "statistics" ? statistics[index] = e.target.value : properties[index] = e.target.value }}
                            />
                        </Grid>
                    </Grid>
                );
            })}
            <Button onClick={() => { mode === "statistics" ? setStatistics(oldArray => [...oldArray, ""]) : setProperties(oldArray => [...oldArray, ""]) }}>
                اضافه کردن خصوصیت بیشتر
            </Button>
            <Divider className="my-2" />
            <div className="d-flex justify-content-center">
                <Button variant="contained" classes={{ root: 'action submit' }} onClick={() => { setIsOpenPropertyModal(false); setIsOpenStatisticsModal(false) }}>
                    ذخیره تغییرات
                </Button>
            </div>
        </>);
    }

    useEffect(() => {
        if (product) {
            properties.map((p, index) => {
                const propertyData = new FormData();
                propertyData.append("subject", propertiesType[index]);
                propertyData.append("value", p);
                callAPI({ method: "POST", url: `${hostUrl}/WorkArtProperty/${product.id}`, data: propertyData })
            });
            statistics.map((s, index) => {
                const statisticData = new FormData();
                statisticData.append("subject", statisticsType[index]);
                statisticData.append("value", s);
                callAPI({ method: "POST", url: `${hostUrl}/WorkArtstatistic/${product.id}`, data: statisticData })
            });
        }
    }, [product]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append("Name", name);
        data.append("image", file);
        data.append("Externallink", externalLink);
        data.append("Description", description);
        data.append("Price", price);
        data.append("WalletInfo", ethAccount);
        callAPI({ method: "POST", url: `${hostUrl}/WorkArt/${collection}`, data: data }).then(response => {
            setProduct(response.payload);
        });

        let appId = process.env.REACT_APP_APP_ID;
        let serverUrl = process.env.REACT_APP_SERVER_URL;
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

    const removeProperty = (index) => {
        setProperties(prev => { return [...prev.slice(0, index), ...prev.slice(index + 1)]; })
        setPropertiesType(prev => { return [...prev.slice(0, index), ...prev.slice(index + 1)]; })
    }
    const removeStatistic = (index) => {
        setStatistics(prev => { return [...prev.slice(0, index), ...prev.slice(index + 1)]; })
        setStatisticsType(prev => { return [...prev.slice(0, index), ...prev.slice(index + 1)]; })
    }

    return (
        <div className="create-nft">
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
                        <span className="text">عکس ،ویدیو ،صدا یا مدل 3D&nbsp;</span>
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
                                <Grid item xs={12} md={4}>
                                    <FormControl fullWidth>
                                        <InputLabel>کلکسیون</InputLabel>
                                        <Select fullWidth value={collection} label="کلکسیون" onChange={e => setCollection(e.target.value)}>
                                            {collectionsNames.map((c, index) => {
                                                return (
                                                    <MenuItem value={collectionsIDs[index]}>{c}</MenuItem>
                                                );
                                            })}
                                            <MenuItem value="">
                                                <Link href="/collection/create">+ ساخت کلکسیون جدید</Link>
                                            </MenuItem>
                                        </Select>
                                        <FormHelperText>اثر شما در این کلکسیون نمایش داده می‌شود</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6} md={4}>
                                    <TextField
                                        fullWidth
                                        label="قیمت"
                                        value={price}
                                        onChange={e => setPrice(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={6} md={4}>
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
                                                <FormatListBulletedRoundedIcon sx={{ transform: "rotate(180deg)" }} />
                                                <span className="property-title">ویژگی‌ها</span>&nbsp;
                                            </div>
                                            <div className="property-subtitle">خصوصیات متنی اثر</div>
                                        </div>
                                        <Button variant="outlined" onClick={() => setIsOpenPropertyModal(true)}><AddRoundedIcon /></Button>
                                    </div>
                                    <div className="d-flex flex-wrap">
                                        {propertiesType && propertiesType.length > 0 &&
                                            properties.map((prop, index) => {
                                                if (prop && propertiesType[index])
                                                    return (
                                                        <div className="property-box">
                                                            <AddCircleRoundedIcon onClick={() => removeProperty(index)} color="error" fontSize="small" className="remove-icon" sx={{ transform: "rotate(45deg)" }} />
                                                            <div>{propertiesType[index]}</div>
                                                            <div className="text-secondary">{prop}</div>
                                                        </div>
                                                    );
                                            })
                                        }
                                    </div>
                                    <Modal open={isOpenPropertyModal} onClose={() => setIsOpenPropertyModal(false)}>
                                        <Box sx={modalStyle} className="property-modal">
                                            <div className="d-flex justify-content-center mb-4">
                                                اضافه کردن ویژگی‌های اثر
                                            </div>
                                            {getPropertiesField("property")}
                                        </Box>
                                    </Modal>
                                </Grid>
                                <Divider sx={{ width: '100%' }} />
                                <Grid item xs={12} classes={{ root: 'property-grid' }}>
                                    <div className="property-container">
                                        <div className="subject">
                                            <div className="property">
                                                <QueryStatsRoundedIcon />
                                                <span className="property-title">آمار</span>
                                            </div>
                                            <div className="property-subtitle">خصوصیات عددی اثر</div>
                                        </div>
                                        <Button variant="outlined" onClick={() => setIsOpenStatisticsModal(true)}><AddRoundedIcon /></Button>
                                    </div>
                                    <div className="d-flex flex-wrap">
                                        {statisticsType && statisticsType.length > 0 &&
                                            statistics.map((stat, index) => {
                                                if (stat && statisticsType[index])
                                                    return (
                                                        <div className="property-box">
                                                            <AddCircleRoundedIcon onClick={() => removeStatistic(index)} color="error" fontSize="small" className="remove-icon" sx={{ transform: "rotate(45deg)" }} />
                                                            <div>{statisticsType[index]}</div>
                                                            <div className="text-secondary">{stat}</div>
                                                        </div>
                                                    );
                                            })
                                        }
                                    </div>
                                    <Modal open={isOpenStatisticsModal} onClose={() => setIsOpenStatisticsModal(false)}>
                                        <Box sx={modalStyle} className="property-modal">
                                            <div className="d-flex justify-content-center mb-4">
                                                اضافه کردن آمار اثر
                                            </div>
                                            {getPropertiesField("statistics")}
                                        </Box>
                                    </Modal>
                                </Grid>
                                <Divider sx={{ width: '100%' }} />
                            </Grid>
                        </div>
                        <Button variant="contained" classes={{ root: 'action submit' }} onClick={onSubmit} className="m-2">
                            {loading ? 'در حال ارسال ...' : 'بساز'}
                        </Button>
                        <Link href='/' underline='none' color="inherit">
                            <Button variant="outlined" classes={{ root: 'action cancel' }}>انصراف</Button>
                        </Link>
                    </div>
                </div>
            }
        </div>
    );
}

export default CreateNft;