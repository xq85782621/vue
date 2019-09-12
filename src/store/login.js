/**
 * 引入iView 就可以直接 使用 iView 对象访问 其中的组件了
 */
import iView from 'iview';

import {postRequest} from '../util/Request'
import {router} from "../router";

const login = {
  namespaced: true,//增加命名空间,不然在组件中无法使用mapState 等辅助函数快捷引入

  state: {
    username: '',
    password: ''
  },
  mutations: {

    login(state) {

      let params = {
        username : state.username,
        password : state.password,
      }

      postRequest("users/3",params).then((data) => {
        console.log(data.data)
      })
    }

  }


}
export default login
