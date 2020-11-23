import axios from 'axios';

class FlightsService {

   constructor() {
      this.jwtToken = localStorage.getItem('jwtToken');
   }

   getData() {
      const requestHeaders = {
         headers: {
            'Authorization': `Bearer ${this.jwtToken}`
         }
      };
      const restApiUrl = `http://localhost:8080/api/flights`;
      return axios.get(restApiUrl, requestHeaders);
   }

   getFlight(flightId) {
      const requestHeaders = {
         headers: {
            'Authorization': `Bearer ${this.jwtToken}`
         }
      };
      const restApiUrl = `http://localhost:8080/api/flights/${flightId}`;
      return axios.get(restApiUrl, requestHeaders);
   }

   storeFlight(data) {
      const restApiUrl = `http://localhost:8080/api/flights`;
      return axios({
         method: 'POST',
         url: restApiUrl,
         data: data,
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.jwtToken}`
         },
      });
   }

   deleteFlight(id) {
      const requestHeaders = {
         headers: {
            'Authorization': `Bearer ${this.jwtToken}`
         }
      };
      const restApiUrl = `http://localhost:8080/api/flights/${id}`;
      return axios.delete(restApiUrl, requestHeaders);
   }

   filterFlights(filters) {
      const restApiUrl = `http://localhost:8080/api/flights/filter`;
      return axios({
         method: 'POST',
         url: restApiUrl,
         data: filters,
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.jwtToken}`
         },
      });
   }
}

export default new FlightsService();