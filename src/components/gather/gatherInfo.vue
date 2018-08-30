<template>
  <div>
    <el-tabs v-if="gatherType.type === '电机'" v-model="activeName" >
      <el-tab-pane label="电机设备参数" name="1"><parameterData :isEdit="gatherState" :collectionid="collectionid"></parameterData></el-tab-pane>
      <el-tab-pane label="运行实时数据" name="2"><real-time-data :isEdit="gatherState" :collectionid="collectionid"></real-time-data></el-tab-pane>
      <!--<el-tab-pane label="供电数据" name="third">供电数据</el-tab-pane>-->
      <el-tab-pane label="噪音数据" name="3"><noisyData :isEdit="gatherState" :collectionid="collectionid"></noisyData></el-tab-pane>
      <el-tab-pane label="震动数据" name="4"><vibrationData  :isEdit="gatherState" :collectionid="collectionid"></vibrationData></el-tab-pane>
      <!--<el-tab-pane label="底座地基信息" name="7">底座地基信息</el-tab-pane>-->
      <!--<el-tab-pane label="润滑信息" name="8">润滑信息</el-tab-pane>-->
      <!--<el-tab-pane label="清洁信息" name="9">清洁信息</el-tab-pane>-->
      <!--<el-tab-pane label="温度数据" name="10">温度数据</el-tab-pane>-->
      <!--<el-tab-pane label="动平衡数据" name="11">动平衡数据</el-tab-pane>-->
      <el-tab-pane label="红外探测数据" name="5"><infraredData :isEdit="gatherState" :collectionid="collectionid"></infraredData></el-tab-pane>
      <el-tab-pane v-if="gatherState !== 'edit'" label="专家报告" name="6"><report :isEdit="gatherState" :collectionid="collectionid"></report></el-tab-pane>
    </el-tabs>

    <el-tabs v-if="gatherType.type === '泵'" v-model="activeName">
      <el-tab-pane label="泵设备参数" name="1"><PumpParameterData :isEdit="gatherState" :collectionid="collectionid"></PumpParameterData></el-tab-pane>
      <el-tab-pane label="运行实时数据" name="2"><PumprealTimeData :isEdit="gatherState" :collectionid="collectionid"></PumprealTimeData></el-tab-pane>
      <!--<el-tab-pane label="密封数据" name="second">密封数据</el-tab-pane>-->
      <el-tab-pane label="震动数据" name="3"><PumpVibrationData  :isEdit="gatherState" :collectionid="collectionid"></PumpVibrationData></el-tab-pane>
      <el-tab-pane label="巡检数据" name="4"><pollingData  :isEdit="gatherState" :collectionid="collectionid"></pollingData></el-tab-pane>
      <el-tab-pane label="红外探测数据" name="5"><PumpInfraredData :isEdit="gatherState" :collectionid="collectionid"></PumpInfraredData></el-tab-pane>
      <el-tab-pane v-if="gatherState !== 'edit'" label="专家报告" name="6"><PumpReport :isEdit="gatherState" :collectionid="collectionid"></PumpReport></el-tab-pane>
      <!--<el-tab-pane label="专家报告" name="6"><report :isEdit="gatherState" :collectionid="collectionid"></report></el-tab-pane>-->
    </el-tabs>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script type="text/javascript">
import parameterData from '../gather/electricalMachinery/parameterData'
import realTimeData from '../gather/electricalMachinery/realTimeData'
import noisyData from '../gather/electricalMachinery/noisyData'
import vibrationData from '../gather/electricalMachinery/vibrationData'
import infraredData from '../gather/electricalMachinery/infraredData'

import PumpParameterData from '../gather/pump/parameterData'
import pollingData from '../gather/pump/pollingData'
import PumprealTimeData from '../gather/pump/realTimeData'
import PumpVibrationData from '../gather/pump/vibrationData'
import PumpInfraredData from '../gather/pump/infraredData'

import report from '../gather/report'
import PumpReport from '../gather/pump/pumpReport'

export default {
  name: 'List',
  props: ['gatherType', 'gatherState', 'collectionid'],
  components: {
    parameterData,
    realTimeData,
    noisyData,
    vibrationData,
    infraredData,
    PumpParameterData,
    pollingData,
    PumprealTimeData,
    PumpVibrationData,
    PumpInfraredData,
    report,
    PumpReport
  },
  mounted() {

  },
  methods: {

  },
  computed: {

  },
  data() {
    return {
      'activeName': '1'
    }
  }

};

</script>
