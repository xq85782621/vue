/**
 * 在vuex中引入iVeiw 就可以直接 使用 iveiw对象访问 其中的组件了
 */
import iView from 'iview';
/**
 * 甚至可以把该store对应的vue组件传进来
 */
import deviceInfoVue from '../components/device/DeviceInfo'

/**
 * 通过把store对象引入同样可以在render函数中通过 store 对象完成 this.$store 的功能
 */
import store from '@/store/index'

const deviceInfo = {
  // 增加命名空间,不然在组件中无法使用 mapState 等辅助函数快捷引入
  namespaced: true,
  state: {
    name: 'state',
    columns: [
      {
        type: 'index',
        title: '序号',
        width: 80,
        align: 'center'
      },
      {
        title: '设备名称',
        key: 'device_name',
        align: 'center'
      },
      {
        title: '设备地址',
        key: 'device_address',
        align: 'center'
      },
      {
        title: '设备状态',
        key: 'device_state',
        align: 'center',
        render: (h, params) => {
          let that = this
          return h('inputNumber', {
            props: {
              max: params.row.device_num,
              value: params.row.buchong_num,
            },
            on: {
              onChange: function (event) {
                console.log(event)
                // params.row.buchong_num = event
                // console.log(params.row)
              }
            }
          })
        }
      },
      {
        title: '设备状态',
        key: 'device_state',
        width: 150,
        align: 'center',
        render: (h, params) => {
          // let that = this
          return h(
            // 第一个参数是要渲染的标签
            'div',
            // 第二个参数是一个对象,里面可以对当前渲染的标签设置属性,样式等等
            {
              // attrs 是 html 的固有属性
              attrs: {
                // 在属性定义的时候善用三目表达式可以很方便的解决很多问题
                title: (params.row.device_state === 0) ? '在线' : (params.row.device_state) === 1 ? '离线' : '设备异常',
              },
              // 自定义属性
              props:{
                color :'red'
              },
              style: {
                // height : "90px",
                // width: "80px"
              },
              on: {
                click: function () {
                  // 可以发现通过这种方式也能在render内部访问当前state数据了,不用担心this指向问题
                  // deviceInfo.state.list[0].device_name = 'sss';
                  // 通过store对象调用任意store ,下面是测试调用当前的一个mutation
                  store.commit('deviceInfo/test', '传的参数');
                  /** @namespace iView.Message */
                  (params.row.device_state === 0) ? iView.Message.info("设备在线中") : (params.row.device_state) === 1 ? iView.Message.error("设备离线") : iView.Message.error("设备异常");
                }
              }
            },
            // 第三个参数是一个数组,可以嵌套其它要渲染的标签,也有三个参数和当前一样
            [
              h('Icon',
                {
                  props: {
                    type: params.row.device_state === 0 ? 'ios-wifi' : params.row.device_state === 1 ? 'ios-wifi-outline' : 'md-alert',
                    color: params.row.device_state === 0 ? 'green' : 'red',
                    size: 20,
                  },
                }
              ),

            ]
          )
        }
      },

    ],
    list: [
      {
        device_name: "测试机器1",
        device_address: "星梦园创客空间",
        device_state: 1,
        ceshi: 'ces',
      },
      {
        device_name: "测试机器2",
        device_address: "中环购物中心",
        device_state: 0,
        ceshi: 'ces2',
      },
      {
        device_name: "测试机器2",
        device_address: "中环购物中心",
        device_state: 0,
        ceshi: 'ces2',
      },
      {
        device_name: "测试机器2",
        device_address: "中环购物中心中环购物中心中环购物中心中环购物中心中环购物中心中环购物中心中环购物中心中环购物中心中环购物中心中环购物中心中环购物中心",
        device_state: 3,
        ceshi: 'ces2',
      },
    ],

    // 当前选中某一行
    current_device: '',

    // 详情modal
    detail_show: false,


    cityList: [
      {
        value: '0',
        label: '在线'
      },
      {
        value: '1',
        label: '离线'
      },
      {
        value: '2',
        label: '异常'
      },

    ],
    model1: '',

    columns14: [
      {
        title: 'Date',
        key: 'date'
      },
      {
        title: 'Name',
        key: 'name'
      },
      {
        title: 'Age',
        key: 'age'
      },
      {
        title: 'Address',
        key: 'address'
      }
    ],
    data5: [
      {
        name: 'John Brown',
        age: 18,
        address: 'New York No. 1 Lake Park',
        date: '2016-10-03'
      },
      {
        name: 'Jim Green',
        age: 24,
        address: 'London No. 1 Lake Park',
        date: '2016-10-01'
      },
      {
        name: 'Joe Black',
        age: 30,
        address: 'Sydney No. 1 Lake Park',
        date: '2016-10-02'
      },
      {
        name: 'Jon Snow',
        age: 26,
        address: 'Ottawa No. 2 Lake Park',
        date: '2016-10-04'
      }
    ]


  },
  mutations: {
    test(state, value) {
      state.list[0].device_name = 'sss';
      console.log(value)
    },
  },

  actions: {}


}


export default deviceInfo
