import React, { useEffect, useState } from 'react';
import { Link, Route, Switch } from "react-router-dom";
import HomeComponent from "../HomeComponent";
import AirplanesComponent from "../AirplanesComponent";
import FlightsComponent from "../FlightsComponent";
import ReservationsComponent from "../ReservationsComponent";
import PromotionsComponent from "../PromotionsComponent";
import MyReservations from "../MyReservations";
import LoginComponent from "../LoginComponent";
import AuthenticationService from "../../services/AuthenticationService";

function Header() {

   useEffect(() => {
      // AuthenticationService.authenticate().then(response => {
      //    // setAirplanes(response.data);
      //    console.log(response.data);
      // });
   }, []);

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
                     <li><Link to="/">Početna</Link></li>
                     <li><Link to="/airplanes">Avioni</Link></li>
                     <li><Link to="/flights">Letovi</Link></li>
                     <li><Link to="/reservations">Rezervacije</Link></li>
                     <li><Link to="/promotions">Promo cijene</Link></li>
                     <li><a href="logout">Odjavi se</a></li>
                     {/*<?php }else{*/}
                     {/*?>*/}
                     <li><a href="/">Početna</a></li>
                     <li><Link to="/reservations/my">Moje rezervacije</Link></li>
                     <li><a href="logout">Odjavi se</a></li>
                     {/*<?php*/}
                     {/*}} ?>*/}
                  </ul>
               </div>
            </div>
            <div className="row">
               <Switch>
                  <Route path="/" exact component={HomeComponent} />
                  <Route path="/airplanes" exact component={AirplanesComponent} />
                  <Route path="/flights" exact component={FlightsComponent} />
                  <Route path="/reservations" exact component={ReservationsComponent} />
                  <Route path="/promotions" exact component={PromotionsComponent} />
                  <Route path="/reservations/my" exact component={MyReservations} />
                  <Route path="/login" exact component={LoginComponent} />
               </Switch>
            </div>
         </div>
      </div>
   );
}

export default Header;