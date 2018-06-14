<!--用户中心右侧模板-->
<template lang="html">
  <div class="page">
    <com-breadcrumb :list="['版本管理', '版本记录', '详情']"></com-breadcrumb>
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
          <el-form-item label="生效告知函上传截止期限：">
            {{productInfo.setInformEndDate | date}}
          </el-form-item>
          <el-form-item label="补充协议状态：">
            {{productInfo.suppleContractStateDec || '--'}}
          </el-form-item>
        </el-form>

        <!--<div class="notice-tip">-->
          <!--<p><i class="el-icon-warning"></i>根据<em>《私募投资基金筹集行为管理办法》</em>第二十九条规定，基金合同应当给投资者设置不少于二十四小时的投资冷静期，募集机构在投资冷静期内部的主动联系投资者。</p>-->
        <!--</div>-->

        <h4 style="padding-top: 30px; margin-top: 20px; border-top:1px solid #ccc">文件信息</h4>

        <file-table :productInfo="productInfo" :tableData="productFileList" :recordInfo="recordInfoList"></file-table>

      </div>

      <div class="dialog-footer">
        <el-button @click="$router.back()">返 回</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import fileTable from '../../commomComponents/fileTable.vue'
  export default {
    components: {
      fileTable
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

        productFileList: []
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

      async getProInfo () {
        let res = await this.$sever.getCurVersionInfo({contractId: this.propValue.contractId, sysCode: 'TTD_MANAGE_SYSTEM'})
        switch (res.code) {
          case 0:
            this.getRiskRecordInfo(res.data.bean.bookId)
            this.productFileList.push({
              fileName: '补充协议',
              originFile: JSON.parse(res.data.bean.originalSuppleContractUrl).url,
              pdfFile: JSON.parse(res.data.bean.suppleContractUrl).url,
              contractId: res.data.bean.contractId
            })
            this.productFileList.push({
              fileName: '新版合同',
              originFile: JSON.parse(res.data.bean.originalContractUrl).url,
              pdfFile: JSON.parse(res.data.bean.contractUrl).url,
              contractId: res.data.bean.contractId
            })
            this.productFileList.push({
              fileName: '风险揭示书',
              originFile: JSON.parse(res.data.bean.originalRevealBookUrl).url,
              pdfFile: JSON.parse(res.data.bean.revealBookUrl).url,
              contractId: res.data.bean.bookId
            })
            this.productInfo = res.data.bean
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
  .switch-page{
    overflow: hidden;
    margin-top: -20px;
    margin-bottom: 20px;
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
  .pdf-area{
    position: relative;
    width: auto;
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
  .list-area ul li{
    margin-bottom: 20px;
  }
  .list-area ul li em{
    display: inline-block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: dodgerblue;
    margin-right: 20px;
    color: #fff;
    text-align: center;
    line-height: 30px;
    margin-bottom: 22px;
  }
  .list-area ul li .text{
    width: 600px;
  }
  .text-con{
    float: left;
    display: inline-block;
    width: 200px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
</style>
