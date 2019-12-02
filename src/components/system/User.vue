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

    <Divider />
    <Form label-colon :label-width="80" inline>
      <FormItem label="用户名">
        <Input v-model="searchParams.username" clearable   placeholder="请输入用户名" style="width: 200px" />
      </FormItem>
      <FormItem label="手机号">
        <Input  v-model="searchParams.mobile" clearable  placeholder="请输入手机号" style="width:200px" />
      </FormItem>
      <FormItem label="部  门" >
        <Cascader placeholder="全部" :data="departmentList" v-model="searchParams.deptId" change-on-select style="width:200px"  ></Cascader>
      </FormItem>
      <FormItem label="类 型" >
        <Select v-model="searchParams.sortType" style="width:100px" placeholder="未选择" clearable >
          <Option value="create_time">创建时间</Option>
          <Option value="modify_time">修改时间</Option>
          <Option value="last_login_time">最后登录</Option>
        </Select>
      </FormItem>
      <FormItem label="时 间">
        <DatePicker type="datetimerange"  v-model="searchParams.time" placeholder="请选择时间范围" style="width: 330px"></DatePicker>
      </FormItem>
      <FormItem label="状  态" >
        <Select v-model="searchParams.status" style="width:100px" placeholder="全部" clearable >
          <Option value="1">有效</Option>
          <Option value="0">锁定</Option>
        </Select>
      </FormItem>
      <FormItem label="性  别">
        <Select v-model="searchParams.sex" placeholder="全部"  style="width:100px" clearable >
          <Option value="0">未知</Option>
          <Option value="1">男</Option>
          <Option value="2">女</Option>
        </Select>
      </FormItem>

      <FormItem >
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

    <!-- 编辑用户 -->
    <Modal
      title="编辑用户"
      v-model="editModalShow"
      :closable="false"
      class-name="vertical-center-modal"
    >
      <Form ref="editFormValidate" :rules="editRuleValidate" :model="editFormData" :label-width="80">
        <FormItem label="用户名:" prop="username">
          <Input suffix="ios-person-outline" v-model="editFormData.username" placeholder="" maxlength="16"
                 style="width:250px"></Input>
        </FormItem>
        <FormItem label="邮  箱:" prop="email">
          <AutoComplete
            icon="ios-mail-outline"
            v-model="editFormData.email"
            @on-search="mailAutoComplete"
            placeholder=""
            style="width:250px">
            <Option v-for="item in mailAutoList" :value="item" :key="item">{{ item }}</Option>
          </AutoComplete>
        </FormItem>
        <FormItem label="手  机:" prop="mobile">
          <Input type="text" suffix="ios-call-outline" v-model="editFormData.mobile" placeholder="" maxlength="11"
                 style="width: 250px"></Input>
        </FormItem>
        <FormItem label="性  别:" prop="sex">
          <RadioGroup v-model="editFormData.sex">
            <Radio label="1" border>
              <Icon type="ios-man" :size="20" color="#2b85e4"/>
            </Radio>
            <Radio label="2" border>
              <Icon type="ios-woman" :size="20" color="#ed4014"/>
            </Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="状 态:" prop="status">
          <i-switch  v-model="editFormData.status" size="large">
            <span slot="open">启用</span>
            <span slot="close">锁定</span>
          </i-switch >
        </FormItem>
        <FormItem label="角  色:" prop="roleId">
          <Select v-model="editFormData.roleId" style="width:250px">
            <Option v-for="item in roles" :value="item.roleId" :key="item.roleId">{{ item.roleName }}</Option>
          </Select>
        </FormItem>
        <FormItem label="部  门:" prop="deptId">
          <Cascader :data="departmentList" v-model="editFormData.deptId" style="width: 250px"></Cascader>
        </FormItem>
        <FormItem label="创建时间:" >
          <Input disabled="disabled" type="text" suffix="ios-time-outline" v-model="editFormData.createTime" placeholder="" maxlength="11"
                 style="width: 250px"></Input>
        </FormItem>
        <FormItem label="修改时间:" >
          <Input disabled="disabled" type="text" suffix="ios-time-outline" v-model="editFormData.modifyTime" placeholder="" maxlength="11"
                 style="width: 250px"></Input>
        </FormItem>
        <FormItem label="最近登录:" >
          <Input disabled="disabled" type="text" suffix="ios-time-outline" v-model="editFormData.lastLoginTime" placeholder="" maxlength="11"
                 style="width: 250px"></Input>
        </FormItem>
        <FormItem label="描  述:" prop="description">
          <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" v-model="editFormData.description" placeholder=""
                 maxlength="150" style="width:250px" show-word-limit></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="editCancel('editFormValidate')">取消</Button>
        <Button type="primary" @click="editSubmit('editFormValidate')">提交</Button>
      </div>
      {{editFormData}}
    </Modal>

    <!-- 新增用户 -->
    <Modal
      title="新增用户"
      v-model="addModalShow"
      :closable="false"
      class-name="vertical-center-modal"
    >
      <Form ref="addFormValidate" :rules="addRuleValidate" :model="addFormData" :label-width="80">
        <FormItem label="用户名:" prop="username">
          <Input suffix="ios-person-outline" v-model="addFormData.username" placeholder="" maxlength="16"
                 style="width:250px"></Input>
        </FormItem>
        <FormItem label="密  码:" prop="password">
          <Input v-model="addFormData.password" type="password" password placeholder="" maxlength="16"
                 style="width:250px"></Input>
        </FormItem>
        <FormItem label="邮  箱:" prop="email">
          <AutoComplete
            icon="ios-mail-outline"
            v-model="addFormData.email"
            @on-search="mailAutoComplete"
            placeholder=""
            style="width:250px">
            <Option v-for="item in mailAutoList" :value="item" :key="item">{{ item }}</Option>
          </AutoComplete>
        </FormItem>
        <FormItem label="手  机:" prop="mobile">
          <Input type="text" suffix="ios-call-outline" v-model="addFormData.mobile" placeholder="" maxlength="11"
                 style="width: 250px"></Input>
        </FormItem>
        <FormItem label="性  别:" prop="sex">
          <RadioGroup v-model="addFormData.sex">
            <Radio label="1" border>
              <Icon type="ios-man" :size="20" color="#2b85e4"/>
            </Radio>
            <Radio label="2" border>
              <Icon type="ios-woman" :size="20" color="#ed4014"/>
            </Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="角  色:" prop="roleId">
          <Select v-model="addFormData.roleId" style="width:250px">
            <Option v-for="(item,roleId) in roles" :value="item.roleId" :key="roleId">{{ item.roleName }}</Option>
          </Select>
        </FormItem>
        <FormItem label="部  门:" prop="deptId">
          <Cascader :data="departmentList" v-model="addFormData.deptId" style="width: 250px"></Cascader>
        </FormItem>
        <FormItem label="描  述:" prop="description">
          <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" v-model="addFormData.description" placeholder=""
                 maxlength="150" style="width:250px" show-word-limit></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="addCancel('addFormValidate')">取消</Button>
        <Button type="primary" @click="addSubmit('addFormValidate')">提交</Button>
      </div>
      {{addFormData}}
    </Modal>
    <Page :total="total" :page-size="page.limit" :current="page.start" size="small" @on-change="pageChange" />

  </div>
</template>

<script>
  import {mapMutations, mapActions} from 'vuex';

  export default {
    name: "User",
    data() {
      return this.$store.state.user;
    },
    methods: {
      ...mapMutations('user',
        []),
      ...mapActions('user',
        [
          'getDepartmentList',
          'getRoleList',
          'getUserList',
          'getEditData',
          'getAddData',
          'addUser',
          'editUser',
        ]),

      /**
       * 邮箱自动完成
       */
      mailAutoComplete(value) {
        this.mailAutoList = !value || value.indexOf('@') >= 0 ? [] : [
          value + '@qq.com',
          value + '@sina.com',
          value + '@163.com'
        ];
      },

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
       * 点击编辑按钮
       */
      editButton() {
        if (this.currentRowData === '' || this.currentRowData === null) {
          this.$Message.error('未选择');
          return;
        }
        this.getEditData();
      },

      /**
       * 编辑用户
       */
      editSubmit(name){
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.editUser();
            this.editModalShow = false;
          }
        })
      },

      /**
       * 编辑用户 取消
       */
      editCancel(name){
        this.$refs[name].resetFields();
        this.editModalShow = false;
      },

      /**
       * 点击新增按钮
       */
      addButton() {
        this.getAddData();
      },

      /**
       * 添加用户
       */
      addSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.addUser();
            this.addModalShow = false;
          }
        })
      },

      /**
       * 添加用户 取消
       */
      addCancel(name){
        this.$refs[name].resetFields();
        this.addModalShow = false;
      },

      /**
       * 改变页数
       */
      pageChange(currentPage){
        this.clearCurrentRow(); // 清除选中行
        this.page.start = currentPage;
        this.getUserList()
      },

      /**
       * 点击搜索按钮
       */
      search(){
        this.page.start = 1;
        this.getUserList();
      }

    },
    created() {
      this.getUserList();
      this.getRoleList();
      this.getDepartmentList();
    }
  }
</script>

<style scoped>

</style>
