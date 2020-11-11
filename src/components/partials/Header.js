import React, {useContext, useEffect, useMemo, useState} from 'react';
import { Link, Route, Switch, useHistory, useLocation, Redirect } from "react-router-dom";
import HomeComponent from "../HomeComponent";
import AirplanesComponent from "../AirplanesComponent";
import FlightsComponent from "../FlightsComponent";
import ReservationsComponent from "../ReservationsComponent";
import PromotionsComponent from "../PromotionsComponent";
import MyReservations from "../MyReservations";
import LoginComponent from "../LoginComponent";
import AuthenticationService from "../../services/AuthenticationService";
import { checkIfNotEmpty } from "../../libraries/my-libs";
import AirplanesService from "../../services/AirplanesService";
import { UserContext } from "../UserContext";

function Header() {
   const [authenticated, setAuthenticated] = useState(false);
   const [user, setUser] = useState('');
   const [value, setValue] = useState(null);
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');

   // const providerValue = useMemo(() => ({ value, setValue }), [value, setValue]);

   const history = useHistory();
   const location = useLocation();
   const logout = event => {
      event.preventDefault();
      localStorage.removeItem('jwtToken');
      window.location.href = '/login';
   };

   const authenticate = (username, password) => {
      // event.preventDefault();
      AuthenticationService.authenticate(username, password).then(response => {
         localStorage.setItem('jwtToken', response.data.jwt);
         setValue(response.data.user);
         console.log(value);
         console.log(response.data.user);
         // window.location.href = '/';
      }).catch(error => {
         if (error.response.data.status == 401) {

         }
      });
   };

   useEffect(() => {
      const jwtToken = localStorage.getItem('jwtToken');
      console.log(user);
      if (checkIfNotEmpty(jwtToken)/* && location.pathname !== '/login'*/) {
         setAuthenticated(true);
         // AuthenticationService.getAuthenticatedUser().then(response => {
         //    console.log(response.data);
         // });
      } else {
         history.push('/login');
      }
   }, []);

   if (authenticated) {
      return (
         <div className="container-fluid">
            <div className="main">
               <div className="row">
                  <div className="col-md-4 col-xs-12 logodiv">
                     <a href='/'>
                        <img src="../../images/logo.svg" alt="Logo" />
                     </a>
                  </div>
                  <div className="col-md-8 col-xs-12 navigationdiv">
                     {/*<?php if(isset($_SESSION['name'])){ echo "<p id='welcomep'>Dobrodosli, " . $_SESSION['name'] . "</p>"; }?>*/}
                     <ul className="navigation">
                        {/*<?php if(isset($_SESSION['username'])){ if($_SESSION['type'] == 'admin') {	?>*/}
                        <li><Link to="/" className={location.pathname == '/' ? 'active' : ''}>Početna</Link></li>
                        <li><Link to="/airplanes" className={location.pathname == '/airplanes' ? 'active' : ''}>Avioni</Link></li>
                        <li><Link to="/flights" className={location.pathname == '/flights' ? 'active' : ''}>Letovi</Link></li>
                        <li><Link to="/reservations" className={location.pathname == '/reservations' ? 'active' : ''}>Rezervacije</Link></li>
                        <li><Link to="/promotions" className={location.pathname == '/promotions' ? 'active' : ''}>Promo cijene</Link></li>
                        <li><a href="#" onClick={logout}>Odjavi se</a></li>
                        {/*<?php }else{*/}
                        {/*?>*/}
                        <li><a href="/">Početna</a></li>
                        <li><Link to="/reservations/my">Moje rezervacije</Link></li>
                        <li><a href="#" onClick={logout}>Odjavi se</a></li>
                        {/*<?php*/}
                        {/*}} ?>*/}
                     </ul>
                  </div>
               </div>
               <div className="row">
                  <UserContext.Provider value={{ value, setValue }}>
                     <Switch>
                        <Route path="/" exact component={HomeComponent} />
                        {/*{ authenticated ? <Redirect to="/login" /> : <Route path="/airplanes" exact component={AirplanesComponent} /> }*/}
                        <Route path="/airplanes" exact component={AirplanesComponent} />
                        <Route path="/flights" exact component={FlightsComponent} />
                        <Route path="/reservations" exact component={ReservationsComponent} />
                        <Route path="/promotions" exact component={PromotionsComponent} />
                        <Route path="/reservations/my" exact component={MyReservations} />
                        {/*<Route path="/login" exact component={LoginComponent} authenticate={user => console.log('jupi')} />*/}
                        <Route path="/login" exact render={(props) => <LoginComponent authenticate={(username, password) => authenticate(username, password)} {...props} />} />
                     </Switch>
                  </UserContext.Provider>
               </div>
            </div>
         </div>
      );
   } else {
      return (
         <div className="container-fluid">
            <div className="main">
               <div className="row">
                  <Switch>
                     {/*<Route path="/login" exact component={LoginComponent} />*/}
                     <Route path="/login"
                            exact
                            render={(props) => <LoginComponent authenticate={(username, password) => authenticate(username, password)} {...props} />} />
                  </Switch>
               </div>
            </div>
         </div>
      );
   }
}

export default Header;