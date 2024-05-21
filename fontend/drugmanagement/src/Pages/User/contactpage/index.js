import { memo } from 'react';
import './style.scss';
import { Link } from 'react-router-dom';
import { ROUTER } from '../../../Utils/Router';
const ContactUser = () => {
    return (
        <div className="contact">
            <div className="container">
                <div className="row">
                    <div className='col-7'>
                        <div className="info">
                            <h1>LIÊN HỆ THUỐC THÚ Y ONLINE</h1>
                            <p>Thuốc Thú Y Online cung cấp sản phẩm chất lượng, phù hợp với nhu cầu sử dụng, đảm bảo sức khỏe chăn nuôi. Góp phần tăng năng suất, tiết kiệm chi phí cho người nuôi.</p>
                            <p>Bất cứ khi nào quý khách hàng có nhu cầu. Hãy liên hệ ngay với chúng tôi hoặc để lại thông tin để chúng tôi chủ động liên vệ và tư vấn giải pháp chăm sóc vật nuôi phù hợp nhất với nhu cầu của quý khách!</p>

                            <ul>
                                <li>
                                    <span>

                                        Địa chỉ: Tp. Đà Lạt
                                    </span>
                                </li>
                                <li>
                                    <span>

                                        Điện thoại: 0386.**.**.**
                                    </span>
                                </li>
                                <li>
                                    <span>

                                        Email: 211****@edu.vn
                                    </span>
                                </li>
                                <li>
                                    <span>

                                        Fanpage: fb.com/
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-5">
                        <div className="form">
                            <label for="name">Họ và tên:</label>
                            <input type="text" name="name" id="name" />

                            <label for="tel">Số điện thoại</label>
                            <input type="tel" name="tel" id="tel" />

                            <label for="title">Tiêu đề:</label>
                            <input type="text" name="title" id="title" />

                            <label for="content">Nội dung:</label>
                            <input type="text" name="content" className="content" id="content" />
                            <br />
                            <div className="btn"><Link to={ROUTER.USER.CONTACT} onClick="window.location.reload(true)" className="button-submit">Gửi</Link></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default memo(ContactUser);