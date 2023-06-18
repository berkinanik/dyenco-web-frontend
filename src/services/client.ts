import axiosBase from 'axios';

const BASE_URL = 'http://localhost:8000/api';
// check production url with prod base url for redirecting
// const PROD_BASE_URL = 'https://dyencohttp-berkinani.pitunnel.com/api';
const PROD_URL = 'https://dyencohttp-berkinani.eu1.pitunnel.com/api';

export const client = axiosBase.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
