<template>
  <el-card class="box-card healthManager">

    <div slot="header" class="header">
      <div class="query">
        <el-row :gutter="20">
          <el-col :span="8">
            <span>设备名称：</span><span><el-input size="small" style="width: 60%" placeholder="请输入内容..."></el-input></span>
          </el-col>
          <el-col :span="8">所属车间：<el-input size="small" style="width: 60%"  placeholder="请输入内容..."></el-input></el-col>
          <el-col :span="8">
            <el-button type="primary" size="small" icon="el-icon-search">查询</el-button>
            <el-button size="small" icon="el-icon-circle-close-outline">重置</el-button>
            &nbsp;&nbsp;
            <span class="advancedQuery">展开<i class="el-icon-arrow-down"></i></span>
          </el-col>
        </el-row>



      </div>
      <span>设备列表</span>
      <el-button @click="newEquipment" type="primary" icon="el-icon-plus" class="button">新建</el-button>
    </div>

    <el-table
      :data="_listData"
      border
      height="500"
      style="width: 100%;text-align: left">
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
        prop="equipmentbegintime"
        width="170"
        label="设备投产时间">
      </el-table-column>
      <el-table-column
        prop="equipmentdesignlife"
        width="120"
        label="设备设计寿命">
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
        prop="remarks"
        width="180"
        label="备注">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row, scope.$index)" type="text" size="small"><i class="el-icon-edit"></i>编辑</el-button>
          <el-button @click="del(scope.row, scope.$index)" type="text" size="small"><i class="el-icon-close"></i>删除</el-button>
        </template>
      </el-table-column>

    </el-table>

    <el-dialog :fullscreen=false class="dialog" width="700px" title="新建设备" :visible.sync="dialogVisible" >
      <new-dialog ref="newDialog" :gatherState="gatherState" :temp="temp"  @closeDialog="closeDialog" @success="success"></new-dialog>
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
import { delEquipment } from '@/api/equipment'
import newDialog from './newDialog'

export default {
  props: ['type'],
  name: 'List',
  components: {
    newDialog
  },
  mounted() {
    this.getdata({'url': '/industry/getEquipmentMainData'});
    this.getPlantList({'url': '/industry/getFactoryMainData'});
    this.getWorkshopList({'url': '/industry/getPlantMainData'});
  },
  methods: {
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    ...mapActions({
      getdata: 'equipment/getEquipmentList',
      delEquipment: 'equipment/delEquipment',
      getPlantList: 'plant/getPlantList',
      getWorkshopList: 'workshop/getWorkshopList'
    }),
    newEquipment() {
      if (this.$refs.newDialog) {
        this.$refs.newDialog.initDialog();
      }
      this.gatherState = 'new';
      this.dialogVisible = true;
    },
    edit(row, rowIndex) {
      if (this.$refs.newDialog) {
        this.$refs.newDialog.initDialog();
      }
      this.gatherState = 'edit';
      this.temp = row;
      this.temp.rowIndex = rowIndex;
      this.dialogVisible = true;
    },
    del(row, rowIndex) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delEquipment({equipmentid: row.equipmentid}).then((res) => {
          if (res.data.state === 'success') {
            this.delEquipment(rowIndex);
            this.$message({
              message: '删除成功！',
              type: 'success'
            });
          } else {
            this.$message({
              message: '删除失败！',
              type: 'error'
            });
          }
        }, (error) => {
          console.log(error);
          this.submitBtnDis = false;
        })
      }).catch(() => {

      });
    },
    closeDialog(hide) {
      this.dialogVisible = hide;
    },
    success(type, data) {
      let ms = '新增';
      if (type === 'edit') {
        ms = '修改';
      }
      this.$message({
        message: ms + '成功！',
        type: 'success'
      });
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
    ...mapState('equipment', {
      _listData(state) {
        if (!state.equipmentList) {
          return this.listData;
        } else {
          this.listData = state.equipmentList;
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
      dialogVisible: false,
      listData: [],
      factoryList: [],
      gatherState: 'new',
      temp: {}
    }
  }

};

</script>
