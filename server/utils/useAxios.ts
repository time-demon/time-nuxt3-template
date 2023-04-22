// axios网络访问
import axios from "axios";

// 创建axios实例
const requester = axios.create({
  //设置基础路径
  baseURL: "",
  // 请求超时时间
  timeout: 1000 * 60,
});

// http request 拦截器
requester.interceptors.request.use(
  (config) => {
    // 发送请求前的处理
    // 这里可以处理 token
    // console.log("config", config);

    return config;
  },
  (err) => {
    // 请求错误的处理
    return Promise.reject(err);
  }
);

// http response 拦截器
requester.interceptors.response.use(
  //处理响应数据
  (response) => {
    return response.data;
  },
  // 抛出错误
  (error) => {
    return Promise.reject(error);
  }
);

const axiosGo = (config = {} as any) => {
  return new Promise((resolve: any, reject: any) => {
    // get的时候将data转为params
    if (
      (!config.method || config.method === "GET" || config.method === "get") &&
      !config.params
    ) {
      config.params = config.data;
      delete config.data;
    }
    requester(config)
      .then((r: any) => {
        resolve(r);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
};

export default axiosGo;
