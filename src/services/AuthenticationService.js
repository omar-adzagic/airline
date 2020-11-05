import axios from 'axios';

class AuthenticationService {
   authenticate(username, password) {
      const requestBody = {
         username: username,
         password: password
      };
      const restApiUrl = `http://localhost:8080/authenticate`;
      return axios.post(restApiUrl, requestBody);
   }
}

export default new AuthenticationService();