import _axios from 'axios';

const axiosEDU = _axios.create({
  baseURL: process.env.urlEDU,
  withCredentials: true
});

export default axiosEDU;
