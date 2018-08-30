<template>
  <el-card class="box-card healthManager">
    <div slot="header" class="header">
      <span>实时数据接收入kafka作业程序监控</span>
    </div>
    <el-row :gutter="0" class="row" >

      <el-col :span="12"  class="col">
        <div style="width: 100%;height: 100%">
          <div><img :src="getImgUrl(this._servers[0].state)" ></div>
          <div>{{_servers[0].ip}}<span>({{getStatus(this._servers[0].state)}})</span></div>

        </div>
      </el-col>
      <el-col :span="12"  class="col">
        <div style="width: 100%;height: 100%">
          <div><img :src="getImgUrl(this._servers[1].state)" ></div>
          <div>{{_servers[1].ip}}<span>({{getStatus(this._servers[1].state)}})</span></div>

        </div>
      </el-col>

    </el-row>
  </el-card>
</template>

<style>

</style>
<style lang="scss" scoped>

  * {
    margin: 0px;
    padding: 0px;
    list-style: none;
  }
  .header{
    text-align: left;
  }
  .row{
    margin: 60px 0px;
  }



</style>

<script type="text/javascript">

import {
  mapState,
  mapActions
} from 'vuex';


export default {
  props: ['type'],
  name: 'Monitor',
  methods: {
    getStatus: function (status) {
      switch (status) {
        case 'main':
          return '主';
        case 'second':
          return '备';
        default:
          return '故障';
      }
    },
    getImgUrl: function (status) {
      switch (status) {
        case 'main':
          return '../../../static/img/dashboard/server-green.png';
        case 'second':
          return '../../../static/img/dashboard/server-gray.png';
        default:
          return '../../../static/img/dashboard/server-red.png';
      }
    },
    ...mapActions({
      getdata: 'dashboard/getMonitor'
    })
  },
  computed: {
    ...mapState('dashboard', {
      _servers(state) {
        if (!state.monitor.servers) {
          return this.servers;
        } else {
          this.servers = state.monitor.servers;
          return this.servers;
        }
      }
    })
  },
  mounted() {
    this.getdata({'url': '/static/data/dashboard/machineMonitor.json'});
  },
  data() {
    return {
      'servers': [
        {
          'ip': '201.12.21.3',
          'state': 'second'
        },
        {
          'ip': '201.12.21.4',
          'state': 'main'
        }
      ]
    }
  }

};

</script>
