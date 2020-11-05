import axios from 'axios';

class ReservationsService {
   getReservations() {
      const reservationsRestApiUrl = `http://localhost:8080/api/reservations`;
      return axios.get(reservationsRestApiUrl)
   }
}

export default new ReservationsService();