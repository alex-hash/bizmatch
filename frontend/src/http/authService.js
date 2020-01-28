import axios from 'axios';

const storedUser = JSON.parse(localStorage.getItem('currentUser'));
let token = (storedUser && storedUser.accessToken) || null;

axios.interceptors.request.use(
  function(config) {
    if (
      token &&
      !(config.url.includes('/login') || (config.url.includes('/account') && config.method.includes('post')))
    ) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function(response) {
    if (response.data.accessToken) {
      localStorage.setItem('currentUser', JSON.stringify(response.data));
      token = response.data.accessToken;
    }
    return response;
  },
  function(error) {
    if (error.response.status === 401 && error.config.url.includes('/login')) {
      localStorage.removeItem('currentUser');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export function signIn({ email, password }) {
  console.log(email, password);
  return axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, {
    email: email,
    password: password
  });
}

export function signUp(accountData) {
  return axios.post(`${process.env.REACT_APP_BACKEND_URL}/account`, accountData);
}
