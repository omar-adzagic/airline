import React, {useEffect, useState} from 'react';
import '../styles/home.scss';
import FlightsService from "../services/FlightsService";
import AirplaneCreate from "./AirplaneCreate";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import {convertToDateTimeFormat, convertToMysqlDateFormat} from "../libraries/my-libs";
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";

function FlightsComponent() {
   const [show, setShow] = useState(false);
   const [flights, setFlights] = useState([]);
   const [citiesFrom, setCitiesFrom] = useState([]);
   const [citiesTo, setCitiesTo] = useState([]);
   const [cityFrom, setCityFrom] = useState('');
   const [cityTo, setCityTo] = useState('');
   const [flightDate, setFlightDate] = useState('');
   const [boardingTime, setBoardingTime] = useState('');
   const [returnTicket, setReturnTicket] = useState('');
   const [returnDate, setReturnDate] = useState('');
   const [boardingTimeReturn, setBoardingTimeReturn] = useState('');
   const [price, setPrice] = useState('');
   const [citiesFromFilter, setCitiesFromFilter] = useState('');
   let [citiesToFilter, setCitiesToFilter] = useState('');

   const showModal = event => setShow(!show);

   const storeFlight = event => {
      event.preventDefault();
      const data = {
         cityFrom: cityFrom,
         cityTo: cityTo,
         flightDate: flightDate[0],
         boardingTime: boardingTime[0],
         returnDate: returnDate,
         boardingTimeReturn: boardingTimeReturn,
         price: price,
      };
      FlightsService.storeFlight(data).then(response => {
         showModal();
      });
   };

   const deleteFlight = (event, id) => {
      event.preventDefault();
      FlightsService.deleteFlight(id).then(response => {
         console.log('deleted');
      });
   };

   const filterFlights = event => {
      setCitiesFromFilter(event.target.value);
      console.log(citiesFromFilter);
      const filters = {
         citiesFromFilter: citiesFromFilter,
         citiesToFilter: citiesToFilter
      };
      FlightsService.filterFlights(filters)
   };

   useEffect(() => {
      FlightsService.getData().then(response => {
         setFlights(response.data.flights);
         setCitiesFrom(response.data.citiesFrom);
         setCitiesTo(response.data.citiesTo);
      });
   }, []);

   return (
      <div className="page-container">
         <div className="col-xs-12 col-md-12">
            <h2 className="text-center">Stranica za upravljanje letovima</h2>
         </div>
         <div id="flightsbody">
            <div className="page-actions">
               {/*<form id="filter">*/}
                  <div className="filters">
                     <div className="filter">
                        <label htmlFor="citiesFrom">Mjesto polaska:</label>
                        <select id="citiesFrom"
                                className="form-control"
                                value={citiesFromFilter}
                                onChange={filterFlights}>
                           <option>Svi</option>
                           {citiesFrom.map(cityFrom => {
                              return (
                                 <option value={cityFrom} key={cityFrom}>{cityFrom}</option>
                              )
                           })}
                        </select>
                     </div>
                     <div className="filter">
                        <label htmlFor="citiesTo">Destinacija:</label>
                        <select id="citiesTo" className="form-control">
                           <option>Svi</option>
                           {citiesTo.map(cityTo => {
                              return (
                                 <option value={cityTo} key={cityTo}>{cityTo}</option>
                              )
                           })}
                        </select>
                     </div>
                     {/*<div className="filter">*/}
                     {/*   <button type="submit" className='btn btn-primary form-control'>*/}
                     {/*      Pretraži*/}
                     {/*   </button>*/}
                     {/*</div>*/}
                  </div>
                  <div className="filter">
                     <button id="centered-toggle-button" className="btn btn-primary toggle-button" type="button" onClick={ event => showModal()}>
                        Zakaži let
                     </button>
                  </div>
               {/*</form>*/}
            </div>
            <table className="table table-striped table-bordered" id="flightstable">
               <thead>
               <tr>
                  <th>Mjesto polaska</th>
                  <th>Destinacija</th>
                  <th>Datum</th>
                  <th>Boarding time</th>
                  <th>Boarding (return)</th>
                  <th>Osnovna cijena</th>
                  <th>Model aviona</th>
                  <th>Akcija</th>
               </tr>
               </thead>

               <tbody>
               {/*<?php*/}
               {/*$sql = "select f.id, f.city_from, f.return_date, f.boarding_time, f.flight_date, f.boarding_time_return, f.city_to, a.model, f.price from airplanes a, flights f where a.id = f.airplane_id and f.active = 1 and f.flight_date >= now() order by f.boarding_time desc";*/}
               {/*$result = DB::select(DB::raw($sql));*/}
               {/*foreach($result as $row){*/}
               {/*$row = (array)$row;*/}
               {/*?>*/}
               {flights.map((flight, i) => {
                  return (
                     <tr key={i}>
                        <td>{ flight.cityFrom }</td>
                        <td>{ flight.cityTo }</td>
                        <td>{ convertToDateTimeFormat(flight.flightDate, 'DD/MM/YYYY') }</td>
                        <td>{ convertToDateTimeFormat(flight.boardingTime, 'DD/MM/YYYY') }</td>
                        <td>{ convertToDateTimeFormat(flight.boardingTimeReturn, 'DD/MM/YYYY') }</td>
                        <td>{ flight.price } &euro;</td>
                        <td>Test model</td>
                        <td>
                           <button type="button" className="btn btn-sm btn-danger" onClick={ event => deleteFlight(event, flight.id) }>
                              <FontAwesomeIcon icon={faTrashAlt} /> Izbriši
                           </button>
                        </td>
                     </tr>
                  )
               })}
               {/*<?php*/}
               {/*}*/}
               {/*?>*/}
               </tbody>
            </table>
         </div>
         <AirplaneCreate title="Zakaži let" onClose={showModal} show={show}>
            <form id="flightaddform" onSubmit={storeFlight}>
               <div className="form-group">
                  <label htmlFor="cityFrom">Mjesto polaska</label>
                  <input type="text"
                         className="form-control"
                         id="cityFrom"
                         value={cityFrom}
                         onChange={event => setCityFrom(event.target.value)} />
               </div>
               <div className="form-group">
                  <label htmlFor="cityTo">Destinacija</label>
                  <input type="text"
                         className="form-control"
                         id="cityTo"
                         value={cityTo}
                         onChange={event => setCityTo(event.target.value)} />
               </div>
               <div className="form-group">
                  <label htmlFor="flightDate">Datum polaska</label>
                  <Flatpickr id="flightDate"
                             className="form-control"
                             value={flightDate}
                             onChange={date => setFlightDate(date)} />
               </div>
               <div className="form-group">
                  <label htmlFor="boardingTime">Boarding time</label>
                  {/*<input type="time"*/}
                  {/*       className="form-control"*/}
                  {/*       id="boardingTime"*/}
                  {/*       value={boardingTime}*/}
                  {/*       onChange={event => setBoardingTime(event.target.value)} />*/}
                  <Flatpickr id="boardingTime"
                             className="form-control"
                             data-enable-time
                             value={boardingTime}
                             options={{
                                enableTime: true,
                                noCalendar: true,
                                dateFormat: "H:i",
                                time_24hr: true
                             }}
                             onChange={date => setBoardingTime(date)} />
               </div>
               <div className="checkbox">
                  <label>
                     <input type="checkbox"
                             id="returnTicket"
                             value={returnTicket}
                             onChange={event => setReturnTicket(event.target.value)} />
                             Povratna karta
                  </label>
               </div>
               <div className="form-group">
                  <label htmlFor="returnDate">Datum povratka</label>
                  <input type="date"
                         className="form-control"
                         id="returnDate"
                         disabled
                         value={returnDate}
                         onChange={event => setReturnDate(event.target.value)} />
               </div>
               <div className="form-group">
                  <label htmlFor="boardingTimeReturn">Boarding time for return</label>
                  <input type="time"
                         className="form-control"
                         id="boardingTimeReturn"
                         disabled
                         value={boardingTimeReturn}
                         onChange={event => setBoardingTimeReturn(event.target.value)} />
               </div>
               <div className="form-group">
                  <label htmlFor="price">Cijena</label>
                  <input id="price"
                         className="form-control"
                         type="number"
                         min="1"
                         value={price}
                         onChange={event => setPrice(event.target.value)} />
               </div>
               <div className="form-group">
                  <label htmlFor="model">Model</label>
                  <select className="form-control" id="model">
                     {/*<?php*/}
                     {/*$sqlModels = "select a.id, a.model from airplanes a where a.active = 1;";*/}
                     {/*$result = DB::select(DB::raw($sqlModels));*/}
                     {/*foreach($result as $row){*/}
                     {/*$row = (array)$row;*/}
                     {/*?>*/}
                     <option id=""></option>
                     {/*<?php*/}
                     {/*}*/}
                     {/*?>*/}
                     {/*}*/}
                  </select>
               </div>
               <button type="submit" className="btn btn-primary form-control" id="addFlightBtn">
                  Zakaži
               </button>
            </form>

            {/*<script>*/}
            {/*   function deletefunc(clickedid) {*/}
            {/*   $.post("deleteflight", {id: clickedid})*/}
            {/*      .done(function (data) {*/}
            {/*         if (data == -1) {*/}
            {/*            alert("Greska u sistemu.");*/}
            {/*         } else {*/}
            {/*            $('#flightstable tr#' + clickedid).remove();*/}
            {/*         }*/}
            {/*      });*/}
            {/*}*/}
            {/*   $(document).ready(function () {*/}
            {/*   var flightstable = $('#flightstable').DataTable({*/}
            {/*   "pageLength": 6,*/}
            {/*   "order": [[2, "asc"]]*/}
            {/*});*/}
            {/*   $("#flightaddform").submit(function (event) {*/}
            {/*   event.preventDefault();*/}
            {/*   var cityfrom = $('#cityfrom').val();*/}
            {/*   var cityto = $('#cityto').val();*/}
            {/*   var datum = $('#datum').val();*/}
            {/*   var boardingtime = $('#boardingtime').val();*/}
            {/*   var price = $('#price').val();*/}
            {/*   var model = $('#model').children(":selected").attr("id");*/}
            {/*   var modelname = $('#model').val();*/}
            {/*   var datumPovratka = "null";*/}
            {/*   var boardingtimeback = "null";*/}
            {/*   if ($("#povratna").is(":checked")) {*/}
            {/*   datumPovratka = $("#datumPovratka").val();*/}
            {/*   boardingtimeback = $('#boardingtimeback').val();*/}
            {/*}*/}
            {/*   if (new Date(datum).getTime() > new Date(datumPovratka).getTime()) {*/}
            {/*   alert("Datum povratka ne smije biti prije datuma polaska");*/}
            {/*   return;*/}
            {/*}*/}
            {/*   if (cityfrom.length > 50) {*/}
            {/*   alert("Predugacak naziv grada polaska.");*/}
            {/*   return;*/}
            {/*}*/}
            {/*   if (cityto.length > 50) {*/}
            {/*   alert("Predugacak naziv destinacije.");*/}
            {/*   return;*/}
            {/*}*/}
            {/*   if (price < 20 || price > 1500) {*/}
            {/*   alert("Neispravna cijena.");*/}
            {/*   return;*/}
            {/*}*/}
            {/*   var splitovanoboarding = boardingtime.split(" ");*/}
            {/*   var ampm = splitovanoboarding[1];*/}
            {/*   var minutisatisplitovani = splitovanoboarding[0].split(":");*/}
            {/*   var sati = minutisatisplitovani[0];*/}
            {/*   var minuti = minutisatisplitovani[1];*/}
            {/*   if (ampm == "PM") {*/}
            {/*   sati += 12;*/}
            {/*}*/}
            {/*   boardingtime = sati + ":" + minuti;*/}
            {/*   if (boardingtimeback != "null") {*/}
            {/*   var splitovanoboardingtimeback = boardingtimeback.split(" ");*/}
            {/*   var ampm2 = splitovanoboardingtimeback[1];*/}

            {/*   var minutisatisplitovani2 = splitovanoboardingtimeback[0].split(":");*/}
            {/*   var sati2 = minutisatisplitovani2[0];*/}
            {/*   var minuti2 = minutisatisplitovani2[1];*/}
            {/*   if (ampm2 == "PM") {*/}
            {/*   sati2 += 12;*/}
            {/*}*/}
            {/*   boardingtimeback = sati2 + ":" + minuti2;*/}
            {/*}*/}
            {/*   $("#addFlightBtn").prop('disabled', true);*/}
            {/*   $("#addFlightBtn").prop('value', "Molimo sacekajte...");*/}

            {/*   $.post("addflight", {*/}
            {/*   cityfrom: cityfrom,*/}
            {/*   cityto: cityto,*/}
            {/*   datum: datum,*/}
            {/*   boardingtime: boardingtime,*/}
            {/*   boardingtimeback: boardingtimeback,*/}
            {/*   price: price,*/}
            {/*   model: model,*/}
            {/*   datumPovratka: datumPovratka*/}
            {/*})*/}
            {/*   .done(function (data) {*/}
            {/*   $("#addFlightBtn").prop('disabled', false);*/}
            {/*   $("#addFlightBtn").prop('value', "Dodaj avion");*/}
            {/*   if (data == -1) {*/}
            {/*   alert("Greska u sistemu.");*/}
            {/*} else {*/}
            {/*   var dugme = "<a class=\"btn btn-default btn-sm delete\" onclick=\"deletefunc(this.id)\" id=\"" + data + "\"><span class=\"glyphicon glyphicon-trash\"></span> Izbrisi</a>";*/}

            {/*   var datum2 = datum;*/}
            {/*   if (datumPovratka == "null") {*/}
            {/*   datum2 += ' (u jednom smjeru)';*/}
            {/*} else {*/}
            {/*   datum2 += ' do ' + datumPovratka;*/}
            {/*}*/}
            {/*   boardingtimeback = boardingtimeback + ":00";*/}
            {/*   if (boardingtimeback == "null:00") {*/}
            {/*   boardingtimeback = " nije povratna";*/}
            {/*}*/}
            {/*   flightstable.row.add([*/}
            {/*   cityfrom,*/}
            {/*   cityto,*/}
            {/*   datum2,*/}
            {/*   boardingtime + ":00",*/}
            {/*   boardingtimeback,*/}
            {/*   price,*/}
            {/*   modelname + dugme*/}
            {/*   ]).draw(false);*/}

            {/*   $('#flightstable tr:first').attr("id", data);*/}

            {/*   */}
            {/*   $('#flightstable tr:last').after('<tr id=\"' + data + '\"><td>' + cityfrom + '</td><td>' + cityto + '</td><td>' + datum + '</td><td>' + boardingtime + ':00</td><td>' + loadingtime + ':00</td><td>' + price + '</td><td>' + modelname + dugme + '</td></tr>');*/}
            {/*}*/}
            {/*});*/}
            {/*});*/}
            {/*   $("#filter").submit(function (event) {*/}
            {/*   event.preventDefault();*/}
            {/*   var filterfrom = $('#filterfrom').val();*/}
            {/*   var filterto = $('#filterto').val();*/}
            {/*   $.post("filterflights", {filterfrom: filterfrom, filterto: filterto})*/}
            {/*   .done(function (data) {*/}
            {/*   if (data == -1) {*/}
            {/*   alert("Greska u sistemu.");*/}
            {/*} else {*/}
            {/*   $('#flightstable').dataTable().fnDestroy();*/}
            {/*   $('#flightstable tbody').html();*/}
            {/*   $('#flightstable tbody').html(data);*/}
            {/*   flightstable = $('#flightstable').DataTable({*/}
            {/*   "pageLength": 6,*/}
            {/*   "order": [[2, "asc"]]*/}
            {/*});*/}
            {/*}*/}
            {/*});*/}
            {/*});*/}
            {/*   $("#povratna").click(function (event) {*/}
            {/*   if ($("#povratna").is(":checked")) {*/}
            {/*   $(".datumPovratka").css("color", "white");*/}
            {/*   $("#datumPovratka").prop("disabled", false);*/}
            {/*   $(".boardingtimeback").css("color", "white");*/}
            {/*   $("#boardingtimeback").prop("disabled", false);*/}
            {/*} else {*/}
            {/*   $(".datumPovratka").css("color", "green");*/}
            {/*   $("#datumPovratka").prop("disabled", true);*/}
            {/*   $(".boardingtimeback").css("color", "green");*/}
            {/*   $("#boardingtimeback").prop("disabled", true);*/}
            {/*}*/}
            {/*});*/}
            {/*});*/}
            {/*</script>*/}
         </AirplaneCreate>
      </div>
   );
}

export default FlightsComponent;