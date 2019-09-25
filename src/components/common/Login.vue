<template>
  <div>
    <Form ref="formInline" class="login-container">

      <h3 class="login_title">系统登录</h3>
      <FormItem>
        <Input type="text" v-model="username" placeholder="Username">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Input type="password" v-model="password" placeholder="Password">
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary" style="width: 100%" @click="login" :disabled="password == '' || username == ''" >登录</Button>
      </FormItem>
    </Form>


  </div>
</template>

<script>
  import {mapMutations, mapActions} from 'vuex';
  export default {
    name: "Login",
    data() {
      return this.$store.state.login;
    },
    methods: {
      ...mapMutations('login',
        [
          'login',
        ]),
    }
  }
</script>

<style  scoped>
  .login-container {
    font-size: 18px;
    border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 400px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;

  }

  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

  .login_remember {
    margin: 0px 0px 35px 0px;
    text-align: left;
  }
</style>
