import axios from 'axios';
import { PROPERTIES } from '../config/properties';

const client = axios.create({
  baseURL: PROPERTIES.BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default client;
