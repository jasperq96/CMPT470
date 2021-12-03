import axios from 'axios';
axios.defaults.withCredentials = true;

const baseApiUrl = 'http://localhost:8080';

const get = (url, config = {}) => {
  return axios.get(baseApiUrl + url, config);
};

const post = (url, obj, config = {}) => {
  return axios.post(baseApiUrl + url, obj, config);
};

const put = (url, obj, config = {}) => {
  return axios.put(baseApiUrl + url, obj, config);
};

const patch = (url, obj, config = {}) => {
  return axios.patch(baseApiUrl + url, obj, config);
};

const del = (url, config = {}) => {
  return axios.delete(baseApiUrl + url, config);
};

export default { get, post, put, patch, del };
