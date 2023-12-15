import './Login.css';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="Login">
      <div className="header">
        <img src="/logo/logo_harmonize.png" className="Login-logo" alt="logo" />
      </div>

      <form id="loginForm">
        <h1>Connexion</h1>
        <label>
          Adresse mail
          <input type="text" name="username" />
        </label>
        <label>
          Mot de passe
          <input type="password" name="password" />
        </label>
        <p>Mot de passe oublié ?</p>
        <Link to="/findTeacher">
          <input type="submit" value="Connexion" />
        </Link>
        <p>Créer un compte</p>
      </form>
    </div>
  );
}

export default Login;
