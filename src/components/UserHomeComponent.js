import React, {useEffect, useState} from "react";
import {checkIfEmpty, checkIfNotEmpty, convertToDateTimeFormat} from "../libraries/my-libs";
import FlightsService from "../services/FlightsService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";

function UserHomeComponent() {
    const [flights, setFlights] = useState([]);
    const [citiesFrom, setCitiesFrom] = useState([]);
    const [citiesTo, setCitiesTo] = useState([]);
    const [citiesFromFilter, setCitiesFromFilter] = useState('');
    const [citiesToFilter, setCitiesToFilter] = useState('');

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

    const ReturnTime = props => {
        return checkIfEmpty(props.boardingTimeReturn) ? (<small className="font-italic">Let u jednom smjeru</small>) : convertToDateTimeFormat(props.boardingTimeReturn, 'HH:mm');
    };

    useEffect(() => {
        FlightsService.getData().then(response => {
            setFlights(response.data.flights);
            setCitiesFrom(response.data.citiesFrom);
            setCitiesTo(response.data.citiesTo);
        });
    }, []);

    return (
        <div className="home-container">
            <div className="mt-3 mb-5">
                <h2 id="naslov" style={{ textAlign: "center" }}>
                    Letovi u ponudi <span style={{ color: "green" }} className="glyphicon glyphicon-arrow-down"></span>
                </h2>
            </div>
            <div className="page-actions">
                <div className="filters">
                    {/*<div className="filter">*/}
                    {/*    <label htmlFor="datumFrom">Datum polaska</label>*/}
                    {/*    <input type="date" className="form-control" id="datumFrom" min="" required />*/}
                    {/*</div>*/}
                    {/*<div className="filter">*/}
                    {/*    <label htmlFor="datumTo">Datum dolaska</label>*/}
                    {/*    <input type="date" className="form-control" id="datumTo" min="" />*/}
                    {/*</div>*/}
                    <div className="filter">
                        <label htmlFor="citiesFrom">Mjesto polaska</label>
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
                        <label htmlFor="citiesTo">Destinacija</label>
                        <select id="citiesTo"
                                className="form-control"
                                onChange={filterCityToFlights}>
                            <option value="">Svi</option>
                            {citiesTo.map(cityTo => {
                                return (<option value={cityTo} key={cityTo}>{cityTo}</option>)
                            })}
                        </select>
                    </div>
                    {/*<div className="filter">*/}
                    {/*   <button type="submit" className='btn btn-primary form-control'>*/}
                    {/*      Pretraži*/}
                    {/*   </button>*/}
                    {/*</div>*/}
                </div>
            </div>
            <table className="table table-striped table-bordered" id="userpocetnatabela">
                <thead>
                <tr>
                    <th>Mjesto polaska</th>
                    <th>Destinacija</th>
                    <th>Datum</th>
                    <th>Vrijeme ukrcavanja</th>
                    <th>Povratno vrijeme ukrcavanja</th>
                    <th>Osnovna cijena</th>
                    <th>Model aviona</th>
                    <th>Detalji i rezervacija</th>
                </tr>
                </thead>
                <tbody>
                {/*$sql = "select f.id, f.city_from, f.return_date, f.boarding_time, f.flight_date, f.boarding_time_return, f.city_to, a.model, f.price from airplanes a, flights f where a.id = f.airplane_id and f.active = 1 and f.flight_date >= now() order by f.boarding_time desc";*/}
                {flights.map((flight, i) => {
                    return (
                        <tr key={flight.id}>
                            <td>{flight.cityFrom}</td>
                            <td>{flight.cityTo}</td>
                            <td>{convertToDateTimeFormat(flight.flightDate, 'DD/MM/YYYY')}</td>
                            <td>{convertToDateTimeFormat(flight.boardingTime, 'HH:mm')}</td>
                            <td>{<ReturnTime boardingTimeReturn={flight.boardingTimeReturn} />}</td>
                            <td>{flight.price} &euro;</td>
                            <td>{flight.airplane.model}</td>
                            <td>
                                <Link to={`/flights/${flight.id}`}>
                                    <button type="button" className="btn btn-primary">
                                        <FontAwesomeIcon icon={faEye} />
                                    </button>
                                </Link>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}

export default UserHomeComponent;