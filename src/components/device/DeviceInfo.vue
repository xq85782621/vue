<template>
  <div>
    <ButtonGroup>
    <Button type="primary">新增</Button>
    <Button type="primary">编辑</Button>
    <Button type="primary">详情</Button>
    </ButtonGroup>
    <Button shape="circle" @click="ClearCurrentRow">清除当前选中行</Button>
    <Divider ></Divider>
    <div style="margin-top: 20px">
      <Table stripe  highlight-row @on-row-click="selected" @on-row-dblclick="doubleSelected"  ref="currentRowTable" border :columns="columns" :data="list"></Table>
    </div>


    <!--详情-->
    <Modal
      title="Title"
      v-model="detail_show"
      class-name="vertical-center-modal">
      <p>{{current_device}}</p>
    </Modal>



  </div>
</template>

<script>
  export default {
    name: "DeviceInfo",
    data() {
      return this.$store.state.deviceInfo;
    },
    methods: {

      /**
       * 选中某一行
       */
      selected(value) {
        this.current_device = value;
      },

      /**
       * 双击某一行
       */
      doubleSelected(value){
        this.detail_show = true;
        this.current_device = value;
        console.log("ssssssss")
      },

      /**
       * 清除选中行
       */
      ClearCurrentRow () {
        this.current_device = '';
        this.$refs.currentRowTable.clearCurrentRow();
      }
    }
  }
</script>

<style scoped>

</style>
