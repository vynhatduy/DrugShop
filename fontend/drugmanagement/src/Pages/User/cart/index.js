

import { memo, useState, useEffect } from 'react';
import './style.scss';
import { DecodeToken } from '../../../Utils/DecodeToken';
import axios from 'axios';
import { APIGATEWAY, ROUTER } from '../../../Utils/Router';
import { Formater } from '../../../Utils/formater';
import NotFound404 from '../../NotFound404';
import { Form } from 'react-router-dom';

const CartUser = () => {
    const [paymentMethod, setPaymentMethod] = useState("");
    const token = localStorage.getItem('token');
    const [listCart, setListCart] = useState([]);
    const [order, setOrder] = useState({});
    let cartData = JSON.parse(localStorage.getItem('cartData'));
    let totalPrice = 0;
    const details = [];
    let decodedToken = null;
    if (token !== null && token !== undefined && token !== "" && token !== "null") {
        decodedToken = DecodeToken(token);
    }

    useEffect(() => {
        if (decodedToken !== null&&decodedToken!=="null") {
            axios.get(APIGATEWAY.CART.GETBYUSERNAME + decodedToken.username)
                .then(response => {
                    setListCart(response.data);
                })
                .catch(error => { console.log("Lỗi ", error); return <NotFound404 /> });
        }
        else {

            if (cartData !== null && cartData.length !== 0) {
                setListCart(cartData);
            }
            if (cartData === null || cartData.length !== 0) {
                return <NotFound404 />
            }
        }

        const lblpriceElement = document.getElementById('lblTotalPrice');
        if (lblpriceElement !== null) {
            lblpriceElement.textContent = Formater(totalPrice);
        }
    }, [token]);

    const Sub = (item) => {
        const lblElement = document.getElementById(`lbl-num${item.productId}`);
        const priceElement = document.getElementById(`totalPrice${item.productId}`);
        const lblpriceElement = document.querySelectorAll('.lblTotalPrice');

        let num = item.quantity;
        let price = parseFloat(item.price / item.quantity);
        caculatorTotalPrice();


        if (num > 1) {
            num--;
            totalPrice -= price;
            price = parseFloat(price * num);

            lblElement.value = num;
            priceElement.textContent = Formater(price);
            lblpriceElement.forEach(lblpriceElement => {
                lblpriceElement.textContent = "Tổng tiền : " + Formater(totalPrice);
            });

            item.quantity = num;
            item.price = price;


            updateDataCart(item);
        }

    }

    const Add = (item) => {
        const lblElement = document.getElementById(`lbl-num${item.productId}`);
        const priceElement = document.getElementById(`totalPrice${item.productId}`);
        const lblpriceElement = document.querySelectorAll('.lblTotalPrice');

        let num = item.quantity;
        let price = parseFloat(item.price / item.quantity);
        caculatorTotalPrice();

        if (num < 100) {
            num++;
            totalPrice += price;
            price = parseFloat(price * num);

            lblElement.value = num;
            priceElement.textContent = Formater(price);
            lblpriceElement.forEach(lblpriceElement => {
                lblpriceElement.textContent = "Tổng tiền : " + Formater(totalPrice);
            });

            item.quantity = num;
            item.price = price;


            updateDataCart(item);
        }


    };

    const updateDataCart = (item) => {
        if (decodedToken !== null&&decodedToken!=="null") {
            const data = {
                Username: item.username,
                ProductId: item.productId,
                Name: item.name,
                Img: item.img,
                Quantity: item.quantity,
                Price: item.price
            };
            console.log("item " + JSON.stringify(data));
            axios.post(APIGATEWAY.CART.BYUSERNAME, data)
                .then(response => {
                    window.alert(response.data);
                    window.alert("Cập nhật giỏ hàng thành công");
                    window.location.reload();
                })
                .catch(error => console.error('Error adding to cart:', error));
        }
        else {
            const index = cartData.findIndex(dataItem => dataItem.productId === item.productId);
            if (index !== -1) {
                cartData[index].quantity = item.quantity;
                cartData[index].price = item.price;

                localStorage.setItem('cartData', JSON.stringify(cartData));
            }
        }
    }

    const Remove = (decodedToken,productId) => {

        if (decodedToken!== null && decodedToken !== "null") {
            axios.delete(APIGATEWAY.CART.GETBYUSERNAME + decodedToken.username + '/' + productId).then(respone => {
                console.log(APIGATEWAY.CART.GETBYUSERNAME + decodedToken.username + '/' + productId)
                if (respone.status === 200) {
                    window.alert("Xóa thành công");

                }
                else {
                    window.alert("Vui lòng thử lại sau");
                }
            }).catch(error => { window.alert("Đã xảy ra lỗi ", error) })
        }
        else if (cartData !== null) {
            cartData = cartData.filter(item => item.productId !== productId);

            localStorage.setItem('cartData', JSON.stringify(cartData));
            window.alert("Xóa thành công");
            window.location.reload();
        } else {
            return <NotFound404 />;
        }
    }



    console.log(listCart);
    if (listCart === null || listCart.length === 0) {
        return <NotFound404 />
    }
    const caculatorTotalPrice = () => {
        totalPrice = 0;
        if (listCart.length !== 0) {
            listCart.forEach(item => {
                totalPrice += item.price
            })
        }
    }

    const showFormPay = () => {

        window.alert("Bạn có muốn đặt đơn này không");
        const formorder = document.getElementById("form-order");
        const overlay = document.getElementById("overlay");
        if (formorder.style.display !== "block") {
            overlay.style.display = "block";
            formorder.style.display = "block";
        }
    }
    const handlePaymentMethod = (event) => {
        setPaymentMethod(event.target.value);
    }
    const thanhToan = (diachi, sdt) => {
        if (decodedToken !== null && decodedToken !== "null") {
            const newOrder = {
                Username: sdt,
                OrderDate: new Date().toISOString(),
                TotalPrice: totalPrice,
                Address: diachi,
                Status: "Đã đặt",
                Details: listCart.map(item => ({
                    ProductId: item.productId,
                    Name: item.name,
                    Img: item.img,
                    Quantity: item.quantity,
                    Price: item.price
                }))
            };

            setOrder(newOrder);
            console.log("info order ", order);
            handleOrderSubmission(newOrder, sdt);
        } else {
            window.alert("Đặt hàng thành công");
            localStorage.removeItem("cartData");
            window.location.reload();
        }
    };

    const handleOrderSubmission = (order, sdt) => {
        console.log("info order ", order);
        axios.post(APIGATEWAY.ORDER.CREATE, order).then(response => {
            if (response.status === 200) {
                axios.delete(`${APIGATEWAY.CART.GETBYUSERNAME}${sdt}`).then(response => {
                    if (response.status === 200) {
                        window.alert("Đặt hàng thành công");
                        window.location.reload();
                    } else {
                        window.location.reload();
                    }
                }).catch(error => {
                    console.error("Lỗi:", error);
                });
            }
        }).catch(error => {
            console.error("Lỗi:", error);
        });
    };
    const handleClick = (event) => {
        event.preventDefault();
        const diachi = document.getElementById("diachi").value;
        const sdt = document.getElementById("sdt").value;
        thanhToan(diachi, sdt);
        //window.location.reload();
    }
    return (
        <div className="cartpage">

            <div className="container">
                <div className="content">
                    <div className="row">
                        <div className="cartpage col-12">
                            <div className="top">
                                {
                                    listCart.map((item) => (
                                        <div className="item" key={item.productId}>
                                            <img src={item.img} alt={item.name} />
                                            <span>{item.name}</span>
                                            <span>{Formater(parseFloat(item.price / item.quantity))} / 1 đvt</span>
                                            <div className="btn">
                                                <button className="btn-sub" onClick={() => Sub(item)}>-</button>
                                                <input id={`lbl-num${item.productId}`} defaultValue={item.quantity} readOnly />
                                                <button className="btn-add" onClick={() => Add(item)}>+</button>
                                            </div>
                                            <span id={`totalPrice${item.productId}`}>{Formater(item.price)}</span>

                                            <button className="btn-remove" onClick={() => { Remove(decodedToken, item.productId); window.location.reload(); }}>Xóa</button>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="bottom">
                                {caculatorTotalPrice()}
                                <span className="lblTotalPrice">Tổng tiền : {Formater(totalPrice)}</span>

                                <div className="btn">
                                    <button onClick={() => window.location.href = ROUTER.USER.PRODUCT}>Tiếp tục mua sắm</button>
                                    <button onClick={(event) => {
                                        event.preventDefault();
                                        showFormPay();
                                    }
                                    }>Thanh toán</button>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div id="overlay"></div>
                    <div className="form-order" id="form-order">
                        <form>
                            <div className="cancel">
                                <button onClick={(event) => {
                                    event.preventDefault();
                                    const formorder = document.getElementById("form-order");
                                    const overlay = document.getElementById("overlay");
                                    overlay.style.display = "none";
                                    formorder.style.display = "none";
                                }}>x</button>
                            </div>
                            <h1>Thanh toán đơn hàng</h1>
                            <h2>Thông tin thanh toán</h2>
                            <div className="hoten">
                                <div>
                                    <label for="ten">Tên *</label>
                                    <input type="text" id="ten" placeholder="Nhập tên" />
                                </div>
                                <div>
                                    <label for="ho">Họ *</label>
                                    <input type="text" id="ho" placeholder="Nhập họ" />
                                </div>
                            </div>

                            <label for="diachi">Địa chỉ *</label>
                            <input type="text" id="diachi" placeholder="Nhập địa chỉ" />
                            <label for="diachi">Số điên thoại *</label>
                            <input type="tel" id="sdt" placeholder="Nhập số điên thoại" defaultValue={decodedToken!==null? decodedToken.username:""} />
                            <select id="paymentMethod" value={paymentMethod} onChange={(event) => handlePaymentMethod(event)}>
                                <option value="">Chọn phương thức thanh toán</option>
                                <option value="Chuyển khoản">Chuyển khoản</option>
                                <option value="Thanh toán khi nhận hàng">Thanh toán khi nhận hàng</option>
                            </select>

                            <span className="lblTotalPrice">Tổng tiền : {Formater(totalPrice)}</span>
                            <button className="btn" onClick={handleClick }>Đặt hàng ngay</button>
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
};

export default memo(CartUser);