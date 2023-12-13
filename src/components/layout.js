import Header from "./Header";
import Menu from "./Menu";
import { Outlet  } from "react-router-dom";
import './layout.css';

function Layout() {
    return (
        <div className="Container">
        <Header />
        <Outlet />
        <Menu />
        </div>
    );
}

export default Layout;