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
    if (error.response.status === 401 && !error.config.url.includes('/login') && !error.config.url.includes('/')) {
      localStorage.removeItem('currentUser');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export function getProfile() {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/account`).then((res) => {
    return res.data;
  });
}

export function getProfileOther(userId) {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/account/${userId}`).then((res) => {
    return res.data;
  });
}

export function updateProfile(data) {
  return axios.put(`${process.env.REACT_APP_BACKEND_URL}/account`, data);
}

export function updateAvatar(data) {
  return axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/avatar`, data);
}

export function getProjects(data) {
  if (data === undefined) {
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/accountprojects`);
  } else {
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/accountprojects/${data}`);
  }
}

export function getComments(data) {
  if (data === undefined) {
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/accountcomments`);
  } else {
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/accountcomments/${data}`);
  }
}
