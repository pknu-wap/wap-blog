import axios from 'axios';
import { properties } from '../config/properties';

const client = axios.create({
  baseURL: properties.BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default client;
