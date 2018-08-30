<template>
  <el-card class="box-card healthManager">

    <div slot="header" class="header">
      <div class="query">
        <el-row :gutter="20">
          <el-col :span="8">
            <span>工程名称：</span><span><el-input size="small" style="width: 60%" placeholder="请输入内容..."></el-input></span>
          </el-col>
          <el-col :span="8">所属公司：<el-input size="small" style="width: 60%"  placeholder="请输入内容..."></el-input></el-col>
          <el-col :span="8">
            <el-button type="primary" size="small" icon="el-icon-search">查询</el-button>
            <el-button size="small" icon="el-icon-circle-close-outline">重置</el-button>
            &nbsp;&nbsp;
            <span class="advancedQuery">展开<i class="el-icon-arrow-down"></i></span>
          </el-col>
        </el-row>


      </div>
      <span>工厂列表</span>
      <el-button type="primary" @click="_newPlant" icon="el-icon-plus" class="button">新建</el-button>
    </div>

    <el-table
      :data="_plantList1"
      border
      height="500"
      style="width: 100%;text-align: left">
      <el-table-column
        prop="factoryname"
        label="工厂名称"
        width="160">
      </el-table-column>
      <el-table-column
        prop="abbreviation"
        width="120"
        sortable
        label="简称">
      </el-table-column>
      <el-table-column
        prop="country"
        width="90"
        label="所属国家">
      </el-table-column>
      <el-table-column
        prop="province"
        width="70"
        label="省">
      </el-table-column>
      <el-table-column
        prop="city"
        width="70"
        label="市">
      </el-table-column>
      <el-table-column
        prop="region"
        width="70"
        label="区">
      </el-table-column>
      <el-table-column
        prop="address"
        width="180"
        label="详细地址">
      </el-table-column>
      <el-table-column
        prop="company"
        width="200"
        label="所属公司">
      </el-table-column>
      <el-table-column
        prop="longitude"
        width="120"
        label="经度">
      </el-table-column>
      <el-table-column
        prop="latitude"
        width="120"
        label="纬度">
      </el-table-column>
      <el-table-column
        prop="remark"
        width="180"
        label="备注">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button @click="_editPlant(scope.row, scope.$index)"  type="text" size="small"><i class="el-icon-edit"></i>编辑</el-button>
          <el-button @click="_delPlant(scope.row, scope.$index)" type="text" size="small"><i class="el-icon-close"></i>删除</el-button>
        </template>
      </el-table-column>

    </el-table>
    <el-dialog :fullscreen=false class="dialog" width="60%" title="新建工厂" :visible.sync="dialogVisible" >
      <new-dialog ref="newDialog" :gatherState="gatherState" :temp="temp" @closeDialog="closeDialog" @success="success"></new-dialog>
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
import newDialog from './newDialog'
import { delPlant } from '@/api/plant'

export default {
  props: ['type'],
  name: 'List',
  components: {
    newDialog
  },
  mounted() {
    this.getdata({'url': '/industry/getFactoryMainData'});
  },
  methods: {
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    ...mapActions({
      getdata: 'plant/getPlantList',
      delPlant: 'plant/delPlant'
    }),
    _newPlant() {
      if (this.$refs.newDialog) {
        this.$refs.newDialog.initDialog();
      }
      this.gatherState = 'new';
      this.dialogVisible = true;
    },
    _editPlant(row, rowIndex) {
      if (this.$refs.newDialog) {
        this.$refs.newDialog.initDialog();
      }
      this.gatherState = 'edit';
      this.temp = row;
      this.temp.rowIndex = rowIndex;
      this.dialogVisible = true;
    },
    _delPlant(row, rowIndex) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delPlant({factoryid: row.factoryid}).then((res) => {
          if (res.data.state === 'success') {
            this.delPlant(rowIndex);
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
    ...mapState('plant', {
      _plantList1(state) {
        if (!state.plantList) {
          return this.listData;
        } else {
          this.listData = state.plantList;
          return this.listData;
        }
      }
    })
  },
  data() {
    return {
      dialogVisible: false,
      listData: [],
      gatherState: 'new',
      temp: {}
    }
  }

};

</script>
