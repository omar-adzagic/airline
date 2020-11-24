import React, {useEffect, useState} from 'react';
import '../styles/home.scss';
import FlightsService from "../services/FlightsService";
import AirplaneCreate from "./AirplaneCreate";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlusCircle, faEye } from '@fortawesome/free-solid-svg-icons';
import {
   checkIfEmpty,
   checkIfNotEmpty,
   convertToDateTimeFormat,
   convertToMysqlDateFormat,
   swalNotification
} from "../libraries/my-libs";
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import ValidationErrorMessage from "./partials/ValidationErrorMessage";

function FlightsComponent() {
   const [show, setShow] = useState(false);
   const [flights, setFlights] = useState([]);
   const [airplanes, setAirplanes] = useState([]);
   const [citiesFrom, setCitiesFrom] = useState([]);
   const [citiesTo, setCitiesTo] = useState([]);
   const [cityFrom, setCityFrom] = useState('');
   const [cityTo, setCityTo] = useState('');
   const [flightDate, setFlightDate] = useState('');
   const [boardingTime, setBoardingTime] = useState('');
   const [returnTicket, setReturnTicket] = useState(false);
   const [returnDate, setReturnDate] = useState('');
   const [boardingTimeReturn, setBoardingTimeReturn] = useState('');
   const [price, setPrice] = useState('');
   const [airplaneId, setAirplaneId] = useState('');
   const [citiesFromFilter, setCitiesFromFilter] = useState('');
   const [citiesToFilter, setCitiesToFilter] = useState('');
   const [errorsCityFrom, setErrorsCityFrom] = useState('');
   const [errorsCityFromPresent, setErrorsCityFromPresent] = useState(false);
   const [errorsCityTo, setErrorsCityTo] = useState('');
   const [errorsCityToPresent, setErrorsCityToPresent] = useState(false);
   const [errorsFlightDate, setErrorsFlightDate] = useState('');
   const [errorsFlightDatePresent, setErrorsFlightDatePresent] = useState(false);
   const [errorsBoardingTime, setErrorsBoardingTime] = useState('');
   const [errorsBoardingTimePresent, setErrorsBoardingTimePresent] = useState(false);
   const [errorsReturnDate, setErrorsReturnDate] = useState('');
   const [errorsReturnDatePresent, setErrorsReturnDatePresent] = useState(false);
   const [errorsBoardingTimeReturn, setErrorsBoardingTimeReturn] = useState('');
   const [errorsBoardingTimeReturnPresent, setErrorsBoardingTimeReturnPresent] = useState(false);
   const [errorsPrice, setErrorsPrice] = useState('');
   const [errorsPricePresent, setErrorsPricePresent] = useState(false);
   const [errorsAirplane, setErrorsAirplane] = useState('');
   const [errorsAirplanePresent, setErrorsAirplanePresent] = useState(false);

   const ReturnTicketHtml = props => {
      return (
          <div>
             <div className="form-group">
                <label htmlFor="returnDate">Datum povratka</label>
                <Flatpickr id="returnDate"
                           className={`form-control ${errorsReturnDatePresent ? "border border-danger" : ""}`}
                           value={returnDate}
                           onChange={date => setReturnDate(date)}/>
                <ValidationErrorMessage errorMessage={errorsReturnDate}/>
             </div>
             <div className="form-group">
                <label htmlFor="boardingTimeReturn">Povratno vrijeme ukrcavanja</label>
                <Flatpickr id="boardingTimeReturn"
                           className={`form-control ${errorsBoardingTimeReturnPresent ? "border border-danger" : ""}`}
                           data-enable-time
                           value={boardingTimeReturn}
                           options={{
                              enableTime: true,
                              noCalendar: true,
                              dateFormat: "H:i",
                              time_24hr: true
                           }}
                           onChange={date => setBoardingTimeReturn(date)} />
                <ValidationErrorMessage errorMessage={errorsBoardingTimeReturn} />
             </div>
          </div>
      );
   };

   const showModal = event => setShow(!show);

   const resetValidationErrors = () => {
      setErrorsCityFrom('');
      setErrorsCityFromPresent(false);
      setErrorsCityTo('');
      setErrorsCityToPresent(false);
      setErrorsFlightDate('');
      setErrorsFlightDatePresent(false);
      setErrorsBoardingTime('');
      setErrorsBoardingTimePresent(false);
      setErrorsReturnDate('');
      setErrorsReturnDatePresent(false);
      setErrorsBoardingTimeReturn('');
      setErrorsBoardingTimeReturnPresent(false);
      setErrorsPrice('');
      setErrorsPricePresent(false);
      setErrorsAirplane('');
      setErrorsAirplanePresent(false);
   };

   const storeFlight = event => {
      event.preventDefault();
      resetValidationErrors();
      const data = {
         cityFrom: cityFrom,
         cityTo: cityTo,
         flightDate: flightDate[0],
         boardingTime: boardingTime[0],
         returnDate: returnDate[0],
         boardingTimeReturn: boardingTimeReturn[0],
         price: price,
         active: true,
         promoted: false,
      };
      if (checkIfNotEmpty(airplaneId)) {
         data.airplane = {
            id: airplaneId
         }
      }
      FlightsService.storeFlight(data).then(response => {
         showModal();
         console.log(response.data);
         const flightsUpdated = [response.data, ...flights];
         setFlights(flightsUpdated);
      }).catch(error => {
         if (error.response.data.status == 400) {
            error.response.data.errors.forEach(errorMessage => {
               switch (errorMessage.field) {
                  case "boardingTime":
                     setErrorsBoardingTime(errorMessage.defaultMessage);
                     setErrorsBoardingTimePresent(true);
                     break;
                  case "price":
                     setErrorsPrice(errorMessage.defaultMessage);
                     setErrorsPricePresent(true);
                     break;
                  case "cityFrom":
                     setErrorsCityFrom(errorMessage.defaultMessage);
                     setErrorsCityFromPresent(true);
                     break;
                  case "cityTo":
                     setErrorsCityTo(errorMessage.defaultMessage);
                     setErrorsCityToPresent(true);
                     break;
                  case "flightDate":
                     setErrorsFlightDate(errorMessage.defaultMessage);
                     setErrorsFlightDatePresent(true);
                     break;
                  case "boardingTimeReturn":
                     setErrorsBoardingTimeReturn(errorMessage.defaultMessage);
                     setErrorsBoardingTimeReturnPresent(true);
                     break;
                  case "airplane":
                     setErrorsAirplane(errorMessage.defaultMessage);
                     setErrorsAirplanePresent(true);
                     break;
               }
            })
         }
      });
   };

   const deleteFlight = (event, id) => {
      event.preventDefault();
      FlightsService.deleteFlight(id).then(response => {
         const newFlights = flights.filter(flight => flight.id != id);
         setFlights(newFlights);
      }).catch(error => {
         if (error.response.data.status == 400) {
            swalNotification('error', error.response.data.message);
         }
      });
   };

   const setAirplaneIdValue = event => {
      setAirplaneId(event.target.value);
   };

   const filterCityFromFlights = event => {
      setCitiesFromFilter(event.target.value);
      if (checkIfEmpty(event.target.value) && checkIfEmpty(citiesToFilter)) {
         FlightsService.getData().then(response => {
            setFlights(response.data.flights);
            setCitiesFrom(response.data.citiesFrom);
            setCitiesTo(response.data.citiesTo);
         });
      } else {
         const filters = {
            citiesFromFilter: event.target.value,
            citiesToFilter: citiesToFilter
         };
         FlightsService.filterFlights(filters).then(response => {
            setFlights(response.data);
         });
      }
   };

   const filterCityToFlights = event => {
      setCitiesToFilter(event.target.value);
      if (checkIfEmpty(event.target.value) && checkIfEmpty(citiesFromFilter)) {
         FlightsService.getData().then(response => {
            setFlights(response.data.flights);
            setCitiesFrom(response.data.citiesFrom);
            setCitiesTo(response.data.citiesTo);
         });
      } else {
         const filters = {
            citiesFromFilter: citiesFromFilter,
            citiesToFilter: event.target.value
         };
         FlightsService.filterFlights(filters).then(response => {
            setFlights(response.data);
         });
      }
   };

   const handleReturnTicket = (event) => {
      setReturnTicket(event.target.checked);
      setReturnDate('');
      setBoardingTimeReturn('');
   };

   useEffect(() => {
      FlightsService.getData().then(response => {
         setFlights(response.data.flights);
         setAirplanes(response.data.airplanes);
         setCitiesFrom(response.data.citiesFrom);
         setCitiesTo(response.data.citiesTo);
      });
   }, []);

   useEffect(() => {
   }, [returnTicket]);
   useEffect(() => {
      FlightsService.getData().then(response => {
         // setFlights(response.data.flights);
      });
   }, [flights]);

   return (
      <div className="page-container">
         <div className="mt-3 mb-5">
            <h2 className="text-center">Stranica za upravljanje letovima</h2>
         </div>
         <div id="flightsbody">
            <div className="page-actions">
               <div className="actions">
                  <button id="centered-toggle-button"
                          className="btn btn-primary toggle-button"
                          type="button"
                          style={{ whiteSpace: "nowrap" }}
                          onClick={ event => showModal()}>
                     Zakaži let
                  </button>
               </div>
               <div className="filters">
                  <div className="filter">
                     <label htmlFor="citiesFrom">Mjesto polaska:</label>
                     <select id="citiesFrom"
                             className="form-control"
                             value={citiesFromFilter}
                             onChange={filterCityFromFlights}>
                        <option value="">Svi</option>
                        {citiesFrom.map(cityFrom => {
                           return (
                              <option value={cityFrom} key={cityFrom}>{cityFrom}</option>
                           )
                        })}
                     </select>
                  </div>
                  <div className="filter">
                     <label htmlFor="citiesTo">Destinacija:</label>
                     <select id="citiesTo"
                             className="form-control"
                             onChange={filterCityToFlights}>
                        <option value="">Svi</option>
                        {citiesTo.map(cityTo => {
                           return (
                              <option value={cityTo} key={cityTo}>{cityTo}</option>
                           )
                        })}
                     </select>
                  </div>
               </div>
            </div>
            <table className="table table-striped table-bordered" id="flightstable">
               <thead>
               <tr>
                  <th>Mjesto polaska</th>
                  <th>Destinacija</th>
                  <th>Datum</th>
                  <th>Vrijeme ukrcavanja</th>
                  <th>Povratno vrijeme ukrcavanja</th>
                  <th>Osnovna cijena</th>
                  <th>Model aviona</th>
                  <th>Akcija</th>
               </tr>
               </thead>

               <tbody>
               {/*$sql = "select f.id, f.city_from, f.return_date, f.boarding_time, f.flight_date, f.boarding_time_return, f.city_to, a.model, f.price from airplanes a, flights f where a.id = f.airplane_id and f.active = 1 and f.flight_date >= now() order by f.boarding_time desc";*/}
               {flights.map((flight, i) => {
                  return (
                     <tr key={i}>
                        <td>{ flight.cityFrom }</td>
                        <td>{ flight.cityTo }</td>
                        <td>{ convertToDateTimeFormat(flight.flightDate, 'DD/MM/YYYY') }</td>
                        <td>{ convertToDateTimeFormat(flight.boardingTime, 'DD/MM/YYYY') }</td>
                        <td>{ checkIfNotEmpty(flight.boardingTimeReturn) ? convertToDateTimeFormat(flight.boardingTimeReturn, 'HH:mm') : (<small className="font-italic">Let u jednom smjeru</small>) }</td>
                        <td>{ flight.price } &euro;</td>
                        <td>{ flight.airplane.model }</td>
                        <td>
                           <button type="button" className="btn btn-sm btn-danger" onClick={ event => deleteFlight(event, flight.id) }>
                              <FontAwesomeIcon icon={faTrashAlt} /> Izbriši
                           </button>
                        </td>
                     </tr>
                  )
               })}
               </tbody>
            </table>
         </div>
         <AirplaneCreate title="Zakaži let" onClose={showModal} show={show}>
            <form id="flightaddform" onSubmit={storeFlight}>
               <div className="form-group">
                  <label htmlFor="cityFrom">Mjesto polaska</label>
                  <input type="text"
                         className={`form-control ${errorsCityFromPresent ? "border border-danger" : ""}`}
                         id="cityFrom"
                         value={cityFrom}
                         onChange={event => setCityFrom(event.target.value)} />
                  <ValidationErrorMessage errorMessage={errorsCityFrom} />
               </div>
               <div className="form-group">
                  <label htmlFor="cityTo">Destinacija</label>
                  <input type="text"
                         className={`form-control ${errorsCityToPresent ? "border border-danger" : ""}`}
                         id="cityTo"
                         value={cityTo}
                         onChange={event => setCityTo(event.target.value)} />
                  <ValidationErrorMessage errorMessage={errorsCityTo} />
               </div>
               <div className="form-group">
                  <label htmlFor="flightDate">Datum polaska</label>
                  <Flatpickr id="flightDate"
                             className={`form-control ${errorsFlightDatePresent ? "border border-danger" : ""}`}
                             value={flightDate}
                             onChange={date => setFlightDate(date)} />
                  <ValidationErrorMessage errorMessage={errorsFlightDate} />
               </div>
               <div className="form-group">
                  <label htmlFor="boardingTime">Vrijeme ukrcavanja</label>
                  <Flatpickr id="boardingTime"
                             className={`form-control ${errorsBoardingTimePresent ? "border border-danger" : ""}`}
                             data-enable-time
                             value={boardingTime}
                             options={{
                                enableTime: true,
                                noCalendar: true,
                                dateFormat: "H:i",
                                time_24hr: true
                             }}
                             onChange={date => setBoardingTime(date)} />
                  <ValidationErrorMessage errorMessage={errorsBoardingTime} />
               </div>
               <div className="checkbox">
                  <label>
                     <input type="checkbox"
                             id="returnTicket"
                             value={returnTicket}
                             onChange={event => handleReturnTicket(event)} /> Povratna karta
                  </label>
               </div>
               { returnTicket === true ? <ReturnTicketHtml /> : '' }
               <div className="form-group">
                  <label htmlFor="price">Cijena</label>
                  <input id="price"
                         className={`form-control ${errorsPricePresent ? "border border-danger" : ""}`}
                         type="number"
                         min="1"
                         value={price}
                         onChange={event => setPrice(event.target.value)} />
                  <ValidationErrorMessage errorMessage={errorsPrice} />
               </div>
               <div className="form-group">
                  <label htmlFor="model">Model</label>
                  <select className={`form-control ${errorsAirplanePresent ? "border border-danger" : ""}`}
                          id="model"
                          value={airplaneId}
                          onChange={setAirplaneIdValue}>>
                     {/*$sqlModels = "select a.id, a.model from airplanes a where a.active = 1;";*/}
                     <option value="">Izaberite avion</option>
                     {airplanes.map(airplane => {
                        return (
                            <option key={airplane.id} value={airplane.id}>
                               {airplane.model}
                            </option>
                        );
                     })}
                  </select>
                  <ValidationErrorMessage errorMessage={errorsAirplane} />
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