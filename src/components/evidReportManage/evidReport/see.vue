<template lang="html">
  <div class="page">
    <com-breadcrumb :list="['存证报告申请列表', '详情']"></com-breadcrumb>
    <div class="content-main">
      <el-table header-row-class-name="table-header-define" class="table-btn-style" :data="tableData" highlight-current-row style="width: 100%">
        <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
        <el-table-column property="epAuthorityReturnNo" label="CFCA存单号" align="center"></el-table-column>
        <el-table-column property="traceType" label="报告节点" align="center">
          <template slot-scope="scope">
            {{evidNodeFormat(scope.row.traceType)}}
          </template>
        </el-table-column>
        <el-table-column property="traceType" label="节点编码" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="see(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="foot-bottom">
        <el-pagination
          style="float: right"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="10"
          prev-text="上一页"
          next-text="下一页"
          layout="total, prev, pager, next, jumper"
          :total="parseInt(total)">
        </el-pagination>
      </div>
    </div>

    <el-dialog title="查看" :visible.sync="dialogVisible">
      <div class="text-box" id="print-content">
        <evidnode-info :type="traceType" :data="pdfData"/>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="printPage('print-content')">打印</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import EvidnodeInfo from '../../commomComponents/EvidnodeInfo.vue'
  export default {
    components: {
      EvidnodeInfo
    },
    data () {
      return {
        dialogVisible: false,

        currentPage: 1,
        formData: {
          sysCode: 'TTD_MANAGE_SYSTEM',
          applyListId: '',
          pageNum: 1
        },
        total: '',
        tableData: [],

        traceType: '',
        pdfData: ''
      }
    },
    created () {
      this.formData.applyListId = this.$route.query.id
      this.getDataList()
    },
    methods: {
      printPage (myDiv) {
        let printHtml = document.getElementById(myDiv).innerHTML
        let wind = window.open('', 'newwindow', 'height=300, width=700, top=100, left=100, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no')
        wind.document.body.innerHTML = printHtml
        wind.print()
      },
      // 获取印章列表
      async getDataList () {
        let res = await this.$sever.getEvidReportDetail(this.formData)
        switch (res.code) {
          case 0:
            this.tableData = res.data.list
            this.total = res.data.total
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      getAllDataList () {
        this.getDataList()
      },
      async see (row) {
        this.traceType = row.traceType
        let res = await this.$sever.getPrintDetail({traceId: row.traceId})
        switch (res.code) {
          case 0:
            this.pdfData = JSON.parse(res.data.bean)
            console.log(this.pdfData)
            this.dialogVisible = true
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },
      handleCurrentChange (val) {
        this.formData.pageNum = val
        this.getDataList()
      }
    }
  }
</script>
<style lang="css">
</style>
<style lang="css" scoped>
  .text-box{
    padding: 30px;
  }
</style>

