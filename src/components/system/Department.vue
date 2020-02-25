<template>
  <div>
    <Row>
      <Col span="6">
        <ButtonGroup>
          <Button type="primary" @click="addButton()">新增</Button>
          <Button type="primary" @click="">编辑</Button>
          <Button type="primary" @click="detailButton()">详情</Button>
        </ButtonGroup>
        <Button shape="circle" @click="clearCurrentRow">清除当前选中行</Button>
      </Col>
    </Row>


    <Divider/>
    <Tree ref="tree" :data="departmentListTree" @on-select-change="selectNode"></Tree>

    <br/>
    <!--详情 modal-->
    <!-- modal 只要消失就会触发on-cancel 事件 -->
    <Modal v-model="detailModalShow" title="部门详情" width="400" >
      <Form :label-width="80">
        <FormItem label="部门名称:">
          {{detailData.deptName}}
        </FormItem>
        <FormItem label="创建时间:">
          {{detailData.createTime}}
        </FormItem>
        <FormItem label="修改时间:">
          {{detailData.modifyTime}}
        </FormItem>
        <FormItem label="用户人数:">
          <!--<Input v-model="detailData.deptNumber" disabled="true"  style="width:250px"></Input>-->
          {{detailData.deptNumber}}
        </FormItem>
      </Form>
    </Modal>


    <!--新增 modal-->
    <Modal v-model="addModalShow" title="部门新增" width="400"  @on-cancel="addCancel('addFormValidate')">
      <Form :label-width="90" ref="addFormValidate" :rules="addRuleValidate" :model="addFormData" >
        <FormItem label="父级部门:" >
          <Cascader :data="departmentListCascader" v-model="addFormData.deptId" style="width: 250px" placeholder="顶级" change-on-select ></Cascader>
        </FormItem>
        <FormItem  label="部门名称:" prop="deptName">
          <Input v-model="addFormData.deptName" style="width:250px"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="addCancel('addFormValidate')">取消</Button>
        <Button type="primary" @click="addSubmit('addFormValidate')">提交</Button>
      </div>
    </Modal>

  </div>
</template>

<script>
  import {mapMutations, mapActions} from 'vuex';
  import {getParent} from '../../util/common';
  export default {
    name: "Department",
    data() {
      return this.$store.state.department;
    },
    methods: {
      ...mapMutations('department', ['setCurrent']),
      ...mapActions('department', ['getDepartmentList', 'getDepartmentDetail','addDepartment']),


      /**
       * 选中节点
       * @param node 当前节点的数据,是[],因为可以设置多选
       */
      selectNode(node) {
        this.setCurrent(node[0]);
      },
      /**
       * 清除当前选中的节点
       */
      clearCurrentRow() {
        // 从新加载一遍
        this.getDepartmentList();
        this.addFormData.deptId = [] ;
        this.current = {};
      },

      /**
       * 点击新增按钮
       */
      addButton() {
        this.addModalShow = true;
        console.log(this.$refs);
        // 拿到当前部门id ,然后--> idList 用来匹配cascader
        if (Object.keys(this.current).length !== 0) {
          this.addFormData.deptId = getParent(this.departmentListCascader,this.current.value).reverse();
        }
      },

      /**
       * 添加部门 取消
       */
      addCancel(name){
        this.$refs[name].resetFields();
        this.addModalShow = false;
      },

      /**
       * 添加部门
       */
      addSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.addDepartment();
            this.addModalShow = false;
          }
        })
      },

      /**
       * 点击详情按钮
       */
      detailButton() {
        // Object.keys() 得到对象的属性数组,通过数组长度判断对象是否为空
        if (Object.keys(this.current).length === 0) {
          this.$Message.error('未选择');
          return false;
        }
        this.getDepartmentDetail();
      },


    },
    created() {
      this.getDepartmentList();
    }
  }
</script>

<style scoped>

  .ivu-tree {
    text-align:start;
  }
  .ivu-tree-arrow  .ivu-icon{

  }

  .ivu-tree {
    height: 40px;
    justify-content: space-between;
  }

  .ivu-tree-title {
    width: 1000px;
  }
  .ivu-tree-children li span:nth-child(2){
    flex: 1;
  }


  ivu-tree-arrow ivu-tree-arrow-open{

  }

  .ivu-tree {
    line-height: 30px;
  }


</style>
