import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';
import { APIGATEWAY } from './Router';

function GetDataProduct({ categoryId }) {
    const [products, setProducts] = useState(null);
    useEffect(() => {
        fetchProducts(categoryId);
    }, [categoryId]);
    const fetchProducts = (categoryId) => {
        var apiUrl = "";
        if (categoryId === null) {
            apiUrl = APIGATEWAY.PRODUCT.GETALL;
        }
        else {
            apiUrl = APIGATEWAY.PRODUCT.BYCATEGORYID + categoryId;
        }
        console.log(apiUrl);
        if (apiUrl !== null) {

            fetch(apiUrl).then(respone => respone.json()).then(data => {
                setProducts(data);
            })
                .catch(error => console.error("Lỗi:", error));
        }
    };
    return products;
}