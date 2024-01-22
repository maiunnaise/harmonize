import './Login.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';


function Login() {
  const navigate = useNavigate();
  const [isLoggedIn, setisLoggedIn] = useState(false);

  const {state} = useLocation();

  
  useEffect(() => {
    const {fromRegisterPage}= state || {};
    if(fromRegisterPage){
      let overlay = document.querySelector('.overlay');
      overlay.style.display = 'block';
    }
  });
  

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate("/home");
    }
  }, [navigate, isLoggedIn]);

  function getToken() {
    let loginBtn = document.querySelector('.loginBtn');
    let errorLogin = document.querySelector('.errorLogin');
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

    loginBtn.disabled = true;
    loginBtn.innerHTML = 'Connexion en cours...';

    fetch('https://harmonize.mael-mouquet.fr/api/login-check', requestOptions)
      .then(response => response.json())
      .catch((error) => {
        console.log(error);
        loginBtn.disabled = false;
        loginBtn.innerHTML = 'Connexion';
        errorLogin.style.display = 'block';
        return setisLoggedIn(false); 
      })
      .then(data => {
        
        localStorage.setItem('token', data.token);
        return setisLoggedIn(true);
      }
    );
  }

  function closePopUp(){
    let overlay = document.querySelector('.overlay');
    overlay.style.display = 'none';
  }

  return (
    <div className="Login">
      <div className="header">
        <img src="/logo/logo_harmonize.png" className="Login-logo" alt="logo" />
      </div>

      <div className='overlay'>
        <div className='popUpRegister'>
          <p className='closePopUp' onClick={closePopUp}>X</p>
          <h3>Compte créé avec succès !</h3>
          <p>Vous pouvez vous connecter</p>
        </div>
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
        <p className='errorLogin'>Adresse mail ou mot de passe erroné</p>
        {/* <p>Mot de passe oublié ?</p> */}
        <button value="Connexion" onClick={getToken} className='loginBtn'>Connexion</button>
        <Link to="/register">
          <p className='register'>Créer un compte</p>
        </Link>
      </div>
    </div>
  );
}

export default Login;
