<!--用户中心右侧模板-->
<template lang="html">
  <div class="page">
    <com-breadcrumb :list="['版本管理', '版本记录']"></com-breadcrumb>
    <div class="right-block pdf-view-block">
      <div class="border-line">
        <h4>当期签署文件</h4>
        <el-form class="form-list" label-width="240px" style="width: 700px">
          <el-form-item :label="'基金合同 ' + (baseInfo.contractVersion ? baseInfo.contractVersion : '') + '：'">
            <span class="label-name">{{util.getUrlName(baseInfo.contractUrl.url) || '--'}}</span>
            <span v-if="baseInfo.contractUrl.url" class="label-view" @click="viewPdf(baseInfo.contractUrl.url)">预 览</span>
          </el-form-item>
          <el-form-item :label="'风险揭示书 ' + (baseInfo.revealBookVersion ? baseInfo.revealBookVersion : '') + '：'">
            <span class="label-name">{{util.getUrlName(baseInfo.revealBookUrl.url) || '--'}}</span>
            <span v-if="baseInfo.revealBookUrl.url" class="label-view" @click="viewPdf(baseInfo.revealBookUrl.url)">预 览</span>
          </el-form-item>
          <el-form-item :label="'补充协议 ' + (baseInfo.suppleContractVersion ? baseInfo.suppleContractVersion : '') + '：'">
            <span class="label-name">{{util.getUrlName(baseInfo.suppleContractUrl.url) || '--'}}</span>
            <span v-if="baseInfo.suppleContractUrl.url" class="label-view" @click="viewPdf(baseInfo.suppleContractUrl.url)">预 览</span>
          </el-form-item>
        </el-form>

        <el-table header-row-class-name="table-header-define" class="table-btn-style" border :data="tableData" highlight-current-row style="margin-top: 30px">
          <el-table-column property="contractVersion" label="版本号" align="center">
            <template slot-scope="scope">
              {{scope.row.contractVersion || '--'}}
            </template>
          </el-table-column>
          <el-table-column property="contractUrl" label="基金合同" align="center">
            <template slot-scope="scope">
              {{scope.row.contractUrl ? util.getUrlName(JSON.parse(scope.row.contractUrl).url) : '--'}}
            </template>
          </el-table-column>
          <el-table-column property="revealBookUrl" label="风险揭示书" align="center">
            <template slot-scope="scope">
              {{scope.row.revealBookUrl ? util.getUrlName(JSON.parse(scope.row.revealBookUrl).url) : '--'}}
            </template>
          </el-table-column>
          <el-table-column property="suppleContractUrl" label="补充协议" align="center">
            <template slot-scope="scope">
              {{scope.row.suppleContractUrl ? util.getUrlName(JSON.parse(scope.row.suppleContractUrl).url) : '--'}}
            </template>
          </el-table-column>
          <el-table-column property="manageName" label="发起时间" align="center">
            <template slot-scope="scope">
              {{scope.row.created | date}}
            </template>
          </el-table-column>
          <el-table-column property="confirmDate" label="确认时间" align="center">
            <template slot-scope="scope">
              {{scope.row.confirmDate | date}}
            </template>
          </el-table-column>
          <el-table-column property="isValid" label="状态" align="center">
            <template slot-scope="scope">
              {{{0:'版本无效',1:'版本有效',2:'确认中',3:'待电子化处理'}[scope.row.isValid]}}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="seeView(scope.row.contractId)">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>

      </div>

      <div class="dialog-footer">
        <el-button @click="$router.back()">返 回</el-button>
      </div>

      <el-dialog title="预 览" :visible.sync="isView" width="932px">
        <div style="margin: 10px 0;overflow: hidden">
          <switch-page style="float: right" :view="isView" @page="page = $event" :numPages="numPages"></switch-page>
        </div>
        <div class="pdf-area">
          <pdf-view :src="pdfUrl" :page="page" @numPages="numPages = $event"></pdf-view>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="isView = false">确 定</el-button>
        </div>
      </el-dialog>


    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        propValue: {

        },
        isView: false,
        page: 1,
        numPages: 0,

        pdfUrl: '',

        baseInfo: {
          contractUrl: {
            url: ''
          },
          revealBookUrl: {
            url: ''
          },
          suppleContractUrl: {
            url: ''
          }
        },
        tableData: []
      }
    },
    created () {
      this.propValue.productId = this.$route.query.productId
      this.getVersionInfo()
    },
    computed: {
    },
    watch: {
      isView (boolean) {
        if (boolean === false) {
          this.urlObj = ''
          this.loading = true
          this.page = 1
        }
      }
    },
    methods: {
      seeView (contractId) {
        this.$router.push({path: '/home/version/see', query: {contractId: contractId}})
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

      async getVersionInfo () {
        let res = await this.$sever.getVersionInfo({productId: this.propValue.productId, sysCode: 'TTD_MANAGE_SYSTEM'})
        switch (res.code) {
          case 0:
            this.tableData = res.data.bean.versionList
            this.total = res.data.total
            res.data.bean.currVersionJo.contractUrl = res.data.bean.currVersionJo.contractUrl ? JSON.parse(res.data.bean.currVersionJo.contractUrl) : {url: ''}
            res.data.bean.currVersionJo.revealBookUrl = res.data.bean.currVersionJo.revealBookUrl ? JSON.parse(res.data.bean.currVersionJo.revealBookUrl) : {url: ''}
            res.data.bean.currVersionJo.suppleContractUrl = res.data.bean.currVersionJo.suppleContractUrl ? JSON.parse(res.data.bean.currVersionJo.suppleContractUrl) : {url: ''}
            this.baseInfo = res.data.bean.currVersionJo
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      viewPdf (url) {
        this.pdfUrl = url
        this.isView = true
      }
    }
  }
</script>
<style>
  .upload-demo .el-upload, .upload-demo .el-upload-dragger{
    width: 300px;
  }
  .pdf-view-block .el-dialog__body{
    padding-top: 0;
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
  .label-name{
    display: inline-block;
    min-width: 300px;
  }
  .label-view{
    color: #649bf9;
    cursor: pointer;
  }
</style>
