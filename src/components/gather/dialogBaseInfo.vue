<template>
  <div>
    <el-form :model="newFormObj" ref="dataForm" :rules="rules"  label-position="left" label-width="90px" size="mini" style='width: 100%;margin-top: 0px'>
      <el-row >
        <el-col :span="6">
          <el-form-item v-if="gatherState === 'new'" label="采集名称" prop="collectionname">
            <el-input size="small" style="" placeholder="请输入采集名称..." v-model="newFormObj.collectionname"></el-input>
          </el-form-item>
          <span v-else>采集名称：{{newFormObj.collectionname}}</span>
        </el-col>
        <el-col :span="6">
          <el-form-item v-if="gatherState === 'new'" label="采集时间" prop="collectiontime">
            <el-date-picker size="small" v-model="newFormObj.collectiontime" type="datetime" placeholder="选择日期时间" ></el-date-picker>
          </el-form-item>
          <span v-else>采集时间：{{newFormObj.collectiontime}}</span>
        </el-col>
        <el-col :span="6">
          <el-form-item v-if="gatherState === 'new'" label="采集设备" prop="equipmentid">
            <el-select @change="onSelectChange" size="small" v-model="newFormObj.equipmentid" placeholder="请选择">
              <el-option-group v-for="group in selectEquipment" :key="group.label" :label="group.label">
                <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
          <span v-else>采集设备：{{newFormObj.equipmentname}}</span>
        </el-col>
        <el-col :span="6">
          <span>设备类型：{{newFormObj.equipmenttype}}</span>
        </el-col>
      </el-row>
      <el-row style="margin: 20px 0px">
        <el-col :span="6">
          <span>设备型号：{{newFormObj.equipmentmodel}}</span>
        </el-col>
        <el-col :span="6">
          <span>设备工位：{{newFormObj.equipmentstation}}</span>
        </el-col>
        <el-col :span="6">
          <span>所属车间：{{this.getWorkshopName(newFormObj.plantid)}}</span>
        </el-col>
        <el-col :span="6">
          <span>所属工厂：{{this.getFactoryName(newFormObj.factoryid)}}</span>
        </el-col>
      </el-row>
      <el-row style="margin: 20px 0px">
        <el-col :span="9">&nbsp;</el-col>
        <el-col :span="15">
        <el-form-item v-if="gatherState === 'new'">
          <el-button size="small" @click="closeDialog">取 消</el-button>
          <el-button :disabled="submitBtnDis" type="primary" @click="submitForm('dataForm')">提交</el-button>
        </el-form-item>
        </el-col>
      </el-row>

    </el-form>


  </div>
</template>

<style lang="scss" scoped>

</style>

<script type="text/javascript">
import {
  mapActions,
  mapState
} from 'vuex';
import _ from 'underscore'
import { createGather } from '@/api/gather'
import { formatDate } from '@/utils'

export default {
  name: 'List',
  props: ['gatherState', 'temp'],
  mounted() {
    this.geEquipmentList({'url': '/industry/getEquipmentMainData'});
  },
  methods: {
    onSelectChange(v) {
      Object.assign(this.emptyFormObj, this._equipmentList.find((e) => {
        return e.equipmentid === v;
      }))
    },
    ...mapActions({
      geEquipmentList: 'equipment/getEquipmentList',
      addGather: 'gather/addGather'
    }),
    submitForm(formName) {
      // var _this3 = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitBtnDis = true;
          this.$nextTick(() => {
            this.$refs['dataForm'].clearValidate()
          });
          this.emptyFormObj.datastatus = 'edit';
          this.emptyFormObj.collectiontime = formatDate(new Date(this.emptyFormObj.collectiontime), 'yyyy-MM-dd hh:mm:ss');
          createGather(this.newFormObj).then((res) => {
            if (res.data.state === 'success') {
              this.emptyFormObj.collectionid = res.data.resultid;
              this.addGather(this.emptyFormObj);
              this.$emit('success', 'edit', this.emptyFormObj);
              // this.$emit('closeDialog', false);
            } else {
              this.$message({
                message: '新增失败！',
                type: 'error'
              });
              this.submitBtnDis = false;
            }
          }, (error) => {
            console.log(error);
            this.submitBtnDis = false;
          })
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
      this.submitBtnDis = false;
      this.emptyFormObj = {
        collectionid: '',
        collectiontime: new Date(),
        collectionname: '',
        equipmentid: '',
        equipmenttype: '',
        equipmentcode: '',
        equipmentname: '',
        equipmentmodel: '',
        equipmentstation: '',
        plantid: '',
        factoryid: '',
        datastatus: ''
      };
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
    ...mapState('equipment', {
      _equipmentList(state) {
        if (!state.equipmentList) {
          return [];
        } else {
          return state.equipmentList;
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
    }),
    selectEquipment() {
      let gtemp = _.groupBy(this._equipmentList, 'equipmenttype');
      return Object.keys(gtemp).map(key => {
        return {
          label: key,
          options: gtemp[key].map((i) => {
            return {
              value: i.equipmentid,
              label: i.equipmentname
            }
          })
        }
      })
    },
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
        collectionid: '',
        collectiontime: new Date(),
        collectionname: '',
        equipmentid: '',
        equipmenttype: '',
        equipmentcode: '',
        equipmentname: '',
        equipmentmodel: '',
        equipmentstation: '',
        plantid: '',
        factoryid: '',
        datastatus: ''
      },
      numberValidateForm: {
        age: ''
      },
      submitBtnDis: false,
      rules: {
        collectionname: [{ required: true, message: '采集名称必须填写', trigger: 'blur' }],
        collectiontime: [{ type: 'date', required: true, message: '采集时间必须填写', trigger: 'blur' }],
        equipmentid: [{ required: true, message: '设备必须选择', trigger: 'change' }]
      }
    }
  }
};

</script>
