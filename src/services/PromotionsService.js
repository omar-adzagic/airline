import axios from 'axios';

class PromotionsService {
   constructor() {
      this.jwtToken = localStorage.getItem('jwtToken');
   }

   getPromotions() {
      const requestHeaders = {
         headers: {
            'Authorization': `Bearer ${this.jwtToken}`
         }
      };
      const restApiUrl = `http://localhost:8080/api/promotions`;
      return axios.get(restApiUrl, requestHeaders);
   }

   storePromotion(data) {
      const restApiUrl = `http://localhost:8080/api/promotions/${data.flightId}`;
      return axios({
         method: 'PUT',
         url: restApiUrl,
         data: data.flight,
         headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.jwtToken}`
         },
      });
   }

   deletePromotion(id) {
      const requestHeaders = {
         headers: {
            'Authorization': `Bearer ${this.jwtToken}`
         }
      };
      const restApiUrl = `http://localhost:8080/api/promotions/${id}`;
      return axios.delete(restApiUrl, requestHeaders);
   }
}

export default new PromotionsService();