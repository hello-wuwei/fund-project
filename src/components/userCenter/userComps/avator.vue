<!--用户中心右侧模板-->
<template lang="html">
  <div class="right-block">
    <h4>修改头像</h4>
    <div class="user-info">
      <div class="upload-avator">
        <p>上传头像</p>
        <el-upload
          class="upload-demo"
          :before-upload="beforeAvatarUpload"
          :on-success="handleAvatarSuccess"
          drag
          :show-file-list="false"
          :action="$sever.fileUploadUrl()"
          :headers="params"
          :data= "{bucketName:'totodi-other'}">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
        <el-upload
          style="margin-top: 10px"
          class="upload-demo"
          :before-upload="beforeAvatarUpload"
          :on-success="handleAvatarSuccess"
          :action="$sever.fileUploadUrl()"
          :headers="params"
          :show-file-list="false"
          :data= "{bucketName:'totodi-other'}">
          <el-button style="width: 100%" size="small" type="primary">点击上传</el-button>
        </el-upload>
      </div>

      <div class="upload-avator avator-view">
        <p>预览</p>
        <div class="img-area"><img :src="callData.url || defaultAvator"></div>
      </div>
    </div>

    <div class="dialog-footer">
      <el-button @click="$router.back()">返 回</el-button>
      <el-button type="primary" @click="avatorSubmit">保 存</el-button>
    </div>

  </div>
</template>
<script>
  import crypto from '../../../utils/crypto'
  import { Authorization } from '../../../api/config'
  import {mapState, mapMutations} from 'vuex'
  import defaultAvator from '../../../assets/images/avator_default.png'
  export default {
    data () {
      return {
        callData: '',
        defaultAvator: defaultAvator,
        params: Authorization(crypto.getTimeStamp())
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
      ...mapMutations({
        reviseUserInfo: 'REVISE_USERINFO'
      }),
      beforeAvatarUpload (file) {
        const isJPG = /jpg|jpeg|png/.test(file.type)
        const isLt2M = file.size / 1024 / 1024 < 2
        console.log(file.type)
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 或PNG格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      },
      handleAvatarSuccess ({code, data, msg}) {
        if (code === 0) {
          this.callData = data.list[0]
        } else {
          this.$message({message: msg || '上传失败!', type: 'warning', center: true})
        }
      },

      async avatorSubmit () {
        if (this.callData === '') {
          this.$message({message: '请选择头像', type: 'warning'})
          return
        }
        let res = await this.$sever.uploadAvator({userId: this.userInfo.userId, avatar: JSON.stringify(this.callData), sysCode: 'TTD_MANAGE_SYSTEM'})
        switch (res.code) {
          case 0:
            this.$message({message: '上传成功', type: 'success'})
            this.reviseUserInfo({type: 0, avatar: this.callData.url})
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
  .upload-demo .el-upload, .upload-demo .el-upload-dragger{
    width: 300px;
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
    overflow: hidden;
  }
  .upload-avator{
    float: left;
  }
  .upload-avator p{
    font-size: 14px;
    margin-bottom: 10px;
  }
  .avator-view{
    margin-left: 100px;
  }
  .img-area{
    width: 200px;
    height: 200px;
    border-radius: 50%;
    overflow: hidden;
  }
  .img-area img{
    width: 100%;
  }
</style>
