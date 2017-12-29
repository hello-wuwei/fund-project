<!--用户中心右侧模板-->
<template lang="html">
  <div class="right-block">
    <h4>请上传管理人印章图片用于公司电子印章的制作</h4>
    <div class="user-info">
      <h5 class="tip-text"><i class="el-icon-warning"></i>请将公司印章盖在白纸上，并拍照上传，要求印章清晰可见</h5>
      <div class="upload-avator">
        <el-upload
          class="upload-demo"
          :before-upload="beforeAvatarUpload"
          :on-success="handleAvatarSuccess"
          drag
          :show-file-list="false"
          :action="$sever.fileUploadUrl()"
          :headers="params"
          :data= "{bucketName:'totodi-seal'}">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">可将图片拖拽此处进行预览上传，支持jpg，jepg，png，大小不能超过2M</em></div>
        </el-upload>
        <el-upload
          style="margin-top: 10px"
          class="upload-demo"
          :before-upload="beforeAvatarUpload"
          :on-success="handleAvatarSuccess"
          :action="$sever.fileUploadUrl()"
          :headers="params"
          :show-file-list="false"
          :data= "{bucketName:'totodi-seal'}">
          <el-button style="width: 100%" size="small" type="primary">点击上传</el-button>
        </el-upload>
      </div>

      <div class="upload-avator avator-view">
        <p style="float: left">预览</p>
        <div class="img-area"><img :src="callData.url || defaultAvator"></div>
      </div>
    </div>

    <div class="submit-foot-center">
      <el-button type="primary" @click="fileSubmit">提 交</el-button>
      <el-button @click="$emit('removeTag', 'uploadSeal')">返 回</el-button>
    </div>

  </div>
</template>
<script>
  import crypto from '../../../utils/crypto'
  import { Authorization } from '../../../api/config'
  import defaultAvator from '../../../assets/images/avator_default.png'
  export default {
    props: ['stampId'],
    data () {
      return {
        defaultAvator: defaultAvator,
        params: Authorization(crypto.getTimeStamp()),
        callData: {
          url: ''
        }
      }
    },
    created () {
      this.getSealInfo()
    },
    computed: {
    },
    methods: {
      async getSealInfo () {
        let res = await this.$sever.getSealInfo({stampId: this.stampId, sysCode: 'TTD_MANAGE_SYSTEM'})
        switch (res.code) {
          case 0:
            this.callData.url = JSON.parse(res.data.bean.stampUrl).url
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

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

      async fileSubmit (stampId) {
        if (this.callData.url === '') {
          this.$message({message: '请选择印章', type: 'warning'})
          return
        }
        let obj = {
          sysCode: 'TTD_MANAGE_SYSTEM',
          stampId: this.stampId,
          stampUrl: JSON.stringify(this.callData)
        }
        let res = await this.$sever.uploadSeal(obj)
        switch (res.code) {
          case 0:
            this.$message({message: '上传成功', type: 'success'})
            this.$emit('removeTag', 'uploadSeal')
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
    margin-bottom: 6px;
    font-size: 14px;
    color: #000;
  }
  .user-info{
    margin: 20px 20px;
    margin-top: 6px;
    border: 1px solid #ccc;
    padding: 20px 40px;
    padding-top: 0;
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
    float: left;
    margin-left: 10px;
    width: 240px;
    height: 180px;
    border: 1px dashed #ccc;
    overflow: hidden;
    padding-top: 16px;
  }
  .img-area img{
    display: block;
    width: 160px;
    height: 160px;
    margin: auto;
  }
  .tip-text{
    line-height: 60px;
    color: #777786
  }
  .tip-text i{
    margin-right: 4px;
  }
</style>
