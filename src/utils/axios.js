import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://retina-detect-backend-git-main-damilare-projects.vercel.app',
  withCredentials: true,
});


export default instance;
