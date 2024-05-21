import { memo, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./style.scss"
import { AiOutlineFacebook, AiOutlineInstagram, AiOutlineYoutube, AiOutlineUser, AiOutlineMail, AiOutlineShoppingCart, AiOutlineMenu } from "react-icons/ai";
import { Formater } from "../../../../Utils/formater";
import { APIGATEWAY, ROUTER } from "../../../../Utils/Router";
import Logo from "../../../../Assest/Images/logo.svg";
import { DecodeToken } from "../../../../Utils/DecodeToken";
import axios from "axios";
const Hearder = () => {
    const token = localStorage.getItem('token');
    let totalQuantity = 0;
    let decodeToken = null;
    if (token !== null && token !== undefined && token !== "" &&token!=="null") {
        decodeToken = DecodeToken(token);
    }
    const [isShowCategory, setShowCategory] = useState(false);
    const [currentPage, setCurrentPage] = useState();

    const [menus, setMenu] = useState([
        {
            name: "Trang chủ",
            path: "/home"
        },
        {
            name: "Sản phẩm",
            path: ROUTER.USER.PRODUCT,
            isShowSubmenu: false,
            child: [
                {
                    name: "Thuốc Kháng Sinh",
                    path: "/san-pham/byCategoryId/1"
                },
                {
                    name: "Thuốc Ký Sinh Trùng",
                    path: "/san-pham/byCategoryId/2"
                },
                {
                    name: "Vắc Xin",
                    path: "/san-pham/byCategoryId/3"
                }
            ]
        },
        {
            name: "Liên hệ",
            path: ROUTER.USER.CONTACT
        }
    ])
    const location = useLocation();
    useEffect(() => {
        const path = location.pathname;
        const currentPageKey = menus.findIndex(menu => menu.path === path);
        setCurrentPage(currentPageKey === 0 ? 0 : currentPageKey);
    }, [location.pathname, menus]);

    const GetData = (token) => {
        
        if (token !== null && token !== undefined && token !== ""&&token!=="null") {
            return;
        }
        else {
            window.location.href = ROUTER.AUTHEN.LOGIN;
        }
    }
    const getTotalQuantity = () => {
        if (token !== null && token !== undefined && token !== "" && token !== "null"&&decodeToken!==null) {
            const username = decodeToken.username;
            axios.get(`${APIGATEWAY.CART.GETBYUSERNAME}${username}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            }).then(response => {
                response.data.forEach(item => {
                    totalQuantity += item.quantity;
                });
                upDateWidget(totalQuantity);
            })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
        else {
            const cartData = JSON.parse(localStorage.getItem("cartData"));
            if (cartData !== null) {
                cartData.forEach(item => {
                    totalQuantity += item.quantity;
                });
            }
        }
        upDateWidget(totalQuantity);
    }
    function upDateWidget(totalQuantity) {
        const widget_cart = document.getElementById("total-cart");
        if (widget_cart) {
            widget_cart.textContent = totalQuantity;
        }
    }

    return (

        <>
            <div className="hearder-top">
                <div className="container">
                    <div className="row">
                        <div className="col-3 header-top-left">
                            
                        </div>
                        <div className="col-9 header-top-right">
                            <ul>
                                <li>
                                    <Link to={"https://facebook.com/1234567890"} target="_blank">
                                        <AiOutlineFacebook />
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"https://instagram.com/1234567890"} target="_blank">
                                        <AiOutlineInstagram />
                                    </Link>

                                </li>
                                <li>
                                    <Link to={"https://www.youtube.com/123456790"} target="_blank">
                                        <AiOutlineYoutube />
                                    </Link>
                                </li>
                                <li>
                                    <Link onClick={(event) => { event.preventDefault(); GetData(token); } } target="_blank">
                                        <AiOutlineUser />
                                        <span className="lbl_user" id="lbl_user">{decodeToken!==null ? decodeToken.username  : "Đăng nhập"}</span>
                                    </Link>
                                    <div className="container-sub-menu">

                                        <div className={token !== null && token !== "null" && token !== undefined && decodeToken !== null ? "sub-menu visible" : "sub-menu hidden"} >
                                            <Link to={ROUTER.USER.PROFILE}>Thông tin cá nhân</Link>
                                            <Link to={ROUTER.USER.ORDER}>Lịch sử đơn hàng</Link>
                                            <Link onClick={(event) => { event.preventDefault(); localStorage.setItem('token', null); window.location.href="/home"; } }>Đăng xuất</Link>
                                        </div></div>
                                </li>
                            </ul>
                        </div>
                    </div>


                </div>
            </div>
            <div className="container" style={{ marginTop: 50 + "px", position: "sticky", top: 0 + "px", background: "#c9e5df",borderRadius:10+"px" }}>

                <div className="row">
                    <div className="content">
                        <div className="col-xl-3 col-lg-3 ">
                            <div className="header-logo">
                                <Link to={ROUTER.USER.HOME}>
                                    <img src={Logo} alt="Logo Drug SHOP" />
                                    <h1>Drug SHOP</h1>
                                </Link>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 ">

                            <nav className="header-menu">
                                <ul>
                                    {
                                        menus?.map((menu, menuKey) => (
                                            <li key={menuKey} className={currentPage === menuKey ? "active" : ""}>
                                                <Link to={menu.path}>
                                                    {menu?.name}
                                                </Link>
                                                {
                                                    menu.child && (
                                                        < ul className="header-menu-dropdown">
                                                            {
                                                                menu.child.map((childItem, childKey) => (

                                                                    <li key={`${menuKey}-${childKey}`}>
                                                                        <Link to={childItem.path} >
                                                                            {childItem.name}
                                                                        </Link>
                                                                    </li>
                                                                ))
                                                            }
                                                        </ul>
                                                    )
                                                }
                                            </li>
                                        ))
                                    }
                                </ul>
                            </nav>

                        </div>
                        <div className="col-xl-3 col-lg-3 ">
                            <div className="header-cart">
                                <div className="header-cart-price">
                                    <span>{Formater(0)}</span>
                                </div>
                                <ul>
                                    <li>
                                        <Link to={ROUTER.USER.CART }>
                                            <AiOutlineShoppingCart />
                                            <span id="total-cart">{ getTotalQuantity()}</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row hero-category-container" >
                    <div className="col-3 hero-category">
                        <div className="hero-category-all" onClick={() => setShowCategory(!isShowCategory)}>
                            <AiOutlineMenu />
                            Danh mục sản phẩm
                        </div>

                        {isShowCategory && (
                            <ul className={isShowCategory ? "" : "hidden"}>
                                {menus[1].child.map((category, index) => (
                                    <li key={index}>
                                        <Link to={category.path} >
                                            {category.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="col-9 hero-search-container">
                        <div className="hero-search">
                            <div className="hero-search-form">
                                <form id="searchForm">
                                    <input id="search" type="text" name="search" placeholder="Nhập tên sản phẩm muốn tìm" />

                                    <button id="btn_submit" type="submit">Tìm kiếm</button>
                                    {
                                        document.addEventListener('DOMContentLoaded', function () {
                                            const searchForm = document.getElementById("searchForm");
                                            const text = document.getElementById("search");
                                            searchForm.addEventListener("submit", function (event) {
                                                event.preventDefault();
                                                const searchString = text.value.trim();
                                                if (searchString !== "") {
                                                    window.location.href = `/san-pham/${searchString}`;
                                                }
                                            })
                                        })
                                    }
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>

    )
};

export default memo(Hearder);