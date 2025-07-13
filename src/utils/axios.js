import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://retina-detect-backend.vercel.app/',
  withCredentials: true,
});

export default instance;
