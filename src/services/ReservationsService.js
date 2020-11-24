import axios from 'axios';

class ReservationsService {
   constructor() {
      this.jwtToken = localStorage.getItem('jwtToken');
   }

   getReservations() {
      const requestHeaders = {
         headers: {
            'Authorization': `Bearer ${this.jwtToken}`
         }
      };
      const restApiUrl = `http://localhost:8080/api/reservations`;
      return axios.get(restApiUrl, requestHeaders)
   }

   getHomeData() {
      const requestHeaders = {
         headers: {
            'Authorization': `Bearer ${this.jwtToken}`
         }
      };
      const restApiUrl = `http://localhost:8080/api/reservations/stats`;
      return axios.get(restApiUrl, requestHeaders);
   }

   deleteReservation(id) {
      const requestHeaders = {
         headers: {
            'Authorization': `Bearer ${this.jwtToken}`
         }
      };
      const restApiUrl = `http://localhost:8080/api/reservations/${id}`;
      return axios.delete(restApiUrl, requestHeaders);
   }

   makeReservation(data) {
      const restApiUrl = `http://localhost:8080/api/reservations`;
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
}

export default new ReservationsService();