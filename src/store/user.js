/**
 * 在vuex中引入iVeiw 就可以直接 使用 iveiw对象访问 其中的组件了
 */
import iView from 'iview';
/**
 * 甚至可以把该store对应的vue组件传进来
 */
import userComponent  from '../components/system/User'

/**
 * 通过把store对象引入同样可以在render函数中通过 store 对象完成 this.$store 的功能
 */
import store from '@/store/index'

import {postRequest, getRequest , putRequest} from '../util/Request'

import {convertTreeToCascader,getParent} from '../util/common'

const user = {
  // 增加命名空间,不然在组件中无法使用mapState 等辅助函数快捷引入
  namespaced: true,
  state: {
    columns: [
      {
        type: 'index',
        title: '#',
        width: 80,
        align: 'center',
      },
      {
        title: '用户名',
        key: 'username',
        align: 'center',
        sortable: true,
      },
      {
        title: '部门名称',
        key: 'deptName',
        align: 'center',
        sortable: true,
      },
      {
        title: '手机',
        key: 'mobile',
        align: 'center',
      },
      {
        title: '邮箱',
        key: 'email',
        align: 'center',
      },
      {
        title: '性别',
        key: 'sex',
        align: 'center',
        sortable: true,
        render: (h, params) => {
          return h('icon', {
            props: {
              type: params.row.sex === 1 ? 'ios-man' : params.row.sex === 2 ? 'ios-woman' : 'ios-person-outline',
              color: params.row.sex === 1 ? '#2b85e4' : params.row.sex === 2 ? '#ed4014' : '',
              size: 24,
            },
          })
        }
      },
      {
        title: '状态',
        key: 'status',
        align: 'center',
        sortable: true,
        render: (h, params) => {
          return h('icon', {
            props: {
              type: params.row.status === 1 ? 'ios-checkmark-circle-outline' : 'ios-close-circle-outline',
              color: params.row.status === 1 ? '#2b85e4' : '#ed4014',
              size: 24,
            },
          })
        }
      },
      {
        title: '创建时间',
        key: 'createTime',
        align: 'center',
      },
      {
        title: '角色',
        key: 'roleName',
        align: 'center',
      },
      {
        title: '最后登录时间',
        key: 'lastLoginTime',
        align: 'center',
        sortable: true,
        render: (h, params) => {
          return h('span', params.row.lastLoginTime == null ? '暂无记录' : params.row.lastLoginTime)
        }
      },

    ],
    list: [],
    mailAutoList: [],
    // 当前选中的行
    currentRowData: '',

    // 新增modal
    addModalShow: false,

    // 新增用户的数据
    addFormData: {
      username: '',
      password: '',
      deptId: [],
      roleId: '',
      email: '',
      mobile: '',
      sex: '',
      description: '',
    },

    // 新增用户校验规则
    addRuleValidate: {
      username: [
        {required: true, message: '用户名不能为空', trigger: 'blur'}
      ],
      email: [
        {required: true, message: '邮箱不能为空', trigger: 'blur'},
        // {type: 'email', message: '不正确的邮箱格式', trigger: 'blur'}
      ],
      password: [
        {required: true, message: '密码不能为空', trigger: 'blur'}
      ],
      mobile: [
        {required: true, message: '手机号不能为空', trigger: 'blur'},
      ],
      sex: [
        {required: true, message: '请选择性别', trigger: 'change'}
      ],
      // 注意这里roleId是number,如果不设置type无法通过验证 ,type有多种类型
      roleId: [
        {required: true, type: 'number', message: '请选择角色', trigger: 'blur'}
      ],
      deptId: [
        {required: true, type: 'array', min: 1, message: '请选择部门', trigger: 'change'},
      ],
    },


    // 编辑modal
    editModalShow: false,

    // 编辑用户校验规则
    editRuleValidate: {
      username: [
        {required: true, message: '用户名不能为空', trigger: 'blur'}
      ],
      email: [
        {required: true, message: '邮箱不能为空', trigger: 'blur'},
        // {type: 'email', message: '不正确的邮箱格式', trigger: 'blur'}
      ],
      password: [
        {required: true, message: '密码不能为空', trigger: 'blur'}
      ],
      mobile: [
        {required: true, message: '手机号不能为空', trigger: 'blur'},
      ],


    },

    // 编辑
    editFormData: {
      username: '',
      password: '',
      deptId:[],
      roleId: '',
      email: '',
      mobile: '',
      sex: '',
      status: false,
      createTime:'',
      modifyTime:'',
      lastLoginTime:'',
      description: '',
    },

    // 部门tree data
    departmentList: [],

    // 角色list
    roles: [],

    // 搜索数据
    searchParams : {
      username:'',
      mobile:'',
      sex:'',
      deptId:[],
      status:'',
      sortType:'',
      time:['','']
    },


    total: 0,

    page: {
      start: 1,
      limit: 6,
    },

  },
  mutations: {

    // 清空新增用户表单数据
    clearAddFormData(state) {
      state.addFormData = {
        username: '',
        password: '',
        deptId: [],
        roleId: '',
        email: '',
        mobile: '',
        sex: '',
        description: '',
      }
    },

    setEditFormData(state,data){
      state.editFormData.userId = data.userId;
      state.editFormData.username = data.username;
      state.editFormData.password = data.password;
      state.editFormData.roleId = data.roleId;
      state.editFormData.mobile = data.mobile;
      state.editFormData.sex =  data.sex+'';
      state.editFormData.status = data.status !== 0  ;
      state.editFormData.email = data.email;
      state.editFormData.createTime = data.createTime;
      state.editFormData.lastLoginTime = data.lastLoginTime == null ? "暂无登录信息" : data.lastLoginTime;
      state.editFormData.modifyTime = data.modifyTime;
    }

  },

  actions: {

    /**
     * 用户列表
     */
    getUserList(context) {
      let params = {
        pageSize : context.state.page.limit,
        pageNo : context.state.page.start,
        username : context.state.searchParams.username,
        mobile : context.state.searchParams.mobile,
        deptId : context.state.searchParams.deptId.length === 0 ? '' : context.state.searchParams.deptId[context.state.searchParams.deptId.length - 1] ,
        sex : context.state.searchParams.sex === undefined ? '' : context.state.searchParams.sex,
        status: context.state.searchParams.status === undefined ? '' : context.state.searchParams.status,
        sortType : context.state.searchParams.sortType === undefined ? '' : context.state.searchParams.sortType,
        startTime : context.state.searchParams.time[0] !== "" ?  context.state.searchParams.time[0].Format("yyyy-MM-dd hh:mm:ss") : "",
        endTime : context.state.searchParams.time[1] !== "" ?  context.state.searchParams.time[1].Format("yyyy-MM-dd hh:mm:ss") : "",
      };
      postRequest("/user/query",params).then((response) => {
        console.log(response.data.data);
        context.state.total = response.data.data.total;
        context.state.list = response.data.data.rows;
      })
    },

    /**
     * 用户详情
     */
    getUserDetail(context) {
      getRequest("/user/" + context.state.currentRowData.userId).then((response) => {
        context.commit('setEditFormData',response.data.data);
        context.state.editFormData.deptId = getParent(context.state.departmentList,response.data.data.deptId).reverse();
      });
    },

    /**
     * 加载部门数据
     */
    getDepartmentList(context) {
      getRequest("/department/list/0").then((response) => {
        context.state.departmentList= convertTreeToCascader(response.data.data);
      });
    },

    /**
     * 加载角色数据
     */
    getRoleList(context) {
      getRequest("/role/all").then((response) => {
        context.state.roles = response.data.data;
      });
    },

    /**
     * 点击新增按钮
     */
    getAddData(context) {
      context.state.addModalShow = true;
    },

    /**
     * 新增用户
     */
    addUser(context) {
      let params = {
        username: context.state.addFormData.username,
        password: context.state.addFormData.password,
        deptId: context.state.addFormData.deptId.length === 0 ? '' : context.state.addFormData.deptId[context.state.addFormData.deptId.length - 1],
        roleId: context.state.addFormData.roleId,
        email: context.state.addFormData.email,
        mobile: context.state.addFormData.mobile,
        sex: context.state.addFormData.sex,
        description: context.state.addFormData.description,
      };
      postRequest("/user", params).then((response) => {
        if (response.data.success) {
          /** @namespace iView.Message */
          iView.Message.info(response.data.message);
          context.dispatch('getUserList');  //新增成功从新拉取列表
          // context.commit('clearAddFormData'); //新增成功清空addForm
          userComponent.$refs['addFormValidate'].resetFields();
        } else {
          iView.Message.error({
            content: response.data.message + " : " + JSON.stringify(response.data.data),
            duration: 5
          })
        }
      });
    },

    /**
     * 点击编辑按钮
     */
    getEditData(context) {
      context.dispatch('getUserDetail'); //详情
      context.state.editModalShow = true;
    },
    /**
     * 编辑用户
     */
    editUser(context) {
      let params = {
        username: context.state.editFormData.username,
        deptId: context.state.editFormData.deptId.length === 0 ? '' : context.state.editFormData.deptId[context.state.editFormData.deptId.length - 1],
        roleId: context.state.editFormData.roleId,
        email: context.state.editFormData.email,
        mobile: context.state.editFormData.mobile,
        sex: context.state.editFormData.sex ,
        status:  context.state.editFormData.status ? 1 : 0,
        description: context.state.editFormData.description,
      };
      putRequest("/user/"+context.state.editFormData.userId, params).then((response) => {
        if (response.data.success) {
          /** @namespace iView.Message */
          iView.Message.info(response.data.message);
          context.dispatch('getUserList');  //从新拉取列表
          userComponent.$refs['editFormValidate'].resetFields();
        } else {
          iView.Message.error({
            content: response.data.message + " : " + JSON.stringify(response.data.data),
            duration: 5
          })
        }
      });
    },

  }


}


export default user
