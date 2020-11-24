import axios from 'axios';

class MyReservationsService {
   constructor() {
      this.jwtToken = localStorage.getItem('jwtToken');
   }

   getMyReservations() {
      const requestHeaders = {
         headers: {
            'Authorization': `Bearer ${this.jwtToken}`
         }
      };
      const user = JSON.parse(localStorage.getItem('user'));
      const reservationsRestApiUrl = `http://localhost:8080/api/reservations/${user.id}`;
      return axios.get(reservationsRestApiUrl, requestHeaders);
   }

   cancelReservation(reservationId) {
      const restApiUrl = `http://localhost:8080/api/reservations/${reservationId}/cancel`;
      return axios({
         method: 'PUT',
         url: restApiUrl,
         data: {},
         headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.jwtToken}`
         },
      });
   }
}

export default new MyReservationsService();