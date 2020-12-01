import axios from 'axios';

const API_URL = 'http://localhost:3000/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'users/signin', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data.user.token) {

          localStorage.setItem('user', JSON.stringify(response.data.user));
        }

        return response.data.user;
      });
  }
  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'users/signup', user
      //{
      // username: user.username,
      // email: user.email,
      // password: user.password
      //}
    );
  }
}

export default new AuthService();
