<template>
  <el-card class="box-card healthManager">

    <div slot="header" class="header">
      <div class="query">
        <el-row :gutter="20">
          <el-col :span="8">
            <span>采集名称：</span><span><el-input size="small" style="width: 60%" placeholder="请输入内容..."></el-input></span>
          </el-col>
          <el-col :span="8">设备名称：<el-input size="small" style="width: 60%"  placeholder="请输入内容..."></el-input></el-col>
          <el-col :span="8">
            <el-button type="primary" size="small" icon="el-icon-search">查询</el-button>
            <el-button size="small" icon="el-icon-circle-close-outline">重置</el-button>
            &nbsp;&nbsp;
            <span class="advancedQuery">展开<i class="el-icon-arrow-down"></i></span>
          </el-col>
        </el-row>



      </div>
      <span>设备采集列表</span>
      <!--<el-button type="primary" @click="handleNewGatherDialog('new')" icon="el-icon-plus" class="button">新建数据采集</el-button>-->
    </div>

    <el-table
      :data="_gatherList"
      border
      height="500"
      style="width: 100%;text-align: left">
      <el-table-column
        prop="collectionname"
        label="采集名称"
        width="170">
      </el-table-column>
      <el-table-column
        prop="collectiontime"
        label="采集时间"
        width="170">
      </el-table-column>
      <el-table-column
        prop="equipmenttype"
        label="设备类型"
        width="100">
      </el-table-column>
      <el-table-column
        prop="equipmentcode"
        width="120"
        sortable
        label="设备ID">
      </el-table-column>
      <el-table-column
        prop="equipmentname"
        width="120"
        label="设备名称">
      </el-table-column>
      <el-table-column
        prop="equipmentmodel"
        width="120"
        label="设备型号">
      </el-table-column>
      <el-table-column
        prop="equipmentstation"
        width="120"
        label="设备工位">
      </el-table-column>
      <el-table-column
        prop="plantid"
        width="120"
        label="所属车间">
        <template slot-scope="scope">
          <span>{{getWorkshopName(scope.row.plantid)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="factoryid"
        width="170"
        label="所属工厂">
        <template slot-scope="scope">
          <span>{{getFactoryName(scope.row.factoryid)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button @click="handleGatherDialog('reportUpload', scope.row)" type="text" size="small"><i class="el-icon-upload"></i>上传</el-button>
        </template>
      </el-table-column>

    </el-table>

    <el-dialog :fullscreen=true class="dialog" title="数据采集" :visible.sync="dialogVisible" :before-close="handleClose">
      <dialogBaseInfo ref="BaseInfo" :gatherState="gatherState"  @closeDialog="closeDialog" :temp="temp"></dialogBaseInfo>
      <gather-info  ref="gatherInfo" v-if="gatherState !== 'new'" :collectionid="collectionid" :gatherType="gatherType" :gatherState="gatherState"></gather-info>
      <span slot="footer" class="dialog-footer">
        <el-button v-if="gatherState !== 'new'" size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button v-if="gatherState === 'edit'" size="small" type="primary" @click="submitToSpecialist()">提 交</el-button>
      </span>
    </el-dialog>
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

  .header{
    text-align: left;
  }
  .button{
    padding: 8px 15px;
    float: right;
  }
  .query{
    padding: 0px 0px 15px 0px;
    margin-bottom: 15px;
    border-bottom: 1px solid #ebeef5;
  }
  .advancedQuery{
    color: dodgerblue;
    font-size: 85%;
    cursor: pointer;
  }
  .dialog{
    text-align: left;
  }
</style>

<script type="text/javascript">

import {
  mapActions,
  mapState
} from 'vuex';
import dialogBaseInfo from '../gather/dialogBaseInfo'
import gatherInfo from '../gather/gatherInfo'

export default {
  props: ['type'],
  name: 'List',
  components: {
    dialogBaseInfo,
    gatherInfo
  },
  mounted() {
    this.getGatherList({'url': '/industry/getCollectionData'});
    this.getPlantList({'url': '/industry/getFactoryMainData'});
    this.getWorkshopList({'url': '/industry/getPlantMainData'});
  },
  methods: {
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    ...mapActions({
      getGatherList: 'gather/getGatherList',
      getPlantList: 'plant/getPlantList',
      getWorkshopList: 'workshop/getWorkshopList',
      delGather: 'gather/delGather',
      updateGather: 'gather/updateGather',
      getParameterDataList: 'gather/getParameterDataList',
      getRealTimeDataList: 'gather/getRealTimeDataList',
      getNoisyDataList: 'gather/getNoisyDataList',
      getInfraredDataList: 'gather/getInfraredDataList',
      getVibrationDataList: 'gather/getVibrationDataList',
      getMotorReportList: 'gather/getMotorReportList',

      getPumpParameterDataList: 'gatherPump/getPumpParameterDataList',
      getPumpRealTimeDataList: 'gatherPump/getPumpRealTimeDataList',
      getPumpInspectionDataList: 'gatherPump/getPumpInspectionDataList',
      getPupmShockDataList: 'gatherPump/getPupmShockDataList',
      getPumpInfraredDataList: 'gatherPump/getPumpInfraredDataList',
      getPumpReportList: 'gatherPump/getPumpReportList'
    }),
    handleGatherDialog(type, row) {
      this.temp = JSON.parse(JSON.stringify(row));
      this.gatherState = type;
      this.gatherType.type = this.temp.equipmenttype;
      this.collectionid = this.temp.collectionid;
      this.initSubListData(this.gatherType.type);
      this.dialogVisible = true;
    },
    initSubListData(subType) {
      if (subType === '电机') {
        this.getParameterDataList({'url': '/industry/getMotorDataCollection', collectionid: this.collectionid});
        this.getRealTimeDataList({'url': '/industry/getMotorRealData', collectionid: this.collectionid});
        this.getNoisyDataList({'url': '/industry/getMotorNoiseData', collectionid: this.collectionid});
        this.getInfraredDataList({'url': '/industry/getMotorInfraredData', collectionid: this.collectionid});
        this.getVibrationDataList({'url': '/industry/getMotorShockData', collectionid: this.collectionid});
        this.getMotorReportList({'url': '/industry/getMotorReportData', collectionid: this.collectionid});
      } else {
        this.getPumpParameterDataList({'url': '/industry/getPumpDataCollection', collectionid: this.collectionid});
        this.getPumpRealTimeDataList({'url': '/industry/getPumpRealData', collectionid: this.collectionid});
        this.getPumpInspectionDataList({'url': '/industry/getPumpInspectionData', collectionid: this.collectionid});
        this.getPupmShockDataList({'url': '/industry/getPumpShockData', collectionid: this.collectionid});
        this.getPumpInfraredDataList({'url': '/industry/getPumpInfraredData', collectionid: this.collectionid});
        this.getPumpReportList({'url': '/industry/getPumpReportData', collectionid: this.collectionid});
      }
    },
    handleNewGatherDialog(type) {
      if (this.$refs.BaseInfo) {
        this.$refs.BaseInfo.initDialog();
      }
      this.gatherState = type;
      this.dialogVisible = true;
    },

    closeDialog(hide) {
      this.dialogVisible = hide;
    },
    handleClose() {
      this.dialogVisible = false;
    },
    getFactoryName(id) {
      var o = this._factoryList.find((v) => {
        return v.factoryid === id;
      });
      return o !== undefined ? o.factoryname : '';
    },
    getWorkshopName(id) {
      var o = this._workshopList.find((v) => {
        return v.plantid === id;
      });
      return o !== undefined ? o.workshopname : '';
    }
  },
  computed: {
    typeFilters (state) {
      let filters = [];
      this.listData.forEach((item, index) => {
        filters.push({text: item.type, value: item.type});
      });
      return filters;
    },
    ...mapState('gather', {
      _gatherList(state) {
        if (!state.gatherList) {
          return this.listData;
        } else {
          this.listData = state.gatherList.filter(i => i.datastatus === 'submit');
          return this.listData;
        }
      }
    }),
    ...mapState('plant', {
      _factoryList(state) {
        if (!state.plantList) {
          return [];
        } else {
          return state.plantList;
        }
      }
    }),
    ...mapState('workshop', {
      _workshopList(state) {
        if (!state.workshopList) {
          return [];
        } else {
          return state.workshopList;
        }
      }
    })
  },
  data() {
    return {
      listData: [],
      dialogVisible: false,
      gatherType: {
        type: '电机'
      },
      gatherState: '',
      temp: {},
      collectionid: ''
    }
  }

};

</script>
