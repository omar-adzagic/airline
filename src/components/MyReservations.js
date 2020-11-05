import React, {useEffect, useState} from 'react';
import MyReservationsService from "../services/MyReservationsService";
import { convertToDateTimeFormat } from "../libraries/my-libs";

function MyReservations() {
   const [myReservations, setMyReservations] = useState([]);

   const cancelReservation = reservationId => {
      MyReservationsService.toggleReservation().then(response => {
         console.log(response);
      });
   };

   useEffect(() => {
      MyReservationsService.getMyReservations().then(response => {
         setMyReservations(response.data);
      });
   }, []);

   return (
      <div className="row">
         <div className="col-xs-12 col-md-12">
            <h2 className="text-center">Moje rezervacije</h2>
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
                  <th>Otkaži</th>
               </tr>
               </thead>
               <tbody>
               {/*$sql = "select r.id, u.name, r.time, r.class, f.city_from, f.city_to, a.model, f.price, f.flight_date from users u, reservations r, airplanes a, flights f where u.id = r.user_id and a.id = f.airplane_id and r.id not in(select id from cancelled_reservations) and f.id = r.flight_id and r.user_id = $userid order by r.time desc";*/}
               {myReservations.map(reservation => {
                  return (
                     <tr key={ reservation.id }>
                        <td>{ reservation.user.firstName + " " + reservation.user.lastName }</td>
                        <td>{ convertToDateTimeFormat(reservation.time, 'DD/MM/YYYY') }</td>
                        <td>{ reservation.flight.cityFrom }</td>
                        <td>{ reservation.flight.cityTo }</td>
                        <td>{ convertToDateTimeFormat(reservation.flight.flightDate, 'DD/MM/YYYY') }</td>
                        <td>{ reservation.flight.airplane.model }</td>
                        <td>{ reservation.reservationClass }</td>
                        <td>{ reservation.flight.price } &euro;</td>
                        <td>
                           <button className="btn btn-warning" onClick={cancelReservation(reservation.id)}>
                              Otkaži
                           </button>
                        </td>
                     </tr>
                  )
               })}
               </tbody>
            </table>
         </div>
      </div>
   );
}

export default MyReservations;
