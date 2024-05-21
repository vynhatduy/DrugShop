
export const ROUTER = {
    USER: {
        HOME: "/home",
        PROFILE: "/thong-tin",
        PRODUCT: "/san-pham",
        PRODUCT_FILTER: `/san-pham/byCategoryId/:categoryId`,
        PRODUCTDETAIL:`/chi-tiet-san-pham/:productId`,
        CONTACT: "/lien-he",
        ORDER: "/lich-su-don-hang",
        ORDERDETAIL: `/chi-tiet-hoa-don/:id`,
        CART:"/gio-hang"
    },
    ADMIN: {
        HOME: "/dasboad",
        PROFILE: "/infomation",
        PRODUCT: "/product",
        ORDER: "/order",
        USER: "/user",
        REPORT:"/report"
    },
    AUTHEN: {
        LOGIN: "/dang-nhap",
        REGIST: "/dang-ky",
        "FORGOT":"/quen-mat-khau"
    }
};

export const APIGATEWAY = {

    INVENTORY: {
        GETALL: "https://localhost:8001/api/Inventory'",
        BYID: "https://localhost:8001//api/Inventory/byId/",
    },
    ORDER: {
        GETALL:"https://localhost:8001/api/Order",
        BYUSERID:"https://localhost:8001/api/Order/byUserId/",
        BYORDERID:"https://localhost:8001/api/Order/byOrderId/",
        BYCREATEDATE: "https://localhost:8001/api/Order/byCreateDate/",
        CREATE:"https://localhost:8001/api/Order/create"
    },
    PRODUCT: {
        GETALL: "https://localhost:8001/api/Products",
        BYCATEGORYID: "https://localhost:8001/api/Products/",
        BYNAME: "https://localhost:8001/api/Products/byName/",
        BYID: "https://localhost:8001/api/Products/",
    },
    ACCOUNT: {
        GETALL:"https://localhost:8001/api/Account",
        BYID:"https://localhost:8001/api/Account/byUserId/",
        BYUSERNAME: "https://localhost:8001/api/Account/byUserName/",
        LOGIN: "https://localhost:8001/api/Account/login/",
    },
    USER: {
        GETALL: "https://localhost:8001/api/User",
        BYID: "https://localhost:8001/api/User/byUserId/",
        BYPHONENUM: "https://localhost:8001/api/User/byPhoneNum/",
    },
    AUTHEN: {
        LOGIN:"https://localhost:8001/api/Authentication/login"
    },
    CART: {
        GETBYUSERNAME:"https://localhost:8001/api/Cart/",
        BYUSERNAME:"https://localhost:8001/api/Cart/addOrUpdate",
    }

    
}