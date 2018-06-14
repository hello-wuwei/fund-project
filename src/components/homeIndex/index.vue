<template lang="html">
  <div class="page">
    <div class="content-main">
      <div class="home-page">
        <div class="banner">
          <div class="hover-text">
            <h3>HI，{{realName}} 您好</h3>
            <h2>欢迎您登录妥妥递私募基金服务管理系统</h2>
          </div>
          <img src="../../assets/images/home_bg.jpg">
        </div>
        <div class="banner-text">您的上次登录时间：{{lastLogin | date}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        realName: '',
        lastLogin: ''
      }
    },
    created () {
      this.lastLogin = this.util.getStorage('TTD_MANAGE_USERINFO').lastLogin
      this.realName = this.util.getStorage('TTD_MANAGE_USERINFO').realName
    },
    methods: {
    }
  }
</script>
<style lang="css">
</style>
<style lang="css" scoped>
  .banner img{
    width: 100%;
  }
  .home-page{
    background: #F2F6FB;
  }
  .banner-text{
    line-height: 60px;
    padding: 0 30px;
  }
  .banner{
    position: relative;
  }
  .banner .hover-text{
    position: absolute;
    text-align: center;
    line-height: 80px;
    width: 700px;
    height: 250px;
    top: 50%;
    margin-top: -80px;
    left: 50%;
    margin-left: -350px;
  }
  .banner .hover-text h2{
    font-size: 36px;
  }
  .banner .hover-text h3{
    font-size: 28px;
  }
  h2, h3{
    color: #fff;
  }
</style>

