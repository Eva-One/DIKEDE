<template>
  <div class="navbar">

    <div class="breadcrumb-container">
      <img src="~@/assets/common/logo-index.png" alt="">
    </div>

    <div class="right-menu">
      <img
        v-imgErr="defaultImg"
        :src="userImg||defaultImg"
        class="user-avatar"
      >
      <span>欢迎您，{{ userInfo.roleName }}</span>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <div>
            <span>退出</span>
            <i class="el-icon-caret-bottom" />
          </div>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>首页</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block" @click="logout">登出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import defaultImg from '@/assets/common/head.jpg'

export default {
  components: {
  },
  data() {
    return {
      defaultImg: defaultImg
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'userInfo',
      'userImg'
    ])
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  padding-top: 5px;
  width: 100%;
  height: 60px;
  overflow: hidden;
  position: relative;
  background:url('~@/assets/common/background-top.png');
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
    width: 88px;
    height:35.81px;
    margin: 6px 0 0 15px;
    img{
      width: 100%;
      height: 100%;
    }
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    display:flex;
    align-items: center;
    >span{
      color: #fff;
      font-size: 16px;
      margin-right: 24px;
    }
    .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          margin-right: 8px;
        }
    .avatar-container {
      margin-right: 40px !important;
      .avatar-wrapper {
        position: relative;
        // 开启flex
        display: flex;
        align-items: center;
        color: #fff;
          span{
            font-size: 16px;
            cursor: pointer;
          }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 16px !important;
          font-size: 16px !important;
        }
      }
    }

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 1px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 20px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
