import axios, { AxiosRequestConfig } from 'axios';

import { HOST_API } from 'src/config-global';

const UrlBase = 'http://localhost:3000'

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  auth: {
    login: `${UrlBase}/api/auth/login`,
  },
  user: {
    list: `${UrlBase}/api/list`,
  },
};
