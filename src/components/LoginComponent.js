import React, { useState, useEffect } from 'react';
import '../styles/home.scss';
import AuthenticationService from "../services/AuthenticationService";

function LoginComponent() {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [jwt, setJwt] = useState('');

   const authenticate = event => {
      event.preventDefault();
      AuthenticationService.authenticate(username, password).then(response => {
         localStorage.setItem('jwtToken', response.data.jwt);
      }).catch(error => {
         if (error.response.data.status == 401) {

         }
      });
   };

   useEffect(() => {

   }, []);

   return (
      <div className="login-page-container">
         <form action="" onSubmit={authenticate}>
            <div className="form-group">
               <label htmlFor="username">Korisničko ime *</label>
               <input className="form-control"
                      type="text"
                      placeholder="Unesite korisničko ime"
                      onChange={event => setUsername(event.target.value)} />
            </div>
            <div className="form-group">
               <label htmlFor="username">Lozinka *</label>
               <input className="form-control"
                      type="password"
                      placeholder="Unesite lozinku"
                      onChange={event => setPassword(event.target.value)} />
            </div>
            <button className="btn btn-primary btn-block">
               Prijavi me
            </button>
         </form>
      </div>
   );
}

export default LoginComponent;