import axios from 'axios';

const usersRestApiUrl = 'http://localhost:8080/api/users';

class UserService {
   getUsers() {
      return axios.get(usersRestApiUrl)
   }
}

export default new UserService();