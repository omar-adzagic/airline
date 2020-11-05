import axios from 'axios';

class FlightsService {
   getData() {
      const jwtToken = localStorage.getItem('jwtToken');
      const requestHeaders = {
         headers: {
            'Authorization': `Bearer ${jwtToken}`
         }
      };
      const restApiUrl = `http://localhost:8080/api/flights`;
      return axios.get(restApiUrl, requestHeaders);
   }

   storeFlight(data) {
      const restApiUrl = `http://localhost:8080/api/flights`;
      return axios({
         method: 'POST',
         url: restApiUrl,
         data: data,
         headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
         },
      });
   }

   deleteFlight(id) {
      const restApiUrl = `http://localhost:8080/api/flights/${id}`;
      return axios.delete(restApiUrl);
   }

   filterFlights(filters) {
      console.log(filters);
      const restApiUrl = `http://localhost:8080/api/flights/filter`;
      return axios({
         method: 'POST',
         url: restApiUrl,
         data: filters,
         headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
         },
      });
   }
}

export default new FlightsService();