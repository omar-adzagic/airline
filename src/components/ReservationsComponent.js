import React, {useEffect, useState} from 'react';
import ReservationsService from "../services/ReservationsService";
import {convertToDateTimeFormat, swalNotification} from "../libraries/my-libs";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import FlightsService from "../services/FlightsService";

function ReservationsComponent() {
   const [reservations, setReservations] = useState([]);

   const deleteReservation = (event, id) => {
      event.preventDefault();
      ReservationsService.deleteReservation(id).then(response => {
         console.log('poz1');
         const newReservations = reservations.filter(flight => flight.id != id);
         setReservations(newReservations);
      }).catch(error => {
         console.log(error.response.data);
         if (error.response.data.status == 400) {
            swalNotification('error', error.response.data.message);
         }
      });
   };

   useEffect(() => {
      ReservationsService.getReservations().then(response => {
         setReservations(response.data);
      });
   }, []);

   return (
      <div style={{ width: "100%" }}>
         <div className="slideshow">
            <div className="slideshow-image" style={{ backgroundImage: "url('./images/airplanetakeoff.jpg')" }}></div>
            <div className="slideshow-image" style={{ backgroundImage: "url('./images/bg1.jpg')" }}></div>
            <div className="slideshow-image" style={{ backgroundImage: "url('./images/bg2.jpg')" }}></div>
            <div className="slideshow-image" style={{ backgroundImage: "url('./images/bg3.jpg')" }}></div>
         </div>
         <div className="reservations-container">
            <div className="mt-3 mb-5">
               <h2 className="text-center">Stranica za pregled rezervacija</h2>
            </div>
            <div className="col-xs-12 col-md-12" id="reservationsbody">
               <table className="table table-striped table-bordered" id="reservationstable">
                  <thead>
                     <tr>
                        <th>Osoba</th>
                        <th>Vrijeme rezervacije</th>
                        <th>Mjesto polaska</th>
                        <th>Destinacija</th>
                        <th>Datum leta</th>
                        <th>Model aviona</th>
                        <th>Klasa leta</th>
                        <th>Cijena</th>
                        <th>Akcija</th>
                     </tr>
                  </thead>
                  <tbody>
                     {/*$sql = "select u.name, r.time, r.class, f.city_from, f.city_to, a.model, f.price, f.flight_date from users u, reservations r, airplanes a, flights f where u.id = r.user_id and r.id not in(select id from cancelled_reservations) and a.id = f.airplane_id and f.id = r.flight_id order by r.time desc";*/}
                     {reservations.map(reservation => {
                        return (
                           <tr key={ reservation.id }>
                              <td>{ `${reservation.user.firstName} ${reservation.user.lastName}` }</td>
                              <td>{ convertToDateTimeFormat(reservation.time, 'DD/MM/YYYY') }</td>
                              <td>{ reservation.flight.cityFrom }</td>
                              <td>{ reservation.flight.cityTo }</td>
                              <td>{ convertToDateTimeFormat(reservation.flight.flightDate, 'DD/MM/YYYY') }</td>
                              <td>{ reservation.flight.airplane.model }</td>
                              <td>{ reservation.reservationClass }</td>
                              <td>{ reservation.flight.price } &euro;</td>
                              <td>
                                 <button type="button" className="btn btn-sm btn-danger" onClick={ event => deleteReservation(event, reservation.id) }>
                                    <FontAwesomeIcon icon={faTrashAlt} /> Izbriši
                                 </button>
                              </td>
                           </tr>
                        )
                     })}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
}

export default ReservationsComponent;