<template>
  <div class="content">
    <div class="login-wrap">
      <div class="header">
        <!--<a href="#/">-->
          <!--<img alt="logo" class="logo" src="../../../static/img/login/logo-color-eb15a675f4.svg" >-->
          <span class="title">工业大数据平台</span>
        <!--</a>-->
      </div>
      <div class="ms-login">
        <div>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
            <el-form-item prop="username">
              <el-input v-model="ruleForm.username" placeholder="请输入用户名..."></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" placeholder="请输入密码..." v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
            </el-form-item>

            <!--<div class="jizhu">-->
              <!--<el-checkbox >自动登录</el-checkbox>-->
              <!--<a href="" style="float: right;">忘记密码</a></div>-->
            <div class="login-btn">
              <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            </div>
            <!--<p style="font-size:12px;line-height:30px;color:#999;">Tips : 用户名和密码随便填。</p>-->
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">


</style>
<style scoped lang="scss">

  .title{
    font-size: 20px;
  }
  .content{
    left: 0px;
    top: 170px;
    padding: 0px 0 0px 0;
    width: 100%;
    height: 100%;
  }
  .login-wrap{
    /* position: relative;*/
    width:100%;
    height:100%;
    background-image: url('../../../static/img/login/TVYTbAXWheQpRcWDaDMu.svg');
    background-repeat: no-repeat;
    background-position: center 110px;
    background-size: 100%;
    background-color: #f0f2f5;
  }

  .header{
    height: 44px;
    line-height: 44px;
    padding-top: 120px;
    background: none;
    text-align: center;
    a{
      color: #000000;
      font-size: 18px;
      font-weight: bold;
    }
  }
  .logo{
    height: 44px;
    vertical-align: top;
    margin-right: 16px;

  }
  .ms-login{
    position: absolute;
    left:50%;
    top:350px;
    width:350px;
    height:160px;
    margin:-150px 0 0 -210px;
    padding:40px;
    border-radius: 5px;

  }
  .jizhu{
    margin-bottom: 10px;

    a{
      font-size: 14px;
      color: #1e88da;
    }
  }

  .login-btn{
    text-align: center;
    padding-top: 10px;
  }
  .login-btn button{
    width:100%;
    height:36px;
  }
  @media screen and (max-width: 775px) {
    .ms-login{
      position: absolute;
      left:50%;
      top:350px;
      width:250px;
      height:160px;
      margin:-150px 0 0 -165px;
      padding:40px;
      border-radius: 5px;
      /*background: #fff;*/
    }
  }
</style>

<script>
import {
  mapActions
} from 'vuex';
import { isvalidUsername } from '@/utils/validate'
export default {
  data: function() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        // username: [
        //   { required: true, message: '请输入用户名', trigger: 'blur' }
        // ],
        //
        // password: [
        //   { required: true, message: '请输入密码', trigger: 'blur' }
        // ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' }
        ],
        verificationcode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      'activeName': 'first'
    }
  },
  methods: {
    ...mapActions({
      LoginByUsername: 'user/LoginByUsername'
    }),
    submitForm(formName) {
      const self = this
      self.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('user/LoginByUsername', this.ruleForm).then(() => {
            this.$router.push({ path: '/user/' }); // 登录成功之后重定向到首页
          }).catch(err => {
            this.$message.error(err); // 登录失败提示错误
          });
          // localStorage.setItem('ms_username', self.ruleForm.username)
          // if (self.ruleForm.username === 'user') {
          //   self.$router.push('/user')
          // } else if (self.ruleForm.username === 'zhuanjia') {
          //   self.$router.push('/user')
          // } else {
          //   self.$router.push('/user')
          // }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
