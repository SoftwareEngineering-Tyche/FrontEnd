import React, { useState, useEffect } from "react";
import "../assets/styles/collection.scss";
import { Button, Grid, TextField, InputLabel, MenuItem, FormControl, Select, Link, Snackbar } from "@mui/material";
import imageSample from "../assets/images/image.png";
import collectionBanner from "../assets/images/collection-banner.jpg";
import 'bootstrap/dist/css/bootstrap.css';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';
import { callAPI } from "../components/api-call";
import { hostUrl } from "../host-url";
import MuiAlert from '@mui/material/Alert';
import "../assets/styles/cards.scss";

const Input = styled('input')({
    display: 'none',
});
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function CollectionPage(props) {

    const [logoImage, setLogoImage] = useState();
    const [logoImageFile, setLogoImageFile] = useState();
    const [bannerImage, setBannerImage] = useState();
    const [bannerImageFile, setBannerImageFile] = useState();
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [category, setCategory] = useState();
    const [products, setProducts] = useState();
    const [onSubmit, setOnSubmit] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
                callAPI({ method: "GET", url: `${hostUrl}/Accountcollection/${accounts[0]}` }).then(response => {
                    if (response.status === 200) {
                        response.payload.map(collection => {
                            if (collection.id.toString() === window.location.pathname.split('/')[2]) {
                                setName(collection.Name);
                                setDescription(collection.Description);
                                if (!collection.category.includes('undefined'))
                                    setCategory(collection.category);
                                if (collection.bannerimage && !collection.bannerimage.includes('undefined') && !collection.bannerimage.includes('null'))
                                    setBannerImage(hostUrl + collection.bannerimage);
                                if (collection.logoimage && !collection.logoimage.includes('undefined') && !collection.logoimage.includes('null'))
                                    setLogoImage((hostUrl + collection.logoimage));
                                fetch(document.getElementById('banner').src).then(res => res.blob()).then(blob => {
                                    setBannerImageFile(new File([blob], 'banner.jpg', blob));
                                })
                                fetch(document.getElementById('logo').src).then(res => res.blob()).then(blob => {
                                    setLogoImageFile(new File([blob], 'logo.png', blob));
                                })
                            }
                        });
                    }
                });
            }).catch((err) => { console.log(err); })
        }
        if (window.location.pathname.split('/')[2] !== "create") {
            callAPI({ method: "GET", url: `${hostUrl}/WorkArtCollections/${window.location.pathname.split('/')[2]}` }).then(response => {
                setProducts(response.payload);
            });
        }
    }, []);

    const onLogoChange = (e) => {
        const [file] = e.target.files;
        setLogoImage(URL.createObjectURL(file));
        setLogoImageFile(e.target.files[0]);
    }
    const onBannerChange = (e) => {
        const [file] = e.target.files;
        setBannerImage(URL.createObjectURL(file));
        setBannerImageFile(e.target.files[0]);
    }
    const handleSubmit = () => {
        setOnSubmit(true);
        setIsEditMode(false);
        if (window.ethereum) {
            window.ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
                if (props.mode === "create") {
                    const data = new FormData();
                    data.append("logoimage", logoImageFile);
                    data.append("bannerimage", bannerImageFile);
                    data.append("Name", name);
                    data.append("Description", description);
                    data.append("category", category);
                    callAPI({ method: "POST", url: `${hostUrl}/collection/${accounts[0]}`, data: data });
                }
                else if (props.mode === "show") {
                    const data = new FormData();
                    if (logoImageFile) data.append("logoimage", logoImageFile);
                    data.append("bannerimage", bannerImageFile);
                    data.append("Name", name);
                    data.append("Description", description);
                    data.append("category", category);
                    callAPI({ method: "PUT", url: `${hostUrl}/collection/${window.location.pathname.split('/')[2]}`, data: data });
                }
            }).catch((err) => { console.log(err); })
        }
    }
    function getCard(item, mode) {
        return (
            <Link style={{ margin: '4px' }} className="item-card" underline="none" href={mode === 'product' ? `/product/${item.id}` : `/collection/${item.id}`}>
                {mode === 'product' ? <img src={hostUrl + item.image} className="square-img" /> : <img src={hostUrl + item.logoimage} className="round-img" />}
                <div className="item-name">{item.Name}</div>
                <div className="item-description">{item.Description}</div>
            </Link>
        );
    }
    const handleCancel = () => {
        setIsEditMode(false);
    }
    return (
        <div className="collection-page">
            <div className="collection-info">
                {!bannerImage ? <img src={collectionBanner} className="background" /> : <img id="banner" src={bannerImage} className="background" />}
                <div className="information">
                    <div className={logoImage ? "profile-picture" : "profile-picture no-pic"}>
                        {!logoImage ? <img src={imageSample} width="120" height="120" /> : <img id="logo" src={logoImage} width="120" height="120" />}
                    </div>
                    <Button variant="outlined" color="inherit" size="small" classes={{ root: 'edit-btn' }} onClick={() => setIsEditMode(true)}>
                        <EditIcon />
                    </Button>
                </div>
                <div className="name">
                    <span>{(name && name !== 'null') ? name : 'کلکسیون بی‌نام'}</span>
                </div>
                <div className="additional-information bio">
                    {(description && description !== 'null') ? description : 'بدون توضیحات'}
                </div>
                <div className="additional-information bio">
                    <span>دسته‌بندی : </span>&nbsp;
                    {(category) ? category : 'نامشخص'}
                </div>
            </div>
            <div className="mb-4">
                {(props.mode === "create" || isEditMode) ?
                    <Grid container spacing={2} className="contents">
                        <Grid item xs={12}>
                            <label htmlFor="logo-img">
                                <Input accept="image/*" id="logo-img" type="file" onChange={onLogoChange} />
                                <Button variant="outlined" component="span" sx={{ marginRight: '8px' }}>
                                    لوگو
                                </Button>
                            </label>
                            <label htmlFor="banner-pic">
                                <Input accept="image/*" id="banner-pic" type="file" onChange={onBannerChange} />
                                <Button variant="outlined" component="span">
                                    عکس پس‌زمینه
                                </Button>
                            </label>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="نام کلکسیون"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl sx={{ margin: '0px' }} fullWidth>
                                <InputLabel>دسته‌بندی</InputLabel>
                                <Select defaultValue={category} fullWidth value={category} label="کلکسیون" onChange={e => setCategory(e.target.value)}>
                                    <MenuItem value="هنر">هنر</MenuItem>
                                    <MenuItem value="موزیک">موزیک</MenuItem>
                                    <MenuItem value="ورزش">ورزش</MenuItem>
                                    <MenuItem value="عکاسی">عکاسی</MenuItem>
                                    <MenuItem value="کاربردی">کاربردی</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="توضیحات"
                                value={description}
                                multiline
                                onChange={e => setDescription(e.target.value)}
                            />
                        </Grid>
                        <div className="d-flex justify-content-center w-100">
                            <Button variant="contained" classes={{ root: 'action submit' }} onClick={handleSubmit}>اعمال تغییرات</Button>
                            <Button variant="outlined" classes={{ root: 'action cancel' }} onClick={handleCancel}>انصراف</Button>
                        </div>
                        {onSubmit && <Snackbar open={onSubmit} autoHideDuration={3000} onClose={() => setOnSubmit(false)}>
                            <Alert onClose={() => setOnSubmit(false)} severity="success" sx={{ width: '100%' }}>کلکسیون شما با موفقیت ساخته شد</Alert>
                        </Snackbar>}
                    </Grid>
                    :
                    <Grid container className="mt-1" justifyContent="center">
                        {products && products.length > 0 &&
                            <div className="d-flex flex-wrap justify-content-center">
                                {products.map((product, index) => {
                                    return (getCard(product, 'product'));
                                })}
                            </div>
                        }
                        {!products || products.length === 0 &&
                            <div className="d-flex flex-wrap justify-content-center">
                                هنوز اثری در این کلکسیون ثبت نشده است
                            </div>
                        }
                    </Grid>
                }
            </div>
        </div>
    );
}
export default CollectionPage;