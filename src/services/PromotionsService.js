import axios from 'axios';

class PromotionsService {
   getPromotions() {
      const restApiUrl = `http://localhost:8080/api/promotions`;
      return axios.get(restApiUrl);
   }

   storePromotion(data) {
      const restApiUrl = `http://localhost:8080/api/promotions/${data.flightId}`;
      return axios({
         method: 'PUT',
         url: restApiUrl,
         data: data.flight,
         headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
         },
      });
   }
}

export default new PromotionsService();