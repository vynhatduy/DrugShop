import { useEffect, useRef } from 'react';
import { memo, useState } from 'react';
import { Await, json, useParams } from 'react-router-dom';
import { APIGATEWAY, ROUTER } from '../../../Utils/Router';
import axios from 'axios';
import NotFound404 from '../../NotFound404';
import { TbCalendarClock } from "react-icons/tb";
import { Formater } from '../../../Utils/formater';
import { FaShippingFast } from 'react-icons/fa';
import { MdAddShoppingCart } from 'react-icons/md';
import './style.scss';
import { DecodeToken } from '../../../Utils/DecodeToken';


const ProductDeltailUser = () => {
    const [list, setList] = useState([]);
    const [cate, setCate] = useState([]);
    const { productId } = useParams();
    const token = localStorage.getItem('token');
    let decodeToken = null;
    if (token !== null && token !== "null" && token !== "" && token !== undefined) {
        decodeToken = DecodeToken(token);
    }
    
    console.log(productId);
    useEffect(() => {
        fetchProduct(productId);
        fetchCate(productId);
    }, [productId])
    const fetchProduct = (productId) => {
        let apiUrl = APIGATEWAY.PRODUCT.BYID + productId;
        console.log(apiUrl);

        axios.get(apiUrl).then(respone => {

            setList(Array(respone.data));
        }
        ).catch(error => console.error('Error fetching products:', error));
    }
    const fetchCate = (productId) => {
        let apiUrl = APIGATEWAY.INVENTORY.BYID + productId;
        console.log(apiUrl);
        axios.get(apiUrl).then(respone => {
            setCate(Array(respone.data));
        }).catch(error => { console.error('Error fetching products:', error); return <NotFound404 />; });
    }


    const handleClickSub = () => {
        const lblElement = document.getElementById("lbl");
        if (lblElement !== null) {
            let lbl = parseInt(lblElement.value, 10);
            if (lbl > 0) {
                lblElement.value = lbl - 1;
            }
        }
    }

    const handleClickAdd = () => {
        const lblElement = document.getElementById("lbl");
        if (lblElement !== null) {
            let lbl = parseInt(lblElement.value, 10);
            if (lbl < 100) {
                lblElement.value = lbl + 1;
            }
        }
    }
    const addToCart = (productId,img, name, price) => {

        const lblNumElement = document.getElementById("lbl");

        if (lblNumElement) {
            let lbl = parseInt(lblNumElement.value, 10);
            price = parseFloat(lbl * price);
            console.log("gia " + price);
            console.log("ten " + name);
            console.log("so luong " + lbl);
            if (lbl > 0) {
                console.log("Đã thêm vào giỏ hàng");

                if (token !== null && token !== "null" && token !== "" & token !== undefined &&decodeToken!==null) {
                    const username = decodeToken.username;
                    console.log(token);
                    console.log(username);

                    const data = {
                        Username: username,
                        ProductId: productId,
                        Name: name,
                        Img:img,
                        Quantity: lbl,
                        Price: price
                    };
                    console.log("item " + JSON.stringify(data));
                    axios.post(APIGATEWAY.CART.BYUSERNAME, data)
                        .then(response => {
                            window.alert(response.data);
                            window.alert("Đã thêm vào giỏ hàng");
                            window.location.reload();
                        })
                        .catch(error => console.error('Error adding to cart:', error));
                } else {
                    let cartData = localStorage.getItem('cartData');
                    if (!cartData) {
                        cartData = [];
                    } else {
                        cartData = JSON.parse(cartData);
                    }
                    const existingProductIndex = cartData.findIndex(item => item.productId === productId);
                    if (existingProductIndex !== -1) {
                        cartData[existingProductIndex].quantity += lbl;
                        cartData[existingProductIndex].price += price;
                        window.alert("Đã thêm vào giỏ hàng");
                        window.location.reload();
                    } else {
                        const data = {
                            productId: productId,
                            name: name,
                            quantity: lbl,
                            img: img,
                            price: price
                        };
                        console.log("item " + JSON.stringify(data));
                        cartData.push(data);
                        window.alert("Đã thêm vào giỏ hàng");
                        window.location.reload();
                    }
                    localStorage.setItem('cartData', JSON.stringify(cartData));

                }
            } else {
                window.alert("Vui lòng thêm số lượng và thử lại");
            }
        } else {
            window.alert("Đã xảy ra lỗi vui lòng thử lại sau");
        }
    };


    const orderNow = () => {
        const lblElement = document.getElementById("lbl");
        if (lblElement !== null) {
            let lbl = parseInt(lblElement.value, 10);
            if (lbl > 0) {
                console.log("Bạn chắc chắn muốn mua sản phẩm này chứ ?");
                const confirmed = window.confirm("Bạn chắc chắn muốn mua sản phẩm này chứ ?");
                if (confirmed) {
                    window.alert("Đặt hàng thành công");
                    window.location.href = ROUTER.USER.ORDER;
                }
            }
            else {
                window.alert("Vui lòng thêm số lượng và thử lại");
            }
        }
        else {
            window.alert("Đã xảy ra lỗi vui lòng thử lại sau");
        }

    }

    return (
        <div className="container">
            <div className="product-detail">
                <div className="info">
                {
                    list.map((item) => (
                        <div className="row" key={item.id}>
                            <div className="col-5">
                                <div className="img">
                                    <img src={item.img} alt={item.name} />
                                </div>
                            </div>

                            <div className="col-7">
                                <h1 id="ten">{item.name}</h1>
                                <span>{item.description}</span>
                                {
                                    cate.map((itemData) => (
                                        <div className="heading" key={itemData.key}>
                                            <span>Số lượng : {item.quantity}    |    Đã bán : {item.sales}</span>
                                        </div>
                                    ))
                                }
                                <h2 id="gia">{Formater(item.price)}</h2>
                                <div className="content">
                                    <span>Vận Chuyển</span>
                                    <div>
                                        <p><TbCalendarClock /> Hàng Đặt Trước (có hàng sau 15 ngày)</p>
                                        <p><FaShippingFast /> Miễn phí vận chuyển</p>
                                        <p> Vận Chuyển: Toàn quốc</p>
                                        <p> Phí Vận Chuyển: 0đ</p>
                                    </div>
                                </div>
                                <div className="add-to-cart">
                                    <span>Số lượng:</span>
                                    <div className="btn">
                                        <button id="btn-sub" onClick={handleClickSub}> - </button>
                                        <div className="input"><input type="number" id="lbl" defaultValue="0" readOnly /></div>
                                        <button id="btn-add" onClick={handleClickAdd}> + </button>
                                    </div>
                                </div>
                                <div className="btn-addtocart">
                                    <button id="add-to-cart" className="add-cart" onClick={() => addToCart(item.id,item.img, item.name, item.price)} ><MdAddShoppingCart /> Thêm vào giỏ hàng</button>
                                    <button id="order-now" className="order-now" onClick={orderNow}>Mua Ngay</button>
                                </div>
                            </div>
                        </div>
                    ))
                    }
                </div>
            </div>

        </div>

    );

}
export default memo(ProductDeltailUser);