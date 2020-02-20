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

export function addPictureProject(data) {
  return axios.post(`${process.env.REACT_APP_BACKEND_URL}/project/picture`, data);
}

export function addProject(project) {
  return axios.post(`${process.env.REACT_APP_BACKEND_URL}/project`, project);
}

export function getProject(project) {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/project/${project}`);
}

export function getProjects() {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/project`);
}
export function getProjectsInit() {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/projectsInit`);
}

export function getProjectsFilter(category) {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/project/filter/${category}`);
}

export function deleteProject(projectId) {
  return axios.delete(`${process.env.REACT_APP_BACKEND_URL}/project/${projectId}`);
}

export function updateProject(projectId, project) {
  return axios.put(`${process.env.REACT_APP_BACKEND_URL}/project/${projectId}`, project);
}

export function updateCommentProject(project) {
  return axios.put(`${process.env.REACT_APP_BACKEND_URL}/project/comment/${project.id}`);
}

export function deleteCommentProject(commentId) {
  return axios.delete(`${process.env.REACT_APP_BACKEND_URL}/comment/delete/${commentId}`);
}
export function addCommentProject(project_id, data) {
  return axios.post(`${process.env.REACT_APP_BACKEND_URL}/project/comment/${project_id}`, data);
}
export function getCommentsProject(project) {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/project/comment/${project}`);
}

export function createAssesment(project, data) {
  return axios.post(`${process.env.REACT_APP_BACKEND_URL}/project/assesment/${project}`, data)
}