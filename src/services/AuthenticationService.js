import axios from 'axios';

class AuthenticationService {
   authenticate(username, password) {
      const requestBody = {
         username: username,
         password: password
      };
      const restApiUrl = `http://localhost:8080/api/authenticate`;
      return axios.post(restApiUrl, requestBody);
   };
   getAuthenticatedUser() {
      const restApiUrl = `http://localhost:8080/api/get-authenticated-user`;
      return axios.get(restApiUrl);
   }
}

export default new AuthenticationService();