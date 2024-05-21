import { memo, useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { RiLockPasswordFill } from "react-icons/ri";
import { APIGATEWAY, ROUTER } from '../../../Utils/Router';
import './style.scss';
import axios from 'axios';
import { DecodeToken } from '../../../Utils/DecodeToken';

const Regist = () => {

    const regist = (username, password, name, address) => {
        const span_user = document.getElementById("span-username");
        const span_pass = document.getElementById("span-password");
        span_user.style.visibility = "hidden";
        span_pass.style.visibility = "hidden";
        const phoneRegex = /^(\+?\d{1,4}[\s-]?)?((\d{3}[\s-]?\d{4}[\s-]?\d{4})|(\d{3}[\s-]?\d{3}[\s-]?\d{4})|(\d{10}))$/;
        console.log("username", username);
        console.log("password", password);
        console.log("test phone", phoneRegex.test(username));
        if ( username === "" &&!phoneRegex.test(username) && password === "") {
            span_user.style.visibility = "visible";
            span_pass.style.visibility = "visible";
            return;
        }
        else if (username === "" && !phoneRegex.test(username)){
            span_user.style.visibility = "visible";
            return;
        }
        else if (password === "") {
            span_pass.style.visibility = "visible";
            return;
        }
        else if (username !== "" && phoneRegex.test(username) && password !== "") {
            const data = {
                Username: username,
                Password: password,
                Name: name,
                Address: address
            };
            const url = `${APIGATEWAY.USER.GETALL}/register`;
            axios.post(url, data).then(respone => {
                if (respone.status === 200) {
                    window.alert(`Đăng ký thành công với tài khoản ${username} và mật khẩu là ${password}`);
                    window.location.href = "/dang-nhap";
                    return;
                }
                else {
                    window.alert(`Đăng ký không thành công`);
                    return;
                }
            }).catch(error => { window.alert(`Lỗi! Vui lòng kiểm tra lại `, error); return; });
        }
    }
    return (<div className="registPage">
        <div className="container">
            <div className="row">
                <div className="registform">
                    <h1>Tạo tài khoản</h1>
                    <form>
                        <div className="widget">
                            <div>
                                <label for="name">Họ và tên</label>
                                <div className="input">
                                    <input type="tel" placeholder="Nhập họ tên" id="name" />
                                </div>
                            </div>
                            <div>
                                <label for="address">Địa chỉ</label>
                                <div className="input">
                                    <input type="tel" placeholder="Nhập địa chỉ" id="address" />
                                </div>
                            </div>

                            <div>
                                <label for="usermane" >Số điện thoại *</label>
                                <div className="input">
                                    <AiOutlineUser />
                                    <input type="tel" placeholder="Nhập số điện thoại" id="username" />
                                </div>
                                <span id="span-username">Vui lòng chỉ nhập số và đúng 10 ký tự</span>
                            </div>
                            <div>
                                <div>
                                    <label for="password">Mật khẩu *</label>
                                    <div className="input">
                                        <RiLockPasswordFill />
                                        <input type="password" placeholder="Nhập mật khẩu" id="password" />
                                    </div>
                                    <span id="span-password">Vui lòng nhập ký tự</span>
                                </div>
                            </div>
                        </div>
                        <div className="btn-regist">
                            <button onClick={(event) => {
                                event.preventDefault();
                                const username = document.getElementById("username").value;
                                const password = document.getElementById("password").value;
                                const name = document.getElementById("name").value;
                                const address = document.getElementById("address").value;
                                regist(username, password, name, address);
                            }}>Đăng ký</button>
                        </div>

                        <div className="btn-login">
                            <span  onClick={() => window.location.href = ROUTER.AUTHEN.LOGIN}>Đã có tài khoản? Đăng nhập
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>);
}
export default memo(Regist);