import SimpleHeader from "../components/simpleHeader"
import "./register.css"
import { useNavigate } from "react-router-dom";


function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

export default function Register() {

    function checkData() {
        const datas = document.querySelectorAll('input, select');
        const error = document.querySelector('.error');
        let isValid = true;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: {}
        };
    
        for (const data of datas) {
            const { name, value } = data;
        
            if (value === "") {
                isValid = false;
                break; 
            } else if (name === 'email' && !isValidEmail(value)) {
                isValid = false;
                break; 
            }
            else{
                requestOptions.body[name] = value;

            }
        }
    
        error.style.display = isValid ? 'none' : 'block';
        if(isValid){
            requestOptions.body = JSON.stringify(requestOptions.body);
            fetchData(requestOptions);
        }
    }


    const navigate = useNavigate();
    const fetchData = async (requestOptions) => {
        await fetch('https://harmonize.mael-mouquet.fr/api/register', requestOptions)
        .then(response => response.json())
        .catch((error) => {
            return; 
        })
        .then(data => {

            navigate('/login', { state: { fromRegisterPage: true } });
                
        })
            
    };
    

    return (
        <div className="simpleContent">
            <SimpleHeader />
            <h1>Créer votre compte</h1>
            <div className="registerForm">
                <div className="inlineForm userNames">
                    <label>
                        <p>Nom <span>*</span></p>
                        <input type="text" name="nom" />
                    </label>
                    <label>
                        <p>Prénom <span>*</span></p>
                        <input type="text" name="prenom" />
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
                        <select name="role">
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
                            <option value="other">Autre</option>
                        </select>
                    </label>
                </div>
                <p className="error">Veuillez renseigner tous les champs correctement</p>
                <button className="registerBtn" onClick={checkData}>Créer un compte</button>
            </div>
        </div>
    )
}