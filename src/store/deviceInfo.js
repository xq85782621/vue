/**
 * 在vuex中引入iVeiw 就可以直接 使用 iveiw对象访问 其中的组件了
 */
import iView from 'iview';


const deviceInfo = {
  namespaced: true,//增加命名空间,不然在组件中无法使用mapState 等辅助函数快捷引入

  state: {
    device_name: "test"

  },
  mutations: {

    getInfo(state) {
      iView.Message.info('这是mutation被调用了');
    },
    getInfoParam(state,payload) {
      iView.Message.info('这是mutation被调用了'+payload);
    }
  },

  actions: {
    getInfoAction(context) {
      iView.Message.info('这是action被调用了');
    }
  }


}
export default deviceInfo
