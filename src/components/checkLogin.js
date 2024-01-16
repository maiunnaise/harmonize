import { useEffect } from "react";
import { isExpired, decodeToken } from "react-jwt";
import { useNavigate, useLocation} from 'react-router-dom';

export default function CheckLogin(){
    const location = useLocation();
    const token = localStorage.getItem('token');

    const navigate = useNavigate();

    useEffect(() => {
        if(token == null || token == "undefined" || isExpired(token)){
            navigate("/login");
        }
        else {
            if(location.pathname.includes("/home")|| location.pathname === "/" || location.pathname.includes("Lessons")){
                let decodedToken = decodeToken(token);
                if(decodedToken.roles.includes('ROLE_STUDENT') && decodedToken != null){
                    navigate("../student/home",{replace: true});
                }
                else if (decodedToken.roles.includes('ROLE_TEACHER') && decodedToken != null){
                    if(location.pathname.includes("Lessons")){
                        navigate(location.pathname);
                    }
                    else{
                        navigate("../teacher/home",{replace: true});
                    }
                }
            }
            else{
                navigate(location.pathname);
            }
        }
    }, [navigate]);
}