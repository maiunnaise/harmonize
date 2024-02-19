import './ForgotPassword.css';
import { useEffect, useState } from 'react';

function ForgotPassword(){
    localStorage.removeItem('token');
    const [isSent, setIsSent] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState(true);

    function handleInput(e) {
        setInputValue(e.target.value);
        if(inputValue === ''){
            setError(true);
        }else if(!inputValue.includes('@')){
            setError(true);
        }else{
            setError(false);
        }
    }

    useEffect(() => {
        if (isSent) {
            fetch('https://harmonize.mael-mouquet.fr/api/forgot-password/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "email": inputValue
                })
            })
        }
    }, [isSent, inputValue]);

    return (
        <div className='wrapper'>
            <div className="header">
                <img src="/logo/logo_harmonize.png" className="Login-logo" alt="logo" />
            </div>
            <h1>Mot de passe oublié</h1>
            {isSent ? (
                <div className='retry-div'>
                    <div className='mailinfo'>Vérifiez votre adresse e-mail</div>
                    <button className='forgotpwdBtn' onClick={()=>setIsSent(false)}>Réessayer</button>
                </div>
            ) : (
                <div className="forgotpwdForm">
                    <label>
                        Adresse mail
                        <input 
                            type="email" 
                            placeholder='example@mail.com' 
                            value={inputValue} 
                            onChange={(e)=>handleInput(e)} 
                        />
                    </label>
                    <div className='mailinfo'>Un lien vous sera envoyé par e-mail</div>
                    <button 
                        value="Envoyer" 
                        className={error ? 'forgotpwdBtn disabled-button' : 'forgotpwdBtn'} 
                        onClick={()=>{setIsSent(true)}} 
                        disabled={error ? true : false}
                    >Envoyer</button>
                </div>
            )}
        </div>
    );
}

export default ForgotPassword;