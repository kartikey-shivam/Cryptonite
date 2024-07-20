import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { api } from "./url";



console.log(api);

// Create an Axios instance with a base URL and default headers
const axiosInstance = axios.create({
  baseURL: api,
  headers: {accept: 'application/json', 'CG-BSiPzTLeJqEYHqQTQkiiQw': 'CG-BSiPzTLeJqEYHqQTQkiiQw'},
});

// Add a request interceptor to handle token authorization
axiosInstance.interceptors.request.use((req: InternalAxiosRequestConfig) => {
  
  return req;
});

// Add a response interceptor to log responses and handle errors
axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => {
    console.log(res);
    return res;
  },
  (error: AxiosError) => {
    console.log(error);
    // Optionally handle specific status codes
    // const status = error.response ? error.response.status : 500;
    // if (status && status === 500) {
    //   localStorage.clear();
    // }
    return Promise.reject(error);
  }
);

export default axiosInstance;
