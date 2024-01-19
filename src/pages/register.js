import SimpleHeader from "../components/simpleHeader"
import "./register.css"
import { useEffect, useState } from "react";
import { getAPI } from "../components/fetchAPI";
import { useNavigate } from "react-router-dom";


function displayCity(e) {
    if (e.target.value === 'teacher') {
        document.querySelector('.userCity').style.display = 'flex';
    }
    else {
        document.querySelector('.userCity').style.display = 'none';
    }

}


function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

export default function Register() {
    const [validData, setValidData] = useState();

    function checkData() {
        const datas = document.querySelectorAll('input, select');
        const error = document.querySelector('.error');
        const role = document.querySelector('select[name="role"]').value;
        let isValid = true;
    
        for (const data of datas) {
            const { name, value } = data;
    
            if (name === "city" && value === "" && role === "student") {
                continue; // Skip this iteration
            }
    
            if (value === "") {
                isValid = false;
                break; 
            } else if (name === 'email' && !isValidEmail(value)) {
                isValid = false;
                break; 
            }
        }
    
        error.style.display = isValid ? 'none' : 'block';
        setValidData(isValid);
    }


    const [partitions, setPartitions] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        console.log(validData);
        const fetchData = async () => {
            await getAPI('vault-sheets', setPartitions);
            navigate('/login');
        };
    
        if (validData) {
            fetchData();
        }
    }, [validData]);
    

    return (
        <div className="simpleContent">
            <SimpleHeader />
            <h1>Créer votre compte</h1>
            <div className="registerForm">
                <div className="inlineForm userNames">
                    <label>
                        <p>Nom <span>*</span></p>
                        <input type="text" name="name" />
                    </label>
                    <label>
                        <p>Prénom <span>*</span></p>
                        <input type="text" name="firstname" />
                    </label>
                </div>
                <label>
                    <p>Adresse mail <span>*</span></p>
                    <input type="email" name="email"/>
                </label>
                <label>
                    <p>Mot de passe <span>*</span></p>
                    <input type="password" name="password"/>
                </label>
                <div className="inlineForm details">
                    <label>
                        <p>Votre rôle <span>*</span></p>
                        <select name="role" onChange={displayCity}>
                            <option value="">Votre rôle</option>
                            <option value="student">Élève</option>
                            <option value="teacher">Professeur</option>
                        </select>
                    </label>
                    <label>
                        <p>Genre <span>*</span></p>
                        <select name="gender">
                            <option value="">Genre</option>
                            <option value="male">Homme</option>
                            <option value="female">Femme</option>
                        </select>
                    </label>
                </div>
                <label className="userCity">
                    <p>Ville <span>*</span></p>
                    <input type="text" name="city" />
                </label>
                <p className="error">Veuillez renseigner tous les champs correctement</p>
                <button className="registerBtn" onClick={checkData}>Créer un compte</button>
            </div>
        </div>
    )
}