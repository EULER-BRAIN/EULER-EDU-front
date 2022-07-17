import _axios from 'axios';

const axios = _axios.create({
  baseURL: process.env.urlOj,
  withCredentials: true
});

export default axios;
