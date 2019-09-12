import qs from 'qs'
import axios from 'axios';
import {getToken} from "./Auth";
import {router} from "../router";
import {Message} from 'iview';


const baseURL = '/proxyApi';
axios.defaults.timeout = 5000;
axios.defaults.baseURL = baseURL; //填写域名

axios.interceptors.request.use(config => {
  return config;
}, err => {
  Message.error({message: '请求超时!'});
  // return Promise.resolve(err);
})



axios.interceptors.response.use(response => {
  return response
}, err => {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        Message.error('错误请求')
        break;
      case 401:
        Message.error('未授权，请重新登录')
        break;
      case 403:
        Message.error('拒绝访问')
        break;
      case 404:
        Message.error('请求错误,未找到该资源')
        break;
      case 405:
        Message.error('请求方法未允许')
        break;
      case 408:
        Message.error('请求超时')
        break;
      case 500:
        Message.error('服务器端出错')
        break;
      case 501:
        Message.error('网络未实现')
        break;
      case 502:
        Message.error('网络错误')
        break;
      case 503:
        Message.error('服务不可用')
        break;
      case 504:
        Message.error('网络超时')
        break;
      case 505:
        Message.error('http版本不支持该请求')
        break;
      default:
        Message.error(`连接错误${err.response.status}`)
    }
  } else {
    Message.error('连接到服务器失败')
  }
  return Promise.resolve(err.response)
})

export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}
export const uploadFileRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${url}`,
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
export const putRequest = (url, params) => {
  return axios({
    method: 'put',
    url: `${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}
export const deleteRequest = (url) => {
  return axios({
    method: 'delete',
    url: `${url}`
  });
}

export const getRequest = (url) => {
  return axios({
    method: 'get',
    url: `${url}`
  });
}
