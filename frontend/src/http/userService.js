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
    if (error.response.status === 401 && !error.config.url.includes('/login')) {
      localStorage.removeItem('currentUser');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export function getProfile() {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/account`).then(res => { return res.data});
}

export function getProfileOther(userId) {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/account/${userId}`).then(res => { return res.data});
}