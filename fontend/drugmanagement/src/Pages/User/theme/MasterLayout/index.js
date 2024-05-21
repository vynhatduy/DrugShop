import { memo } from "react";
import Header from "../Header/index";
import Footer from "../Footer/index";


const MasterLayout = ({children,...props  }) => {
    return <div>
        <Header/>
        {children }
        <Footer/>
    </div>
};

export default memo(MasterLayout);