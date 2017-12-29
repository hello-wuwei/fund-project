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
  import Sock from 'sockjs-client'
  import Stomp from 'stompjs'
  import {mapMutations} from 'vuex'
  import HomeTop from 'comp/layout/homeTop'
  import LeftMenu from 'comp/menu'
  import MainContent from 'comp/layout/main'
  import { connectUrl, path } from '../api/websocket'
  import bus from '../utils/bus'

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
      let that = this
      let userInfo = this.util.getStorage('TTD_MANAGE_USERINFO')
      console.log(userInfo)
      this.saveUserInfo(userInfo)
      this.setLoginInfo(JSON.parse(window.sessionStorage.getItem('loginInfo')))

      this.getMessageNum()

      this.$client_connect()

      //  退出登录时断开连接
      bus.$on('disClient', function (msg) {
        that.$client_disconnect()
      })
    },
    mounted () {
    },
    methods: {
      ...mapMutations({
        saveUserInfo: 'SAVE_USERINFO',          // 存储用户信息
        setMsgNum: 'SET_MSG_NUM',                 // 存储未读消息条数
        setLoginInfo: 'SET_LOGINIP'                 // 存储本机登录信息
      }),

      async getMessageNum () {
        let res = await this.$sever.getMessageNum({sysName: 'TTD_FUND_MANAGE'})
        switch (res.code) {
          case 0:
            this.setMsgNum(res.data.bean.count)
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      notice () {
        let msg = {
          title: '哈哈哈',
          content: '消息消息消息消息消息消息消息消息消息消息'
        }
        this.msgTip(msg)
      },

      msgTip(msg) {
        const h = this.$createElement
        this.$notify({
          title: msg.title,
          message: h('i', {style: 'color: teal'}, msg.content)
        })
      },

      // 建立链接并监听订阅消息
      $client_connect () {
        let that = this
        let websocket = new Sock(connectUrl, null, {'withCredentials': false})
        this.stompClient = Stomp.over(websocket)
        this.stompClient.connect({}, function (frame) {
          that.stompClient.subscribe(path, function (data) {
            let msg = JSON.parse(data.body)
            that.msgTip(msg)
          })
        })
      },

      // 断开连接
      $client_disconnect () {
        if (this.stompClient !== null) {
          this.stompClient.disconnect()
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
