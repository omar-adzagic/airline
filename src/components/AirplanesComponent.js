import React, { useState, useEffect } from 'react';
import '../styles/home.scss';
import AirplanesService from "../services/AirplanesService";
import AirplaneCreate from "./AirplaneCreate";
import ValidationErrorMessage from "./partials/ValidationErrorMessage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { swalNotification} from "../libraries/my-libs";

function AirplanesComponent() {
   const [show, setShow] = useState(false);
   const [airplanes, setAirplanes] = useState([{id: 1123123123}]);
   const [model, setModel] = useState('');
   const [capacity, setCapacity] = useState('');
   const [year, setYear] = useState('');
   const [errorsModel, setErrorsModel] = useState('');
   const [errorsModelPresent, setErrorsModelPresent] = useState(false);
   const [errorsCapacity, setErrorsCapacity] = useState('');
   const [errorsCapacityPresent, setErrorsCapacityPresent] = useState(false);
   const [errorsYear, setErrorsYear] = useState('');
   const [errorsYearPresent, setErrorsYearPresent] = useState(false);

   const showModal = event => setShow(!show);

   const resetValidationErrors = () => {
      setErrorsModel('');
      setErrorsModelPresent(false);
      setErrorsCapacity('');
      setErrorsCapacityPresent(false);
      setErrorsYear('');
      setErrorsYearPresent(false);
   };

   const storeAirplane = event => {
      event.preventDefault();
      resetValidationErrors();
      const data = {
         model: model,
         capacity: capacity,
         year: year,
         active: true,
      };
      AirplanesService.storeAirplane(data).then(response => {
         showModal();
         const newArray = [response.data, ...airplanes];
         setAirplanes(newArray);
      }).catch(error => {
         if (error.response.data.status == 400) {
            error.response.data.errors.forEach(errorMessage => {
               switch (errorMessage.field) {
                  case "model":
                     setErrorsModel(errorMessage.defaultMessage);
                     setErrorsModelPresent(true);
                     break;
                  case "capacity":
                     setErrorsCapacity(errorMessage.defaultMessage);
                     setErrorsCapacityPresent(true);
                     break;
                  case "year":
                     setErrorsYear(errorMessage.defaultMessage);
                     setErrorsYearPresent(true);
                     break;
               }
            })
         }
      });
   };

   const deleteAirplane = (event, id) => {
      event.preventDefault();
      AirplanesService.deleteAirplane(id).then(response => {
         getAirplanes();
      }).catch(error => {
         if (error.response.data.status == 400) {
            swalNotification('error', error.response.data.message);
         }
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
       <div style={{ width: "100%" }}>
          <div className="slideshow">
             <div className="slideshow-image" style={{ backgroundImage: "url('./images/istockphoto-896973272-1024x1024.jpg')" }}></div>
             <div className="slideshow-image" style={{ backgroundImage: "url('./images/istockphoto-1021387720-1024x1024.jpg')" }}></div>
             <div className="slideshow-image" style={{ backgroundImage: "url('./images/istockphoto-1149089650-1024x1024.jpg')" }}></div>
             <div className="slideshow-image" style={{ backgroundImage: "url('./images/istockphoto-1153101440-1024x1024.jpg')" }}></div>
          </div>

          <div className="page-container">
             <div className="col-xs-12 col-md-12 mt-3 mb-5">
                <h2 className="text-center">Stranica za upravljanje avionima</h2>
             </div>
             <div id="airplanesbody">
                <div className="actions-container">
                   <button id="centered-toggle-button"
                           className="btn btn-primary toggle-button"
                           type="button"
                           onClick={event => {showModal()}}>
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
                             className={`form-control ${errorsModelPresent ? "border border-danger" : ""}`}
                             id="model"
                             value={model}
                             onChange={event => setModel(event.target.value)} />
                      <ValidationErrorMessage errorMessage={errorsModel} />
                   </div>
                   <div className="form-group">
                      <label htmlFor="capacity">Kapacitet</label>
                      <input type="number"
                             min="1"
                             className={`form-control ${errorsCapacityPresent ? "border border-danger" : ""}`}
                             id="capacity"
                             value={capacity}
                             onChange={event => setCapacity(event.target.value)} />
                      <ValidationErrorMessage errorMessage={errorsCapacity} />
                   </div>
                   <div className="form-group">
                      <label htmlFor="year">Godina proizvodnje</label>
                      <input type="number"
                             min="1"
                             className={`form-control ${errorsYearPresent ? "border border-danger" : ""}`}
                             id="year"
                             value={year}
                             onChange={event => setYear(event.target.value)} />
                      <ValidationErrorMessage errorMessage={errorsYear} />
                   </div>
                   <button type="submit" className="btn btn-primary form-control" id="addAirplaneBtn" value="Dodaj avion">
                      <FontAwesomeIcon icon={faPlusCircle} /> Dodaj
                   </button>
                </form>
             </AirplaneCreate>
          </div>
       </div>
   );
}

export default AirplanesComponent;