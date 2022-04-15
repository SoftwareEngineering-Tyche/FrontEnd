import React, { memo, useState } from "react";
import "../assets/styles/footer.scss";
import Button from '@mui/material/Button';
import walletIcon from '../assets/images/wallet.svg';
import collectionsIcon from '../assets/images/collection.svg';
import nftIcon from '../assets/images/nft.svg';
import saleIcon from '../assets/images/sale.svg';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import imageSample from "../assets/images/image.png";
import { Divider } from "@mui/material";
import Link from '@mui/material/Link';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Footer() {

    const [email, setEmail] = useState(undefined);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [pressSubmit, setPressSubmit] = useState(false);

    const emailRegex = RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)

    const checkEmail = (email) => {
        const res = emailRegex.test(email)
        setIsEmailValid(res);
    }

    const getOptions1 = () => {
        return (<>
            <div className="option">
                <div className="icon-container"><img src={walletIcon} className="icon" /></div>
                <span>دسترسی مستقیم به کیف پول</span>
            </div>
            <div className="option">
                <div className="icon-container"><img src={collectionsIcon} className="icon" /></div>
                <span>ساخت مجموعه‌های متنوع</span>
            </div>
        </>);
    }
    const getOptions2 = () => {
        return (<>
            <div className="option">
                <div className="icon-container"><img src={nftIcon} className="icon" /></div>
                <span>اضافه کردن آثار دلخواه</span>
            </div>
            <div className="option">
                <div className="icon-container"><img src={saleIcon} className="icon" /></div>
                <span>لیست کردن آثار برای فروش</span>
            </div>
        </>);
    }
    const getCustomerServices = () => {
        return (
            <div className="services-container">
                <div className="service-title">خدمات مشتریان</div>
                <div className="services">
                    <span className="service">پاسخ به پرسش‌های متداول</span>
                    <span className="service">حریم خصوصی</span>
                    <span className="service">شرایط استفاده</span>
                    <span className="service">گزارش باگ</span>
                </div>
            </div>
        );
    }
    const getMyAccountServices = () => {
        return (
            <div className="services-container">
                <div className="service-title">حساب کاربری من</div>
                <div className="services">
                    <Link href='/profile' underline='none' color="inherit">
                        <span className="service">پروفایل</span>
                    </Link>
                    <Link href='/profile/favorites' underline='none' color="inherit">
                        <span className="service">علاقه‌مندی‌‌ها</span>
                    </Link>
                    <Link href='/profile/collections' underline='none' color="inherit">
                        <span className="service">دارایی‌ها</span>
                    </Link>
                    <Link href='/profile/creations' underline='none' color="inherit">
                        <span className="service">ساخته شده‌ها</span>
                    </Link>
                </div>
            </div>
        );
    }
    return (
        <div className="footer">
            <div className="options">
                {window.innerWidth <= 768 ? <>
                    <div>{getOptions1()}</div>
                    <div>{getOptions2()}</div>
                </>
                    : <> {getOptions1()} {getOptions2()} </>}
            </div>
            <Divider />
            <div className="actions-container">
                <div className="tyche-info">
                    <div className="title">
                        <img src={imageSample} width={36} height={36} />
                        <span className="title-txt">تایکی</span>
                    </div>
                    <div className="sub-title">
                        اولین و بزرگ‌ترین پلتفرم ایرانی در حوزه توکن‌های غیر قابل تعویض (NFT) برای جمع‌آوری، خرید، فروش و جستجو در اقلام دیجیتال منحصر به فرد
                    </div>
                </div>
                {window.innerWidth <= 768 ? <><div style={{ display: 'flex' }}>{getMyAccountServices()} {getCustomerServices()}</div></>
                    : <> {getMyAccountServices()} {getCustomerServices()} </>}
                <div>
                    <div className="user-email">
                        <div className="title">از آخرین اخبار تایکی مطلع شوید</div>
                        <div className="email-form">
                            <input
                                type="text"
                                placeholder="ایمیل خود را وارد کنید"
                                value={email}
                                onChange={event => { setEmail(event.target.value); checkEmail(event.target.value); }}
                                className="email-input"
                            />
                            <Button classes={{ root: 'btn', disabled: 'disabled-btn' }} disabled={!email} onClick={() => setPressSubmit(true)}>ثبت</Button>
                            {isEmailValid && <Snackbar open={pressSubmit} autoHideDuration={3000} onClose={() => setPressSubmit(false)}>
                                <Alert onClose={() => setPressSubmit(false)} severity="success" sx={{ width: '100%' }}>ایمیل شما با موفقیت ثبت شد!</Alert>
                            </Snackbar>}
                            {!isEmailValid && <Snackbar open={pressSubmit} autoHideDuration={3000} onClose={() => setPressSubmit(false)}>
                                <Alert onClose={() => setPressSubmit(false)} severity="error" sx={{ width: '100%' }}>آدرس ایمیل وارد شده نامعتبر است!</Alert>
                            </Snackbar>}
                        </div>
                    </div>
                    <div className="contact">
                        <span className="title">ارتباط با ما</span>
                        <div className="contact-info">
                            <EmailRoundedIcon classes={{ root: "email-icon" }} />
                            <a href="mailto:contact.tyche.team@gmail.com" className="email-address">
                                <span>contact.tyche.team@gmail.com</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copy-right">۱۴۰۰-۱۴۰۱ کپی‌رایت © تمامی حقوق محفوظ است</div>
        </div>
    );
}
export default memo(Footer);