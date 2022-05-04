import React, { useState, useEffect } from "react";
import "../assets/styles/create-collection.scss";
import { Button, Divider, Link, Grid, ButtonGroup, Accordion, AccordionSummary, AccordionDetails, TextField, InputLabel, MenuItem, FormHelperText, FormControl, Select, InputAdornment } from "@mui/material";
import imageSample from "../assets/images/image.png";
import collectionBanner from "../assets/images/collection-banner.jpg";
import 'bootstrap/dist/css/bootstrap.css';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';
import { callAPI } from "../components/api-call";
import { hostUrl } from "../host-url";

const Input = styled('input')({
    display: 'none',
});
function CollectionPage(props) {

    const [logoImage, setLogoImage] = useState();
    const [logoImageFile, setLogoImageFile] = useState();
    const [bannerImage, setBannerImage] = useState();
    const [bannerImageFile, setBannerImageFile] = useState();
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [category, setCategory] = useState();
    const [workArts, setWorkArts] = useState();
    const [onSubmit, setOnSubmit] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {

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
    }
    const handleCancel = () => {
        //setIsEditMode(false);
    }
    useEffect(() => {

        if (window.ethereum) {
            window.ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
                // const data = new FormData();
                // data.append("WalletInfo", accounts[0]);
                // callAPI({ method: "POST", url: `${hostUrl}/Account/`, data: data });

                callAPI({ method: "GET", url: `${hostUrl}/Account/${accounts[0]}` }).then(response => {
                    console.log("response.status", response.status);
                    console.log("response.payload", response.payload);
                });
            }).catch((err) => { console.log(err); })
        }
    }, [onSubmit]);
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
                {<div className="additional-information bio">{(description && description !== 'null') ? description : 'بدون توضیحات'}</div>}
            </div>
            <div className="contents">
                {(props.mode === "create" || isEditMode) ?
                    <Grid container spacing={2}>
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
                                <Select fullWidth value={category} label="کلکسیون" onChange={e => setCategory(e.target.value)}>
                                    <MenuItem value="art">هنر</MenuItem>
                                    <MenuItem value="music">موزیک</MenuItem>
                                    <MenuItem value="sport">ورزش</MenuItem>
                                    <MenuItem value="photograpy">عکاسی</MenuItem>
                                    <MenuItem value="utility">کاربردی</MenuItem>
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
                    </Grid>
                    :
                    <Grid container spacing={2}>
                        آثار موجود در این کلکسیون

                    </Grid>
                }
            </div>
        </div>
    );
}
export default CollectionPage;