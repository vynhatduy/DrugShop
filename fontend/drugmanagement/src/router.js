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
import { ROUTER } from "./Utils/Router";
import { Routes, Route } from 'react-router-dom';

const renderUserRouter = () => {
    const authenRouter = [
        {
        path: ROUTER.AUTHEN.LOGIN,
        component:<Login/>
        },
        {
            path: ROUTER.AUTHEN.REGIST,
            component:<Regist/>
        },
        {
            path: ROUTER.AUTHEN.FORGOT,
            component:<Forgot/>
        }
    ];
    const adminRouter = [
        {
        path: ROUTER.ADMIN.HOME,
        component:<Homepage/>
        }
    ];
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
            component:<ProductUser/>
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

    return (
        <MasterLayout>
            <Routes>
                {
                    userRouter.map((item, key) => (
                        <Route key={key} path={item.path} element={item.component} />
                    ))
                }
                ,
                {

                    adminRouter.map((item, key) => (
                        <Route key={key} path={item.path} element={item.component}/>
                    ))
                    
                }
                ,
                {
                    authenRouter.map((item, key) => (
                        <Route key={key} path={item.path} element={item.component }/>
                    ))
                }
            </Routes>
        </MasterLayout>

    )
}


const RouterCustom = () => {
    return renderUserRouter();
};
export default RouterCustom;