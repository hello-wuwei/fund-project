<template lang="html">
  <el-container>
    <el-header>
      <home-top></home-top>
    </el-header>
    <el-container>
      <el-aside style="width: auto;overflow: inherit"><left-menu></left-menu></el-aside>
      <el-main style="background: #F0F3F5"><main-content></main-content></el-main>
    </el-container>
    <!--<el-button type="primary" @click="notice">hhh</el-button>-->
  </el-container>
</template>

<script>
//  import Sock from 'sockjs-client'
//  import Stomp from 'stompjs'
  import {mapMutations} from 'vuex'
  import HomeTop from 'comp/layout/homeTop'
  import LeftMenu from 'comp/menu'
  import MainContent from 'comp/layout/main'
//  import { connectUrl, path } from '../api/websocket'
//  import bus from '../utils/bus'

  export default {
    components: {
      HomeTop,
      LeftMenu,
      MainContent
    },
    data () {
      return {
        stompClient: null
      }
    },
    created () {
//      let userInfo = this.util.getStorageUserInfo()
      let userId = this.util.getStorageUserInfo().userId
//      this.saveUserInfo(userInfo)
      this.getUserRootInfo(userId)
      this.setLoginInfo(JSON.parse(window.sessionStorage.getItem('loginInfo')))

      this.$initFunRoot()

      this.getMessageNum()

      this.$client_connect()        // 建立会话链接（消息推送）
    },
    methods: {
      ...mapMutations({
        saveUserInfo: 'SAVE_USERINFO',          // 存储用户信息
        setMsgNum: 'SET_MSG_NUM',                 // 存储未读消息条数
        setLoginInfo: 'SET_LOGINIP'                 // 存储本机登录信息
      }),

      async getUserRootInfo (userId) {
        let res = await this.$sever.getUserRootInfo({userId: userId, sysCode: 'TTD_MANAGE_SYSTEM'})
        switch (res.code) {
          case 0:
//            alert(JSON.stringify(res.data.bean))
            res.data.bean.au = this.util.getStorageUserInfo().au
            res.data.bean.avatar = (res.data.bean.avatar === '{}') ? '' : JSON.parse(res.data.bean.avatar)
            this.saveUserInfo(res.data.bean)
            this.$initFunRoot()
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

//      async showAccountInfo () {
//        let res = await this.$sever.getAccountInfo({userId: this.util.getStorageUserInfo().userId, sysCode: 'TTD_MANAGE_SYSTEM'})
//        switch (res.code) {
//          case 0:
//            alert(JSON.stringify(res.data.bean))
//            this.saveUserInfo(res.data.bean)
//            break
//          default:
//            this.$message({message: res.msg, type: 'warning'})
//        }
//      },

      async getMessageNum () {
        let res = await this.$sever.getMessageNum({sysName: 'TTD_FUND_MANAGE'})
        switch (res.code) {
          case 0:
            this.setMsgNum(res.data.bean.count)
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      }
    }
  }
</script>
<style type="text/less" lang="less">
  .el-container{
    height: 100%;
    min-width: 1190px;
  }
  .el-header{
    padding: 0 40px;
    color: #ffffff;
    line-height: 60px;
    background: #3D82F7;
  }
  .el-main{
    padding: 0;
    .main-wrapper{
      height: 100%;
    }
  }
</style>
