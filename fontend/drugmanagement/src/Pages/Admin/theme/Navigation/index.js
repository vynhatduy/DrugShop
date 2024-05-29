import { memo, useState } from "react";
import './style.scss';
import { DecodeToken } from "../../../../Utils/DecodeToken";
import { AiOutlineBell, AiOutlineDashboard, AiOutlineDatabase, AiOutlineLogout, AiOutlineMenu, AiOutlineProduct, AiOutlineUser } from "react-icons/ai";
import logo from '../../../../Assest/Images/logo.svg';
import { ROUTER } from "../../../../Utils/Router";
import { Link, useLocation } from "react-router-dom";

const AdminNav = () => {
    const username = DecodeToken(localStorage.getItem('token')).username;
    const [isMenuOpen, setIsMenuOpen] = useState(true);
    const location = useLocation();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const menu = [
        {
            name: "Dashboard",
            icon: <AiOutlineDashboard />,
            link: ROUTER.ADMIN.DASHBOARD
        },
        {
            name: "Sản phẩm",
            icon: <AiOutlineProduct />,
            link: ROUTER.ADMIN.PRODUCT
        },
        {
            name: "Người dùng",
            icon: <AiOutlineUser />,
            link: ROUTER.ADMIN.USER
        },
        {
            name: "Đơn hàng",
            icon: <AiOutlineDatabase />,
            link: ROUTER.ADMIN.ORDER
        },
        {
            name: "Báo cáo",
            icon: <AiOutlineBell />,
            link: ROUTER.ADMIN.REPORT
        }
    ];
    const handleExit = (event) => {
        localStorage.removeItem('token');
        window.location.reload();
    }
    return (
        <div className={`nav ${isMenuOpen ? 'open' : 'closed'}`}>
            <div className="top">
                <span>{username}</span>
                <AiOutlineMenu onClick={toggleMenu} />
            </div>
            <div className="img">
                <img src={logo} alt="Logo" />
            </div>
            <div className="container">
                {menu.map((item) => (
                    <Link to={item.link} className={location.pathname === item.link ? 'active' : ''}>
                        {item.icon}
                        <span>{item.name}</span>
                    </Link>
                ))}
            </div>
            <div className="bottom" onClick={handleExit }>
                <AiOutlineLogout />
                <span>Đăng xuất</span>
            </div>
        </div>
    );
};

export default memo(AdminNav);
