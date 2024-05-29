
import { memo, useEffect, useState } from 'react';
import NotFound404 from '../../NotFound404';
import { DecodeToken } from '../../../Utils/DecodeToken';
import axios from 'axios';
import { APIGATEWAY, ROUTER } from '../../../Utils/Router';
import './style.scss';
import { Formater } from '../../../Utils/formater';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../../Components/Loadding';

const OrderUser = () => {
    const token = localStorage.getItem('token');
    const [orders, setOrders] = useState([]);
    const [isLoadding, setIsLoadding] = useState(true);

    useEffect(() => {
        if (isLoadding) {
            if (token === null) {
                return <NotFound404 />
            }

            const decodeToken = DecodeToken(token);
            const username = decodeToken.username;
            const url = `${APIGATEWAY.ORDER.GETALL}?Username=${username}`;

            axios.get(url).then(response => {
                setOrders(response.data);
            }).catch(error => { console.error("Lỗi :", error); }).finally(e => {
                setIsLoadding(false);
            });

        }
    }, [token,isLoadding]);

    if (isLoadding===false&& orders.length === 0) {
        return <NotFound404 />
    }

    return (
        <div className="orderpage">
            {isLoadding ? <LoadingSpinner /> : <>
                <div className="container">
                    <div className="row">
                        <div className="order">
                            <h1>Lịch sử đơn hàng</h1>
                            {orders.map(item => (
                                <div className={`item ${item.status === "Đã giao" ? "green" : item.status === "Đang giao" ? "blue" : item.status === "Chờ duyệt" ? "yellow" : item.status === "Hủy" ? "red" : ""
                                    }`} key={item.id}>
                                    <Link to={`/chi-tiet-hoa-don/${item.id}`}>
                                        <div><span>Mã hóa đơn:  {item.id}</span> </div>
                                        <div>
                                            <span>Ngày đặt hàng: {item.orderDate}</span>
                                        </div>
                                        <div>
                                            <span>Thành tiền:  {Formater(item.totalPrice)}</span>
                                        </div>
                                        <div>
                                            <span>Trạng thái đơn hàng:  {item.status}</span>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="btn">
                        <button onClick={() => { window.location.href = ROUTER.USER.HOME }}>Về trang chủ</button>

                    </div>
                </div>
            </>}
        </div>
    );
};

export default memo(OrderUser);
