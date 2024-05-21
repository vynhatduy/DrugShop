import { memo, useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { RiLockPasswordFill } from "react-icons/ri";
import { APIGATEWAY, ROUTER } from '../../../Utils/Router';
import './style.scss';
import axios from 'axios';
import { DecodeToken } from '../../../Utils/DecodeToken';
const Login = () => {


    const kiemtra = (username, password) => {
        const span_user = document.getElementById("span-username");
        const span_pass = document.getElementById("span-password");
        
        if (username !== "" && password !== "") {
            login(username, password);
        }

        if (username !== "") {
            span_user.style.visibility = "hidden";
            return;
        }
        if (password !== "") {
            span_pass.style.visibility = "hidden";
            return;
        }

        if (username === "" && password === "") {
            span_user.style.visibility = "visible";
            span_pass.style.visibility = "visible";
        }
        if (username === "" || password === "") {
            if (username === "") {
                span_user.style.visibility = "visible";
                return;
            }
            if (password === "") {
                span_pass.style.visibility = "visible";
                return;
            }
            return;
        }

        
    }
    const login = async (username, password) => {
        const apiUrl = APIGATEWAY.AUTHEN.LOGIN;
        const span_login = document.getElementById("login-fail");
        console.log("username ", username);
        console.log("password ", password);
        try {
            const response = await axios.post(apiUrl,
                {
                    username: username,
                    password: password
                });
            const token = response.data;
            console.log("token ", token.token);

            if (token!==null||token!==undefined||token!=="") {
                localStorage.setItem('token', token.token);

                const decodeToken = DecodeToken(token.token);

                console.log("decodeToken ", decodeToken)

                const role = decodeToken.role;
                
                if (role === "admin" || role === "administrator" || role === "manager" || role === "management") {
                    window.alert(`Chào mừng ${role} đăng nhập!`);
                    window.location.href = ROUTER.ADMIN.HOME;
                } else {
                    window.location.href = ROUTER.USER.HOME;
                }
            } else {
                span_login.style.visibility = "visible";
                window.alert("Tài khoản hoặc mật khẩu không đúng");
            }
        } catch (error) {
            window.alert('Đã xảy ra lỗi:', error);
        }
    }
    return (
        <div className="login">

            <div className="container">
                <div className="row">
                    <div className="loginform">
                        <h1>Đăng nhập</h1>
                        <span id="login-fail">Tài khoản hoặc mật khẩu không đúng</span>
                        <form>
                            <div>
                                <label for="usermane" >Tên đăng nhập</label>
                                <div className="input">
                                    <AiOutlineUser />
                                    <input type="tel" placeholder="Nhập số điện thoại" id="username" />
                                </div>
                                <span id="span-username">Vui lòng chỉ nhập số và đúng 10 ký tự</span>

                            </div>
                            <div>
                                <label for="password">Mật khẩu</label>
                                <div className="input">
                                    <RiLockPasswordFill />
                                    <input type="password" placeholder="Nhập mật khẩu" id="password" />
                                    </div>
                                <span id="span-password">Vui lòng nhập ký tự</span>
                            </div>

                            <div className="forgot">
                                <span onClick={() => { window.location.href = ROUTER.AUTHEN.FORGOT; }}>Quên mật khẩu?</span>
                            </div>

                            <div className="btn-login">
                                <button onClick={(event) => {
                                    event.preventDefault();
                                    const username = document.getElementById("username").value.trim();
                                    const password = document.getElementById("password").value.trim();
                                    kiemtra(username, password);
                                }}>Đăng nhập</button>
                            </div>

                            <div className="regist">
                                <span id="regist" onClick={() => window.location.href = ROUTER.AUTHEN.REGIST}>Tạo tài khoản
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );


}
export default memo(Login);