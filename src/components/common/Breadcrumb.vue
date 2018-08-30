<template>
  <div class="">
    <!--<el-breadcrumb class="breadcrumb" separator="/">-->
      <!--<el-breadcrumb-item >{{route[0].name}}</el-breadcrumb-item>-->
      <!--<el-breadcrumb-item >{{route[1].name}}</el-breadcrumb-item>-->
    <!--</el-breadcrumb>-->
  </div>
</template>

<style scoped>
.breadcrumb{
  background: #ffffff;
  padding: 15px 20px;
  margin: -10px -20px 15px -20px;
}
</style>

<script>
// import {
//   mapActions
// } from 'vuex';
export default {
  data () {
    return {
      name: 'header'
    }
  },
  computed: {
    route () {
      return this.$route.matched;
    }
  }
}
</script>
