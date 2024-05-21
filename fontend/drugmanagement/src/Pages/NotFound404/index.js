import { memo } from 'react';
import background1 from "../../Assest/Images/background1.png";
import background4 from "../../Assest/Images/background4;.png";
import "./style.scss";
import Homepage from '../User/homepage';
import { Link } from 'react-router-dom';
import { ROUTER } from '../../Utils/Router';

const NotFound404 = () => {
    return (

            <div className="notfound404">
                <div className="img">
                    <img src={background1} alt="404" className="background1"/>
                <img src={background4} alt="404" className="background4" />
                <Link to={ROUTER.USER.HOME }>Trở về trang chủ</Link>
            </div>

        </div>
    )
}
export default memo(NotFound404);