import React from "react";
import "../assets/styles/home-page.scss";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';

function HomePageDescriptions () {
    return (
        <div className="descriptions">
            <Accordion classes={{root: 'accordion'}}>
                <AccordionSummary expandIcon={<ExpandMoreRoundedIcon classes={{root:'icon'}}/>} classes={{root:'accordion-summery'}}>
                    NFT چیست؟
                </AccordionSummary>
                <AccordionDetails classes={{root: 'accordion-detail'}}>
                    NFT به دارایی دیجیتالی می‌گویند که همانند آثار هنری قابل جمع کردن باشد. این دارایی دیجیتال، ارزش خود را به صورت نوعی از رمزارز حفظ می‌کند. در حقیقت، همانطور که یک فرش دستبافت یا تابلوی نقاشی، ارزش خود را در طول زمان حفط ‌می‌کند و نوعی سرمایه‌گذاری به شمار می‌آید.
                    <br/>
                    واژه NFT به معنای ژتون (توکن) غیر قابل معاوضه (non-fongible token) است و در حقیقت، توکنی دیجیتال و نوعی رمزارز مانند بیت‌کوین و اتریوم است. اما برخلاف یک سکه استاندارد، NFT منحصر به فرد است و نمی‌توان آن را معاوضه کرد.
                </AccordionDetails>
            </Accordion>
            <Accordion classes={{root: 'accordion'}}>
                <AccordionSummary expandIcon={<ExpandMoreRoundedIcon classes={{root:'icon'}}/>} classes={{root:'accordion-summery'}}>
                    نحوه کارکرد NFT به چه شکل است؟
                </AccordionSummary>
                <AccordionDetails classes={{root: 'accordion-detail'}}>
                    NFTها بخشی از بلاک چین اتریوم هستند و در نتیجه، ژتون‌هایی به شمار می‌آیند که اطلاعات اضافه‌ای در آن‌ها ذخیره شده است. اطلاعات اضافه شده به توکن‌های غیر قابل معاوضه، بخش مهم توکن‌ها را تشکیل می‌دهند و سبب می‌شوند تا هنر، موسیقی، ویدیو و مواردی از این دست را با فرمت‌های مختلف عکس، فیلم و موسیقی پوشش دهند. از آن‌جایی که این رمزارزها، ارزشی را در خود حفظ و نگهداری می‌کنند، می‌توان آن‌ها را خرید و فروش کرد و مانند انواع مختلف آثار هنری، این ارزش توسط بازار و مکانیزم عرضه و تقاضا تنظیم می‌شود.
                </AccordionDetails>
            </Accordion>
            <Accordion classes={{root: 'accordion'}}>
                <AccordionSummary expandIcon={<ExpandMoreRoundedIcon classes={{root:'icon'}}/>} classes={{root:'accordion-summery'}}>
                    چگونه NFTهای مورد نظرم را خریداری کنم؟
                </AccordionSummary>
                <AccordionDetails classes={{root: 'accordion-detail'}}>
                    برای این‌کار ابتدا شما باید در این سامانه کیف پول خود را از طریق یکی از صرافی‌های ارز دیجیتال با یکی از رمزارزهای مورد قبول شارژ کنید.
                    <br/>
                    سپس می‌توانید به راحتی مالکیت دیجیتال آثار دلخواه خود را از طریق موجودی کیف پولتان خریداری کنید.
                </AccordionDetails>
            </Accordion>
            <Accordion classes={{root: 'accordion'}}>
                <AccordionSummary expandIcon={<ExpandMoreRoundedIcon classes={{root:'icon'}}/>} classes={{root:'accordion-summery'}}>
                    چگونه خودم در این سامانه NFT بسازم؟
                </AccordionSummary>
                <AccordionDetails classes={{root: 'accordion-detail'}}>
                    برای این امر هم شما باید ابتدا کیف پول رمزارزی خود را به این سامانه متصل کنید.
                    <br/>
                    سپس روی دکمه ساخت NFT کلیک کرده و فایل مورد نظر خود را در محلی که در نظر گرفته شده آپلود کنید. سپس اطلاعات، توضیحات اثر را وارد کرده و بر روی دکمه تایید کلیک کنید تا NFT شما ایجاد شود.
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
export default HomePageDescriptions;