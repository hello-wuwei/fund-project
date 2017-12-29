<template>
  <div class="login-top">
    <div class="header flex">
      <div class="flex-item logo">
        <img :src="logo"/>
      </div>
      <div class="">
        <span class="hot-tel"><icon icon-class="server" style="width: 40px; height: 40px"></icon>客服热线：400-700-9665</span>
        <router-link to="/login">
          <el-button style="color: #3D82F7; height: 34px">登录</el-button>
        </router-link>
      </div>
    </div>
    <div class="title-wrapper">
      <div class="login-text">
        {{loginTitle}}
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'login-header',
    props: ['loginTitle'],
    data () {
      return {
        logo: require('images/logo_white.png')
      }
    }
  }
</script>
<style type="text/less" lang="less" type="text/less">
  .login-top {
    height: 380px;
    background-image: url("../../assets/images/login/denglu-bg.png");
    background-size: 100% 100%;
    color: #ffffff;
    position: relative;
    .header {
      padding: 1.25rem 0;
      width: 1180px;
      margin: auto;
      .logo {
        width: 8.5rem;
        height: 2.5rem;
      }

      .hot-tel {
        padding-right: 35px;
      }

    }
    .title-wrapper {
      position: absolute;
      bottom: 35px;
      width: 100%;
      .login-text {
        height: 24px;
        text-align: center;
        font-size: 1.5rem;
        &:before, &:after {
          content: "";
          display: inline-block;
          height: 2px;
          width: 104px;
          background-color: rgba(255, 255, 255, 0.3);
          line-height: 1.5rem;
          border-radius: 2px;
          position: relative;
          top: -0.5rem
        }
      }
    }

  }
</style>
