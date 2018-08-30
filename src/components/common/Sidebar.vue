<template>
  <div class="sidebar" v-if="willshow" id="sii">
    <img src="../../../static/img/menu.png" alt="" class="butto" @click = "fn()">
    <el-menu :default-active="onRoutes"
             class="el-menu-vertical-demo"
             :collapse="isCollapse"
             background-color="#00142a"
             text-color="#bbb"
             active-text-color="#ffd04b"
             theme="dark" unique-opened router>
      <template v-for="item in _items">
        <template v-if="item.subs">
          <el-submenu :key="item.index" :index="item.index">
            <template slot="title"><i :class="item.icon"></i><span slot="title">{{ item.title }}</span></template>
            <el-menu-item @click="handleClick()" class="bag_col" v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
            </el-menu-item>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :key="item.index" :index="item.index" @click="handleClick()">
            <i :class="item.icon"></i>{{ item.title }}
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>

<style scoped>
 .sidebar > ul {
   height:100%;
 }
 .sidebar2 > ul {
   height:100%;
 }
 .butto{
   width: 30px;
   height: 30px;
   position: fixed;
   top: 20px;
   left: 10px;
   display: none;
 }
 .sidebar{
   display: block;
   position: absolute;
   width: 250px;
   left: 0;
   top: 70px;
   bottom:0;
   color: white;
   text-align: left;
   transition: left 0.2s ease;
 }
 .sidebar > ul {
   height:100%;
 }
 .el-submenu .el-menu-item{
   min-width: 0;
   height: 40px;
   line-height: 40px;
 }
 .el-submenu i{
   font-size: 16px;
   padding-right: 5px;
 }

 @media screen and (max-width: 775px) {
   .sidebar{
     left: -250px;
   }

   .sidebar{
     width: 130px;
     transition: left 0.2s ease;
   }
   .butto{
     display: block;
   }
 }
</style>


<script>
export default {
  props: ['isCollapse'],
  mounted() {

  },
  data() {
    return {
      items: [
        {
          icon: 'fa fa-database',
          index: '1',
          title: '  主数据管理',
          subs: [
            {
              index: '/user/plantMgr',
              title: '工厂主数据'
            },
            {
              index: '/user/workshopMgr',
              title: '厂房主数据'
            },
            {
              index: '/user/equipmentMgr',
              title: '设备主数据'
            }
          ]
        },
        {
          icon: 'fa fa-cloud',
          index: '2',
          title: ' 可靠性数据采集',
          subs: [
            {
              index: '/user/gather',
              title: '可靠性数据采集'
            },
            {
              index: '/user/gatherSpecialist',
              title: '专家可靠性数据诊断'
            }
          ]
        },
        {
          icon: 'fa fa-gears',
          index: '4',
          title: ' 系统管理',
          subs: [
            {
              index: '#?1',
              title: '账户管理'
            },
            {
              index: '#?2',
              title: '授权管理'
            },
            {
              index: '#?3',
              title: '数据管理'
            },
            {
              index: '#?4',
              title: '平台运维管理'
            }
          ]
        }
      ],
      willshow: true
    }
  },
  methods: {
    fn: function () {
      var sidebar = document.getElementById('sii');
      if (this.willshow === true) {
        this.willshow = false;
        sidebar.classList.remove('sidebar2');
        sidebar.classList.add('sidebar');
      } else {
        this.willshow = true;
        sidebar.classList.remove('sidebar');
        sidebar.classList.add('sidebar2');
      }
    },
    handleClick: function () {
      // 获取窗口宽度
      var winWidth = '';
      if (window.innerWidth) {
        winWidth = window.innerWidth;
      } else if ((document.body) && (document.body.clientWidth)) {
        winWidth = document.body.clientWidth;
      }
      console.log(winWidth)
      if (winWidth <= 750) {
        this.fn();
      }
    },
    creatMenus: function(data, parPath) {
      var result = []
      var temp = '';
      for (let i in data) {
        if (data[i].children !== undefined) {
          temp = this.creatMenus(data[i].children, data[i].path);
          // if(temp.length>0){
          //   data[i].children=temp;
          // }
          result.push({
            icon: data[i].meta && data[i].meta.icon && data[i].meta.icon,
            index: i.toString(),
            title: '  ' + data[i].name,
            subs: temp
          });
        } else {
          result.push({
            // icon: data[i].meta && data[i].meta.icon && data[i].meta.icon,
            index: parPath + data[i].path,
            title: '  ' + data[i].name
          });
        }
      }
      console.log(result)
      return result;
    }
  },
  computed: {
    onRoutes() {
      return this.$route.path;
    },
    userid () {
      return 'suername';
    },
    _items () {
      let routers = this.creatMenus(this.$store.getters.addRouters, '')
      /* let username = localStorage.getItem('ms_username')
      let temp = [];
      if (username === 'user') {
        temp.push(this.items[0]);
        temp.push(this.items[1]);
      } else if (username === 'zhuanjia') {
        temp.push(this.items[2]);
      } else if (username === 'admin') {
        temp.push(this.items[3]);
      } else {
        temp.push(this.items[0]);
        temp.push(this.items[1]);
      } */

      return routers;
    }
  }
}
</script>
