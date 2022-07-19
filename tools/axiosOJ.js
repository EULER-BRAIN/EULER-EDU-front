import _axios from 'axios';

const axiosOJ = _axios.create({
  baseURL: process.env.urlOj,
  withCredentials: true
});

export default axiosOJ;
