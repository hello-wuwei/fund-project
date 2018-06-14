<!--用户中心右侧模板-->
<template lang="html">
  <div class="right-block">
    <h4>您的个人信息</h4>
    <div class="user-info">
      <el-form label-width="100px" label-position="left">
        <!--<el-form-item label="用户名：">-->
          <!--<div v-if="editState==1">-->
            <!--<el-input size="small" v-model="userInfo.name" style="width: 300px"></el-input>-->
            <!--<span><el-button size="mini" type="primary">保 存</el-button><el-button size="mini" @click="editState=0">取 消</el-button></span>-->
          <!--</div>-->
          <!--<div v-else>-->
            <!--<span class="info-text">{{user_info.name}}</span>-->
            <!--<span><el-button size="mini" @click="editState=1">修 改</el-button></span>-->
          <!--</div>-->
        <!--</el-form-item>-->
        <el-form-item label="绑定手机：">
          <span class="info-text">{{user_info.mobile}}</span>
          <el-button size="mini" @click="$router.push('/home/userHome/changeMobile')">修 改</el-button>
        </el-form-item>
        <el-form-item label="账户密码：">
          <span class="info-text">*******</span>
          <el-button size="mini" @click="$router.push('/home/userHome/changePsd')">修 改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  export default {
    data () {
      return {
        user_info: '',
        editState: 0
      }
    },
    created () {
      this.showAccountInfo()
    },
    computed: {
      ...mapState([
        'userInfo'
      ])
    },
    methods: {
      async showAccountInfo () {
        let res = await this.$sever.getAccountInfo({userId: this.userInfo.userId, sysCode: 'TTD_MANAGE_SYSTEM'})
        switch (res.code) {
          case 0:
            this.user_info = res.data.bean
//            this.submitData.realName = res.data.bean.realName
//            this.submitData.name = res.data.bean.name
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      }
    }
  }
</script>
<style>
  .user-info .el-form-item{
    margin-bottom: 10px;
  }
</style>
<style scoped>
  .right-block{
    padding-top: 1px;
    border-radius: 6px;
    width: 100%;
    background: #fff;
    height: 800px;
  }
  .right-block h4{
    margin: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
  }
  .user-info{
    width: 90%;
    margin: 40px auto;
    border: 1px solid #ccc;
    padding: 20px 40px;
    border-radius: 2px;
  }
  .info-text{
    display: inline-block;
    width: 300px
  }
</style>
