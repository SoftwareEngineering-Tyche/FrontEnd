import React , {useState,useRef} from "react";

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
                        <div>
                            <div>
                                <h4>اضافه کردن مورد جدید</h4>
                            </div>
                            <div>
                                <Form>

                                    <Row>
                                        <Col md="12" className="my-2">
                                            <Form.Group>
                                                <label><b>عکس ،ویدیو ،صدا یا مدل سه بعدی</b><span className="text-danger">*</span></label>
                                                <p class="text-muted small m-0">
                                                    این یک متن تستی و برای نمونه است.
                                                </p>
                                            </Form.Group>
                                        </Col>

                                        <Col md="12" className="my-4">
                                            <Form.Group>
                                                <label htmlFor="exampleInputEmail1">
                                                    <b>نام</b>   <span className="text-danger">*</span>
                                                </label>
                                                <Form.Control
                                                    placeholder="نام"
                                                    type="text"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col md="12" className="my-4">
                                            <Form.Group>
                                                <label htmlFor="exampleInputEmail1">
                                                    <b>لینک خارجی </b>  <p class="text-muted small m-0">
                                                        این یک متن تستی و برای نمونه است.
                                                    </p>
                                                </label>
                                                <Form.Control
                                                    placeholder=" لینک خارجی"
                                                    type="text"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                   
                                        <Col md="12" className="my-2">
                                            <Form.Group>
                                                <label htmlFor="exampleInputEmail1">
                                                    <b>توضیحات</b>
                                                    <p class="text-muted small m-0">
                                                        این یک متن تستی و برای نمونه است.
                                                    </p>
                                                </label>
                                                <Form.Control
                                                    cols="80"
                                                    rows="4"
                                                    as="textarea"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>

                                        <Col md="12" className="my-4">
                                            <Form.Group>
                                                <label htmlFor="exampleInputEmail1" >
                                                    <b>کلکسیون</b>
                                                    <p class="text-muted small m-0">
                                                        این یک متن تستی و برای نمونه است.
                                                        <i className="fa fa-info-circle"></i>

                                                    </p>
                                                </label>
                                                <select name="role" id="roles" >
                                                    <option value="" disabled selected hidden>لطفا انتخاب کنید</option>
                                                    <option value="C1">1</option>
                                                    <option value="C2">2</option>
                                                    <option value="C3">3</option>
                                                </select>
                                            </Form.Group>
                                        </Col>
                                        <Col md="12" >
                                            <Form.Group>
                                                <div className="d-flex justify-content-between align-items-center" style={{ borderBottom: "1px solid lightgray" }}>
                                                    <div className="col d-flex align-items-start">
                                                        <i className="fa fa-list bi flex-shrink-0 me-3 mt-2"></i>
                                                        <div>
                                                            <label className="fw-bold mb-0">خواص</label>
                                                            <p className="m-0 small">این یک متن تستی و برای نمونه است </p>
                                                        </div>
                                                    </div>
                                                    <button type="button" class="btn btn-outline-primary my-3">+</button>
                                                </div>
                                            </Form.Group>
                                        </Col>
                                        <Col md="12" >
                                            <Form.Group>
                                                <div className="d-flex justify-content-between align-items-center" style={{ borderBottom: "1px solid lightgray" }}>
                                                    <div className="col d-flex align-items-start">
                                                        <i className="fa fa-star bi flex-shrink-0 me-3 mt-2"></i>
                                                        <div>
                                                            <label className="fw-bold mb-0">سطوح</label>
                                                            <p className="m-0">این یک متن تستی و برای نمونه است </p>
                                                        </div>
                                                    </div>
                                                    <button type="button" class="btn btn-outline-primary my-3">+</button>
                                                </div>
                                            </Form.Group>
                                        </Col>
                                        <Col md="12" >
                                            <Form.Group>
                                                <div className="d-flex justify-content-between align-items-center" style={{ borderBottom: "1px solid lightgray" }}>
                                                    <div className="col d-flex align-items-start">
                                                        <i className="fa fa fa-bar-chart bi flex-shrink-0 me-3 mt-2"></i>
                                                        <div>
                                                            <label className="fw-bold mb-0">حالت</label>
                                                            <p className="m-0">این یک متن تستی و برای نمونه است </p>
                                                        </div>
                                                    </div>
                                                    <button type="button" class="btn btn-outline-primary my-3">+</button>
                                                </div>
                                            </Form.Group>
                                        </Col>
                                        <Col md="12" >
                                            <Form.Group>
                                                <div className="d-flex justify-content-between align-items-center" style={{ borderBottom: "1px solid lightgray" }}>
                                                    <div className="col d-flex align-items-start">
                                                        <i className="fa fa-lock	
 bi flex-shrink-0 me-3 mt-2"></i>
                                                        <div>
                                                            <label className="fw-bold mb-0">محتوای قابل باز شدن</label>
                                                            <p className="m-0">این یک متن تستی و برای نمونه است </p>
                                                        </div>
                                                    </div>
                                                    <label class="switch my-4">
                                                        <input type="checkbox" />
                                                        <span class="slider round"></span>
                                                    </label>
                                                </div>
                                            </Form.Group>
                                        </Col>
                                        <Col md="12">
                                            <Form.Group>
                                                <div className="d-flex justify-content-between align-items-center" style={{ borderBottom: "1px solid lightgray" }}>
                                                    <div className="col d-flex align-items-start">
                                                        <i className="fa fa-exclamation-triangle	
 bi flex-shrink-0 me-3 mt-2"></i>
                                                        <div>
                                                            <label className="fw-bold mb-0">محتوای صریح و حساس</label>
                                                            <p className="m-0">این یک متن تستی و برای نمونه است </p>
                                                        </div>
                                                    </div>
                                                    <label class="switch my-4">
                                                        <input type="checkbox" />
                                                        <span class="slider round"></span>
                                                    </label>
                                                </div>
                                            </Form.Group>
                                        </Col>
                                        <Col md="12" className="my-4">
                                            <Form.Group>
                                                <label htmlFor="exampleInputEmail1">
                                                    <b>موجودی</b>
                                                    <p className="m-0 small">این یک متن تستی و برای نمونه است
                                                        <i className="fa fa-info-circle"></i> </p>

                                                </label>
                                                <Form.Control
                                                    placeholder="1"
                                                    type="number"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>

                                        <Col md="12" className="mb-4">
                                            <Form.Group>
                                                <label htmlFor="exampleInputEmail1">
                                                    <b>بلاک چین</b>
                                                </label>
                                                <select name="role" id="roles" >
                                                    <option value="" disabled selected hidden>لطفا انتخاب کنید</option>
                                                    <option value="C1">1</option>
                                                    <option value="C2">2</option>
                                                    <option value="C3">3</option>
                                                </select>
                                            </Form.Group>
                                        </Col>

                                        <Col md="12" className="my-2">
                                            <Form.Group>
                                                <label htmlFor="exampleInputEmail1">
                                                    <b> داده ها</b>
                                                    <p className="m-0 small">این یک متن تستی و برای نمونه است </p>
                                                </label>
                                                <div class="alert alert-secondary" role="alert">
                                                    این یک متن تستی و برای نمونه است

                                                </div>
                                            </Form.Group>
                                        </Col>
                                    </Row>


                                    <button
                                        className="btn btn-primary text-left float-left" style={{ float: "left" }}
                                    >
                                        Create
                                    </button>


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
