import { memo, useState, useEffect } from "react";
import './style.scss';
import { Bar } from 'react-chartjs-2'; // Ensure this is imported correctly from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from "axios";
import { APIGATEWAY } from "../../../Utils/Router";
import LoadingSpinner from '../../../Components/Loadding/index';
import User from "../User";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminReport = () => {
    const [productReports, setProductReports] = useState([]);
    const [userReports, setUserReports] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const token = localStorage.getItem('token');
    const config = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        'admin': 'true'
    }

    useEffect(() => {
        const fetchData = async () => {
            if (isLoading) {
                try {
                    const [productResponse, inventoryResponse,orderRespone] = await Promise.all([
                        axios.get(`${APIGATEWAY.PRODUCT.GETALL}`, { headers: config }),
                        axios.get(APIGATEWAY.INVENTORY.GETALL, { headers: config }),
                        axios.get(`${APIGATEWAY.ORDER.GETALL}/admin`, { headers: config })
                    ]);

                    const products = productResponse.data;
                    const inventory = inventoryResponse.data;
                    const order = orderRespone.data;

                    const combinedData = products.map(product => {
                        const inventoryItem = inventory.find(item => item.productId === product.id);
                        return {
                            name: product.name,
                            sales: inventoryItem ? inventoryItem.sales : 0
                        };
                    });
                    const orderCounts = order.reduce((acc, item) => {
                        if (!acc[item.username]) {
                            acc[item.username] = 0
                        }
                        acc[item.username]++;
                        return acc;
                    }, {});
                    const userOderCounts = Object.keys(orderCounts).map(username => ({
                        name: username,
                        orders: orderCounts[username]
                    }));
                    setProductReports(combinedData);
                    setUserReports(userOderCounts);
                } catch (error) {
                    console.error("Error fetching data", error);
                    alert("Có lỗi xảy ra khi tải dữ liệu, vui lòng thử lại.");
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchData();
    }, [token, isLoading]);

    const productData = {
        labels: productReports.map(report => report.name),
        datasets: [{
            label: 'Đã bán',
            data: productReports.map(report => report.sales),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        }]
    };

    const userData = {
        labels: userReports.map(report => report.name),
        datasets: [{
            label: 'Số lượng đơn hàng',
            data: userReports.map(report => report.orders),
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
        }]
    };

    return (
        <div className="report-page">
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <div className="chart-container">
                        <h2>Sản phẩm đã bán</h2>
                        <Bar data={productData} />
                    </div>
                    <div className="chart-container">
                        <h2>Người mua</h2>
                        <Bar data={userData} />
                    </div>
                    <div className="table-container">
                            <h2>Sản phẩm đã bán</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Tên sản phẩm</th>
                                    <th>Số lượng đã bán</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productReports.map((report, index) => (
                                    <tr key={index}>
                                        <td>{report.name}</td>
                                        <td>{report.sales}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="table-container">
                            <h2>Người mua</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Tên người dùng</th>
                                    <th>Số lượng đơn hàng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userReports.map((report, index) => (
                                    <tr key={index}>
                                        <td>{report.name}</td>
                                        <td>{report.orders}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default memo(AdminReport);