/**
 * 引入iView 就可以直接 使用 iView 对象访问 其中的组件了
 */
import iView from 'view-design';

import {postRequest, getRequest , putRequest} from '../util/Request'

import {router} from "../router";

import roleComponent  from '../components/system/Role'

const user = {
  namespaced: true,

  state: {
    columns:[
      {
        type: 'index',
        title: '#',
        width: 80,
        align: 'center',
      },
      {
        title: '角色名',
        key: 'roleName',
        align: 'center',
      },
      {
        title: '说明',
        key: 'remark',
        align: 'center',
      },
      {
        title: '角色人数',
        key: 'roleNumber',
        align: 'center',
      },
    ],
    list :[],


    // 当前选中的行
    currentRowData: '',

    addModalShow : false,

    // 新增用户的数据
    addFormData: {
      roleName: '',
      remark: '',
    },

    // 新增用户校验规则
    addRuleValidate: {
      roleName: [
        {required: true, message: '角色名不能为空', trigger: 'blur'}
      ],
      remark: [
        {required: true, message: '角色描述不能为空', trigger: 'blur'},
      ],
    },


    // 编辑modal
    editModalShow: false,

    // 编辑用户校验规则
    editRuleValidate: {
      roleName: [
        {required: true, message: '角色名不能为空', trigger: 'blur'}
      ],
      remark: [
        {required: true, message: '角色描述不能为空', trigger: 'blur'},
      ],
    },

    // 编辑
    editFormData: {
      roleName: '',
      remark: '',
    },


    // 搜索数据
    searchParams : {
      roleName:'',
    },

    total: 0,

    page: {
      start: 1,
      limit: 6,
    },

  },

  mutations: {

    setEditFormData(state,role){
      state.editFormData.roleName = role.roleName;
      state.editFormData.remark = role.remark;
      state.editFormData.roleNumber = role.roleNumber;
    }

  },

  actions:{

    // 角色列表
    getRoleList(context){
        let params = {
          pageSize : context.state.page.limit,
          pageNo : context.state.page.start,
          roleName : context.state.searchParams.roleName,
        };
        postRequest("/role/query",params).then((response) => {
        console.log(response.data.data);
        context.state.total = response.data.data.total;
        context.state.list = response.data.data.rows;
      })
    },

    // 添加角色
    addRole(context){
      let params = {
        roleName: context.state.addFormData.roleName,
        remark: context.state.addFormData.remark,
        ids:[1,2,3]
      };
      postRequest("/role", params).then((response) => {
        if (response.data.success) {
          /** @namespace iView.Message */
          iView.Message.info(response.data.message);
          context.dispatch('getRoleList');  //新增成功从新拉取列表
          // context.commit('clearAddFormData'); //新增成功清空addForm
          roleComponent.$refs['addFormValidate'].resetFields();
        } else {
          iView.Message.error({
            content: response.data.message + " : " + JSON.stringify(response.data.data),
            duration: 5
          })
        }
      });
    },

    // 详情
    getRoleDetail(context){
      getRequest("/role/"+ context.state.currentRowData.roleId).then((response) => {
          context.commit('setEditFormData',response.data.data);
          context.state.editModalShow = true ;
      });
    },

    // 编辑角色基本信息
    editRole(context){
      let params = {
        roleName : context.state.editFormData.roleName,
        remark : context.state.editFormData.remark,
      }
      // putRequest("/role/"+ context.state.editFormData.roleId , params){
      //
      // }
    }
  },


};


export default user
