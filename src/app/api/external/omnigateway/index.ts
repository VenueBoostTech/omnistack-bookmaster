import axios from 'axios';

const BASE_URL = process.env.OMNI_GATEWAY_URL;
const API_KEY = process.env.OMNI_GATEWAY_API_KEY;

export const omniGateway = axios.create({
  baseURL: BASE_URL,
  headers: {
    'x-api-key': API_KEY,
    // TOOD: dynamic
    'client-x-api-key': 'bookmaster-client-id'
  }
});