import axios from 'axios';

class ReservationsService {
   getReservations() {
      const jwtToken = localStorage.getItem('jwtToken');
      const requestHeaders = {
         headers: {
            'Authorization': `Bearer ${jwtToken}`
         }
      };
      const reservationsRestApiUrl = `http://localhost:8080/api/reservations`;
      return axios.get(reservationsRestApiUrl, requestHeaders)
   }
}

export default new ReservationsService();