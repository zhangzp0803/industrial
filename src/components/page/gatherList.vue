<template>
  <div >
    <div  v-loading="loading2"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading" style="width: 100%;" element-loading-background="rgba(255,255,255,.5)">
    <Breadcrumb></Breadcrumb>
      <el-row :gutter="20">
        <el-col :span="24">
          <List></List>
        </el-col>
      </el-row>

    </div>
  </div>
</template>

<script>
import List from '../gather/List'
import Breadcrumb from '../common/Breadcrumb'

export default {
  name: 'equipmentMgr',
  components: {
    List,
    Breadcrumb
  },
  data: function() {
    return {
      loading2: false
    }
  },
  mounted() {

  },
  methods: {

  },
  computed: {
    userIDs (state) {
      return this.$store.state.userIDs;
    }
  },
  created() {

  }
}
</script>

<style lang="scss" scoped >

</style>
