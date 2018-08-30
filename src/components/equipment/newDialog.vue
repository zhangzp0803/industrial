<template>
  <div>
    <el-form :model="newFormObj" ref="dataForm" :rules="rules"  label-position="left" label-width="110px" size="mini" style='width: 100%;margin-top: 0px'>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="设备类型" prop="equipmenttype">
            <el-select size="small" v-model="newFormObj.equipmenttype" placeholder="请选择" style="width: 100%">
              <el-option v-for="item in typeOptions" :key="item.label" :label="item.value" :value="item.label"></el-option>
            </el-select>

          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="设备ID" prop="equipmentcode">
            <el-input size="small"  placeholder="请输入设备ID..." v-model="newFormObj.equipmentcode"></el-input>
          </el-form-item>
        </el-col>


      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="设备名称" prop="equipmentname">
            <el-input size="small" style="" placeholder="请输入设备名称..." v-model="newFormObj.equipmentname"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="设备型号" prop="equipmentmodel">
            <el-input size="small" style="" placeholder="请输入设备型号..." v-model="newFormObj.equipmentmodel"></el-input>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="设备工位" prop="equipmentstation">
            <el-input size="small" style="" placeholder="请输入设备工位..." v-model="newFormObj.equipmentstation"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="设备投产时间" prop="equipmentbegintime">
            <el-date-picker size="small" v-model="newFormObj.equipmentbegintime" type="datetime" placeholder="选择日期时间" ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="设备设计寿命" prop="equipmentdesignlife">
            <el-input size="small" style="" placeholder="请输入设备设计寿命..." v-model="newFormObj.equipmentdesignlife"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所属车间" prop="plantid">
            <el-select @change="onSelectChange" size="small" v-model="newFormObj.plantid" placeholder="请选择">
              <el-option-group v-for="group in _workshopOptions" :key="group.key" :label="group.label">
                <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-option-group>
            </el-select>
          </el-form-item>

        </el-col>

      </el-row>

      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="备注" >
            <el-input size="small" style="" placeholder="请输入备注 ..." v-model="newFormObj.remarks"></el-input>
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
  mapActions,
  mapState
} from 'vuex';
import { createEquipment, updateEquipment } from '@/api/equipment'
import { formatDate } from '@/utils'
import _ from 'underscore'

export default {
  name: 'List',
  props: ['gatherState', 'temp'],
  mounted() {

  },
  methods: {
    onSelectChange(key) {
      this.newFormObj.factoryid = this._workshopList.find(v => { return v.plantid === key }).factoryid;
    },
    ...mapActions({
      addEquipment: 'equipment/addEquipment',
      updateEquipment: 'equipment/updateEquipment'
    }),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitBtnDis = true;
          this.$nextTick(() => {
            this.$refs['dataForm'].clearValidate()
          })
          if (this.gatherState === 'new') {
            this.emptyFormObj.equipmentbegintime = formatDate(new Date(this.emptyFormObj.equipmentbegintime), 'yyyy-MM-dd hh:mm:ss');
            createEquipment(this.emptyFormObj).then((res) => {
              console.log(res)
              if (res.data.state === 'success') {
                this.emptyFormObj.equipmentid = res.data.resultid;
                this.addEquipment(this.emptyFormObj);
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
            console.log(this.emptyFormObj)
            this.emptyFormObj.equipmentbegintime = formatDate(new Date(this.emptyFormObj.equipmentbegintime), 'yyyy-MM-dd hh:mm:ss');
            updateEquipment(this.emptyFormObj).then((res) => {
              console.log(res)
              if (res.data.state === 'success') {
                this.emptyFormObj.equipmentid = res.data.resultid;
                this.updateEquipment(this.emptyFormObj);
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
        equipmentid: '',
        equipmenttype: '',
        equipmentcode: '',
        equipmentname: '',
        equipmentmodel: '',
        equipmentstation: '',
        equipmentbegintime: new Date(),
        equipmentdesignlife: '',
        plantid: '',
        factoryid: '',
        remarks: ''
      };
      this.submitBtnDis = false;
    }

  },
  computed: {
    newFormObj() {
      if (this.gatherState === 'new') {
        return this.emptyFormObj;
      } else {
        return Object.assign(this.emptyFormObj, this.temp);
      }
    },
    ...mapState('plant', {
      _plantList(state) {
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
    }),
    _workshopOptions() {
      if (!this._workshopList) {
        return [];
      } else {
        let gtemp = _.groupBy(this._workshopList, 'factoryid');
        return Object.keys(gtemp).map(key => {
          return {
            label: this._plantList.find(v => { return v.factoryid === key; }).factoryname,
            key: key,
            options: gtemp[key].map((i) => {
              return {
                value: i.plantid,
                label: i.workshopname
              }
            })
          }
        });
      }
    }
  },
  data() {
    return {
      emptyFormObj: {
        equipmentid: '',
        equipmenttype: '',
        equipmentcode: '',
        equipmentname: '',
        equipmentmodel: '',
        equipmentstation: '',
        equipmentbegintime: new Date(),
        equipmentdesignlife: '',
        plantid: '',
        factoryid: '',
        remarks: ''
      },
      submitBtnDis: false,
      rules: {
        equipmenttype: [{ required: true, message: '设备类型必须选择', trigger: 'change' }],
        equipmentcode: [{ required: true, message: '设备ID必须填写', trigger: 'blur' }],
        equipmentname: [{ required: true, message: '设备名称必须填写', trigger: 'blur' }],
        equipmentmodel: [{ required: true, message: '设备型号必须填写', trigger: 'blur' }],
        // equipmentstation: [{ required: true, message: '设备工位必须填写', trigger: 'blur' }],
        equipmentbegintime: [{ required: true, message: '投产时间必须填写', trigger: 'blur' }],
        equipmentdesignlife: [{ required: true, message: '设计寿命必须填写', trigger: 'blur' }],
        plantid: [{ required: true, message: '所属车间必须选择', trigger: 'change' }],
        factoryid: [{ required: true, message: '所属工厂必须选择', trigger: 'change' }]
      },
      typeOptions: [{
        value: '电机',
        label: '电机'
      }, {
        value: '泵',
        label: '泵'
      }],
      workshopOptions: []
    }
  }
};

</script>
