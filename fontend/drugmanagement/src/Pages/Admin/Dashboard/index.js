import React, { useState, useEffect } from "react";
import './style.scss';
import { memo } from "react";
import axios from "axios";
import { APIGATEWAY } from "../../../Utils/Router";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend } from 'chart.js';
import { ArcElement } from 'chart.js';
import LoadingSpinner from "../../../Components/Loadding";
ChartJS.register(ArcElement, Tooltip, Legend);
const AdminDashBoard = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [orders, setOrders] = useState([]);

    const token = localStorage.getItem('token');
    const config = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        'admin': 'true'
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productResponse, inventoryResponse, ordersResponse] = await Promise.all([
                    axios.get(`${APIGATEWAY.PRODUCT.GETALL}`, { headers: config }),
                    axios.get(`${APIGATEWAY.INVENTORY.GETALL}`, { headers: config }),
                    axios.get(`${APIGATEWAY.ORDER.GETALL}/admin`, { headers: config })
                ]);

                setProducts(productResponse.data);
                setInventory(inventoryResponse.data);
                setOrders(ordersResponse.data);
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [token]);

    if (isLoading) {
        return <LoadingSpinner />;
    }
    
    const generateRandomColors = (count) => {
        const colors = [];
        for (let i = 0; i < count; i++) {
            colors.push(`rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`);
        }
        return colors;
    };

    const inventoryData = {
        labels: products.map(product => product.name),
        datasets: [{
            label: 'Quantity Remaining',
            data: products.map(product => {
                const inventoryItem = inventory.find(item => item.productId === product.id);
                return inventoryItem ? inventoryItem.quantity : 0;
            }),
            backgroundColor: generateRandomColors(products.length),
            borderColor: 'rgba(255, 255, 255, 1)',
            borderWidth: 1,
        }]
    };

    const salesData = {
        labels: products.map(product => product.name),
        datasets: [{
            label: 'Sales',
            data: products.map(product => {
                const inventoryItem = inventory.find(item => item.productId === product.id);
                return inventoryItem ? inventoryItem.sales : 0;
            }),
            backgroundColor: generateRandomColors(products.length),
            borderColor: 'rgba(255, 255, 255, 1)',
            borderWidth: 1,
        }]
    };

    const orderDataByUser = orders.reduce((acc, order) => {
        acc[order.username] = (acc[order.username] || 0) + 1;
        return acc;
    }, {});

    const ordersData = {
        labels: Object.keys(orderDataByUser),
        datasets: [{
            label: 'Number of Orders',
            data: Object.values(orderDataByUser),
            backgroundColor: generateRandomColors(Object.keys(orderDataByUser).length),
            borderColor: 'rgba(255, 255, 255, 1)',
            borderWidth: 1,
        }]
    };

    return (
        <div className="dashboard-page">
            <div className="chart-container">
                {inventory.length <= 0 ? <p>Không có dữ liệu sản phẩm</p> : <>
                    <h2>Số lượng sản phẩm trong kho</h2>
                    <Pie data={inventoryData} />
                </>}
            </div>
            <div className="chart-container">
                {products.length <= 0 ? <p>Không có dữ liệu về số lượng đã bán</p> : <>
                    <h2>Số lượng đã bán</h2>
                    <Pie data={salesData} />
                </>}
            </div>
            <div className="chart-container">
                {orders.length <= 0 ? <p>Không có dữ liệu người mua</p> : <>
                    <h2>Người mua</h2>
                    <Pie data={ordersData} />
                </>}
            </div>
        </div>
    );
};

export default memo(AdminDashBoard);