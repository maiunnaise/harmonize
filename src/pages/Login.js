import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';


function Login() {
  const navigate = useNavigate();
  const [isLoggedIn, setisLoggedIn] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate("/home");
    }
  }, [navigate, isLoggedIn]);

  function getToken() {

    let username = document.querySelector('input[name="username"]').value;
    let password = document.querySelector('input[name="password"]').value;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "username": username,
        "password": password
      })
    };

    fetch('http://127.0.0.1:8741/api/login-check', requestOptions)
      .then(response => response.json())
      .then(data => {
        if(data.code === 401){
          return setisLoggedIn(false);
        }
        else{
          localStorage.setItem('token', data.token);
          return setisLoggedIn(true);
        }
      }
    );
  }

  return (
    <div className="Login">
      <div className="header">
        <img src="/logo/logo_harmonize.png" className="Login-logo" alt="logo" />
      </div>

      <div className='loginForm'>
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
        {/* <Link to="/home"> */}
          <button value="Connexion" onClick={getToken}>Connexion</button>
        {/* </Link> */}
        <p>Créer un compte</p>
      </div>
    </div>
  );
}

export default Login;
