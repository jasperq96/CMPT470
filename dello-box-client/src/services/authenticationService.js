import httpService from './httpService';

const authenticationService = {
  login: (user) => {
    return httpService
      .post('/auth/login', user)
      .then((res) => res.data)
      .catch((error) => {
        if (error.response) {
          return error.response.data;
        }
      });
  },

  logout: () => {
    return httpService.get('/auth/logout').then((res) => res.data);
  },

  isAuthenticated: () => {
    return httpService
      .get('/auth/authenticate')
      .then((res) => res.data)
      .catch((error) => {
        return { isAuthenticated: false, user: null };
      });
  }
};

export default authenticationService;
