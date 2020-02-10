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

export function getForums() {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/theme`);
}

export function getForumsFilter(category) {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/theme/filter/${category}`);
}

export function getForum(theme) {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/theme/${theme}`);
}

export function getCommentsForum(theme) {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/theme/comment/${theme}`);
}

export function addForum(theme) {
  return axios.post(`${process.env.REACT_APP_BACKEND_URL}/theme`, theme);
}

export function addCommentForum(theme_id, data) {
  return axios.post(`${process.env.REACT_APP_BACKEND_URL}/theme/comment/${theme_id}`, data);
}

export function deleteForum(theme) {
  console.log(theme);
  return axios.delete(`${process.env.REACT_APP_BACKEND_URL}/theme/${theme}`);
}

export function updateForum(theme) {
  return axios.put(`${process.env.REACT_APP_BACKEND_URL}/theme/${theme.id}`);
}

export function updateCommentForum(theme) {
  return axios.put(`${process.env.REACT_APP_BACKEND_URL}/theme/comment/${theme.id}`);
}

export function deleteCommentForum(commentId) {
  return axios.delete(`${process.env.REACT_APP_BACKEND_URL}/comment-theme/delete/${commentId}`);
}
