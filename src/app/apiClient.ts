import axios from 'axios';
import { logout } from './redux/authSlice';
import { store } from './redux/store';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const apiClient = axios.create({
  baseURL,
});

export function initializeApiClient() {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN!) || sessionStorage.getItem(process.env.NEXT_PUBLIC_TOKEN!);
    if (token) {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
      console.log('setAuthToken: Token set in localStorage and apiClient:', token);
    } else {
      delete apiClient.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
      console.log('setAuthToken: Token removed from localStorage and apiClient');
    }
  }
}

export function setAuthToken(token: string | null) {
  if (typeof window !== 'undefined') {
    if (token) {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem(process.env.NEXT_PUBLIC_TOKEN!, token);
    } else {
      delete apiClient.defaults.headers.common['Authorization'];
      localStorage.removeItem(process.env.NEXT_PUBLIC_TOKEN!);
      sessionStorage.removeItem(process.env.NEXT_PUBLIC_TOKEN!);
    }
  }
}

apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      store.dispatch(logout() as any);
    }
    return Promise.reject(error);
  }
);

export default apiClient;