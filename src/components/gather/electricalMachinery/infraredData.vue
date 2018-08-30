<template>
  <div>

    <el-upload ref="upload"
               :data="{collectionid: this.collectionid}"
               :on-success="uploadSuccess" multiple
               :action="url"
               accept="image/*"
               class="upload-demo">
      <el-button v-if="isEdit === 'edit'" icon="el-icon-upload" class="button">红外图片上传</el-button>
    </el-upload>

    <el-table
      :data="listData"
      border
      height="400"
      style="width: 100%;text-align: left">
      <el-table-column
        prop="filename"
        label="文件名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="filesize"
        label="文件大小(KB)"
        width="170">
        <template slot-scope="scope">
          <span >{{(scope.row.filesize/1024).toFixed(0) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="collectiontime"
        label="采集时间">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <a :href="getURL(scope.row)"><i class=""></i>下载</a>
          <el-button v-if="isEdit === 'edit'" @click="del(scope.row, scope.$index)" type="text" size="small"><i class="el-icon-circle-close-outline"></i>删除</el-button>
        </template>
      </el-table-column>

    </el-table>

  </div>
</template>

<style>
  .el-card__body{
    padding: 10px;
  }
  .el-table td, .el-table th{
    padding: 6px 0;
  }

</style>
<style lang="scss" scoped>
  .button{
    padding: 8px 15px;
    margin: 0 10px 10px 0;
    float: left;
  }
  a{
    color: #4da4ff;
    font-size: 12px;
    font-weight: 500;
    text-decoration: none;
  }

</style>

<script type="text/javascript">
import {
  mapActions,
  mapState
} from 'vuex';
export default {
  props: ['isEdit', 'collectionid'],
  name: 'noisyData',
  mounted() {

  },
  methods: {
    uploadSuccess(o) {
      this.$refs.upload.clearFiles();
      this.getInfraredDataList({'url': '/industry/getMotorInfraredData', collectionid: this.collectionid});
    },
    ...mapActions({
      getInfraredDataList: 'gather/getInfraredDataList',
      delInfraredData: 'gather/delInfraredData'
    }),
    download(row) {

    },
    del(row, rowIndex) {
      this.delInfraredData({obj: row, rowIndex: rowIndex})
    },
    getURL(row) {
      return process.env.BASE_API + '/industry/downloadinfraredfile?motorinfraredid=' + row.motorinfraredid;
    }
  },
  computed: {
    ...mapState('gather', {
      listData(state) {
        if (!state.infraredDataList) {
          return [];
        } else {
          return state.infraredDataList;
        }
      }
    }),
    url() {
      return process.env.BASE_API + '/industry/uploadMotorInfraredData/multi'
    }
  },
  data() {
    return {

    }
  }

};

</script>
