import axios from 'axios';
axios.defaults.timeout = 60000;
axios.defaults.retry = 3;
axios.defaults.retryDelay = 2000;

function axiosRetryInterceptor(err) {
  var config = err.config;

  // If config does not exist or the retry option is not set, reject
  if (!config || !config.retry) return Promise.reject(err);

  // Set the variable for keeping track of the retry count
  config.__retryCount = config.__retryCount || 0;

  // Check if we've maxed out the total number of retries
  if (config.__retryCount >= config.retry) {
    // Reject with the error
    return Promise.reject(err);
  }

  // Increase the retry count
  config.__retryCount += 1;

  // Create new promise to handle exponential backoff
  var backoff = new Promise(function(resolve) {
    setTimeout(function() {
      resolve();
    }, config.retryDelay || 1);
  });

  // Return the promise in which recalls axios to retry the request
  return backoff.then(function() {
    return axios(config);
  });
}

axios.interceptors.request.use(
  (config) => {
    // 如果生产环境需要前缀的话
    /* if (process.env.NODE_ENV === 'production') {
			config.url = '/prefix' + config.url
		} */
    /* config.params = {
			...config.params
		} */
    // 设置token
    config.url = '/oms' + config.url;
    const token = ''; // from local or cookie
    /* config.headers = {
            ...config.headers,
    } */
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// axios.interceptors.response.use(res => res.data, err => Promise.reject(err))
axios.interceptors.response.use((res) => {
  // 根据后端需求做一些统一处理
  return res.data;
}, axiosRetryInterceptor);

/**
 * usage
 * import { fetch } from '@/views/EditChartView/axios';
 *
 */
export { axios as fetch };
//  export default axios;

/* 可以注册为一个插件 */
/* export default {
  install: Vue => Vue.prototype.$axios = axios
}; */
