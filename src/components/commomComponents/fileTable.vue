<template>
  <div>
    <el-table header-row-class-name="table-header-define" :data="tableData" highlight-current-row style="width: 100%">
      <el-table-column property="fileName" label="文件类型" align="center" width="160"></el-table-column>
      <el-table-column property="originFile" label="托管人上传原文件" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.originFile" class="view-load">
            <span class="over-hidden">{{util.getUrlName(scope.row.originFile)}}</span>
            <a style="float: right;" @click="util.loadFileByUrl(scope.row.originFile)">下载</a>
          </div>
          <div v-else>--</div>
        </template>
      </el-table-column>
      <el-table-column property="pdfFile" label="排版后文件" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.pdfFile" class="view-load">
            <span class="over-hidden">{{util.getUrlName(scope.row.pdfFile)}}</span>
            <span style="float: right;">
                <a style="margin-right: 10px" @click="viewPdf(scope.row.pdfFile)">预览</a>
                <a @click="util.loadFileByUrl(scope.row.pdfFile)">下载</a>
              </span>
          </div>
          <div v-else>--</div>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="right">
        <template slot-scope="scope">
          <div v-if="scope.row.pdfFile">
            <el-button v-if="scope.row.fileName=='风险揭示书'" size="mini" type="primary" @click="infoSee=true">查看录入信息</el-button>
            <el-button size="mini" type="primary" @click="seeLabel(scope.row.fileName, scope.row.pdfFile)">查看打标签</el-button>
          </div>
          <div v-else>--</div>
        </template>
      </el-table-column>
    </el-table>

    <label-view-dialog
      :fileName="fileName"
      :isView="isView"
      @closeView="isView=$event"
      :src="pdfUrl"
      :labelViewData="labelContent">
    </label-view-dialog>

    <el-dialog title="查看录入信息" :visible.sync="infoSee">
      <div class="list-area">
        <ul>
          <li v-for="(item, index) in recordInfo" :key="index">
            <em>{{item.sortNo}}</em>
            <el-input class="text" type="textarea" :rows="3" v-model="item.content" :disabled="true" resize="none"></el-input>
          </li>
        </ul>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="infoSee = false">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    props: {
      tableData: {
        type: [Array],
        required: true
      },
      recordInfo: {
        type: [Array],
        required: false,
        default: () => {
          return []
        }
      },
      productInfo: {
        type: [Object],
        required: true
      }
    },
    data () {
      return {
        pdfUrl: '',
        labelContent: [],
        isView: false,
        page: 1,
        numPages: 0,
        fileName: '',

        infoSee: false
      }
    },
    created () {
    },
    watch: {
      isView (boolean) {
        if (boolean === false) {
          this.pdfUrl = ''
        }
      }
    },
    methods: {
      viewPdf (url) {
        this.labelContent = []
        this.pdfUrl = url
        this.isView = true
      },
      seeLabel (fileName, url) {
        this.pdfUrl = url
        this.isView = true
        this.fileName = fileName
        this.getLabelViewData(fileName)
      },
      async getLabelViewData (fileName) {
        let obj = {}
        if (fileName === '基金合同') {
          obj = {
            productId: this.productInfo.productId,
            targetId: this.productInfo.contractId,
            sysCode: 'TTDFUND',
            type: 0,
            businessType: 1
          }
        }
        if (fileName === '补充协议' || fileName === '公告告知' || fileName === '征询意见函') {
          obj = {
            productId: this.productInfo.productId,
            targetId: this.productInfo.contractId,
            sysCode: 'TTDFUND',
            type: 0,
            businessType: 3
          }
        }
        if (fileName === '新版合同') {
          obj = {
            productId: this.productInfo.productId,
            targetId: this.productInfo.contractId,
            sysCode: 'TTDFUND',
            type: 0,
            businessType: 1
          }
        }
        if (fileName === '风险揭示书') {
          obj = {
            productId: this.productInfo.productId,
            targetId: this.productInfo.bookId,
            sysCode: 'TTDFUND',
            type: 0,
            businessType: 2
          }
        }
        let res = await this.$sever.getContractLabel(obj)
        switch (res.code) {
          case 0:
            this.labelContent = res.data.bean.length ? JSON.parse(res.data.bean[0].originalLabel) : []
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      }
    }
  }
</script>
<style scoped>
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
  .over-hidden{
    float: left;
    display: block;
    width: 200px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .view-load a{
    cursor: pointer;
  }
</style>
