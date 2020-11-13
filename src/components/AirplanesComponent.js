import React, { useState, useEffect } from 'react';
import '../styles/home.scss';
import AirplanesService from "../services/AirplanesService";
import AirplaneCreate from "./AirplaneCreate";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

function AirplanesComponent() {
   const [show, setShow] = useState(false);
   const [airplanes, setAirplanes] = useState([{id: 1123123123}]);
   const [model, setModel] = useState('');
   const [capacity, setCapacity] = useState('');
   const [year, setYear] = useState('');

   const showModal = event => setShow(!show);

   const storeAirplane = event => {
      event.preventDefault();
      const data = {
         model: model,
         capacity: capacity,
         year: year,
         active: true,
      };
      AirplanesService.storeAirplane(data).then(response => {
         showModal();
      });
   };

   const deleteAirplane = (event, id) => {
      event.preventDefault();
      AirplanesService.deleteAirplane(id).then(response => {
         getAirplanes();
      });
   };

   const getAirplanes = () => {
      AirplanesService.getAirplanes().then(response => {
         setAirplanes(response.data);
      });
   };

   useEffect(() => {
      getAirplanes();
   }, []);

   useEffect(() => {

   }, [airplanes]);

   return (
      <div className="page-container">
         <div className="col-xs-12 col-md-12 mt-3 mb-5">
            <h2 className="text-center">Stranica za upravljanje avionima</h2>
         </div>
         <div id="airplanesbody">
            <div className="actions-container">
               <button id="centered-toggle-button" className="btn btn-primary toggle-button" type="button" onClick={event => {showModal()}}>
                  Dodaj avion
               </button>
            </div>
            <table className="table table-striped table-bordered" id="airplanestable">
               <thead>
                  <tr>
                     <th>Model</th>
                     <th>Kapacitet</th>
                     <th>Godina proizvodnje</th>
                     <th>Akcija</th>
                  </tr>
               </thead>
               <tbody>
                  {/*$sql = "select * from airplanes where active = 1 order by id";*/}
                  {airplanes.map((airplane, i) => {
                     return (
                        <tr key={airplane.id}>
                           <td>{ airplane.model }</td>
                           <td>{ airplane.capacity }</td>
                           <td>{ airplane.year }</td>
                           <td>
                              <button type="button" className="btn btn-sm btn-danger" onClick={event => deleteAirplane(event, airplane.id)}>
                                 <FontAwesomeIcon icon={faTrashAlt} /> Izbriši
                              </button>
                           </td>
                        </tr>
                     )
                  })}
               </tbody>
            </table>
         </div>
         <AirplaneCreate title="Dodaj avion" onClose={showModal} show={show}>
            <form id="airplaneaddform" onSubmit={storeAirplane}>
               <div className="form-group">
                  <label htmlFor="model">Model</label>
                  <input type="text"
                         className="form-control"
                         id="model"
                         value={model}
                         onChange={event => setModel(event.target.value)} />
               </div>
               <div className="form-group">
                  <label htmlFor="capacity">Kapacitet</label>
                  <input type="number"
                         min="1"
                         className="form-control"
                         id="capacity"
                         value={capacity}
                         onChange={event => setCapacity(event.target.value)} />
               </div>
               <div className="form-group">
                  <label htmlFor="year">Godina proizvodnje</label>
                  <input type="number"
                         min="1"
                         className="form-control"
                         id="year"
                         value={year}
                         onChange={event => setYear(event.target.value)} />
               </div>
               <button type="submit" className="btn btn-primary form-control" id="addAirplaneBtn" value="Dodaj avion">
                  <FontAwesomeIcon icon={faPlusCircle} /> Dodaj
               </button>
            </form>
         </AirplaneCreate>
      </div>
   );
}

export default AirplanesComponent;