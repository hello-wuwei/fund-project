<!--用户中心右侧模板-->
<template lang="html">
  <div class="page">
    <com-breadcrumb :list="['补充协议', $route.query.type]"></com-breadcrumb>
    <div class="right-block">
      <div class="border-line">
        <h4>产品信息</h4>
        <el-form class="form-list" label-width="240px" style="width: 700px">
          <el-form-item label="产品名称：">
            {{productInfo.productName || '--'}}
          </el-form-item>
          <el-form-item label="基金编码：">
            {{productInfo.productNo || '--'}}
          </el-form-item>
          <el-form-item label="产品类型：">
            {{productInfo.category || '--'}}
          </el-form-item>
          <el-form-item label="管理人名称：">
            {{productInfo.manageName || '--'}}
          </el-form-item>
          <el-form-item label="产品风险等级：">
            {{productInfo.riskLevel || '--'}}
          </el-form-item>
          <el-form-item label="补充协议方式：">
            {{{1:'创设合同', 3:'签署模式', 4:'公告告知', 5:'征询意见函'}[productInfo.contractType]}}
          </el-form-item>
        </el-form>

        <h4 style="padding-top: 30px; margin-top: 20px; border-top:1px solid #ccc">文件信息</h4>

        <file-done-table
          @getProInfo="getProInfo"
          @makeSign="$emit('addTag', $event)"
          @enterInfo="$emit('addTag', $event)"
          :productInfo="productInfo"
          :tableData="productFileList"
          :recordInfo="recordInfoList">
        </file-done-table>

      </div>

      <div class="dialog-footer">
        <el-button @click="$router.back()">返 回</el-button>
        <el-button type="primary" @click="getCheck">提 交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import fileDoneTable from '../../commomComponents/fileDoneTable.vue'
  export default {
    components: {
      fileDoneTable
    },
    data () {
      return {
        propValue: {
          contractId: ''
        },
        recordInfoList: [],

        productInfo: {
          contractUrl: {
            url: ''
          },
          videoStateList: []
        },

        productFileList: [],
        canSubmit: [true, true, true]
      }
    },
    created () {
      this.propValue.contractId = this.$route.query.contractId
      this.getProInfo()
    },
    methods: {
      async getRiskRecordInfo (bookId) {
        if (!bookId) {
          return
        }
        let res = await this.$sever.riskBookDetail({bookId: bookId, sysCode: 'TTD_MANAGE_SYSTEM'})
        switch (res.code) {
          case 0:
            this.recordInfoList = JSON.parse(res.data.bean.revealBookContent)
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      getFileType (code) {
        return {4: '公告告知说明书', 5: '征询意见函'}[code]
      },

      async getProInfo () {
        this.canSubmit = [true, true, true]
        let res = await this.$sever.getAgreeInfo({contractId: this.propValue.contractId, sysCode: 'TTD_MANAGE_SYSTEM'})
        switch (res.code) {
          case 0:
            this.getRiskRecordInfo(res.data.bean.bookId)
            this.productFileList = []
            if (res.data.bean.originalSuppleContractUrl !== '{}') {
              this.productFileList.push({
                fileName: this.getFileType(res.data.bean.contractType),
                originFile: JSON.parse(res.data.bean.originalSuppleContractUrl).url,
                pdfFile: JSON.parse(res.data.bean.suppleContractUrl).url,
                contractId: res.data.bean.contractId,
                state: res.data.bean.suppleContractElecState
              })
              if (res.data.bean.suppleContractElecState !== 2) {
                this.canSubmit[0] = false
              }
            }
            if (res.data.bean.originalContractUrl !== '{}') {
              this.productFileList.push({
                fileName: '新版合同',
                originFile: JSON.parse(res.data.bean.originalContractUrl).url,
                pdfFile: JSON.parse(res.data.bean.contractUrl).url,
                contractId: res.data.bean.contractId,
                state: res.data.bean.state
              })
              if (res.data.bean.state !== 2) {
                this.canSubmit[1] = false
              }
            }
            if (res.data.bean.originalRevealBookUrl !== '{}') {
              this.productFileList.push({
                fileName: '风险揭示书',
                originFile: JSON.parse(res.data.bean.originalRevealBookUrl).url,
                pdfFile: JSON.parse(res.data.bean.revealBookUrl).url,
                contractId: res.data.bean.bookId,
                state: res.data.bean.revealBookState
              })
              if (res.data.bean.revealBookState !== 3) {
                this.canSubmit[2] = false
              }
            }
            this.productInfo = res.data.bean
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      getCheck () {
        if (this.canSubmit.every((item) => { return item === true })) {
          this.$confirm('请确认是否提交？请确保电子化处理已完成，提交后将发至管理人进行确认。', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.checkSubmit()
          }).catch(() => {
          })
        } else {
          this.$confirm('您电子化处理未完成，不能提交！', '提示', {
            cancelButtonText: '确定',
            showConfirmButton: false,
            type: 'warning'
          }).then(() => {
//            this.checkSubmit()
          }).catch(() => {
          })
        }
      },

      async checkSubmit (contractId) {
        let res = await this.$sever.submitManager({contractId: this.propValue.contractId, sysCode: 'TTD_MANAGE_SYSTEM'})
        switch (res.code) {
          case 0:
            this.$router.back()
            this.$message({message: '提交成功', type: 'success'})
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
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
  .notice-tip{
    padding-left: 10px;
    margin-left: 60px;
    background: #F8F8F8;
    line-height: 40px;
    margin-right: 60px;
  }
  .notice-tip p{
    font-size: 12px;
    color: gray;
  }
  .notice-tip p i{
    margin-right: 6px;
  }
  .notice-tip p em{
    color: orangered;
  }
  .file-show{
    margin-left: 60px;
    margin-top: 20px;
    font-size: 14px
  }
  .file-show span{
    display: inline-block;
    width:400px;
    margin-right: 30px;
    color: #3D82F7;
  }
  .progress-cover{
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);
    z-index: 9999;
  }
  .progress-cover .progress-line{
    border-radius: 10px;
    position: absolute;
    width: 400px;
    height: 20px;
    top: 200px;
    background: #b3d8ff;
    border: 1px solid #fff;
    left: 50%;
    margin-left: -200px;
    overflow: hidden;
  }
  .pro-percent{
    height: 100%;
    background: #fff;
  }
</style>
