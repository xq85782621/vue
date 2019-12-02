/**
 * 引入iView 就可以直接 使用 iView 对象访问 其中的组件了
 */
import iView from 'view-design';

import {postRequest} from '../util/Request'

import {router} from "../router";

const login = {
  namespaced: true,

  state: {
    username: '',
    password: ''
  },
  mutations: {

    login(state) {
      let params = {
        username: state.username,
        password: state.password,
      }
      // postRequest("users/3",params).then((data) => {
      //   console.log(data.data)
      // })
      router.push('/center')
    }

  }


}


export default login
