<!-- 带左侧导航的顶部栏 -->
<template lang="html">
  <div class="flex">
    <div class="flex-item">
      <!--<i><img style="display: inline-block;height: 36px" src="../../assets/images/logo_white.png"></i>-->
      妥妥递私募基金服务管理系统
    </div>
    <div class="header-name" @click="$router.push('/home/message')">
      <el-badge :value="msgNum" :max="99" class="badge-class">
        <i class="el-icon-bell"></i>
      </el-badge>
    </div>
    <div class="header-avator">
      <div class="user-dropdown-menu-con">
        <div class="user-dropdown-innercon ivu-row-flex ivu-row-flex-middle ivu-row-flex-end">
          <el-dropdown>
            <span class="el-dropdown-link user-show" style="float:left;color: #fff">
              <label>{{userInfo.name}}</label>
              <em><img :src="userInfo.avatar ? userInfo.avatar.url : defaultAvatar"></em>
              <!--<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
            </span>
            <el-dropdown-menu slot="dropdown" class="drowdown-list" style="padding: 0;width: 140px">
              <div class="uf">
                <div style="color: #ccc;font-size: 14px">{{userInfo.realName}}</div>
                <div>{{userInfo.mobile}}</div>
              </div>
              <el-dropdown-item @click.native="$router.push('/home/userHome')">个人中心</el-dropdown-item>
              <el-dropdown-item divided @click.native="loginOut()">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  import { mapState } from 'vuex'
  import defaultAvatar from '../../assets/images/avator_default.png'
  export default {
    data () {
      return {
        name: '',
        defaultAvatar: defaultAvatar
      }
    },
    created () {
    },
    computed: {
      ...mapState([
        'msgNum',
        'userInfo'
      ])
    },
    methods: {
      loginOut () {
        this.util.loginOut()
      }
    }
  }
</script>
<style>
  .badge-class .el-badge__content.is-fixed{
    top:12px;
    background-color: #FA9234;
    border: none;
  }
  .el-dropdown-menu__item--divided:before{
    display: none;
  }
  .drowdown-list .popper__arrow::after{
    border-bottom-color: #3D82F7!important;
  }
</style>
<style lang="less" scoped type="text/less">

  .header-avator {
    position: relative;
    height: 60px;
  }
  .header-name{
    padding: 0 20px;
    cursor: pointer;
    margin-right: 20px;
  }
  .header-message{
    width: 92px;
    padding: 18px 0;
    text-align: center;
    cursor: pointer;
  }
  .user-show label{
    float: left
  }
  .user-show em{
    float:left;
    margin:10px 10px 0 20px;
    border-radius: 50%;
    overflow: hidden
  }
  .user-show em img{
    display: block;
    width: 40px;
    height: 40px
  }
  .uf{
    padding-top: 8px;
    text-align: center;
    line-height: 20px;
    color: #fff;
    background: #3D82F7;
    height: 50px;
    border-radius: 4px 4px 0 0;
  }
  .drowdown-list li{
    margin: 0;
    text-align: center;
  }
</style>
