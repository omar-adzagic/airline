import axios from 'axios';

class MyReservationsService {
   getMyReservations() {
      const reservationsRestApiUrl = `http://localhost:8080/api/reservations/my`;
      return axios.get(reservationsRestApiUrl);
   }

   toggleReservation(reservationId) {
      const reservationsRestApiUrl = `http://localhost:8080/api/reservations/${reservationId}/toggle`;
      return axios.post(reservationsRestApiUrl);
   }
}

export default new MyReservationsService();