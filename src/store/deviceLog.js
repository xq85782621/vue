/**
 * 在vuex中引入iVeiw 就可以直接 使用 iveiw对象访问 其中的组件了
 */
import iView from 'view-design';


const deviceLog = {
  namespaced: true,//增加命名空间,不然在组件中无法使用mapState 等辅助函数快捷引入
  state: {
    device_name: "test",
    columns7: [

      {
        title: '设备库存',
        key: 'device_num'
      },
      {
        title: '指导数量',
        key: 'zhidao_num'
      },
      {
        title: '补货数量',
        key: 'buchong_num',
        width: 150,
        align: 'center',
        render: (h, params) => {
          let that = this
          return h('InputNumber', {
            props: {
              max:params.row.device_num,
              value:params.row.buchong_num,
            },
            on: {
              'on-change': function (event) {
                console.log(event)
                // params.row.buchong_num = event
                // console.log(params.row)
              }
            }
          }, params.row)
        }
      }
    ],
    data6: [
      {
        device_num: 5,
        zhidao_num: 10,
        buchong_num: 0,
      },
    ]

  },
  mutations: {

    getInfo(state) {
      iView.Message.info('这是mutation被调用了');
    },
    getInfoParam(state,payload) {
      console.log(state)
      iView.Message.info('这是mutation被调用了'+payload);
    }
  },

  actions: {
    getInfoAction(context) {
      iView.Message.info('这是action被调用了');
    }
  }

}
export default deviceLog
