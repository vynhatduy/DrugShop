﻿
import { memo, useEffect } from 'react';
import './style.scss';
import { useState } from 'react';
import NotFound404 from '../../NotFound404';
import { DecodeToken } from '../../../Utils/DecodeToken';
import axios from 'axios';
import { APIGATEWAY, ROUTER } from '../../../Utils/Router';
import { useParams } from 'react-router-dom';
import { Formater } from '../../../Utils/formater';
import LoadingSpinner from '../../../Components/Loadding';


const OrderDetailUser = () => {
    const token = localStorage.getItem('token');
    const [listOrder, setListOrder] = useState([]);
    const [isLoadding, setIsLoadding] = useState(true);
    const [isNotFound, setIsNotFound] = useState(false);
    let decodeToken = null;
    if ( token !== null && token !== "null" &&token !== undefined ) {
        decodeToken = DecodeToken(token);
    }
    const { id } = useParams();

    const url = `${APIGATEWAY.ORDER.GETALL}/getDataUser/${decodeToken.username}/${id}`;
    useEffect(() => {
        if (isLoadding) {
            if (decodeToken === null && decodeToken === "") {
                setIsNotFound(true);
                return;
            }
            axios.get(url, {
                params: {
                    Username: decodeToken.username,
                    Id: id
                }
            }).then(response => {
                setListOrder(response.data);
            }).catch(error => { console.error("Lỗi :", error); return <NotFound404 /> }).finally(e => { setIsLoadding(false)});

        }
    }, [isLoadding,isNotFound,token]);


    if (isLoadding===false&&isNotFound) {
        return <NotFound404 />;
    }
    return (
        <div className="container">
            {isLoadding ? <LoadingSpinner /> : <>
                <div className="row">
                    <div className="order-detail">
                        <h1>Chi tiết hoá đơn: {id}  </h1>
                        {listOrder.map((item) => (
                            <div className="item" key={item.orderId}>
                                <div>
                                    <img src={item.img} alt={item.name} />
                                </div>
                                <div>
                                    <span>Mã sản phẩm: {item.productId}</span>
                                </div>
                                <div>
                                    <span>Tên sản phẩm: {item.name}</span>
                                </div>
                                <div>
                                    <span>Số lượng: {item.quantity} sản phẩm</span>
                                </div>
                                <div>
                                    <span>Giá: {Formater(item.price)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="btn">
                    <button onClick={() => { window.location.href = ROUTER.USER.HOME }}>Về trang chủ</button>

                </div>
            </>}
        </div>
    );
}
export default memo(OrderDetailUser);