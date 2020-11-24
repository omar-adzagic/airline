import React, { useEffect, useState } from 'react';
import '../styles/home.scss';
import FlightsService from "../services/FlightsService";
import {convertToDateTimeFormat} from "../libraries/my-libs";
import ReservationsService from "../services/ReservationsService";
import moment from "moment";

function FlightComponent({ match }) {
    const [flight, setFlight] = useState([]);
    const [airplane, setAirplane] = useState([]);
    const [reservationClass, setReservationClass] = useState('Ekonomicna');
    const [time, setTime] = useState('');

    const {
        params: { flightId },
    } = match;

    useEffect(() => {
        FlightsService.getFlight(flightId).then(response => {
            setFlight(response.data);
            console.log(response.data);
            setAirplane(response.data.airplane);
        });
    }, [flightId]);

    const makeReservation = (event, flightId) => {
        event.preventDefault();
        const user = JSON.parse(localStorage.getItem('user'));
        const data = {
            flight: { id: flightId },
            reservationClass: reservationClass,
            time: moment().utc(),
            canceled: false,
            user: { id: user.id }
        };
        ReservationsService.makeReservation(data).then(response => {
            window.location.href = "/reservations/my";
        });
    };

    const formatFlightPrice = flightPrice => (flightPrice * 0.4).toFixed(2);

    return (
        <div id="flightbody">
            <div id="flightdetails">
                <h2>Detalji o izabranom letu</h2>
                <hr />
                <div className="separator">
                    <div className="left">
                        <p>Mjesto polaska:</p>
                        <p>Destinacija:</p>
                        <p>Datum:</p>
                        <p>Vrijeme ukrcavanja:</p>
                        <p>Ekonomična klasa:</p>
                        <p>Biznis klasa:</p>
                        <p>Model aviona:</p>
                        <p>Kapacitet:</p>
                    </div>
                    <div className="right">
                        <p>{ flight.cityFrom }</p>
                        <p>{ flight.cityTo }</p>
                        <p>{ convertToDateTimeFormat(flight.flightDate, 'DD/MM/YYYY') }</p>
                        <p>{ convertToDateTimeFormat(flight.boardingTime, 'HH:mm') }</p>
                        <p>{ formatFlightPrice(flight.price) } &euro;</p>
                        <p>{ flight.price } &euro;</p>
                        <p>{ airplane.model }</p>
                        <p>{ airplane.capacity }</p>
                        {/*<?php if ($row['return_date'] != null) {*/}
                        {/*    echo ",povratak " . $row['return_date'];*/}
                        {/*} else {*/}
                        {/*    echo " (u jednom smjeru)";*/}
                        {/*} ?>*/}
                    </div>
                </div>
                <hr />
                <div className="actions">
                    <select id="class"
                            className="form-control"
                            value={reservationClass}
                            onChange={event => setReservationClass(event.target.value)}>
                        <option value="Ekonomicna">Ekonomična</option>
                        <option value="Biznis">Biznis</option>
                    </select>
                    <button id="reserve"
                            className="btn btn-primary"
                            type="submit"
                            onClick={(event) => makeReservation(event, flight.id) }>Rezerviši</button>
                </div>
            </div>
            {/*<style>*/}
            {/*body {*/}
            {/*background - image: url('images/airplanetakeoff.jpg');*/}
            {/*background-size: cover*/}
            {/*}*/}
            {/*</style>*/}

            {/*<script>*/}
            {/*    $(document).ready(function () {*/}
            {/*    $("#reserve").click(function () {*/}
            {/*        var id = <?php echo $_GET['flightid']; ?>;*/}
            {/*        var klasa = $("#class").val();*/}
            {/*        $.post("reservation", {id: id, klasa: klasa})*/}
            {/*            .done(function (data) {*/}
            {/*                if (data == -1) {*/}
            {/*                    alert("Greska u sistemu.");*/}
            {/*                } else {*/}
            {/*                    alert("Uspjesna rezervacija.");*/}
            {/*                    window.location.replace("myreservations");*/}
            {/*                }*/}
            {/*            });*/}
            {/*        });*/}

            {/*    });*/}
            {/*</script>*/}
        </div>
    );
}

export default FlightComponent;