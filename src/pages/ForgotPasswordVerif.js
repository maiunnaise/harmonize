import { useParams, useNavigate } from 'react-router-dom';
import './ForgotPassword.css'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/dist';

function ForgotPasswordVerif() {
    localStorage.removeItem('token');
    const navigate = useNavigate();
    const { forgotPasswordToken } = useParams();
    const [isTokenValid, setIsTokenValid] = useState(false);
    const [formValue, setFormValue] = useState({});
    const [error, setError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    
    useEffect(() => {
        fetch('https://harmonize.mael-mouquet.fr/api/forgot-password/' + forgotPasswordToken, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        .catch((error) => {
            console.log(error);
        }).then(response => {
            setIsLoaded(true);
            if(response.status === 200){
                setIsTokenValid(true);
            }else{
                setIsTokenValid(false);
            }
        })
    }, [forgotPasswordToken]);

    function handleSubmit(){
        if(formValue.password === formValue.passwordConfirm){
            fetch('https://harmonize.mael-mouquet.fr/api/forgot-password/' + forgotPasswordToken, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "password": formValue.password
                })
            })
            .then(response => {
                if(response.status === 204){
                    navigate('/login');
                }
            })
        }else{
            setError(true);
        }
    }

    return(
        <div className="wrapper">
            <div className="header">
                <img src="/logo/logo_harmonize.png" className="Login-logo" alt="logo" />
            </div>
            <h1>Mot de passe oublié</h1>
            {isLoaded ? (
                
                isTokenValid ? (
                    <div>
                        <div className="forgotpwdForm">
                        <label>
                            Mot de passe
                            <input 
                                type="password" 
                                onChange={(e) => setFormValue({...formValue, password: e.target.value})}
                            />
                        </label>
                        <label>
                            Confirmer le mot de passe
                            <input 
                                type="password" 
                                onChange={(e) => setFormValue({...formValue, passwordConfirm: e.target.value})}
                            />
                        </label>
                        <button 
                            className='forgotpwdBtn'
                            value="Envoyer" 
                            onClick={()=> handleSubmit()}
                        >Envoyer</button>
                        {error && <div className='error-div'>Les mots de passe ne correspondent pas</div>}
                    </div>
                    </div>
                ) : (
                    <div className='retry-div'>
                        <div className='error-div'>
                            Ce lien n'est plus valide
                        </div>
                        <Link className='forgotpwdBtn' to='/forgot-password'>Réessayer</Link>
                    </div>
                )
            ) : (
                <div className='loading-pwd'>
                    Chargement...
                </div>
            )}
        </div>
    )
}

export default ForgotPasswordVerif;