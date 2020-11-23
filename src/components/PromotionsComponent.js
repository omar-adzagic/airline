import React, { useState, useEffect } from 'react';
import PromotionsService from "../services/PromotionsService";
import {checkIfNotEmpty, convertToDateTimeFormat} from "../libraries/my-libs";
import AirplaneCreate from "./AirplaneCreate";

function PromotionsComponent() {
   const [show, setShow] = useState(false);
   const [promotions, setPromotions] = useState([]);
   const [flights, setFlights] = useState([]);
   const [price, setPrice] = useState('');
   const [flightId, setFlightId] = useState('');

   const showModal = event => setShow(!show);

   const storePromotion = event => {
      event.preventDefault();
      let flight = {};
      if (checkIfNotEmpty(flightId)) {
          flight = flights.find(flight => flight.id = flightId);
      }
      flight.price = price;
      flight.promoted = true;
      const data = {
         flight: flight,
         flightId: flightId
      };
      PromotionsService.storePromotion(data).then(response => showModal());
   };

   useEffect(() => {
      PromotionsService.getPromotions().then(response => {
         setPromotions(response.data.promotions);
         setFlights(response.data.flights);
         console.log(response.data);
      });
   }, []);

   return (
      <div className="promotions-container">
         <div className="mt-3 mb-5">
            <h2 className="text-center">Stranica za upravljanje promotivnim cijenama</h2>
         </div>
         <div className="col-xs-12 col-md-8" id="reservationsbody">
            <div className="actions-container">
               <button id="centered-toggle-button" className="btn btn-primary toggle-button" type="button" onClick={event => {showModal()}}>
                  Dodaj promo cijenu
               </button>
            </div>
            <table className="table table-striped table-bordered" id="reservationstable">
               <thead>
                  <tr>
                     <th>Destinacija</th>
                     <th>Cijena</th>
                     <th>Datum leta</th>
                  </tr>
               </thead>
               <tbody>
                  {/*$sql = "select f.city_from, f.city_to, f.price * 0.4 as price, f.flight_date from promos p, flights f where f.id = p.flight_id and f.flight_date >= now() and f.active = 1  order by p.id desc limit 12";*/}
                  {promotions.map(promotion => {
                     return (
                        <tr key={ promotion.id }>
                           <td>{ promotion.flight.cityTo }</td>
                           <td>{ promotion.flight.price } &euro;</td>
                           <td>{ convertToDateTimeFormat(promotion.flight.flightDate, 'DD/MM/YYYY') }</td>
                        </tr>
                     )
                  })}
               </tbody>
            </table>
         </div>
         <AirplaneCreate title="Dodaj avion" onClose={showModal} show={show}>
            <form id="promoaddform" onSubmit={storePromotion}>
               <div className="form-group">
                  <label htmlFor="cityFrom">Let</label>
                  <select id="cityFrom"
                          className="form-control"
                          value={flightId}
                          onChange={event => setFlightId(event.target.value)}>
                     {/*$sqlFlights = "select * from flights where active = 1 and city_from = 'Belgrade' and flight_date >= now()";*/}
                     <option value="">Izaberite let</option>
                     {flights.map(flight => {
                        return (
                           <option value={flight.id} key={flight.id}>
                              {flight.cityFrom + ' - ' + flight.cityTo + ', ' + convertToDateTimeFormat(flight.flightDate, 'DD/MM/YYYY') + ', ' + flight.price} &euro;
                           </option>
                        )
                     })}
                     {/*<?php echo $rowFlights['city_from'] . ' - ' . $rowFlights['city_to'] . ', ' . $rowFlights['flight_date'] . ', ' . $rowFlights['price'] * 0.4;?>&euro;*/}
                  </select>
               </div>
               <div className="form-group">
                  <label htmlFor="cityTo">Nova promotivna cijena</label>
                  <input type="number"
                         min="1"
                         className="form-control"
                         id="price"
                         value={price}
                         onChange={event => setPrice(event.target.value)} />
               </div>
               <button type="submit" className="btn btn-primary" id="addPromoBtn">
                  Dodaj promo cijenu
               </button>
            </form>
         </AirplaneCreate>
         {/*<script>*/}
         {/*   $(document).ready(function () {*/}
         {/*   $('#reservationstable').DataTable();*/}
         {/*   $("#promoaddform").submit(function (event) {*/}
         {/*   event.preventDefault();*/}
         {/*   var flight = $('#flight').val();*/}
         {/*   var newprice = $('#newprice').val();*/}
         {/*   if (newprice < 20 || newprice > 1500) {*/}
         {/*   alert("Neispravna cijena.");*/}
         {/*   return;*/}
         {/*}*/}
         {/*   $("#addPromoBtn").prop('disabled', true);*/}
         {/*   $("#addPromoBtn").prop('value', "Molimo sacekajte...");*/}

         {/*   $.post("addPromo", {flight: flight, newprice: newprice})*/}
         {/*   .done(function (data) {*/}
         {/*   $("#addPromoBtn").prop('disabled', false);*/}
         {/*   $("#addPromoBtn").prop('value', "Dodaj avion");*/}
         {/*   if (data == -1) {*/}
         {/*   alert("Greska u sistemu.");*/}
         {/*} else {*/}
         {/*   alert('Uspjesno dodat promotivni let.');*/}
         {/*   window.location.replace('promotions');*/}
         {/*   /*var dugme = "<a class=\"btn btn-default btn-sm delete\" onclick=\"deletefunc(this.id)\" id=\"" + data + "\"><span class=\"glyphicon glyphicon-trash\"></span> Izbrisi</a>";*/}
         {/* $('#flightstable tr:last').after('<tr id=\"' + data + '\"><td>' + cityfrom + '</td><td>' + cityto + '</td><td>' + datum + '</td><td>' + boardingtime + ':00</td><td>' + loadingtime + ':00</td><td>' + price + '</td><td>' + modelname + dugme + '</td></tr>');*/}

         {/* */}
         {/*}*/}
         {/*});*/}
         {/*});*/}
         {/*});*/}
         {/*</script>*/}
      </div>
   );
}

export default PromotionsComponent;