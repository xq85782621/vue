<template>
    <div>
        {{test}}
        {{userId}}
    </div>
</template>

<script>
  import {mapMutations, mapActions} from 'vuex';
  export default {
    data () {
      return this.$store.state.treeDemo;
    },
    methods: {
      ...mapActions('treeDemo',
        ['getUserId','getUserInfo']),
    },
    created(){
      this.getUserId();
    }
  }
</script>

<style scoped>


</style>
