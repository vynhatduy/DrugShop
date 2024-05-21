//import { memo, useEffect, useState } from 'react';
//import NotFound404 from '../../NotFound404';
//import { DecodeToken } from '../../../Utils/DecodeToken';
//import axios from 'axios';
//import { APIGATEWAY, ROUTER } from '../../../Utils/Router';
//import { wait } from '@testing-library/user-event/dist/utils';
//import './style.scss';

//const OrderUser = () => {
//    const token = localStorage.getItem('token');
//    const [orders, setOrders] = useState([]);
//    useEffect(() => {
//        if (token === null) {
//            return <NotFound404 />
//        }

//        const decodeToken = DecodeToken(token);
//        const username = decodeToken.username;

//        axios.wait.get(APIGATEWAY.ORDER.BYUSERID + username, {
//            headers: {
//                'Content-Type': 'application/json',
//                'Authorization': 'Bearer ' + token
//            }
//        }).then(respone => {
//            setOrders(respone.data).catch(error => { console.error("Lỗi :", error); return <NotFound404 /> });
//        })

//    }, [token]);

//    if (orders === null || Array(orders.length) === null) {
//        return <NotFound404/>
//    }


//    return (
//        <div className="container">
//            <div className="row">
//                <div className="order">
//                    <table>
//                        <thead>
//                            <tr>
//                                <th>ID</th>
//                                <th>User ID</th>
//                                <th>Ngày</th>
//                                <th>Tổng Tiền</th>
//                            </tr>
//                        </thead>
//                        <tbody>
//                            {orders.map(item => (
//                                <tr key={item.id}>
//                                    <td>{item.id}</td>
//                                    <td>{item.userId}</td>
//                                    <td>{item.ngay}</td>
//                                    <td>{item.tongTien}</td>
//                                </tr>
//                            ))}
//                        </tbody>
//                    </table>
//                </div>
//            </div>
//        </div>
//    );
//};

//export default memo(OrderUser);


import { memo, useEffect, useState } from 'react';
import NotFound404 from '../../NotFound404';
import { DecodeToken } from '../../../Utils/DecodeToken';
import axios from 'axios';
import { APIGATEWAY, ROUTER } from '../../../Utils/Router';
import './style.scss';
import { Formater } from '../../../Utils/formater';
import { Link } from 'react-router-dom';

const OrderUser = () => {
    const token = localStorage.getItem('token');
    const [orders, setOrders] = useState([
        //{ id: 1, username: "admin", orderDate: '2024-05-13', totalPrice: 1000000, status: "Đã giao" },
        //{ id: 2, username: "admin", orderDate: '2024-05-14', totalPrice: 2000000, status: "Đang giao" },
        //{ id: 3, username: "admin", orderDate: '2024-05-15', totalPrice: 1500000, status: "Chờ duyệt" },
    ]);

    useEffect(() => {
        if (token === null) {
            return <NotFound404 />
        }

        const decodeToken = DecodeToken(token);
        const username = decodeToken.username;
        const url = `${APIGATEWAY.ORDER.GETALL}?Username=${username}`;

        axios.get(url).then(response => {
            setOrders(response.data);
        }).catch(error => { console.error("Lỗi :", error); return <NotFound404 /> });

    }, [token]);

    console.log("order", orders);
    if (orders === null || orders.length === 0) {
        return <NotFound404 />
    }

    return (
        <div className="orderpage">
            <div className="container">
                <div className="row">
                    <div className="order">
                        <h1>Lịch sử đơn hàng</h1>
                        {orders.map(item => (
                            <div className={`item ${item.status === "Đã giao"? "green": item.status === "Đang giao"? "blue": item.status === "Chờ duyệt"? "yellow": item.status === "Hủy"? "red": ""
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
        </div>
    );
};

export default memo(OrderUser);
