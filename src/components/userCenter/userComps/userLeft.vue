<template lang="html">
  <div class="left-block">
    <div class="avater">
      <img :src="userInfo.avatar ? userInfo.avatar.url : defaultAvatar">
    </div>
    <p class="edit"><el-button><router-link to="/home/userHome/avator">修改头像</router-link></el-button></p>
    <div class="userInfo">
      <el-form label-width="100px" label-position="left">
        <el-form-item label="用户名：">
          {{userInfo.name || '--'}}
        </el-form-item>
        <el-form-item label="用户账号：">
          {{userInfo.mobile || '--'}}
        </el-form-item>
        <el-form-item label="用户角色：">
          {{userInfo.roleInfo || '--'}}
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import defaultAvatar from '../../../assets/images/avator_default.png'
  export default {
    data () {
      return {
        defaultAvatar: defaultAvatar
      }
    },
    created () {
    },
    computed: {
      ...mapState([
        'userInfo'
      ])
    },
    methods: {
    }
  }
</script>
 <style>
   .userInfo .el-form-item{
     margin-bottom: 0;
   }
 </style>

<style scoped>
  .left-block{
    padding-top: 1px;
    border-radius: 6px;
    width: 96%;
    background: #fff;
    height: 800px;
  }
  .avater{
    width: 160px;
    height: 160px;
    margin: 50px auto;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 50%;
    overflow: hidden;
  }
  .avater img{
    width: 100%;
    height: 100%;
  }
  .edit{
    text-align: center;
    width: 360px;
    margin: auto;
    padding-bottom: 40px;
    border-bottom: 1px solid #ccc;
  }
  .userInfo{
    margin-left: 30px;
  }
</style>
