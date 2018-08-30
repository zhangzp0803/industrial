<template>
  <div>
    <el-button v-if="isEdit === 'edit'" @click="add()" type="primary" icon="el-icon-plus" class="button">新增数据</el-button>
    <el-upload action="" class="upload-demo">
      <el-button v-if="isEdit === 'edit'" icon="el-icon-upload" class="button">批量上传</el-button>
    </el-upload>

    <el-table
      :data="listData"
      border
      height="400"
      style="width: 100%;text-align: left">

      <el-table-column
        prop="flow"
        label="流量"
        width="120">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input type="number" size="small" v-model="scope.row.flow"></el-input>
          </template>
          <span v-else>{{ scope.row.flow }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="pressurerelief"
        width="120"
        label="排除压力">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input type="number" size="small" v-model="scope.row.pressurerelief"></el-input>
          </template>
          <span v-else>{{ scope.row.pressurerelief }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="lift"
        width="120"
        label="扬程">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input type="number" size="small" v-model="scope.row.lift"></el-input>
          </template>
          <span v-else>{{ scope.row.lift }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="suctionpressure"
        width="120"
        label="吸入压力">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input type="number" size="small" v-model="scope.row.suctionpressure"></el-input>
          </template>
          <span v-else>{{ scope.row.suctionpressure }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="power"
        width="120"
        label="功率和效率">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input type="number" size="small" v-model="scope.row.power"></el-input>
          </template>
          <span v-else>{{ scope.row.power }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="speed"
        width="120"
        label="转速">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input type="number" size="small" v-model="scope.row.speed"></el-input>
          </template>
          <span v-else>{{ scope.row.speed }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="npsh"
        width="120"
        label="气浊余量">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input type="number" size="small" v-model="scope.row.npsh"></el-input>
          </template>
          <span v-else>{{ scope.row.npsh }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="temperature"
        width="120"
        label="介质温度">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input type="number" size="small" v-model="scope.row.temperature"></el-input>
          </template>
          <span v-else>{{ scope.row.temperature }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="collectiontime"
        label="采集时间">
      </el-table-column>
      <el-table-column
        fixed="right"
        v-if="isEdit === 'edit'"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-button type="text" @click="update(scope.row, scope.$index)" size="small"><i class="el-icon-check"></i>确定</el-button>

          </template>
          <template v-else>
            <el-button type="text" @click="edit(scope.row, scope.$index)" size="small"><i class="el-icon-edit"></i>修改</el-button>
            <el-button type="text" @click="del(scope.row, scope.$index)" size="small"><i class="el-icon-circle-close-outline"></i>删除</el-button>
          </template>
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

</style>

<script type="text/javascript">
import {
  mapActions,
  mapState
} from 'vuex';
import { formatDate } from '@/utils'
export default {
  props: ['isEdit', 'collectionid'],
  name: 'pumpRealTimeData',
  mounted() {
    // this.getParameterDataList({'url': '/industry/getMotorDataCollection', collectionid: this.collectionid});
  },
  methods: {
    ...mapActions({
      // getParameterDataList: 'gather/getParameterDataList',
      updatePumpRealTimeData: 'gatherPump/updatePumpRealTimeData',
      delPumpRealTimeData: 'gatherPump/delPumpRealTimeData'
    }),
    add() {
      // 不允许同时两条在添加
      let isAdd = this.listData.findIndex((o) => {
        return o.edit === true;
      });
      if (isAdd < 0) {
        this.empty.collectionid = this.collectionid;
        this.updatePumpRealTimeData({obj: Object.assign({}, this.empty), rowIndex: 0});
      }
    },
    update(row, rowIndex) {
      let newObj = Object.assign({}, row);
      newObj.edit = false;
      newObj.collectiontime = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss');
      this.updatePumpRealTimeData({obj: newObj, rowIndex: rowIndex});
    },
    edit(row, rowIndex) {
      row.edit = true;
      row.state = 'edit'
    },
    del(row, rowIndex) {
      this.delPumpRealTimeData({obj: row, rowIndex: rowIndex})
    }


  },
  computed: {
    ...mapState('gatherPump', {
      listData(state) {
        if (!state.pumpRealTimeDataList) {
          return [];
        } else {
          return state.pumpRealTimeDataList;
        }
      }
    })
  },
  data() {
    return {
      empty: {
        collectionid: '',
        motorequipmentid: '',
        flow: '',
        pressurerelief: '',
        lift: '',
        suctionpressure: '',
        power: '',
        speed: '',
        npsh: '',
        temperature: '',
        collectiontime: '',
        datatype: '',
        state: 'new',
        edit: true
      }

    }
  }

};

</script>
