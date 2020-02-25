/**
 * 引入iView 就可以直接 使用 iView 对象访问 其中的组件了
 */
import iView from 'view-design';

import {postRequest, getRequest, putRequest} from '../util/Request'

import {router} from "../router";

import departmentComponent from '../components/system/Department'

import {convertTreeToCascader, convertTreeToTree, getParent} from '../util/common'

const department = {
  namespaced: true,

  state: {
    // 部门列表数据
    departmentListTree: [],
    // 部门数据用来加载cascader
    departmentListCascader:[],

    // 当前选中的部门
    current: '',


    addModalShow: false,
    addFormData: {
      deptId: [],
      deptName: '',
    },
    addRuleValidate: {
      deptName: [
        {required: true, message: '部门名称不能为空', trigger: 'blur'}
      ],
    },
    addDepartmentIds:[],

    /**
     * 详情
     */
    detailModalShow: false,
    detailData: {},

  },

  mutations: {
    // 设置当前选中的部门节点数据
    setCurrent(state, node) {
      state.current = node;
    },


    // 清除当选中状态(就是把selected设为false),以及当前选中数据
    clearCurrent(state) {
      //   let list = state.list;
      //   for (let node in list) {
      //     node.selected = false;
      //     if (list[i].children) {
      //    //如果遍历树结构还有下一级-做操作
      //     } else {
      //     //如果没有下一级做相应操作
      //       return;
      //     }
      //   }
      //
    }
  },

  actions: {

    // 部门列表
    getDepartmentList(context) {
      getRequest("/department/list/0").then((response) => {
        context.state.departmentListTree =  convertTreeToTree(response.data.data);
        context.state.departmentListCascader = convertTreeToCascader(response.data.data);
      })
    },

    // 部门详情
    getDepartmentDetail(context) {
      getRequest("/department/" + context.state.current.value).then((response) => {
        if (response.data.success) {
          context.state.detailData = response.data.data;
          context.state.detailModalShow = true;
        } else {
          iView.Message.error(response.data.data);
        }
      })
    },

    // 部门新增
    addDepartment(context){
      let parentId = context.state.addFormData.deptId.length === 0 ? 0 : context.state.addFormData.deptId[context.state.addFormData.deptId.length-1];
      let params = {
        parentId: parentId,
        deptName : context.state.addFormData.deptName,
      };
      postRequest("/department",params).then((response) => {
        if (response.data.success) {
        //  departmentComponent.$refs['addFormValidate'].resetFields();
          context.dispatch('getDepartmentList');
          context.state.addFormData.deptName = '';
        } else {
          iView.Message.error(response.data.data);
        }
      })
    }


  }


};


export default department
