import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Root = () => {
    const location = useLocation();
    const noHeader = location.pathname.includes('signin') ||
        location.pathname.includes('signup');
    return (
        <div>
            {noHeader || <Navbar></Navbar>}
            <Outlet></Outlet>
        </div>
    );
}

export default Root;