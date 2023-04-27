import axios from "axios";
import { getUserToken } from "../utils/userToken";

const axiosClient = axios.create({
  baseURL: "https://nodejs-deploy-n9mo.onrender.com/",
});

//config header axios
const defaultHeaders = {
  ...axiosClient.defaults.headers.common,
  "Content-Type": "application/json; charset=UTF-8",
};

axiosClient.defaults.headers.common = defaultHeaders;

axiosClient.interceptors.request.use(
  (config) => {
    const token = getUserToken();
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;

// import axios, {
//   AxiosInstance,
//   AxiosError,
//   AxiosResponse,
//   AxiosRequestConfig,
// } from "axios";

// import { getUserToken, removeUserToken } from "../utils/userToken";

// const axiosClient: AxiosInstance = axios.create({
//   baseURL: process.env.REACT_APP_API_URL,
// });

// const urlTokenExcludes: string[] = ["login", "register"];

// //config header axios
// const defaultHeaders = {
//   ...axiosClient.defaults.headers.common,
//   "Content-Type": "application/json; charset=UTF-8",
// };

// axiosClient.defaults.headers.common = defaultHeaders;

// const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
//   const urlParser = config.url?.split("/");
//   if (urlParser === undefined) return config;

//   if (!urlTokenExcludes.includes(urlParser[1])) {
//     //private api
//     const token = getUserToken();
//     config.headers = {
//       ...config.headers,
//       Headers: token,
//     };
//   }
//   return config;
// };

// const onRequestError = (error: AxiosError): Promise<AxiosError> =>
//   Promise.reject(error);

// const onResponse = (response: AxiosResponse): AxiosResponse => ({
//   ...response,
//   data: response.data.data,
// });

// const onResponseError = (error: AxiosError): Promise<AxiosError> => {
//   const token = getUserToken();
//   if (error.response?.status === 401) {
//     if (token) removeUserToken();
//     window.location.reload();
//   }
//   return Promise.reject(error);
// };

// axiosClient.interceptors.request.use(onRequest, onRequestError);
// axiosClient.interceptors.response.use(onResponse, onResponseError);

// export default axiosClient;
