import axios from 'axios';

class ReservationsService {
   getReservations() {
      const jwtToken = localStorage.getItem('jwtToken');
      const requestHeaders = {
         headers: {
            'Authorization': `Bearer ${jwtToken}`
         }
      };
      const restApiUrl = `http://localhost:8080/api/reservations`;
      return axios.get(restApiUrl, requestHeaders)
   }

   getHomeData() {
      const jwtToken = localStorage.getItem('jwtToken');
      const requestHeaders = {
         headers: {
            'Authorization': `Bearer ${jwtToken}`
         }
      };
      const restApiUrl = `http://localhost:8080/api/reservations/stats`;
      return axios.get(restApiUrl, requestHeaders);
   }

   makeReservation(data) {
      const jwtToken = localStorage.getItem('jwtToken');
      const restApiUrl = `http://localhost:8080/api/reservations`;
      return axios({
         method: 'POST',
         url: restApiUrl,
         data: data,
         headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
         },
      });
   }
}

export default new ReservationsService();