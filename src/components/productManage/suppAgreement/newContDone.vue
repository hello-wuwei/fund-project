<!--用户中心右侧模板-->
<template lang="html">
  <div class="page">
    <com-breadcrumb :list="['补充协议', '新合同处理']"></com-breadcrumb>
    <div class="right-block">
      <div class="border-line">
        <el-form class="form-list" label-width="140px" label-position="right" style="width: 700px">
          <el-form-item label="新合同：">
            {{util.getUrlName(productInfo.originalContractUrl.url)}}
            <el-button style="margin-left: 60px" size="mini" type="primary" @click="util.loadFileByUrl(productInfo.originalContractUrl.url)">下 载</el-button>
          </el-form-item>
          <el-form-item label="托管人：">
            {{productInfo.trustUserName || '--'}}
          </el-form-item>
          <el-form-item label="管理人：">
            {{productInfo.manageName || '--'}}
          </el-form-item>
          <el-form-item label="合同状态：">
            {{{0:'待上传',1:'待打标签',2:'已打标签'}[productInfo.state]}}
          </el-form-item>
          <el-form-item class="done-list" label="设置风险等级：">
            <el-select v-model="riskLevelId" size="small" style="width: 238px">
              <el-option label="置空" value=""></el-option>
              <el-option label="R1" value="111"></el-option>
              <el-option label="R2" value="112"></el-option>
              <el-option label="R3" value="113"></el-option>
              <el-option label="R4" value="114"></el-option>
              <el-option label="R5" value="115"></el-option>
            </el-select>
            <!--<i v-if="productInfo.state!=0" class="el-icon-success"></i>-->
          </el-form-item>
          <el-form-item class="done-list" label="合同上传：">
            <el-upload
              :before-upload="beforeAvatarUpload"
              :on-success="handleAvatarSuccess"
              :action="$sever.fileUploadUrl()"
              :headers="params"
              :show-file-list="false"
              :data="{bucketName:'totodi-contract'}">
              <el-button type="primary" class="btn-dashed" style="width: 238px">+ 合同上传</el-button>
              <i v-if="productInfo.state!=0" class="el-icon-success"></i>
            </el-upload>
          </el-form-item>
          <el-form-item class="done-list" label="打标签：">
            <el-button type="primary" class="btn-dashed" style="width: 238px" @click="makingLabel">+ 打标签</el-button>
            <i v-if="productInfo.state==2" class="el-icon-success"></i>
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
          contractId: ''
        },
        page: 1,
        numPages: 0,
        callData: '',

        params: Authorization(crypto.getTimeStamp()),

        imageUrl: '',
        productInfo: {
          originalContractUrl: {
            url: ''
          }
        },

        riskLevelId: ''
      }
    },
    created () {
      this.propValue.contractId = this.$route.query.contractId
      this.getProInfo()
    },
    computed: {
    },
    watch: {
      riskLevelId (nVal) {
        this.setRiskLevel({
          riskLevel: nVal,
          issuedId: this.productInfo.issuedId
        })
      }
    },
    methods: {
      async setRiskLevel (data) {
        let res = await this.$sever.setRiskLevel(data)
        switch (res.code) {
          case 0:
            console.log('风险等级设置成功')
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

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
        let res = await this.$sever.getNewContInfo({contractId: this.propValue.contractId, sysCode: 'TTD_MANAGE_SYSTEM'})
        switch (res.code) {
          case 0:
            console.log('新合同信息', res.data.bean)
            this.productInfo = res.data.bean
            this.productInfo.originalContractUrl = JSON.parse(this.productInfo.originalContractUrl)
            this.riskLevelId = this.productInfo.riskLevelId ? this.productInfo.riskLevelId.toString() : ''
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
          contractId: this.propValue.contractId,
          contractUrl: JSON.stringify(this.callData)
        }
        let res = await this.$sever.uploadNewCont(obj)
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
        if (this.productInfo.state === 0) {
          this.$message({message: '请先上传新合同', type: 'warning'})
          return
        }
        this.$router.push({path: '/home/supagree/newcontsign', query: {contractId: this.propValue.contractId}})
//        this.$emit('addTag', {title: '打标签', name: 'makeNewContSign', contractId: this.propValue.contractId})
      },

      enterInfo () {
        if (this.productInfo.revealBookState === 0) {
          this.$message({message: '请先上传风险揭示书', type: 'warning'})
          return
        }
        this.$emit('addTag', {title: '信息录入', name: 'enterInfo', bookId: this.propValue.bookId})
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
