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
        prop="equipmentid"
        label="设备ID"
        width="120">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input  size="small" v-model="scope.row.equipmentid"></el-input>
          </template>
          <span v-else>{{ scope.row.equipmentid }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="displacement"
        label="各测点位移"
        width="170">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input type="number" size="small" v-model="scope.row.displacement"></el-input>
          </template>
          <span v-else>{{ scope.row.displacement }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="speed"
        label="速度"
        width="120">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input type="number" size="small" v-model="scope.row.speed"></el-input>
          </template>
          <span v-else>{{ scope.row.speed }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="acceleration"
        width="120"
        label="加速度">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input type="number" size="small" v-model="scope.row.acceleration"></el-input>
          </template>
          <span v-else>{{ scope.row.acceleration }}</span>
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
  name: 'List',
  mounted() {
    // this.getParameterDataList({'url': '/industry/getMotorDataCollection', collectionid: this.collectionid});
  },
  methods: {
    ...mapActions({
      // getParameterDataList: 'gather/getParameterDataList',
      updateVibrationData: 'gather/updateVibrationData',
      delVibrationData: 'gather/delVibrationData'
    }),
    add() {
      // 不允许同时两条在添加
      let isAdd = this.listData.findIndex((o) => {
        return o.edit === true;
      });
      if (isAdd < 0) {
        this.empty.collectionid = this.collectionid;
        this.updateVibrationData({obj: Object.assign({}, this.empty), rowIndex: 0});
      }
    },
    update(row, rowIndex) {
      let newObj = Object.assign({}, row);
      newObj.edit = false;
      newObj.collectiontime = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss');
      this.updateVibrationData({obj: newObj, rowIndex: rowIndex});
    },
    edit(row, rowIndex) {
      row.edit = true;
      row.state = 'edit'
    },
    del(row, rowIndex) {
      this.delVibrationData({obj: row, rowIndex: rowIndex})
    }


  },
  computed: {
    ...mapState('gather', {
      listData(state) {
        if (!state.vibrationDataList) {
          return [];
        } else {
          return state.vibrationDataList;
        }
      }
    })
  },
  data() {
    return {
      empty: {
        collectionid: '',
        motorshockid: '',
        equipmentid: '',
        displacement: '',
        speed: '',
        acceleration: '',
        collectiontime: '',
        datatype: '',
        state: 'new',
        edit: true
      }

    }
  }

};

</script>
