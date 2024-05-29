import React, { memo, useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { RiLockPasswordFill } from "react-icons/ri";
import axios from 'axios';
import { APIGATEWAY, ROUTER } from '../../../Utils/Router';
import LoadingSpinner from '../../../Components/Loadding';
import { DecodeToken } from '../../../Utils/DecodeToken';
import './style.scss';
const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const kiemtra = (username, password) => {
        setUsernameError(username === '');
        setPasswordError(password === '');

        if (username !== '' && password !== '') {
            setIsLoading(true);
            login(username, password);
        }
    };

    const login = async (username, password) => {
        const apiUrl = APIGATEWAY.AUTHEN.LOGIN;

        try {
            const response = await axios.post(apiUrl, {
                username: username,
                password: password
            });

            const token = response.data.token;

            if (token) {
                localStorage.setItem('token', token);

                const decodeToken = DecodeToken (token);
                const role = decodeToken.role;

                if (role === "admin" || role === "administrator" || role === "manager" || role === "management") {
                    window.alert(`Chào mừng ${role} đăng nhập!`);
                    window.location.href = ROUTER.ADMIN.HOME;
                } else {
                    window.location.href = ROUTER.USER.HOME;
                }
            } else {
                setLoginError(true);
            }
        } catch (error) {
            setLoginError(true);
            console.error('Đã xảy ra lỗi:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login">
            {isLoading && <LoadingSpinner />}
            <div className="container">
                <div className="row">
                    <div className="loginform">
                        <h1>Đăng nhập</h1>
                        {loginError && <span id="login-fail">Tài khoản hoặc mật khẩu không đúng</span>}
                        <form>
                            <div>
                                <label htmlFor="usermane">Tên đăng nhập</label>
                                <div className="input">
                                    <AiOutlineUser />
                                    <input type="tel" placeholder="Nhập số điện thoại" id="username" />
                                </div>
                                {usernameError && <span id="span-username">Vui lòng chỉ nhập số và đúng 10 ký tự</span>}
                            </div>
                            <div>
                                <label htmlFor="password">Mật khẩu</label>
                                <div className="input">
                                    <RiLockPasswordFill />
                                    <input type="password" placeholder="Nhập mật khẩu" id="password" />
                                </div>
                                {passwordError && <span id="span-password">Vui lòng nhập ký tự</span>}
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
                                <span id="regist" onClick={() => window.location.href = ROUTER.AUTHEN.REGIST}>Tạo tài khoản</span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(Login);
