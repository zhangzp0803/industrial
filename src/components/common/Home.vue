<template>
  <el-container>
    <el-header style="padding: 0px"><v-head></v-head></el-header>
    <el-container>
      <el-aside :style="collapse_style"><v-sidebar v-if="_show" :isCollapse="isCollapse"></v-sidebar></el-aside>
      <el-main><transition name="move" mode="out-in"><router-view></router-view></transition></el-main>
    </el-container>
  </el-container>

</template>

<style>
.collapse{
  width:60px;
}
.unCollapse{
  width:200px;
}
@media screen and (max-width: 975px){
  .content{
    left: 0;
    height: 100%;
    z-index: -1;
    padding: 0 10px;
  }
}
</style>

<script>
import vHead from './Header.vue'
import vSidebar from './Sidebar.vue'
import {
  mapState
} from 'vuex';
export default {
  components: {
    vHead,
    vSidebar
  },
  computed: {
    ...mapState({
      _show(state) {
        return state.showSidbar;
      },
      isCollapse(state) {
        return state.collapse;
      },
      collapse_style(state) {
        return state.collapse === true ? { width: '60px', transition: 'all 0.4s' } : { width: '200px', transition: 'all 0.4s' };
      }

    })
  },
  data: function() {
    return {
      show: false
    }
  }
}
</script>
