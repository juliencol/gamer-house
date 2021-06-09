import axios, { AxiosRequestConfig } from 'axios';
import {
  formMaximalFields,
  formMinimalFields,
} from 'pages/authentication/Authentication';

axios.interceptors.request.use(
  (config) => {
    return {
      ...config,
      baseURL: 'http://localhost:5000/',
      timeout: 1000,
      withCredentials: true,
      headers: {
        ...config.headers,
        Authorization: 'AccessToken ' + localStorage.getItem('accessToken'),
      },
    };
  },
  (error) => {
    return Promise.reject(error);
  }
);

interface Request {
  [key: string]: (data?: any) => AxiosRequestConfig;
}

export function authReq(): Request {
  const authBaseUrl = 'authentication';

  return {
    isAuthenticated: () => ({
      url: `${authBaseUrl}/isAuthenticated`,
      method: 'get',
    }),
    login: (data: formMinimalFields) => ({
      url: `${authBaseUrl}/login`,
      method: 'post',
      data,
    }),
    register: (data: formMaximalFields) => ({
      url: `${authBaseUrl}/register`,
      method: 'post',
      data,
    }),
  };
}

export function userInfo(): Request {
  const userInfoBaseUrl = 'user';
  return {
    pseudo: () => ({
      url: `${userInfoBaseUrl}/pseudo`,
      method: 'get',
    }),
  };
}
