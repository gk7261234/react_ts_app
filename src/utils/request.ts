import axios from "axios";
import { notification } from "antd";

const codeMessage: any = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。",
};

axios.defaults.headers["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;
// axios.defaults.crossDomain = true;
const _axiosConfig = {
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 60 * 1000,
};

const _axios = axios.create(_axiosConfig);
_axios.interceptors.request.use(
  (options: any) => {
    // Do something before request is sent
    // options.headers['Cache-Control'] = 'no-cache';
    return options;
  },
  (error: any) => {
    // Do something with request error
    console.log("request: ", error);
    return Promise.reject(error);
  }
);

_axios.interceptors.response.use(
  (response: { data: any }) => {
    // Do something with response data
    return response.data;
  },
  (error: { response: any }) => {
    console.log("response: ", error);
    // Do something with response error
    const response = error.response;
    const errorText = codeMessage[response.status] || response.data.msg;
    notification.error({
      message: errorText,
    });
    return Promise.reject();
  }
);

export default _axios;
