<template>
  <el-card class="box-card healthManager">
    <div slot="header" class="header">
      <span>转储与合并作业异常告警</span>
    </div>
    <el-table
      :data="_errorList"
      border
      height="250"
      :default-sort = "{prop: 'startTime', order: 'descending'}"
      style="width: 100%;text-align: left">
      <el-table-column
        prop="name"
        label="作业名称"
        width="160">
        <template slot-scope="scope">
          <div>{{scope.row.name | jobName('name')}}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="type"
        width="120"

        label="数据类型">
        <template slot-scope="scope">
          <div>{{scope.row.type | jobName('type')}}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        width="90"
        label="作业状态">
      </el-table-column>
      <el-table-column
        prop="laststatus"
        width="110"
        label="作业最终状态">
      </el-table-column>
      <el-table-column
        prop="startTime"
        width="160"
        sortable
        label="作业启动时间">
      </el-table-column>
      <el-table-column
        prop="duration"
        width="120"
        label="作业持续时间">
        <template slot-scope="scope">
          <div>{{scope.row.duration/1000/60 | format(0)}}min {{scope.row.duration%60}}s</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="link"
        label="作业日志链接">
        <template slot-scope="scope">
          <div><a target="_blank" :href="scope.row.link">查看详情</a></div>
        </template>
      </el-table-column>

    </el-table>
  </el-card>
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

  * {
    margin: 0px;
    padding: 0px;
    list-style: none;
  }
  .header{
    text-align: left;
  }



</style>

<script type="text/javascript">
import Vue from 'vue'
import {
  mapActions,
  mapState
} from 'vuex';

Vue.filter('jobName', function (s, type) {
  /*
   * 参数说明：
   * s：要格式化的文字
   * */
  switch (s) {
    case 'RealDataKafka2Kudu':
      debugger;
      if (type === 'name') {
        return 'realdata数据kafka入kudu';
      } else {
        return 'realdata';
      }
    case 'cmswavedataParquetMergeT':
      if (type === 'name') {
        return 'cmswavedata数据天合并';
      } else {
        return 'cmswavedata';
      }
    case 'cmswavedataParquetMergeM':
      if (type === 'name') {
        return 'cmswavedata数据月合并';
      } else {
        return 'cmswavedata';
      }
    case 'cmswavedataParquetMergeY':
      if (type === 'name') {
        return 'cmswavedata数据年合并';
      } else {
        return 'cmswavedata';
      }
    case 'bfileParquetMergeT':
      if (type === 'name') {
        return 'bfile数据天合并';
      } else {
        return 'bfile';
      }
    case 'bfileParquetMergeM':
      if (type === 'name') {
        return 'bfile数据月合并';
      } else {
        return 'bfile';
      }
    case 'bfileParquetMergeY':
      if (type === 'name') {
        return 'bfile数据年合并';
      } else {
        return 'bfile';
      }
    case 'ffileParquetMergeT':
      if (type === 'name') {
        return 'ffile数据天合并';
      } else {
        return 'ffile';
      }
    case 'ffileParquetMergeM':
      if (type === 'name') {
        return 'ffile数据月合并';
      } else {
        return 'ffile';
      }
    case 'ffileParquetMergeY':
      if (type === 'name') {
        return 'ffile数据年合并';
      } else {
        return 'ffile';
      }
    case 'emsdataParquetMergeT':
      if (type === 'name') {
        return 'emsdata数据天合并';
      } else {
        return 'emsdata';
      }
    case 'emsdataParquetMergeM':
      if (type === 'name') {
        return 'emsdata数据月合并';
      } else {
        return 'emsdata';
      }
    case 'emsdataParquetMergeY':
      if (type === 'name') {
        return 'emsdata数据年合并';
      } else {
        return 'emsdata';
      }
    case 'EmsdataKudu2Parquet':
      if (type === 'name') {
        return 'emsdata转储';
      } else {
        return 'emsdata';
      }
    case 'RealdataKudu2Parquet':
      if (type === 'name') {
        return 'realdata转储';
      } else {
        return 'realdata';
      }
    case 'RealdataDistinct':
      if (type === 'name') {
        return 'realdata去重任务';
      } else {
        return 'realdata';
      }
    case 'EmsdataDistinct':
      if (type === 'name') {
        return 'emsdata去重任务';
      } else {
        return 'emsdata';
      }
    case 'realdataParquetMergeT':
      if (type === 'name') {
        return 'realdata数据天合并';
      } else {
        return 'realdata';
      }
    case 'realdataParquetMergeM':
      if (type === 'name') {
        return 'realdata数据月合并';
      } else {
        return 'realdata';
      }
    case 'realdataParquetMergeY':
      if (type === 'name') {
        return 'realdata数据年合并';
      } else {
        return 'realdata';
      }
    default:
      return s;
  }
});

export default {
  props: ['type'],
  name: 'ErrorList',
  mounted() {
    this.getdata({'url': '/goldwind/getAppId'});
  },
  methods: {
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    ...mapActions({
      getdata: 'dashboard/getErrorList'
    })
  },
  computed: {
    typeFilters (state) {
      let filters = [];
      this.data.forEach((item, index) => {
        filters.push({text: item.type, value: item.type});
      });
      return filters;
    },
    ...mapState('dashboard', {
      _errorList(state) {
        if (!state.errorList) {
          return this.data;
        } else {
          this.data = state.errorList;
          return this.data;
        }
      }
    })
  },
  data() {
    return {
      data: []
    }
  }

};

</script>
