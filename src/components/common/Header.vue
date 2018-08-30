<template>
  <div class="header">
    <div class="logo">
      <!--<img class="user-logo" src="../../../static/img/login/logo-color-fff.svg">-->
      工业大数据平台
      &nbsp;<i @click="updateCollapse" class="fa fa-reorder"></i>
    </div>

    <div class="user-info">
      <el-dropdown trigger="click" v-if="ok" class="dropdown" @command="handleCommand">
        <span class="el-dropdown-link">
            <img class="user-logo" src="../../../static/img/user48.png">
            {{username}}
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="loginout" class="out"><i class="el-icon-error"> </i> 退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    </div>

    <div style="width: 100px;height: 90%"></div>
  </div>
</template>

<style scoped>

  .dropdown{
    -webkit-transition: all .3s;
    transition: all .3s;
    padding: 0px 10px;

  }
  .dropdown:hover{
    background: #479bdc;
  }

  .header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 20px;
    line-height: 70px;
    color: #fff;
    background: #002140;
  }
  .header .logo{
    float: left;
    width:220px;
    text-align: center;
  }
  .header .logo img{
    width: 120px;
    vertical-align: middle;
  }
  .header .logo i{
    cursor: pointer;
  }
  .user-info {
    float: right;
    padding-right: 50px;
    font-size: 16px;
    color: #fff;
  }
  .user-info .el-dropdown-link{
    position: relative;
    display: inline-block;
    padding-left: 50px;
    color: #fff;
    cursor: pointer;
    vertical-align: middle;
  }
  .user-info .user-logo{
    position: absolute;
    left:0;
    top:15px;
    width:40px;
    height:40px;
    border-radius: 50%;
  }
  .el-dropdown-menu__item{
    text-align: center;
  }
  .out{
    line-height: 20px;
    padding: 0 25px;

  }
  @media screen and (max-width: 775px) {
    .logo{
      font-size: 1rem;
    }
    .user-logo{
      display: none;
    }
    .header .logo{
      width: 12rem;
      padding-left: 1.5rem;
    }
    .user-info{
      padding-right: 30px;
    }
    .out{
      padding: 0 20px;
    }
    .user-info .el-dropdown-link{
      padding-left: 0;
    }
  }
</style>

<script>
import {
  mapActions,
  mapState
} from 'vuex';
export default {
  data () {
    return {
      name: 'header'
    }
  },
  computed: {
    // username () {
    //   let username = localStorage.getItem('ms_username')
    //   return username || this.name
    // },
    ok () {
      let username = localStorage.getItem('ms_username')
      return username === 'admin' || true
    },
    ...mapState('user', {
      username(state) {
        if (!state.name) {
          return '';
        } else {
          return state.name;
        }
      }
    })
  },
  methods: {
    handleCommand (command) {
      if (command === 'loginout') {
        // localStorage.removeItem('ms_username')
        this.FedLogOut().then(() => {
          debugger
          location.reload()// In order to re-instantiate the vue-router object to avoid bugs
        })
        this.$router.push('/login')

      }
    },
    ...mapActions({
      updateCollapse: 'updateCollapse',
      FedLogOut: 'user/FedLogOut'
    })
  }
}
</script>
