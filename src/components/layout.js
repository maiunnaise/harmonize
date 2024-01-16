import Header from "./Header";
import Menu from "./Menu";
import { Outlet  } from "react-router-dom";
import './layout.css';
import { isExpired, useJwt } from "react-jwt";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';


function Layout() {
    const location = useLocation();
    const token = localStorage.getItem('token');

    const navigate = useNavigate();
    const [Redirect, setRedirect] = useState(true);

    useEffect(() => {
        isValidToken(token);
        if (!Redirect) {
        navigate("/login");
        } else {
        navigate(location.pathname);
        }
    }, [navigate, Redirect]);

    function isValidToken(token) {

        if (!token || token === "undefined") {
            return setRedirect(false);
        }
        if(isExpired(token)){
            return setRedirect(false);
        }
        else{
            return setRedirect(true);
        }
    }
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