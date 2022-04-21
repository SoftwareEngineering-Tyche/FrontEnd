import React , {useState,useRef} from "react";
import "../assets/styles/create-nft.scss";
import ListIcon from '@mui/icons-material/List';
import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import etherumpic from "../assets/images/ethereum.png";

// react-bootstrap components
import {
    Badge,
    Button,
    Card,
    Form,
    Navbar,
    Nav,
    Container,
    Row,
    Col,
    Table,
    OverlayTrigger,
    Tooltip,
} from "react-bootstrap";
import SimpleReactValidator from 'simple-react-validator';
import { ForkRight } from "@mui/icons-material";


function CreateNft() {

    const simpleValidator = useRef(new SimpleReactValidator())
    
    const fileTypes = ["JPEG", "PNG", "GIF"];

    const [file, setFile] = useState(null);
    const handleChange = (file) => {
      setFile(file);
    };
    

    return (
        <>
            <Container fluid className="d-flex justify-content-center mt-4 mtAllPage_">
                <Row className="d-flex justify-content-center">
                    <Col md="7">
                        <div className="create-nft">
                            <div className="Container">
                                <h4 className="title">ساخت یک NFT جدید</h4>
                            </div>
                            <div style={{ border : "solid" , borderColor:"#2F3A8F",margin:"2%",padding:"5%" }}>
                                <Form className="form">

                                    <Row>
                                        <Col md="12" className="my-2">
                                            <Form.Group>
                                                <label className="label"><b>عکس ،ویدیو ،صدا یا مدل 3D</b><span className="text-danger">*</span></label>
                                                <p className="text">
                                                انواع فایل های پشتیبانی شده: JPG، PNG، GIF، SVG، MP4، WEBM، MP3، WAV، OGG، GLB، GLTF. حداکثر حجم: 100 مگابایت.
                                                </p>
                                                <input type={"file"} className="inputFile"/>
                                            </Form.Group>
                                        </Col>

                                        <Col md="12" className="my-4">
                                            <Form.Group>
                                                <label htmlFor="exampleInputEmail1" className="label">
                                                    <b>نام</b>   <span className="text-danger">*</span>
                                                </label >
                                                <Form.Control
                                                className="input"
                                                    placeholder="نام"
                                                    type="text"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col md="12" className="my-4">
                                            <Form.Group>
                                                <label htmlFor="exampleInputEmail1" className="label">
                                                    <b>لینک خارجی </b>
                                                      <p className="text">
                                                        با استفاده از این لینک خارجی کاربر میتواند به جزییات بیشتری در رابطه با nft مورد نظرخود بپردازد. 
                                                    </p>
                                                </label>
                                                <Form.Control
                                                className="input"
                                                    placeholder=" لینک خارجی"
                                                    type="text"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                   
                                        <Col md="12" className="my-2">
                                            <Form.Group>
                                                <label htmlFor="exampleInputEmail1" className="label">
                                                    <b>توضیحات</b>
                                                    <p className="text">
                                                        در صورت نیاز به توضیحات بیشتر در رابطه با nft ای که قصد خرید آن را دارید در قسمت زیر توضیحات را وارد کنید .به همراه لینک nft توضیحات زیر نیز می آیند .
                                                    </p>
                                                </label>
                                                <Form.Control
                                                className="input"
                                                    cols="80"
                                                    rows="4"
                                                    as="textarea"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>

                                        <Col md="12" className="my-4">
                                            <Form.Group>
                                                <label htmlFor="exampleInputEmail1" className="label">
                                                    <b>کلکسیون</b>
                                                    <p className="text">
                                                        این یک کلکسیون از مکانی میشود کهnft های ما در آن قابل مشاهده میباشند..
                                                        <i className="fa fa-info-circle"></i>

                                                    </p>
                                                </label>
                                                <select name="role" id="roles" className="input">
                                                    <option  value="" disabled selected hidden >لطفا انتخاب کنید</option>
                                                    <option value="C1" className="text">Co1</option>
                                                    <option value="C2" className="text">Co2</option>
                                                    <option value="C3"className="text">Co3</option>
                                                </select>
                                            </Form.Group>
                                        </Col>
                                        <Col md="12" >
                                            <Form.Group>
                                                <div className="d-flex justify-content-between align-items-center" style={{ borderBottom: "1px solid lightgray" }}>
                                                    <div className="col d-flex align-items-start">
                                                        <i className="fa fa-list bi flex-shrink-0 me-3 mt-2"></i>
                                                        <div>
                                                            <label className="label">
                                                                <ListIcon className="Icon" style={{ paddingLeft : "3%" }}/>
                                                                ویژگی ها
                                                                </label>
                                                            <p className="text">ویژگی های متنی که برای کاربر ظاهر میشود </p>
                                                        </div>
                                                    </div>
                                                    <button type="button" class="btn">+</button>
                                                </div>
                                            </Form.Group>
                                        </Col>
                                        <Col md="12" >
                                            <Form.Group>
                                                <div className="d-flex justify-content-between align-items-center" style={{ borderBottom: "1px solid lightgray" }}>
                                                    <div className="col d-flex align-items-start">
                                                        <i className="fa fa-star bi flex-shrink-0 me-3 mt-2"></i>
                                                        <div>
                                                            <label  className="label">
                                                            <StarBorderPurple500Icon className="Icon" style={{ paddingLeft : "3%" }}/>
                                                                سطح ها</label>
                                                            <p className="text">صفات عددی که به عنوان نوار پیشرفت نشان داده می شوند</p>
                                                        </div>
                                                    </div>
                                                    <button type="button" className="btn">+</button>
                                                </div>
                                            </Form.Group>
                                        </Col>
                                        <Col md="12" >
                                            <Form.Group>
                                                <div>
                                                    <div className="col d-flex align-items-start">
                                                        <i></i>
                                                        <div>
                                                            
                                                            <label className="label" >
                                                            <QueryStatsIcon className="Icon" style={{ paddingLeft : "3%" }}/>
                                                                آمار</label>
                                                            <p className="text">صفات عددی که فقط به صورت اعداد نشان داده می شوند</p>
                                                        </div>
                                                    </div>
                                                    <button type="button" className="btn">+</button>
                                                </div>
                                            </Form.Group>
                                        </Col>
                                        <Col md="12" >
                                            <Form.Group>
                                                <div>
                                                    <div >
                                                        <div>
                                                            <label className="label">
                                                            <LockOpenIcon className="Icon" style={{ paddingLeft : "3%" }}/>
                                                                محتوای غیر قابل قفل شدن</label>
                                                            <p className="text">شامل محتوای غیر قابل بازگشایی میباشند که تنها توسط صاحب اثر میتوان آنها را فاش کرد. </p>
                                                        </div>
                                                    </div>
                                                    <label className="label" style={{ paddingRight : "98%" }}>
                                                        <input type="checkbox" />
                                                        <span class="slider round"></span>
                                                    </label>
                                                </div>
                                            </Form.Group>
                                        </Col>
                                        <Col md="12">
                                            <Form.Group>
                                                <div>
                                                    <div>
                                                        <div>
                                                            <label className="label">
                                                            <WarningAmberIcon className="Icon" style={{ paddingLeft : "3%" }}/>
                                                                محتوای حساس</label>
                                                            <p className="text">این مورد را به عنوان محتوای صریح و حساس تنظیم کنید</p>
                                                        </div>
                                                    </div>
                                                    <label className="label" style={{ paddingRight : "98%" }}>
                                                        <input type="checkbox" />
                                                        <span class="slider round"></span>
                                                    </label>
                                                </div>
                                            </Form.Group>
                                        </Col>
                                        <Col md="12" className="my-4">
                                            <Form.Group>
                                                <label htmlFor="exampleInputEmail1" className="label">
                                                    <b>موجودی</b>
                                                    <p className="text">تعداد مواردی که میتوان تولید کرد بدون داشتن هر گونه هزینه اضافه
                                                  </p>

                                                </label>
                                                <Form.Control
                                                    placeholder="1"
                                                    type="number"
                                                    className="addad"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>

                                        <Col md="12" className="mb-4">
                                            <Form.Group>
                                                <label htmlFor="exampleInputEmail1" className="label">
                                                    <b>بلاک چین</b>
                                                </label>
                                                <div className="ether">
                                                <div className="ethereum">
                                                <span>Ethereum</span>
                                                <img src={etherumpic} className="ethereumpic"/>
                                                <button
                                                className="letCreat" style={{ float: "left" }}
                                              >
                                               بساز
                                                 </button>
                                                 </div>
                                                 </div>
                                            </Form.Group>
                                        </Col>

                                        <Col md="12" className="my-2">
                                        </Col>
                                    </Row>

                                    <div className="clearfix"></div>
                                </Form>

                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default CreateNft;
