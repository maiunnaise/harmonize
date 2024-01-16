import Header from "./Header";
import Menu from "./Menu";
import { Outlet  } from "react-router-dom";
import './layout.css';
import CheckLogin from "./checkLogin";


function Layout() {
    CheckLogin();

    return (
        <div className="Container">
        <Header />
        {/* mettre fonction qui verif token et role */}
        <Outlet />
        <Menu />
        </div>
    );
}

export default Layout;