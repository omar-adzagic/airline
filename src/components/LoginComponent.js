import React, {useState, useEffect, useContext} from 'react';
import '../styles/home.scss';
import AuthenticationService from "../services/AuthenticationService";
import { useHistory, useLocation } from "react-router";
import { checkIfNotEmpty} from "../libraries/my-libs";

const LoginComponent = (props) => {
   const [jwt, setJwt] = useState('');
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');

   function authenticate(event) {
      event.preventDefault();
      props.authenticate(username, password);
   }

   useEffect(() => {
   }, []);

   return (
      <div className="login-page-container">
         <form action="" onSubmit={event => authenticate(event)} className={ checkIfNotEmpty(props.unauthorizedError) ? 'border border-danger' : ''}>
            <small className="text-danger font-italic">{props.unauthorizedError}</small>
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
};

export default LoginComponent;