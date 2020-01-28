import axios from 'axios';

export function getNotes() {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/account`);
}
