import { memo } from "react";
import AdminNav from '../Navigation/index'
import AdminHeader from '../Header/index'
import AdminFooter from '../Footer/index'
import './style.scss';
const AdminMasterLayout = ({ children, ...props }) => {
    return (
        <div className="admin">
            <div className="left">
                <AdminNav />
            </div>
            <div className="right">
                <div className="top">
                    <AdminHeader />
                </div>
                <div className="middle">
                    {children}
                </div>
                <div className="bottom">
                    <AdminFooter />
                </div>
            </div>
        </div>
    );
}
export default memo(AdminMasterLayout);