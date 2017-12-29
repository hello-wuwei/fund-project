<!-- 带左侧导航的顶部栏 -->
<template lang="html">
  <div class="flex">
    <div class="flex-item">
      妥妥递后台管理系统
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
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><router-link to="/home/userHome">个人中心</router-link></el-dropdown-item>
              <el-dropdown-item divided><span @click="loginOut()">退出登录</span></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  import bus from '../../utils/bus'
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
        bus.$emit('disClient', {})
        this.$router.push('/login')
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
</style>
<style lang="less" scoped type="text/less">

  .header-avator {
    position: relative;
    height: 60px;
  }
  .header-name{
    padding: 0 20px;
    cursor: pointer;
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
</style>
