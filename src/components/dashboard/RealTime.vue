<template>
  <el-card class="box-card healthManager">
    <div slot="header" class="header">
      <span>{{_obj.title}}</span>
    </div>
    <el-table
      :data="_obj.data"
      border
      style="width: 100%;text-align: right">
      <el-table-column
        prop="index"
        label="指标"
        align="left"
        width="140">
      </el-table-column>
      <el-table-column
        prop="today"

        label="当日">
        <template slot-scope="scope">
          <div v-if="scope.row.today.day !== undefined" style="text-align: left">
            <div><i class="el-icon-success blue"></i>  完&nbsp;&nbsp;&nbsp;成:&nbsp;{{ scope.row.today.complete }}</div>
            <div><i class="el-icon-loading green"></i> 运行中:&nbsp;{{ scope.row.today.running }}</div>
          </div >
          <div v-else-if="scope.row.today.complete !== undefined" style="text-align: left">
            <div><i class="el-icon-success blue"></i>  完&nbsp;&nbsp;&nbsp;成:&nbsp;{{ scope.row.today.complete }}</div>
            <div><i class="el-icon-loading green"></i> 运行中:&nbsp;{{ scope.row.today.running }}</div>
          </div >
          <div v-else>
            {{ scope.row.today| format(0)}}
          </div >

        </template>
      </el-table-column>
      <el-table-column
        prop="cumulate"
        label="累计">
        <template slot-scope="scope">
          <div v-if="scope.row.cumulate.day !== undefined" style="text-align: left">
            <div><i class="el-icon-success blue"></i>  完&nbsp;&nbsp;&nbsp;成:&nbsp;{{ scope.row.cumulate.complete }}</div>
            <div><i class="el-icon-loading green"></i> 运行中:&nbsp;{{ scope.row.cumulate.running }}</div>
            <div><i class="el-icon-date blue"></i> 日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;{{ scope.row.cumulate.day }}</div>
            <div><i class="el-icon-date blue"></i> 月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;{{ scope.row.cumulate.month }}</div>
            <div><i class="el-icon-date blue"></i> 年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;{{ scope.row.cumulate.year }}</div>
          </div >
          <div v-else-if="scope.row.cumulate.complete !== undefined" style="text-align: left">
            <div><i class="el-icon-success blue"></i>  完&nbsp;&nbsp;&nbsp;成:&nbsp;{{ scope.row.cumulate.complete }}</div>
            <div><i class="el-icon-loading green"></i> 运行中:&nbsp;{{ scope.row.cumulate.running }}</div>
          </div >
          <div v-else>
            {{ scope.row.cumulate| format(0)}}
          </div >

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
  .blue{
    color: #1286d4;
  }
  .green{
    color: green;
  }



</style>

<script type="text/javascript">

import {
  mapState,
  mapActions
} from 'vuex';

export default {
  props: ['obj'],
  name: 'RealTime',
  methods: {
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex === 0) {
          return {
            rowspan: 2,
            colspan: 1
          };
        } else if (rowIndex === 1) {
          return {
            rowspan: 0,
            colspan: 0
          };
        } else {
          return {
            rowspan: 1,
            colspan: 1
          };
        }
      }
    },
    ...mapActions({
      getRealTime: 'dashboard/getRealTime',
      getEMSData: 'dashboard/getEMSData',
      getBData: 'dashboard/getBData',
      getFData: 'dashboard/getFData',
      getCmswavedata: 'dashboard/getCmswavedata',
      getTendata: 'dashboard/getTendata',
      getDaydata: 'dashboard/getDaydata',
      getCmsstatisticdata: 'dashboard/getCmsstatisticdata',
      getStatedata: 'dashboard/getStatedata',
      getErrordata: 'dashboard/getErrordata',
      getPowcurvedata: 'dashboard/getPowcurvedata'
    })

  },
  computed: {
    ...mapState('dashboard', {
      _obj(state) {
        switch (this.obj.title) {
          case '实时数据':
            if (!state.realTime) {
              return this.obj;
            } else {
              return state.realTime;
            }
          case 'EMS数据':
            if (!state.EMSData) {
              return this.obj;
            } else {
              return state.EMSData;
            }
          case 'b':
            if (!state.b) {
              return this.obj;
            } else {
              return state.b;
            }
          case 'f':
            if (!state.f) {
              return this.obj;
            } else {
              return state.f;
            }
          case 'cmswavedata':
            if (!state.cmswavedata) {
              return this.obj;
            } else {
              return state.cmswavedata;
            }
          case 'tendata':
            if (!state.tendata) {
              return this.obj;
            } else {
              return state.tendata;
            }
          case 'daydata':
            if (!state.daydata) {
              return this.obj;
            } else {
              return state.daydata;
            }
          case 'cmsstatisticdata':
            if (!state.cmsstatisticdata) {
              return this.obj;
            } else {
              return state.cmsstatisticdata;
            }
          case 'statedata':
            if (!state.statedata) {
              return this.obj;
            } else {
              return state.statedata;
            }
          case 'errordata':
            if (!state.errordata) {
              return this.obj;
            } else {
              return state.errordata;
            }
          case 'powcurvedata':
            if (!state.powcurvedata) {
              return this.obj;
            } else {
              return state.powcurvedata;
            }
          default:
            return '';
        }
      }
    })
  },
  mounted() {
    switch (this.obj.title) {
      case '实时数据':
        this.getRealTime({'url': '/goldwind/getRealdataJob'});
        break;
      case 'EMS数据':
        this.getEMSData({'url': '/goldwind/getEmsdataJob'});
        break;
      case 'b':
        this.getBData({'url': '/goldwind/getBfileJob'});
        break;
      case 'f':
        this.getFData({'url': '/goldwind/getFfileJob'});
        break;
      case 'cmswavedata':
        this.getCmswavedata({'url': '/goldwind/getCmswaveJob'});
        break;
      case 'tendata':
        this.getTendata({'url': '/goldwind/getTendataJob'});
        break;
      case 'daydata':
        this.getDaydata({'url': '/goldwind/getDaydataJob'});
        break;
      case 'cmsstatisticdata':
        this.getCmsstatisticdata({'url': '/goldwind/getCmsstatisticdataJob'});
        break;
      case 'statedata':
        this.getStatedata({'url': '/goldwind/getStatedataJob'});
        break;
      case 'errordata':
        this.getErrordata({'url': '/goldwind/getErrordataJob'});
        break;
      case 'powcurvedata':
        this.getPowcurvedata({'url': '/goldwind/getPowcurvedataJob'});
        break;
      default:
        break;
    }
  },
  data() {
    return {

    }
  }

};

</script>
