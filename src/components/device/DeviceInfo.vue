<template>
  <div>
    <ButtonGroup>
      <Button type="primary">新增</Button>
      <Button type="primary">编辑</Button>
      <Button type="primary" @click="handlerDetail">详情</Button>
    </ButtonGroup>
    <Button shape="circle" @click="ClearCurrentRow">清除当前选中行</Button>

    <Select clearable placeholder="全部" prefix="ios-home" v-model="model1" style="width:150px">
      <Option v-for="item in cityList"  :key="item.value"   :value="item.label" :label="item.label">
        <span > {{ item.label }}</span>
        <span style="float:right;color:#ccc">{{ item.value }}</span>
      </Option>
    </Select>

    <Divider></Divider>

    <div style="margin-top: 20px">
      <!-- table -->
      <Table
        stripe
        highlight-row
        @on-row-click="selected"
        @on-row-dblclick="doubleSelected"
        ref="currentRowTable"
        border
        :columns="columns"
        :data="list"/>
    </div>


    <Table :columns="columns14" :data="data5" border ></Table>


    <!-- 详情modal -->
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
       * 查看详情
       */
      handlerDetail() {
        if (this.current_device === '') {
          this.$Message.error('未选择');
          return;
        }
        this.detail_show = true;
      },

      /**
       * 选中某一行
       */
      selected(value) {
        this.current_device = value;
      },

      /**
       * 双击某一行
       */
      doubleSelected(value) {
        this.detail_show = true;
        this.current_device = value;
      },

      /**
       * 清除选中行
       */
      ClearCurrentRow() {
        this.current_device = '';
        this.$refs.currentRowTable.clearCurrentRow();
      },


    }
  }
</script>

<style scoped>

</style>
