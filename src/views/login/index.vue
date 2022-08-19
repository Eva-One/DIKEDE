<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" label-position="left">

      <div class="title-container">
        <img src="@/assets/common/logo-login.png" alt="" class="logo">
      </div>

      <el-form-item prop="loginName">
        <span class="svg-container">
          <i class="el-icon-mobile-phone" />
        </span>
        <el-input
          v-model="loginForm.loginName"
          placeholder="请输入账号"
          type="text"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <!-- <svg-icon icon-class="password" /> -->
          <i class="el-icon-lock" />
        </span>
        <el-input
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-row>
        <el-col :span="18">
          <el-form-item prop="code">
            <span class="svg-container">
              <i class="el-icon-circle-check" />
            </span>
            <el-input
              v-model="loginForm.code"
              placeholder="请输入验证码"
              type="text"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <img :src="imgUrl" alt="" class="code" @click="changeCode">
        </el-col>
      </el-row>

      <el-button class="login-btn" :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click="login">登录</el-button>

    </el-form>
  </div>
</template>

<script>
import { getNum } from '@/utils/auth'
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        loginName: 'admin',
        password: 'admin',
        code: '',
        // mobile: '',
        clientToken: '',
        // account: '',
        loginType: 0
      },
      loginRules: {
        loginName: [{ required: true, message: '请输入用户名', trigger: 'change' }],
        password: [{ required: true, message: '请输入密码', trigger: 'change' }],
        code: [{ required: true, message: '请输入验证码', trigger: 'change' }]
      },
      loading: false,
      passwordType: 'password',
      imgUrl: 'https://likede2-java.itheima.net/api/user-service/user/imageCode/'
    }
  },
  watch: {
  },
  created() {
    this.changeCode()
  },
  methods: {
    showPwd() {
      this.passwordType === 'password' ? this.passwordType = '' : this.passwordType = 'password'
    },
    changeCode() {
      this.loginForm.clientToken = getNum()
      this.imgUrl = 'https://likede2-java.itheima.net/api/user-service/user/imageCode/'
      this.imgUrl = this.imgUrl + this.loginForm.clientToken
    },
    async login() {
      try {
        await this.$refs.loginForm.validate()
        this.loading = true
        await this.$store.dispatch('user/login', this.loginForm)
        this.$router.push('/')
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#889aa4;
$cursor: #889aa4;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    background-color: #fff;
    border: 1px solid #e2e2e2;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background: url('~@/assets/common/background-login.png') no-repeat;
  background-size: cover;
  overflow: hidden;

  .login-form {
    position: absolute;
    width: 518px;
    height: 388px;
    top: 50%;
    left: 50%;
    margin-top: -194px;
    margin-left: -259px;
    padding: 76px 35px 0;
    background: #fff;
    box-shadow: 0 3px 70px 0 rgb(30 111 72 / 35%);
    border-radius: 10px;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    color: #889aa4;
  }

  .title-container {
    position: relative;
    .logo{
      position: absolute;
    width: 96px;
    height: 96px;
    top: -125px;
    left: 50%;
    margin-left: -48px;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .login-btn{
    width: 100%;
    height: 52px;
    background: linear-gradient(262deg,#2e50e1,#6878f0);
    opacity: .91;
    border-radius: 8px;
    color: #fff;
    text-shadow: 0 7px 22px #cfcfcf;
  }

  .code{
    margin-top: 1px;
    border: 1px solid#e2e2e2;
  }
}
</style>
