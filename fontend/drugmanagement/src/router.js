import Forgot from "./Pages/Authentication/Forgot";
import Login from "./Pages/Authentication/Login";
import Regist from "./Pages/Authentication/Regist";
import CartUser from "./Pages/User/cart";
import ContactUser from "./Pages/User/contactpage";
import Homepage from "./Pages/User/homepage/index";
import HomepageUser from "./Pages/User/homepage/index";
import OrderUser from "./Pages/User/orderpage";
import OrderDetailUser from "./Pages/User/orderpage/orderDetail";
import ProductUser from "./Pages/User/productpage";
import ProductDetailUser from "./Pages/User/productpage/productDetail";
import ProfilepageUser from "./Pages/User/profilepage/index";
import MasterLayout from "./Pages/User/theme/MasterLayout/index";
import AdminMasterLayout from "./Pages/Admin/theme/MasterLayout/index";
import AdminProduct from "Pages/Admin/Product/index";
import AdminUser from "Pages/Admin/User/index";
import AdminOrder from "Pages/Admin/Order/index";
import AdminReport from "Pages/Admin/Report/index";
import AdminDashboard from "Pages/Admin/Dashboard/index";
import { DecodeToken } from "./Utils/DecodeToken";
import { ROUTER } from "./Utils/Router";
import { Routes, Route, useLocation } from 'react-router-dom';

const renderUserRouter = () => {
    const userRouter = [
        {
            path: ROUTER.USER.HOME,
            component: <HomepageUser />
        },
        {
            path: ROUTER.USER.PROFILE,
            component: <ProfilepageUser />
        },
        {
            path: ROUTER.USER.CONTACT,
            component: <ContactUser />
        },
        {
            path: ROUTER.USER.ORDER,
            component: <OrderUser />
        },
        {
            path: ROUTER.USER.ORDERDETAIL,
            component: <OrderDetailUser />
        },
        {
            path: ROUTER.USER.PRODUCT,
            component: <ProductUser />
        },
        {
            path: ROUTER.USER.PRODUCT_FILTER,
            component: <ProductUser />
        },
        {
            path: ROUTER.USER.PRODUCTDETAIL,
            component: <ProductDetailUser />
        },
        {
            path: ROUTER.USER.CART,
            component: <CartUser />
        }
    ];
    console.log("Đã render vào User");
    return (
        <MasterLayout>
            <Routes>
                {
                    userRouter.map((item, key) => (
                        <Route key={key} path={item.path} element={item.component} />
                    ))
                }

            </Routes>
        </MasterLayout>

    )
}
const renderAdminRouter = () => {
    const adminRouter = [
        {
            path: ROUTER.ADMIN.DASHBOARD,
            component: <AdminDashboard />
        },
        {
            path: ROUTER.ADMIN.PRODUCT,
            component: <AdminProduct />
        },
        {
            path: ROUTER.ADMIN.ORDER,
            component: <AdminOrder />
        },
        {
            path: ROUTER.ADMIN.USER,
            component: <AdminUser />
        },
        {
            path: ROUTER.ADMIN.REPORT,
            component: <AdminReport />
        }
    ];
    console.log("Đã render vào Admin");
    return (
        <AdminMasterLayout>
            <Routes>
                {
                    adminRouter.map((item, key) => (
                        <Route key={key} path={item.path} element={item.component} />
                    ))
                }
            </Routes>
        </AdminMasterLayout>
    );
}
const renderAuthenRouter = () => {
    console.log("Đã render vào Authen");
    return (
        <Routes>
            <Route path={ROUTER.AUTHEN.LOGIN} element={<Login />} />
            <Route path={ROUTER.AUTHEN.REGIST} element={<Regist />} />
            <Route path={ROUTER.AUTHEN.FORGOT} element={<Forgot />} />
        </Routes>
    );
}


const RouterCustom = () => {
    const token = localStorage.getItem('token');
    const path = useLocation().pathname;
    if (path === "/dang-nhap" || path === "/dang-ky" || path === "/quen-mat-khau") {
        return renderAuthenRouter();
    }
    if (token !== null&&token!=="null") {
        const userRole = DecodeToken(token).role;
        const roles = ["admin", "administrator", "manager", "management"];
        if (roles.includes(userRole.toLowerCase())) {
            return renderAdminRouter();
        }
        return renderUserRouter();
    }
    return renderUserRouter();
};
export default RouterCustom;