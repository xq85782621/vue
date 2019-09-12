<template>
  <div>
    设备信息 {{device_name}}
    <Button type="info" @click="getInfo()">测试按钮mutation</Button>

    <Button type="info" @click="getInfoParam('哈哈哈')">测试按钮mutation(带参)</Button>


    <Button type="info" @click="getInfoAction()">测试按钮action</Button>
  </div>
</template>

<script>

  import {mapMutations, mapActions} from 'vuex';

  export default {
    name: "DeviceInfo",
    data() {
      return this.$store.state.deviceInfo;
    },
    methods: {
      /**
       * 通过这种方式,可以直接在页面中调用vuex中的mutation或者action
       * 相当于直接把mutation和action中的方法映射进来
       */
      ...mapMutations('deviceInfo',
        [
          'getInfo',
          'getInfoParam',


        ]),
      ...mapActions('deviceInfo',
        [
          'getInfoAction',


        ])
    },
    created() {
      //在这里也可以直接调用method
      this.getInfo();
    }
  }
</script>

<style scoped>

</style>
