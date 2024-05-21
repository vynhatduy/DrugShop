import { memo } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import { AiOutlineFacebook } from "react-icons/ai";
import Logo from "../../../../Assest/Images/logo.svg";

const Footer = () => {
    return <footer className="footer">
        <div className="container">
            <div className="row">
                <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12">
                    <div className="footer-about">
                        <img src={ Logo} alt="Logo Drug SHOP"/>
                        <h1 className="footer-about-logo">
                            Drug SHOP
                        </h1>
                        <ul>
                            <li>
                                Địa chỉ: 01 Phù Đổng Thiên Vương
                            </li>
                            <li>
                                Phone: 0909090909
                            </li>
                            <li>
                                Email:drugshop@gmail.com
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                    <div className="footer-widget">
                        <h6>Cửa hàng</h6>
                        <ul>
                            <li>
                                <Link to="">Liên hệ</Link>
                            </li>
                            <li>
                                <Link to="">Thông tin về chúng tôi</Link>
                            </li>
                            <li>
                                <Link to="">Sản phẩm kinh doanh</Link>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <Link to="">Thông tin tài khoản</Link>
                            </li>
                            <li>
                                <Link to="">Giỏ hàng</Link>
                            </li>

                        </ul>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12">
                    <div className="footer-widget">
                        <h6>Thành viên tham gia</h6>
                        <ul>
                            <li>
                                <Link to="">
                                    <AiOutlineFacebook />Vy Nhật Duy
                                </Link>
                            </li>
                            <li>
                                <Link to="">
                                    <AiOutlineFacebook />Đỗ Đăng Hải
                                </Link>
                            </li>
                            <li>
                                <Link to="">
                                    <AiOutlineFacebook />Nguyễn Bảo Linh
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>


            </div>
        </div>
    </footer>
};

export default memo(Footer);