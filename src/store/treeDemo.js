/**
 * 在vuex中引入iVeiw 就可以直接 使用 iveiw对象访问 其中的组件了
 */
import iView from 'view-design';

import {postRequest, getRequest , putRequest } from '../util/Request'


const treeDemo = {
  namespaced: true,//增加命名空间,不然在组件中无法使用mapState 等辅助函数快捷引入

  state: {
     test: 'sss',
     userId: '',
  },
  mutations: {
    //   getUserId(state){
    //     let res = new Promise(function (resolve, reject) {
    //       getRequest("/test/userId").then((response) => {
    //         state.userId = response.data.data;
    //       })
    //     });
    //     return res;
    //   },
    //
    // getUserInfo(state){
    //   let res = new Promise(function (resolve, reject) {
    //     getRequest("/test/userInfo/userId="+ state.userId).then((response) => {
    //       console.log(response.data.data);
    //     })
    //   });
    //   return res;
    // }

    // getUserId(state){
    //   getRequest('/test/userId').then((response) =>{
    //     console.log(response)
    //     state.userId = response.data.data;
    //   })
    // }
  },
  actions: {
     getUserId(context) {
       // 发送请求 , 成功返回后执行then, response 就是请求的结果
       getRequest('/test/userId').then(function (response) {
            let params = {
              userId : response.data.data
            };
          // 根据第一次请求的结果,进行第二次请求,返回promise
          return getRequest('/test/userInfo',params);
       // 第二次请求成功后执行then
       }).then(function (response) {
         alert(response.data.data)
       })
     }


  }


};
export default treeDemo
