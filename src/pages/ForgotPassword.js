import './ForgotPassword.css';

function ForgotPassword(){
    return (
        <div className='wrapper'>
            <div className="header">
                <img src="/logo/logo_harmonize.png" className="Login-logo" alt="logo" />
            </div>
            <h1>Mot de passe oublié</h1>
            <form className="forgotpwdForm">
                <label>
                    Adresse mail
                    <input type="email" name="email" />
                </label>
                <button value="Envoyer" className='forgotpwdBtn'>Envoyer</button>
            </form>
        </div>
    );
}

export default ForgotPassword;