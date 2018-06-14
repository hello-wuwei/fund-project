<!--用户中心右侧模板-->
<template lang="html">
  <div class="page">
    <com-breadcrumb :list="['补充协议', '风险揭示书处理']"></com-breadcrumb>
    <div class="right-block">
      <div class="border-line">
        <el-form class="form-list" label-width="140px" label-position="right" style="width: 700px">
          <el-form-item label="风险揭示书：">
            {{util.getUrlName(productInfo.originalRevealBookUrl.url) || '--'}}
            <el-button style="margin-left: 60px" size="mini" type="primary" @click="util.loadFileByUrl(productInfo.originalRevealBookUrl.url)">下 载</el-button>
          </el-form-item>
          <el-form-item label="托管人：">
            {{productInfo.trustUserName || '--'}}
          </el-form-item>
          <el-form-item label="管理人：">
            {{productInfo.manageName || '--'}}
          </el-form-item>
          <el-form-item label="风险揭示书状态：">
            {{{0:'待上传',1:'待录入信息',2:'待打标签',3:'已打标签'}[productInfo.revealBookState]}}
          </el-form-item>
          <el-form-item class="done-list" label="风险揭示书上传：">
            <el-upload
              :before-upload="beforeAvatarUpload"
              :on-success="handleAvatarSuccess"
              :action="$sever.fileUploadUrl()"
              :headers="params"
              :show-file-list="false"
              :data="{bucketName:'totodi-contract'}">
              <el-button type="primary" class="btn-dashed" style="width: 238px">+ 风险揭示书上传</el-button>
              <i v-if="productInfo.revealBookState!=0" class="el-icon-success"></i>
            </el-upload>
          </el-form-item>
          <el-form-item class="done-list" label="录入信息：">
            <el-button type="primary" style="width: 238px" @click="enterInfo">录入信息</el-button>
            <i v-if="productInfo.revealBookState==2 || productInfo.revealBookState==3" class="el-icon-success"></i>
          </el-form-item>
          <el-form-item class="done-list" label="打标签：">
            <el-button type="primary" class="btn-dashed" style="width: 238px" @click="makingLabel">+ 打标签</el-button>
            <i v-if="productInfo.revealBookState==3" class="el-icon-success"></i>
          </el-form-item>
        </el-form>
      </div>

      <div class="dialog-footer">
        <el-button @click="$router.back()">返 回</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import crypto from '../../../utils/crypto'
  import { Authorization } from '../../../api/config'
  export default {
    data () {
      return {
        propValue: {
          bookId: ''
        },
        page: 1,
        numPages: 0,
        callData: '',

        params: Authorization(crypto.getTimeStamp()),

        imageUrl: '',
        productInfo: {
          originalRevealBookUrl: {
            url: ''
          }
        }
      }
    },
    created () {
      this.propValue.bookId = this.$route.query.bookId
      this.getProInfo()
    },
    computed: {
    },
    methods: {
      switchPage (str) {
        if (str === 'prev') {
          if (this.page === 1) {
            return
          }
          this.page--
        }
        if (str === 'next') {
          if (this.page === this.numPages) {
            this.$message({message: '当前已是最后一页', type: 'warning'})
            return
          }
          this.page++
        }
      },

      async getProInfo () {
        let res = await this.$sever.riskBookDetail({bookId: this.propValue.bookId, sysCode: 'TTD_MANAGE_SYSTEM'})
        switch (res.code) {
          case 0:
            console.log('风险揭示书信息', res.data.bean)
            this.productInfo = res.data.bean
            this.productInfo.originalRevealBookUrl = JSON.parse(this.productInfo.originalRevealBookUrl)
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      beforeAvatarUpload (file) {
        const isRight = /pdf/.test(file.type)
        console.log(file.type)
        if (!isRight) {
          this.$message.error('上传文件只能是PDF格式!')
        }
        return isRight
      },
      handleAvatarSuccess ({code, data, msg}) {
        if (code === 0) {
          this.callData = data.list[0]
          this.checkUpload()
        } else {
          this.$message({message: msg || '上传文件服务器失败!', type: 'warning', center: true})
        }
      },

      async checkUpload () {
        let obj = {
          bookId: this.propValue.bookId,
          revealBookUrl: JSON.stringify(this.callData)
        }
        let res = await this.$sever.uploadRiskBook(obj)
        switch (res.code) {
          case 0:
            this.$message({message: '上传成功', type: 'success'})
            this.getProInfo()
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      makingLabel () {
        if (this.productInfo.revealBookState === 0 || this.productInfo.revealBookState === 1) {
          this.$message({message: '请先上传风险揭示书并录入信息', type: 'warning'})
          return
        }
        this.$router.push({path: '/home/supagree/risksign', query: {bookId: this.propValue.bookId}})
      },

      enterInfo () {
        if (this.productInfo.revealBookState === 0) {
          this.$message({message: '请先上传风险揭示书', type: 'warning'})
          return
        }
        this.$router.push({path: '/home/supagree/enterinfo', query: {bookId: this.propValue.bookId}})
      }
    }
  }
</script>
<style>
  .upload-demo .el-upload, .upload-demo .el-upload-dragger{
    width: 300px;
  }
</style>
<style scoped>
  .right-block{
    padding-top: 1px;
    border-radius: 6px;
    background: #fff;
    min-height: 800px;
    padding: 20px;
  }
  .right-block h4{
    margin: 20px;
    margin-bottom: 6px;
    font-size: 14px;
    color: #000;
    font-weight: bold;
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
  .form-tip{
    margin-left: 100px;
    font-size: 12px;
    color: gray
  }
  .done-list{
    margin-bottom: 10px !important;
  }
  .done-list i.el-icon-warning{
    color: orange;
  }
  .done-list i.el-icon-success{
    color: lightgreen;
    margin-left: 20px
  }
  .done-list span{
    display:inline-block;
    margin-left: 20px;
    width: 100px;
    font-size: 14px
  }
</style>
