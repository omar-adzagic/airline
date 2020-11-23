import React, {useEffect, useState} from 'react';
import ReservationsService from "../services/ReservationsService";
import { convertToDateTimeFormat } from "../libraries/my-libs";

function ReservationsComponent() {
   const [reservations, setReservations] = useState([]);

   useEffect(() => {
      ReservationsService.getReservations().then(response => {
         setReservations(response.data);
      });
   }, []);

   return (
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
                        </tr>
                     )
                  })}
               </tbody>
            </table>
         </div>
      </div>
   );
}

export default ReservationsComponent;