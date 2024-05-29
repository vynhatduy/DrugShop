import { memo, useState, useEffect } from "react";
import "./style.scss";
import axios from "axios";
import { APIGATEWAY } from "../../../Utils/Router";
import LoadingSpinner from "../../../Components/Loadding";

const AdminUser = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [selectAll, setSelectAll] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [addnewUser, setAddnewUser] = useState(null);
    const [isLoadding, setIsLoadding] = useState(true); // Sửa lỗi setIsLoadding thành true
    const token = localStorage.getItem('token');
    const config = {
        'Content-Type': "application/json",
        'Authorization': "Bearer", token,
        'admin': true
    };

    useEffect(() => {
        if (isLoadding) {
            axios.get(APIGATEWAY.USER.GETALL, {
                headers: config
            }).then(respone => {
                setUsers(respone.data);
                setFilteredUsers(respone.data);
            }).catch(error => {
                console.log("Error", error);
            }).finally(() => {
                setIsLoadding(false);
            });
        }
    }, [isLoadding, token]); 

    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);
        const filtered = users.filter((item) =>
            item.name.toLowerCase().includes(value) ||
            item.username.toLowerCase().includes(value)
        );
        setFilteredUsers(filtered);
    };

    const handleAddUser = () => {
        setAddnewUser({
            Username: "",
            Password: "",
            Name: "",
            Address: "",
            RoleName:""
        });
    };

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
    };

    const handleSort = (key) => {
        let direction = "ascending";
        if (sortConfig.key === key && sortConfig.direction === "ascending") {
            direction = "descending";
        }
        setSortConfig({ key, direction });
        setFilteredUsers((prev) =>
            [...prev].sort((a, b) => {
                if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
                if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
                return 0;
            })
        );
    };

    const handleRightClick = (item) => {
        item.roleId === 1 ? item.roleName = "Admin" : item.roleId === 2 ? item.roleName = "Manager" : item.roleName = "User";
        setSelectedUser(item);
    };

    const handleDelete = (username) => {
        axios.delete(`${APIGATEWAY.USER.GETALL}/${username}`, {
            headers: config
        }).then(respone => {
            if (respone.status === 200) {
                window.alert("Đã xóa thành công");
                window.location.reload();
            }
            else {
                window.alert("Đã xóa không thành công");
            }
        }).catch(error => {
            window.alert("Đã xảy ra lỗi trong quá trình xóa");
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedUser({ ...selectedUser, [name]: value });
    };
    const handleAddInputChange = (e) => {
        const { name, value } = e.target;
        setAddnewUser({ ...addnewUser, [name]: value });
    };

    const handleCancel = () => {
        setSelectedUser(null);
        setAddnewUser(null);
    };
    const handleSaveUpdate = () => {
        console.log("selected", selectedUser);
            const data = {
                userId: selectedUser.userId,
                username: selectedUser.username,
                passwordHash: selectedUser.passwordHash,
                passwordSalt: selectedUser.passwordSalt,
                name: selectedUser.name,
                address: selectedUser.address,
                roleId: selectedUser.roleName.toLowerCase() === "admin" ? 1 : selectedUser.roleName.toLowerCase() === "manager" ? 2 : 3
            }
            axios.put(`${APIGATEWAY.USER.GETALL}/admin/${selectedUser.username}`, data, {
                headers: config
            }).then(respone => {
                if (respone.status === 200) {
                    window.alert("Đã cập nhật dữ liệu người dùng ", selectedUser.username);
                    window.location.reload();
                }
                else {
                    window.alert("Dữ liệu người dùng chưa được hoàn tất", selectedUser.username);
                }
            }).catch(error => {
                window.alert("Xảy ra lỗi trong quá trình thực thi ", error);
            })
                .finally(e => {
                    setSelectedUser(null);
                })
    }
    const handleSaveAdd = () => {
        console.log("addnewUser", addnewUser);
            const data = {
                Username: addnewUser.Username,
                Password: addnewUser.Password,
                Name: addnewUser.Name,
                Address: addnewUser.Address,
                RoleId: addnewUser.RoleName.toLowerCase() === "admin" ? 1 : addnewUser.RoleName.toLowerCase() === "manager" ? 2 : 3
            };
            console.log("data new User",data);
            axios.post(`${APIGATEWAY.USER.GETALL}/admin/${addnewUser.Username}`, data, {
                headers: config
            }).then(respone => {
                if (respone.status === 200) {
                    window.alert("Đã thêm người dùng ", addnewUser.username);
                    window.location.reload();
                }
                else {
                    window.alert("Không thể thêm người dùng vui lòng kiểm tra lại Username và Password");
                }
            }).catch(error => {
                window.alert("Đã xảy ra lỗi trong quá trình thêm người dùng");
            }).finally(e => {
                setAddnewUser(null);
            });
            return;
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
                <button className="add-button" onClick={handleAddUser}>Thêm</button>
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
                                <div className="table-cell">Địa chỉ</div>
                                <div className="table-cell sortable" onClick={() => handleSort('username')}>Tên đăng nhập</div>
                                <div className="table-cell">Mật khẩu băm</div>
                                <div className="table-cell">Chuỗi băm</div>
                                <div className="table-cell sortable" onClick={() => handleSort('roleName')}>Quyền người dùng</div>
                                <div className="table-cell">Hành động</div>
                            </div>
                        </div>
                        <div className="table-body">
                            {filteredUsers.map((item) => (
                                <div key={item.id} className="table-row" onContextMenu={(e) => { e.preventDefault(); handleRightClick(item); }}>
                                    <div className="table-cell">
                                        <input type="checkbox" checked={selectAll} />
                                    </div>
                                    <div className="table-cell">{item.userId}</div>
                                    <div className="table-cell">{item.name}</div>
                                    <div className="table-cell">{item.address}</div>
                                    <div className="table-cell">{item.username}</div>
                                    <div className="table-cell">{item.passwordHash}</div>
                                    <div className="table-cell">{item.passwordSalt}</div>
                                    <div className="table-cell">{item.roleId === 1 ? "Admin" : item.roleId === 2 ? "Manager" : "User"}</div>
                                    <div className="table-cell">
                                        <button onClick={() => handleDelete(item.username)}>Xóa</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {selectedUser && (
                    <div className="user-detail-modal">
                        <div className="modal-content">
                            <h3>Chi tiết người dùng</h3>
                            <label>
                                Tên:
                                <input type="text" name="name" value={selectedUser.name} onChange={handleInputChange} />
                            </label>
                            <label>
                                Địa chỉ:
                                <input type="text" name="address" value={selectedUser.address} onChange={handleInputChange} />
                            </label>
                            <label>
                                Tên đăng nhập:
                                <input type="text" name="username" value={selectedUser.username} onChange={handleInputChange} readOnly />
                            </label>
                            <label>
                                Mật khẩu băm:
                                <input type="text" name="passwordHash" value={selectedUser.passwordHash} onChange={handleInputChange} readOnly />
                            </label>
                            <label>
                                Chuỗi băm:
                                <input type="text" name="passwordSalt" value={selectedUser.passwordSalt} onChange={handleInputChange} readOnly />
                            </label>
                            <label>
                                Quyền người dùng trong hệ thống:
                                <select name="roleName" value={selectedUser.roleName} onChange={handleInputChange}>
                                    <option value="Admin">Admin</option>
                                    <option value="Manager">Manager</option>
                                    <option value="User">User</option>
                                </select>
                            </label>
                            <div className="modal-buttons">
                                <button onClick={handleCancel}>Hủy</button>
                                <button onClick={handleSaveUpdate}>Lưu</button>
                            </div>
                        </div>
                    </div>
                )}
                {addnewUser && (
                    <div className="user-detail-modal">
                        <div className="modal-content">
                            <h3>Thêm người dùng</h3>
                            <label>
                                Tên:
                                <input type="text" name="Name" value={addnewUser.name} onChange={handleAddInputChange} />
                            </label>
                            <label>
                                Địa chỉ:
                                <input type="text" name="Address" value={addnewUser.address} onChange={handleAddInputChange} />
                            </label>
                            <label>
                                Tên đăng nhập:
                                <input type="text" name="Username" value={addnewUser.username} onChange={handleAddInputChange} />
                            </label>
                            <label>
                                Mật khẩu:
                                <input type="password" name="Password" value={addnewUser.passwor} onChange={handleAddInputChange} />
                            </label>
                            <label>
                                Quyền người dùng trong hệ thống:
                                <select name="roleName" value={addnewUser.roleName} onChange={handleAddInputChange}>
                                    <option value="">Chọn quyền</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Manager">Manager</option>
                                    <option value="User">User</option>
                                </select>
                            </label>
                            <div className="modal-buttons">
                                <button onClick={handleCancel}>Hủy</button>
                                <button onClick={handleSaveAdd}>Lưu</button>
                            </div>
                        </div>
                    </div>
                )}
            </>}
        </div>
    );
};

export default memo(AdminUser);
