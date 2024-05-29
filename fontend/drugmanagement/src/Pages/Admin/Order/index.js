import React, { useState, useEffect } from "react";
import './style.scss';
import { memo } from "react";
import axios from "axios";
import { APIGATEWAY } from "../../../Utils/Router";
import { Formater } from "../../../Utils/formater";
import { MdCancel } from "react-icons/md";
import LoadingSpinner from "../../../Components/Loadding/index";

const AdminOrder = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [selectAll, setSelectAll] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedOrders, setSelectedOrders] = useState(null);
    const [isLoadding, setIsLoadding] = useState(true);

    const token = localStorage.getItem('token');
    const config = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        'admin': 'true'
    }
    useEffect(() => {
        if (isLoadding) {
            axios.get(`${APIGATEWAY.ORDER.GETALL}/admin`, {
                headers: config
            }).then(respone => {
                setOrders(respone.data);
                setFilteredOrders(respone.data);
            }).catch(error => {
                console.log("Lỗi ", error);
            }).finally(e => {
                setIsLoadding(false);
            })
        }
    }, [isLoadding]);

    console.log("data", orders);
    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
        setFilteredOrders((prevProducts) =>
            [...prevProducts].sort((a, b) => {
                if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
                if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
                return 0;
            })
        );
    };

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
    };

    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);
        const filtered = orders.filter((item) =>
            item.username.toLowerCase().includes(value) ||
            item.orderDate.includes(value)
        );
        setFilteredOrders(filtered);
    };

    const handleUpdate = (username, orderDate) => {
        axios.put(`${APIGATEWAY.ORDER.GETALL}/admin`, null, {
            params: {
                username: username,
                orderDate: orderDate
            },
            headers: config
        }).then(response => {
            if (response.status === 200) {
                window.alert("Cập nhật trạng thái đơn hàng thành công");
                window.location.reload();
            } else {
                window.alert("Không thể cập nhật trạng thái đơn hàng");
            }
        }).catch(error => {
            window.alert("Lỗi khi thực hiện cập nhật trạng thái đơn hàng");
        });
    };

    const handleRightClick = (item) => {
        setSelectedOrders(item);
    };

    const handleCancel = () => {
        setSelectedOrders(null);
    };


    return (
        <div className="admin-page">
            <header className="header">
                <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    className="search-input"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </header>
            {isLoadding ? <LoadingSpinner /> : <>
                <div className="content">
                    <div className="table">
                        <div className="table-header">
                            <div className="table-row">
                                <div className="table-cell">
                                    <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                                </div>
                                <div className="table-cell sortable" onClick={() => handleSort('username')}>Tên người dùng</div>
                                <div className="table-cell sortable" onClick={() => handleSort('orderDate')}>Ngày tạo</div>
                                <div className="table-cell sortable" onClick={() => handleSort('totalPrice')}>Tổng giá</div>
                                <div className="table-cell">Địa chỉ</div>
                                <div className="table-cell">Trạng thái</div>
                                <div className="table-cell sortable" onClick={() => handleSort('totalPrice')}>Hành động</div>
                            </div>
                        </div>
                        <div className="table-body">
                            {filteredOrders.map((item) => (
                                <div key={item.id} className="table-row" onContextMenu={(e) => { e.preventDefault(); handleRightClick(item); }}>
                                    <div className="table-cell">
                                        <input type="checkbox" checked={selectAll} />
                                    </div>
                                    <div className="table-cell">{item.username}</div>
                                    <div className="table-cell">{item.orderDate}</div>
                                    <div className="table-cell">{Formater(item.totalPrice)}</div>
                                    <div className="table-cell">{item.address}</div>
                                    <div className="table-cell">{item.status}</div>
                                    {item.status.toLowerCase().trim() !== "chờ duyệt" ? <div className="table-cell"></div> : <div className="table-cell">
                                        <button onClick={() => handleUpdate(item.username, item.orderDate)}>Duyệt</button>
                                    </div>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {selectedOrders && (
                    <div className="product-details-modal">
                        <div className="modal-content">
                            <div className="btn-cancel"><button onClick={handleCancel}><MdCancel /></button></div>
                            <h3>Chi tiết sản phẩm</h3>
                            {selectedOrders.details.map((detail, index) => (
                                <div key={index} className="product-detail">
                                    <img src={detail.img} alt={detail.name} className="product-image" />
                                    <p>Tên sản phẩm: {detail.name}</p>
                                    <p>Giá: {detail.price} VND</p>
                                    <p>Số lượng: {detail.quantity}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </>}
        </div>
    );
};
export default memo(AdminOrder);