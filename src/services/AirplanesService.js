import axios from 'axios';

class AirplanesService {
   getAirplanes() {
      const jwtToken = localStorage.getItem('jwtToken');
      console.log(jwtToken);
      const requestHeaders = {
         'Authorization': `Bearer ${jwtToken}`
      };
      console.log(requestHeaders);
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
            'Content-Type': 'application/json'
         },
      });
   }

   deleteAirplane(id) {
      const restApiUrl = `http://localhost:8080/api/airplanes/${id}`;
      return axios.delete(restApiUrl);
   }
}

export default new AirplanesService();