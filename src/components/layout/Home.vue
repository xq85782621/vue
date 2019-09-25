<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo"></div>
          <div class="layout-nav">
            <MenuItem name="1">
              <Button type="info" @click="center()">控制台</Button>
            </MenuItem>
            <MenuItem name="1">
              <Button type="info">个人中心</Button>
            </MenuItem>
            <MenuItem name="2">

              <Button type="error">
                <Icon type="md-exit"/>
                退出
              </Button>
              <!--<Button :size="buttonSize" icon="md-log-out" type="error">退出</Button>-->
              <br>
              <br>
            </MenuItem>

          </div>
        </Menu>

      </Header>
      <Layout>
        <Sider hide-trigger :style="{background: '#515a6e'}">
          <Menu theme="dark" width="auto" :accordion="true" @on-select="selectMenu">
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-desktop"/>
                设备管理
              </template>
              <MenuItem name="deviceInfo">设备信息</MenuItem>
              <MenuItem name="deviceLog">设备日志</MenuItem>
            </Submenu>
            <Submenu name="2">
              <template slot="title">
                <Icon type="ios-keypad"></Icon>
                组件测试
              </template>
              <MenuItem name="tree">树形控件</MenuItem>
              <MenuItem name="table">表单控件</MenuItem>
            </Submenu>
            <Submenu name="3">
              <template slot="title">
                <Icon type="ios-contacts"/>
                人事管理
              </template>
              <MenuItem name="3-1">员工管理</MenuItem>
              <MenuItem name="3-2">员工调动</MenuItem>
              <MenuItem name="3-2">员工调薪</MenuItem>
            </Submenu>
            <Submenu name="4">
              <template slot="title">
                <Icon type="md-flower"/>
                系统管理
              </template>
              <MenuItem name="4-1">基础信息</MenuItem>
              <MenuItem name="4-2">系统设置</MenuItem>
            </Submenu>
          </Menu>
        </Sider>
        <Layout :style="{padding: '20px 24px 24px'} ">
          <Content :style="{padding: '24px', minHeight: 'calc(100vh - ( 60px + 24px + 24px   ))', background: '#fff'}">
            <router-view></router-view>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>

</template>

<script>

  import DeviceInfo from "../device/DeviceLog";

  export default {

    name: 'HelloWorld',
    components: {DeviceInfo},

    data() {
      return {}
    },
    methods: {
      selectMenu(name) {
        this.$router.push({name: name})
      },
      center() {
        this.$router.push({name: "center"})
      }
    }
  }
</script>

<style scoped>
  .layout {
    margin: 0;
    border: 0px;
    background: #515a6e;
    position: relative;
    overflow: hidden;
    height: 100%;

  }

  .layout-logo {
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }

  .layout-nav {
    width: 420px;
    margin: 0 auto;
    margin-right: 0px;

  }


</style>
