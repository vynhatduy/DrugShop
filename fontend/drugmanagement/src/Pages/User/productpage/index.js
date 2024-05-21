import { memo } from 'react';
import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory, useLocation, Await } from 'react-router-dom';
import { APIGATEWAY, ROUTER } from '../../../Utils/Router';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Formater } from '../../../Utils/formater';
import axios from 'axios';
import './style.scss';
import NotFound404 from '../../NotFound404';
import { wait } from '@testing-library/user-event/dist/utils';

const ProductUser = () => {
    const { categoryId } = useParams();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchString = searchParams.get('search');
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    console.log('category ' + categoryId);
    console.log("tìm kiếm " + searchString);

    let cate = "";

    if (categoryId === 1) {
        cate = "Thuốc Kháng Sinh";
    }
    if (categoryId === 2) {
        cate = "Thuốc Ký Sinh Trùng";
    }
     if (categoryId === 3) {
        cate = "Vắc Xin";
    }
    console.log("category name", cate);

    useEffect(() => {
        fetchProducts(cate, searchString);
    }, [cate, searchString]);

    const fetchProducts = (cate, searchString) => {
        let apiUrl = "https://localhost:8001/api/Products";


        console.log('url ' + apiUrl);

        axios.get(apiUrl)
            .then(response => {
                setProducts(response.data);
                filterProducts(cate,searchString, response.data);
            })
            .catch(error => { console.error('Error fetching products:', error); return <NotFound404 />; });
    };

    const filterProducts = (cate,searchString, products) => {

        

        if (cate !== null && categoryId !== "") {
            const filter = products.filter(item => 
                item.type.toLowerCase().includes(cate.toLowerCase())
            ); 
            setFilteredProducts(filter);
        }
        if (searchString !== null && searchString !== "") {
            const filter = products.filter(item =>
                item.name.toLowerCase().includes(searchString.toLowerCase())
            );
            setFilteredProducts(filter);
            console.log(filter);
        } else {
            setFilteredProducts(products);
        }
    };

    console.log(products);
    if (products.length !== 0) {
        if (searchString !== null || searchString !== "") {
            if (filteredProducts.length === 0) {
                return <NotFound404 />;
            }
        }
        if (categoryId !== undefined) {
            if (filteredProducts.length === 0) {
                return <NotFound404 />;
            }
        }
    }

    return (
        <>
            <div className="product">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="tag">
                                <span className="active">Sản phẩm</span>
                                <MdOutlineKeyboardArrowRight className="active" />
                                <span className={categoryId !== undefined ? "active" : ""}>Danh mục : {categoryId}</span>
                                <MdOutlineKeyboardArrowRight className={categoryId !== undefined ? "active" : ""} />
                                <span className={searchString !== null ? "active" : ""}>Tên : {searchString}</span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="list-item">
                                {
                                    filteredProducts.map((item) => (
                                        <div key={item.id} className="item" >
                                            <Link to={`/chi-tiet-san-pham/${item.id}`}>
                                                <div className="img">
                                                    <img src={item.img} alt={item.name} />
                                                </div>
                                                <div className="name">
                                                    <span>{item.name}</span>
                                                </div>
                                                <p>{Formater(item.price)}</p>
                                            </Link>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                    </div>
                        
                </div>
            </div>
        </>
    );
}
export default memo(ProductUser);