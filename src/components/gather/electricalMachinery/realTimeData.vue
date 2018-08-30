<template>
  <div>
    <el-button v-if="isEdit === 'edit'" @click="add()"  type="primary" icon="el-icon-plus" class="button">新增数据</el-button>
    <el-upload action="" class="upload-demo">
      <el-button v-if="isEdit === 'edit'" icon="el-icon-upload" class="button">批量上传</el-button>
    </el-upload>

    <el-table
      :data="listData"
      border
      height="400"
      style="width: 100%;text-align: left">
      <el-table-column
        prop="temperature"
        label="环境温度"
        width="120">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input type="number" size="small" v-model="scope.row.temperature"></el-input>
          </template>
          <span v-else>{{ scope.row.temperature }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="humidity"
        label="湿度"
        width="170">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input type="number" size="small" v-model="scope.row.humidity"></el-input>
          </template>
          <span v-else>{{ scope.row.humidity }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="inletconditions"
        label="进风情况"
        width="170">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input  size="small" v-model="scope.row.inletconditions"></el-input>
          </template>
          <span v-else>{{ scope.row.inletconditions }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="revolutions"
        label="转速(r/min)"
        width="120">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input type="number" size="small" v-model="scope.row.revolutions"></el-input>
          </template>
          <span v-else>{{ scope.row.revolutions }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="voltage"
        width="120"
        label="电压(V)">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input type="number" size="small" v-model="scope.row.voltage"></el-input>
          </template>
          <span v-else>{{ scope.row.voltage }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="current"
        width="120"
        label="电流(A)">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input type="number" size="small" v-model="scope.row.current"></el-input>
          </template>
          <span v-else>{{ scope.row.current }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="power"
        width="120"
        label="功率(kw)">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input type="number" size="small" v-model="scope.row.power"></el-input>
          </template>
          <span v-else>{{ scope.row.power }}</span>
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
  name: 'realTimeData',
  mounted() {
  },
  methods: {
    ...mapActions({
      // getParameterDataList: 'gather/getParameterDataList',
      updateRealTimeData: 'gather/updateRealTimeData',
      delRealTimeData: 'gather/delRealTimeData'
    }),
    add() {
      // 不允许同时两条在添加
      let isAdd = this.listData.findIndex((o) => {
        return o.edit === true;
      });
      if (isAdd < 0) {
        this.empty.collectionid = this.collectionid;
        this.updateRealTimeData({obj: Object.assign({}, this.empty), rowIndex: 0});
      }
    },
    update(row, rowIndex) {
      let newObj = Object.assign({}, row);
      newObj.edit = false;
      newObj.collectiontime = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss');
      this.updateRealTimeData({obj: newObj, rowIndex: rowIndex});
    },
    edit(row, rowIndex) {
      row.edit = true;
      row.state = 'edit'
    },
    del(row, rowIndex) {
      this.delRealTimeData({obj: row, rowIndex: rowIndex})
    }
  },
  computed: {
    ...mapState('gather', {
      listData(state) {
        if (!state.realTimeDataList) {
          return [];
        } else {
          return state.realTimeDataList;
        }
      }
    })
  },
  data() {
    return {
      empty: {
        collectionid: '',
        motorrealdataid: '',
        temperature: 0,
        humidity: '',
        inletconditions: '',
        revolutions: '',
        voltage: '',
        current: '',
        power: '',
        collectiontime: '',
        datatype: '',
        state: 'new',
        edit: true
      }
    }
  }

};

</script>
