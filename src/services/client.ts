import axiosBase from 'axios';

const BASE_URL = 'http://localhost:8000/api';

export const client = axiosBase.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
