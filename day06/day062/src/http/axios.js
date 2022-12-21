/** 
  该axios简易封装需要安装axios，element-ui，qs
  npm install axios qs --save
  vue add element
*/
import axios from 'axios'
import { Message } from 'element-ui'
import qs from 'qs'

let token = '';
// 1. 基础路径
axios.defaults.baseURL = 'https://api.muxiaoguo.cn/'


// http request拦截器 添加一个请求拦截器
axios.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  Message({ message: '请求超时', type: 'error', duration: 5 * 1000 })
  // Do something with request error
  return Promise.reject(error);
});

// 添加一个响应拦截器
axios.interceptors.response.use(function (response) {
  if (response.status == 200) {
    Message({ message: '请求成功', type: 'success', duration: 5 * 1000 })
  }else{
    Message({ message: '请求失败', type: 'error', duration: 5 * 1000 })
  }
  return response;
}, function (error) {
  Message({ message: '服务器连接失败', type: 'error', duration: 5 * 1000 })
  return Promise.reject(error);
})

/**
  get方式请求
*/
export function get(url, params) {
  return axios({
    method: 'get',
    url,
    params, // get 请求时带的参数
    timeout: 5000
  })
}

/**
 * 提交post请求 发送的数据为查询字符串，key=val&key=val
*/
export function post(url, data) {
  return axios({
    method: "post",
    url,
    data: qs.stringify(data),
    timeout: 5000,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

/**
 * 提交post请求 发送的数据为json字符串
*/
export function post_json(url, data) {
  return axios({
    method: "post",
    url,
    data,
    timeout: 5000
  })
}

export default axios
