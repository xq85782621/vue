<template>
  <div>
    <Row>
      <Col span="4">
        <ButtonGroup>
          <Button type="primary" @click="addButton">新增</Button>
          <Button type="primary" @click="editButton">编辑</Button>
        </ButtonGroup>
        <Button shape="circle" @click="clearCurrentRow">清除当前选中行</Button>
      </Col>
    </Row>

    <Divider/>

    <Form label-colon :label-width="80" inline>
      <FormItem label="用户名">
        <Input v-model="searchParams.roleName" clearable placeholder="请输角色名" style="width: 200px"/>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="search()" icon="ios-search">搜 索 &nbsp;&nbsp;</Button>
      </FormItem>
      <br/>
      {{searchParams}}
    </Form>


    <div style="margin-top: 20px">
      <!-- table -->
      <Table
        stripe
        highlight-row
        ref="currentRowTable"
        @on-current-change="selectOne"
        border
        :columns="columns"
        :data="list"/>
    </div>

    <!-- 新增角色 -->
    <Modal
      title="新增角色"
      v-model="addModalShow"
      :closable="false"
      class-name="vertical-center-modal"
    >
      <Form ref="addFormValidate" :rules="addRuleValidate" :model="addFormData" :label-width="80">
        <FormItem label="角色名:" prop="roleName">
          <Input suffix="ios-person-outline" v-model="addFormData.roleName" placeholder="" maxlength="16"
                 style="width:250px"></Input>
        </FormItem>
        <FormItem label="描述:" prop="remark">
          <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" v-model="addFormData.remark"
                 style="width:250px"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="addCancel('addFormValidate')">取消</Button>
        <Button type="primary" @click="addSubmit('addFormValidate')">提交</Button>
      </div>
      {{addFormData}}
    </Modal>


    <!-- 编辑角色 -->
    <Modal
      title="编辑角色"
      v-model="editModalShow"
      :closable="false"
      class-name="vertical-center-modal"
    >
      <Form ref="editFormValidate" :rules="editRuleValidate" :model="editFormData" :label-width="80">
        <FormItem label="角色名:" prop="roleName">
          <Input suffix="ios-person-outline" v-model="editFormData.roleName" placeholder="" maxlength="16"
                 style="width:250px"></Input>
        </FormItem>
        <FormItem label="描述:" prop="remark">
          <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" v-model="editFormData.remark"
                 style="width:250px"></Input>
        </FormItem>
        <FormItem label="用户数量:" >
          <Input suffix="ios-person-outline" v-model="editFormData.roleNumber" disabled
                 style="width:250px"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="editCancel('editFormValidate')">取消</Button>
        <Button type="primary" @click="editSubmit('editFormValidate')">提交</Button>
      </div>
      {{addFormData}}
    </Modal>
  </div>
</template>

<script>
  import {mapMutations, mapActions} from 'vuex';

  export default {
    name: "Role",
    data() {
      return this.$store.state.role;
    },
    methods: {
      ...mapActions('role',
        [
          'getRoleList',
          'addRole',
          'getRoleDetail',
          'editRole'
        ]),

      /**
       * 单选,选中某一行
       */
      selectOne(currentRowData) {
        this.currentRowData = currentRowData;
      },

      /**
       * 清除当前选中行
       */
      clearCurrentRow() {
        this.currentRowData = '';
        this.$refs.currentRowTable.clearCurrentRow();
      },

      /**
       * 点击搜索按钮
       */
      search() {
        this.page.start = 1;
        this.getRoleList();
      },

      /**
       * 点击新增按钮
       */
      addButton() {
        this.addModalShow = true;
      },

      /**
       * 添加角色 取消
       */
      addCancel(name) {
        this.$refs[name].resetFields();
        this.addModalShow = false;
      },

      /**
       * 添加角色
       */
      addSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.addRole();
            this.addModalShow = false;
          }
        })
      },

      /**
       * 点击编辑按钮
       */
      editButton() {
        if (this.currentRowData === '' || this.currentRowData === null) {
          this.$Message.error('未选择');
          return;
        }
        this.getRoleDetail();
      },

      /**
       * 编辑角色
       */
      editSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.editRole();
            this.editModalShow = false;
          }
        })
      },

      /**
       * 编辑角色 取消
       */
      editCancel(name) {
        this.$refs[name].resetFields();
        this.editModalShow = false;
      },


    },
    created() {
      this.getRoleList();
    }
  }
</script>

<style scoped>

</style>
