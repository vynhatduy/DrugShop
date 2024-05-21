import { memo } from "react";
import "./style.scss"
import { Link, Navigate, Route } from "react-router-dom";
import { ROUTER } from "../../../Utils/Router.js";
import petshop1 from "../../../Assest/Images/petshop1.png";
import petshop2 from "../../../Assest/Images/petshop2.png";
import petshop3 from "../../../Assest/Images/petshop3.png";
import procedure1 from "../../../Assest/Images/procedure1.png";
import procedure2 from "../../../Assest/Images/procedure2.png";
import procedure3 from "../../../Assest/Images/procedure3.png";
import procedure4 from "../../../Assest/Images/procedure4.png";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { BsArrowRepeat } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { FaPhoneVolume } from "react-icons/fa6";
import { FaShippingFast } from "react-icons/fa";
const HomePageUser = () => {
    return (
        <>
            <div className="banner">
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <div className="intro-banner">
                                <span>Chăm sóc toàn diện - Chăn nuôi hiệu quả!</span>
                                <p>Đồng hành cùng nhà nông, kiến tạo thành công.</p>
                                <Link to={ROUTER.USER.PRODUCT}>Xem sản phẩm </Link>
                            </div>
                        </div>
                        <div className="col-6">
                            <img src={petshop1} alt="petshop1" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="intro-top">
                <div className="container">
                    <div className="row">
                        <div className="col-7">
                            <h2>VỀ THUỐC THÚ Y</h2>
                            <p>Thuốc Thú Y Online là một cửa hàng mới thành lập đầu năm 2021. Với phương châm “Hiệu quả chăn nuôi của bạn là giá trị của chúng tôi”. Nên chúng tôi luôn luôn tìm kiếm các loại thuốc mới nhất, đạt chất lượng cao nhất cung cấp đến người nuôi nhằm mang đến những hiệu quả tốt nhất.</p>
                            <p>Các sản phẩm của Thuốc Thú Y Online đa dạng về chủng loại, qui cách và đường sử dụng đáp ứng đầy đủ các nhu cầu của người chăn nuôi trong: Phòng Ngừa – Tăng Trọng – Điều Trị – Khôi Phục – Phát Triển của nhiều đối tượng vật nuôi, gia súc gia cầm trong gia đình và sản xuất.</p>
                        </div>
                        <div className="col-5">
                            <img src={petshop2} alt="petshop2" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5">
                            <img src={petshop3} alt="petshop3" />
                        </div>
                        <div className="col-7">
                            <h2>ĐỐI TÁC & KHÁCH HÀNG</h2>
                            <p>Hiện nay, Thuốc Thú Y Online đã cung cấp đến tay bà con nhiều loại sản phẩm khác nhau phục vụ ngành chăn nuôi cho các hộ gia đình và trang trại. Hầu hết các sản phẩm của cửa hàng là các chế phẩm hướng tới việc chăn nuôi không ô nhiễm – bảo vệ môi trường, hạn chế chi phí thức ăn và công lao động, hỗ trợ làm nông nghiệp bền vững.</p>
                            <p>Phương châm hoạt động của Cửa hàng Thuốc Thú Y Online là phải giữ vững niềm tin khách hàng dành cho chúng tôi và cam kết luôn cung cấp những sản phẩm chất lượng tốt nhất.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="produce">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2>QUY TRÌNH TƯ VẤN KỸ THUẬT</h2>
                            <p>Đến với Thuốc Thú Y Online, các bạn không chỉ được tư vấn cách chăm sóc trang trại heo, gà mà còn hỗ trợ tư vấn cả quy trình từ A – Z. Chúng tôi luôn phấn đấu làm hài lòng khách hàng từ chất lượng giá cả cạnh tranh. Quy trình tư vấn chuyên nghiệp trong chăn nuôi từ các chuyên gia đầu ngành nhiều kinh nghiệm.</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="row">
                                <div className="product-item">
                                    <img src={procedure1} alt="Chọn Con Giống Tốt" />
                                    <h3>Chọn Con Giống Tốt</h3>
                                    <p>Làm sao để chọn con giống tốt, khỏe mạnh, mang lại hiệu quả kinh tế cao.</p>
                                </div>

                                <div className="product-item">
                                    <img src={procedure2} alt="Thức Ăn Chăn Nuôi" />
                                    <h3>Thức Ăn Chăn Nuôi</h3>
                                    <p>Những loại thức ăn chăn nuôi nào phù hợp với trang trại của bạn</p>
                                </div>

                                <div className="product-item">
                                    <img src={procedure3} alt="Vệ Sinh Chuồng Trại" />
                                    <h3>Vệ Sinh Chuồng Trại</h3>
                                    <p>Vệ sinh như nào là đúng cách. Các bước vệ sinh chuồng trại sạch sẽ.</p>
                                </div>

                                <div className="product-item">
                                    <img src={procedure4} alt="Phòng Dịch Bệnh" />
                                    <h3>Phòng Dịch Bệnh</h3>
                                    <p>Tìm hiểu về các dịch bệnh. Làm thế nào để phòng và tránh các dịch bệnh.</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="intro-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2>TẠI SAO KHÁCH HÀNG CHỌN CHÚNG TÔI?</h2>
                            <p>Đến với Thuốc Thú Y Online khách hàng yên tâm về nguồn gốc, chất lượng hàng hóa và giá cả phù hợp. Đặc biệt hơn là hoàn toàn tin tưởng về chế độ hỗ trợ và tư vấn kỹ thuật sau bán hàng của cửa hàng chúng tôi.</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="intro-list">
                                <div className="intro-item">
                                    <div className="icon">
                                        <AiOutlineShoppingCart />
                                    </div>
                                    <span>Sản phẩm đa dạng</span>
                                    <p>Đa dạng sản phẩm từ thuốc dạng bột đến dạng chai</p>
                                </div>
                                <div className="intro-item">
                                    <div className="icon">
                                        <BsFillInfoCircleFill />
                                    </div>
                                    <span>Thông tin minh bạch</span>
                                    <p>Nguồn gốc sản phẩm rõ ràng, thuộc hàng nội bộ công ty</p>
                                </div>
                                <div className="intro-item">
                                    <div className="icon">
                                        <BsArrowRepeat />
                                    </div>
                                    <span>Quy trình đơn giản</span>
                                    <p>Đơn giản, nhanh chóng, không cần mất thời gian và công sức</p>
                                </div>

                                <div className="intro-item">
                                    <div className="icon">
                                        <AiOutlineLike />
                                    </div>
                                    <span>Thương hiệu uy tín</span>
                                    <p>Sản phẩm chính hãng của các công ty lớn tại Việt Nam</p>
                                </div>
                                <div className="intro-item">
                                    <div className="icon">
                                        <FaPhoneVolume />
                                    </div>
                                    <span>Tư vấn chuyên nghiệp</span>
                                    <p>Nhân viên sẽ tư vấn tận tình từ A-Z cho quý khách hàng</p>
                                </div>
                                <div className="intro-item">
                                    <div className="icon">
                                        <FaShippingFast />
                                    </div>
                                    <span>Giao hàng tận nơi</span>
                                    <p>Đóng gói cẩn thận, giao hàng tận nơi từ khoảng 2 - 3 ngày</p>
                                </div></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default memo(HomePageUser);