import './Login.css';

function Login() {
  return (
    <div className="Login">
      <header className="header">
        <img src="/logo/logo_harmonize.png" className="Login-logo" alt="logo" />
      </header>

      <form>
        <label>
          Adresse mail
          <input type="text" name="username" />
        </label>
        <label>
          Mot de passe
          <input type="password" name="password" />
        </label>
        <p>Mot de passe oublié ?</p>
        <input type="submit" value="Connexion" />
        <p>Créer un compte</p>
      </form>
    </div>
  );
}

export default Login;
