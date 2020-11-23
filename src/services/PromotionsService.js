import axios from 'axios';

class PromotionsService {
   getPromotions() {
      const jwtToken = localStorage.getItem('jwtToken');
      const requestHeaders = {
         headers: {
            'Authorization': `Bearer ${jwtToken}`
         }
      };
      const restApiUrl = `http://localhost:8080/api/promotions`;
      return axios.get(restApiUrl, requestHeaders);
   }

   storePromotion(data) {
      const jwtToken = localStorage.getItem('jwtToken');
      const restApiUrl = `http://localhost:8080/api/promotions/${data.flightId}`;
      return axios({
         method: 'PUT',
         url: restApiUrl,
         data: data.flight,
         headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
         },
      });
   }
}

export default new PromotionsService();