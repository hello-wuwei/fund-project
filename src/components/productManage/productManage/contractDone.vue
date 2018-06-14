<!--用户中心右侧模板-->
<template lang="html">
  <div class="page">
    <com-breadcrumb :list="['产品创设', '合同处理']"></com-breadcrumb>
    <div class="right-block">
      <div class="border-line">
        <el-form class="form-list" label-width="120px" label-position="right" style="width: 700px">
          <el-form-item label="产品合同：">
            {{util.getUrlName(productInfo.originalContractUrl.url)}}
            <el-button style="margin-left: 60px" size="mini" type="primary" @click="util.loadFileByUrl(productInfo.contractUrl.url)">下 载</el-button>
          </el-form-item>
          <el-form-item label="托管人：">
            {{productInfo.trustUserName || '--'}}
          </el-form-item>
          <el-form-item label="管理人：">
            {{productInfo.manageName || '--'}}
          </el-form-item>
          <el-form-item label="合同状态：">
            {{{0:'待上传',1:'待打标签',2:'已打标签'}[productInfo.contractState]}}
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
            <!--<i v-if="formData.riskLevel" class="el-icon-success"></i>-->
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
              <i v-if="productInfo.contractState!=0" class="el-icon-success"></i>
            </el-upload>
          </el-form-item>
          <el-form-item class="done-list" label="打标签：">
            <el-button type="primary" class="btn-dashed" style="width: 238px" @click="makingLabel">+ 打标签</el-button>
            <i v-if="productInfo.contractState==2" class="el-icon-success"></i>
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
        callData: '',
        params: Authorization(crypto.getTimeStamp()),

        imageUrl: '',
        productInfo: {
          contractUrl: {
            url: ''
          },
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
        let res = await this.$sever.setProRiskLevel(data)
        switch (res.code) {
          case 0:
            console.log('风险等级设置成功')
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      async getProInfo () {
        let res = await this.$sever.getProInfo({contractId: this.propValue.contractId, sysCode: 'TTD_MANAGE_SYSTEM'})
        switch (res.code) {
          case 0:
            this.productInfo = res.data.bean
            this.productInfo.originalContractUrl = JSON.parse(this.productInfo.originalContractUrl)
            this.productInfo.contractUrl = JSON.parse(this.productInfo.contractUrl)
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
        let res = await this.$sever.uploadContract(obj)
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
        if (this.productInfo.contractState === 0) {
          this.$message({message: '请先上传合同', type: 'warning'})
          return
        }
        this.$router.push({path: '/home/product/contractsign', query: {contractId: this.propValue.contractId}})
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

  /*打标签样式块*/
  .index {
    overflow: hidden;
    padding-bottom: 20px;
  }

  .input-list {
    float: left;
    margin-left: 40px;
  }

  .input-list > div {
    margin-bottom: 40px;
  }

  .title {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ccc;
  }

  .title h4 {
    float: left;
  }

  .title i {
    float: right;
  }

  .body-con {
    padding: 20px 0;
    overflow: hidden;
  }

  .title-con {
    font-size: 14px;
    text-align: center;
    line-height: 50px;
    background: #F2F2F2;
    border-bottom: 1px solid #ccc;
  }

  .contract-con {
    font-size: 16px;
    text-align: center;
    float: left;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }

  .label-done {
    margin-left: 16px;
    float: left;
    width: 320px;
    border: 1px solid #ccc;
  }

  .label-list {
    margin: 10px auto;
    padding: 10px 0;
    text-align: center;
    width: 300px;
    border: 1px solid #ccc;
  }

  .label-list .label-item {
    margin-bottom: 20px;
  }

  .label-list .label-item .btn {
    width: 240px;
  }

  .input-width {
    width: 200px;
  }

  .label-write {
    padding: 20px 0px;
    border-top: 1px dashed #ccc;
  }

  .foot-submit {
    text-align: center;
  }

  .gongzhang {
    margin: auto;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    overflow: hidden;
  }

  .gongzhang img {
    width: 100%;
    height: 100%;
  }

  .label-btn {
    margin-top: 40px;
  }

  .label-preview h4 {
    text-align: center;
  }

  .label-preview .con-list {
    margin: 10px 20px;
    border: 1px solid #ccc;
    padding: 20px;
  }

  .label-name {
    margin-top: 10px;
    color: #20a0ff;
    font-size: 14px;
  }

  .pdf-box {
    position: relative;
    width: 1000px;
    float: left;
    border: 1px solid #ccc;
  }

  .pdf-box .tag {
    position: absolute;
    z-index: 999;
    top: 0;
    display: none;
  }
  .allSign{
    margin-bottom: 20px;
  }
  .allSign > span{
    font-size: 14px;
  }
  .view-btn{
    width: 40px;
    height:20px;
    background: none;
    font-size: 12px !important;
    border: 1px solid #3D82F7;
    text-align: center;
    line-height: 20px;
    font-size: 14px;
    border-radius: 2px;
    padding: 0;
    color: #3D82F7;
    float: right;
    cursor: pointer;
    outline: none;
  }

  /*.pdf-box:hover .tag {*/
  /*display: block !important;*/
  /*}*/

  .close {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    position: absolute;
    top: -10px;
    right: -10px;
    background: coral;
    color: #fff;
    transform: rotateZ(45deg);
    text-align: center;
    line-height: 20px;
    cursor: pointer;
  }
</style>
