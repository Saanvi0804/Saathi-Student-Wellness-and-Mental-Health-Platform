import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://saathi-student-wellness-and-mental.onrender.com/api', // Your backend's base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;