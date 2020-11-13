import axios from 'axios';

class AirplanesService {

   constructor() {
      this.jwtToken = localStorage.getItem('jwtToken');
   }

   getAirplanes() {
      console.log('poz');
      const requestHeaders = {
         headers: {
            'Authorization': `Bearer ${this.jwtToken}`
         }
      };
      const restApiUrl = `http://localhost:8080/api/airplanes`;
      return axios.get(restApiUrl, requestHeaders);
   }

   storeAirplane(data) {
      const restApiUrl = `http://localhost:8080/api/airplanes`;
      return axios({
         method: 'POST',
         url: restApiUrl,
         data: data,
         headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.jwtToken}`
         },
      });
   }

   deleteAirplane(id) {
      const requestHeaders = {
         headers: {
            'Authorization': `Bearer ${this.jwtToken}`
         }
      };
      const restApiUrl = `http://localhost:8080/api/airplanes/${id}`;
      return axios.delete(restApiUrl, requestHeaders);
   }
}

export default new AirplanesService();