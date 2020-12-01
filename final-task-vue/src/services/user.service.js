import axios from 'axios';

const API_URL = 'http://localhost:8080/';

class UserService {
  getCompanies() {
    return axios.get(API_URL + 'companies');
  }
}

export default new UserService();
