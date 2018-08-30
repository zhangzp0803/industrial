<template>
  <div>
    <el-form :model="newFormObj" ref="dataForm" :rules="rules"  label-position="left" label-width="80px" size="mini" style='width: 100%;margin-top: 0px'>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="厂房名称" prop="workshopname">
            <el-input size="small" style="" placeholder="请输入厂房名称..." v-model="newFormObj.workshopname"></el-input>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="工厂" prop="factoryid">
            <el-select size="small" v-model="newFormObj.factoryid" placeholder="请选择">
              <el-option v-for="item in _plantList" :key="item.factoryid" :label="item.factoryname" :value="item.factoryid"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="备注">
            <el-input size="small" style="" placeholder="请输入备注 ..." v-model="newFormObj.remarks"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="text-align: center">
        <el-col :span="20">
          <el-form-item>
            <el-button size="small" @click="closeDialog">取 消</el-button>
            <el-button :disabled="submitBtnDis" type="primary" @click="submitForm('dataForm')">提交</el-button>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
    <span slot="footer" class="dialog-footer">
    </span>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script type="text/javascript">
import {
  mapActions,
  mapState
} from 'vuex';
import { createWorkshop, updateWorkshop } from '@/api/workshop'

export default {
  name: 'List',
  props: ['gatherState', 'temp'],
  mounted() {

  },
  methods: {
    ...mapActions({
      addWorkshop: 'workshop/addWorkshop',
      updateWorkshop: 'workshop/updateWorkshop'
    }),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitBtnDis = true;
          this.$nextTick(() => {
            this.$refs['dataForm'].clearValidate()
          })
          if (this.gatherState === 'new') {
            console.log(this.emptyFormObj)
            createWorkshop(this.emptyFormObj).then((res) => {
              console.log(res)
              if (res.data.state === 'success') {
                this.emptyFormObj.plantid = res.data.resultid;
                this.addWorkshop(this.emptyFormObj);
                this.$emit('success', this.gatherState, this.emptyFormObj);
                this.$emit('closeDialog', false);
              } else {
                this.$message({
                  message: '新增失败！',
                  type: 'error'
                });
                this.submitBtnDis = false;
              }
            }, (error) => {
              console.log(error);
              this.$message({
                message: '新增失败！',
                type: 'error'
              });
              this.submitBtnDis = false;
            })
          } else {
            updateWorkshop(this.emptyFormObj).then((res) => {
              console.log(res)
              if (res.data.state === 'success') {
                this.emptyFormObj.plantid = res.data.resultid;
                this.updateWorkshop(this.emptyFormObj);
                this.$emit('success', this.gatherState, this.emptyFormObj);
                this.$emit('closeDialog', false);
              } else {
                this.$message({
                  message: '修改失败！',
                  type: 'error'
                });
                this.submitBtnDis = false;
              }
            }, (error) => {
              console.log(error);
              this.$message({
                message: '修改失败！',
                type: 'error'
              });
              this.submitBtnDis = false;
            })
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    closeDialog() {
      this.$emit('closeDialog', false);
    },
    initDialog() {
      this.emptyFormObj = {
        plantid: '',
        workshopname: '',
        factoryid: '',
        remarks: ''
      };
      this.submitBtnDis = false;
    }

  },
  computed: {
    ...mapState('plant', {
      _plantList(state) {
        if (!state.plantList) {
          return this.plantList;
        } else {
          this.plantList = state.plantList;
          return this.plantList;
        }
      }
    }),
    newFormObj() {
      if (this.gatherState === 'new') {
        return this.emptyFormObj;
      } else {
        return Object.assign(this.emptyFormObj, this.temp);
      }
    }
  },
  data() {
    return {
      emptyFormObj: {
        plantid: '',
        workshopname: '',
        factoryid: '',
        remarks: ''
      },
      submitBtnDis: false,
      rules: {
        workshopname: [{ required: true, message: '厂房名称必须填写', trigger: 'blur' }],
        factoryid: [{ required: true, message: '工厂必须选择', trigger: 'blur' }]
      },
      plantList: []
    }
  }
};

</script>
