<template>
  <div>
    <el-form :model="newPlant" ref="dataForm" :rules="rules"  label-position="left" label-width="80px" size="mini" style='width: 100%;margin-top: 0px'>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="工厂名称" prop="factoryname">
            <el-input size="small" style="" placeholder="请输入工厂名称..." v-model="newPlant.factoryname"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="简称" prop="abbreviation">
            <el-input size="small" style="" placeholder="请输入简称..." v-model="newPlant.abbreviation"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属国家" >
            <el-input size="small" style="" placeholder="请输入国家..." v-model="newPlant.country"></el-input>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="所属省份">
            <el-input size="small" style="" placeholder="请输入省份..." v-model="newPlant.province"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属市" >
            <el-input size="small" style="" placeholder="请输入市..." v-model="newPlant.city"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属区县">
            <el-input size="small" style="" placeholder="请输入区县..." v-model="newPlant.region"></el-input>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row :gutter="10">
        <el-col :span="16">
          <el-form-item label="详细地址">
            <el-input size="small" style="" placeholder="请输入详细地址 ..." v-model="newPlant.address"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属公司" prop="company">
            <el-input size="small" style="" placeholder="请输入所属公司..." v-model="newPlant.company"></el-input>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="经度" >
            <el-input size="small" style="" placeholder="请输入经度..." v-model="newPlant.longitude"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="纬度">
            <el-input size="small" style="" placeholder="请输入纬度..." v-model="newPlant.latitude"></el-input>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="备注">
            <el-input size="small" style="" placeholder="请输入备注 ..." v-model="newPlant.remark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row >
        <el-col :span="8">&nbsp;</el-col>
        <el-col :span="16">
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
  mapActions
} from 'vuex';
import { createPlant, updatePlant } from '@/api/plant'

export default {
  name: 'List',
  props: ['gatherState', 'temp'],
  mounted() {

  },
  methods: {
    onSelectChange(v) {
      this.currEquipment = this._equipmentList.find((e) => {
        return e.id === v;
      })
    },
    ...mapActions({
      addPlant: 'plant/addPlant',
      updatePlant: 'plant/updatePlant'
    }),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitBtnDis = true;
          this.$nextTick(() => {
            this.$refs['dataForm'].clearValidate()
          })
          if (this.gatherState === 'new') {
            console.log(this.emptyPlant)
            createPlant(this.emptyPlant).then((res) => {
              console.log(res)
              if (res.data.state === 'success') {
                this.emptyPlant.factoryid = res.data.resultid;
                this.addPlant(this.emptyPlant);
                this.$emit('success', this.gatherState, this.emptyPlant);
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
            updatePlant(this.emptyPlant).then((res) => {
              console.log(res)
              if (res.data.state === 'success') {
                this.emptyPlant.factoryid = res.data.resultid;
                this.updatePlant(this.emptyPlant);
                this.$emit('success', this.gatherState, this.emptyPlant);
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
      this.emptyPlant = {
        factoryid: '',
        factoryname: '',
        abbreviation: '',
        country: '',
        province: '',
        city: '',
        region: '',
        address: '',
        company: '',
        longitude: '',
        latitude: '',
        remark: ''
      };
      this.submitBtnDis = false;
    }

  },
  computed: {
    newPlant() {
      if (this.gatherState === 'new') {
        return this.emptyPlant;
      } else {
        return Object.assign(this.emptyPlant, this.temp);
      }
    }
  },
  data() {
    return {
      emptyPlant: {
        factoryid: '',
        factoryname: '',
        abbreviation: '',
        country: '',
        province: '',
        city: '',
        region: '',
        address: '',
        company: '',
        longitude: '',
        latitude: '',
        remark: ''
      },
      submitBtnDis: false,
      rules: {
        factoryname: [{ required: true, message: '工厂名称必须填写', trigger: 'blur' }],
        abbreviation: [{ required: true, message: '简称必须填写', trigger: 'blur' }],
        company: [{ required: true, message: '公司必须填写', trigger: 'blur' }]
      }
    }
  }
};

</script>
