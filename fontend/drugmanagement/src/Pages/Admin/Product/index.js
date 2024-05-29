import React, { useState, useEffect } from "react";
import './style.scss';
import { memo } from "react";
import axios from "axios";
import { APIGATEWAY } from "../../../Utils/Router";
import LoadingSpinner from "../../../Components/Loadding";

const AdminProduct = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [selectAll, setSelectAll] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isLoadding, setIsLoadding] = useState(true);
    const token = localStorage.getItem('token');
    useEffect(() => {
        // Fetch products data
        if (isLoadding) {
            axios.get(APIGATEWAY.PRODUCT.GETALLADMIN, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                    'admin': 'true'
                }
            }).then(respone => {

                setProducts(respone.data);
                setFilteredProducts(respone.data);
            }).catch(error => {
                console.log("Error", error);
            }).finally(e => {
                setIsLoadding(false);
                console.log("product", products);
            });
        }
    }, [isLoadding, token]);

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
        setFilteredProducts((prevProducts) =>
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
        const filtered = products.filter((product) =>
            product.name.toLowerCase().includes(value) ||
            product.description.toLowerCase().includes(value) ||
            product.type.toLowerCase().includes(value)
        );
        setFilteredProducts(filtered);
    };

    const handleDelete = (id) => {
            axios.delete(`${APIGATEWAY.PRODUCT.GETALL}/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                    'admin': 'true'
                }
            }).then(respone => {
                if (respone.status === 200) {
                    window.alert("Đã xóa sản phẩm");
                    window.location.reload();
                    return;
                }
                else {
                    window.alert("Lỗi xóa sản phẩm không thành công");
                    return;
                }
            }).catch(error => {
                window.alert("Lỗi xóa sản phẩm");
                return;
            })
        
    };

    const handleRightClick = (product) => {
        setSelectedProduct(product);
    };

    const handleCancel = () => {
        setSelectedProduct(null);
    };

    const handleSave = (name:string, description:string, type:string, img:string, price:int, quantity:int, sales:int) => {
        
            if (selectedProduct.id) {
                // Update product

                const data = {
                    id: selectedProduct.id,
                    name: name,
                    description: description,
                    type: type,
                    img: img,
                    price: price,
                    quantity: quantity,
                    sales: sales
                }
                axios.put(`${APIGATEWAY.PRODUCT.GETALL}/${selectedProduct.id}`, data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                        'admin': 'true'
                    }
                }).then(respone => {
                    if (respone.status === 200) {
                        window.alert("Cập nhật sản phẩm thành công");
                        window.location.reload();
                        return;
                    }
                    else {
                        window.alert("Lỗi cập nhật sản phẩm thất bại", respone.status);
                        return;
                    }
                }).catch(error => {
                    window.alert("Lỗi cập nhật sản phẩm ", error);
                    return;
                })
            } else {
                const data = {
                    id: products.length + 1,
                    name: name,
                    description: description,
                    type: type,
                    img: img,
                    price: price,
                    quantity: quantity,
                    sales: sales
                }
                axios.post(APIGATEWAY.PRODUCT.GETALL, data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                        'admin': 'true'
                    }

                }).then(respone => {
                    console.log("respone", respone.status);
                    if (respone.status === 200) {
                        window.alert("Thêm thành công sản phẩm ");
                        window.location.reload();
                        return;
                    }
                    else {
                        window.alert("Lỗi thêm sản phẩm ", respone.status);
                        return;
                    }
                }).catch(error => {
                    window.alert("Lỗi thêm sản phẩm ", error);
                    return;
                })
            }
        
    };

    const handleAddProduct = () => {
        setSelectedProduct({
            id: null,
            name: "",
            description: "",
            type: "",
            img: "",
            price: 0,
            quantity: 0,
            sales: 0
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedProduct({ ...selectedProduct, [name]: value });
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
                <button className="add-button" onClick={handleAddProduct}>Thêm</button>
            </header>
            {isLoadding ? <LoadingSpinner /> : <>
                <div className="content">
                    <div className="table">
                        <div className="table-header">
                            <div className="table-row">
                                <div className="table-cell">
                                    <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                                </div>
                                <div className="table-cell sortable" onClick={() => handleSort('id')}>ID</div>
                                <div className="table-cell sortable" onClick={() => handleSort('name')}>Tên</div>
                                <div className="table-cell">Mô tả</div>
                                <div className="table-cell">Loại</div>
                                <div className="table-cell">Hình ảnh</div>
                                <div className="table-cell sortable" onClick={() => handleSort('price')}>Giá</div>
                                <div className="table-cell">Số lượng</div>
                                <div className="table-cell">Đã bán</div>
                                <div className="table-cell">Hành động</div>
                            </div>
                        </div>
                        <div className="table-body">
                            {filteredProducts.map((product) => (
                                <div key={product.id} className="table-row" onContextMenu={(e) => { e.preventDefault(); handleRightClick(product); }}>
                                    <div className="table-cell">
                                        <input type="checkbox" checked={selectAll} />
                                    </div>
                                    <div className="table-cell">{product.id}</div>
                                    <div className="table-cell">{product.name}</div>
                                    <div className="table-cell">{product.description}</div>
                                    <div className="table-cell">{product.type}</div>
                                    <div className="table-cell">
                                        <img src={product.img} alt={product.name} className="product-img" />
                                    </div>
                                    <div className="table-cell">{product.price}</div>
                                    <div className="table-cell">{product.quantity}</div>
                                    <div className="table-cell">{product.sales}</div>
                                    <div className="table-cell">
                                        <button onClick={() => handleDelete(product.id)}>Xóa</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {selectedProduct && (
                    <div className="product-details-modal">
                        <div className="modal-content">
                            <h3>Chi tiết sản phẩm</h3>
                            <label>
                                Tên:
                                <input type="text" name="name" id="name" value={selectedProduct.name} onChange={handleInputChange} />
                            </label>
                            <label>
                                Mô tả:
                                <input type="text" name="description" id="description" value={selectedProduct.description} onChange={handleInputChange} />
                            </label>
                            <label>
                                Loại:
                                <input type="text" name="type" id="type" value={selectedProduct.type} onChange={handleInputChange} />
                            </label>
                            <label>
                                Đường dẫn hình ảnh:
                                <input type="text" name="img" id="img" value={selectedProduct.img} onChange={handleInputChange} />
                            </label>
                            <label>
                                Giá:
                                <input type="number" name="price" id="price" value={selectedProduct.price} onChange={handleInputChange} />
                            </label>
                            <label>
                                Số lượng:
                                <input type="number" name="quantity" id="quantity" value={selectedProduct.quantity} onChange={handleInputChange} />
                            </label>
                            <label>
                                Đã bán:
                                <input type="number" name="sales" id="sales" value={selectedProduct.sales} onChange={handleInputChange} />
                            </label>
                            <div className="modal-buttons">
                                <button onClick={handleCancel}>Hủy</button>
                                <button onClick={() => {
                                    var name = document.getElementById("name").value;
                                    var description = document.getElementById("description").value;
                                    var type = document.getElementById("type").value;
                                    var img = document.getElementById("img").value;
                                    var price = document.getElementById("price").value;
                                    var quantity = document.getElementById("quantity").value;
                                    var sales = document.getElementById("sales").value;
                                    handleSave(name, description, type, img, price, quantity, sales);
                                }
                                }>Lưu</button>
                            </div>
                        </div>
                    </div>
                )}
            </>}
        </div>
    );
};

export default memo(AdminProduct);
