import Header from "./Header";
import Menu from "./Menu";
import { Outlet, useLocation } from "react-router-dom";
import './layout.css';
import CheckLogin from "./checkLogin";
import { useEffect } from "react";


function Layout() {
    CheckLogin();

    const location = useLocation();

    function coloredIcons(location){
        let icon;
        let icons;

        if(location.includes("home")){
            icon = document.querySelector(".Menu .home");
            icon.src = "/logo/icons/home-colored.png";
        }
        else if(location === "/library" || location === "/addPartition"){
            icon = document.querySelector(".Menu .library");
            icon.src = "/logo/icons/open-book-colored.png";
        }
        else if(location === "/search" || location === "/cours" || location === "/exercices"){
            icon = document.querySelector(".Menu .search");
            icon.src = "/logo/icons/compass-circular-tool-colored.png";
        }
        else if(location === "/inbox"){
            icon = document.querySelector(".Menu .message");
            icon.src = "/logo/icons/speech-bubble-colored.png";
        }
        else{
            icons = document.querySelectorAll(`.Menu img:not(.Teachimg)`);

            icons = Array.from(icons);
            icons.map((icon, index) => {
                icon.src = icon.src.replace("-colored", "");
            })
            return;
        }

        icons = document.querySelectorAll(`.Menu img:not(.Teachimg, .${icon.className})`);

        icons = Array.from(icons);
        icons.map((icon, index) => {
            icon.src = icon.src.replace("-colored", "");
        })
    }

    useEffect(() => {
        if(location.pathname.includes("home") || location.pathname == "/library" || location.pathname == "/addPartition" || location.pathname == "/search" || location.pathname == "/inbox"  || location.pathname === "/cours" || location.pathname === "/exercices" || location.pathname === "/findTeacher"){
            coloredIcons(location.pathname);
        }
    }, [location]);

    return (
        <div className="Container">
        <Header />
        <Outlet />
        <Menu />
        </div>
    );
}

export default Layout;