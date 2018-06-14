<template lang="html">
  <div class="page">
    <com-breadcrumb :list="['生效告知书']"></com-breadcrumb>
    <div class="content-main">

      <el-table header-row-class-name="table-header-define" class="table-btn-style" :data="tableData" highlight-current-row style="width: 100%">
        <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
        <el-table-column property="documentName" label="生效告知书名称" align="center"></el-table-column>
        <el-table-column property="serialNo" label="所属管理人" align="center">
          <template slot-scope="scope">
            --
          </template>
        </el-table-column>
        <el-table-column property="state" label="打标签状态" align="center">
          <template slot-scope="scope">
            {{{0: '待打标签', 1: '已打标签'}[scope.row.state]}}
          </template>
        </el-table-column>
        <el-table-column property="created" label="接收时间" align="center">
          <template slot-scope="scope">
            {{scope.row.created | date}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button v-if="COMF_NOTICE_SEE" size="mini" type="primary" @click="viewFile(JSON.parse(scope.row.documentUrl).url)">查看</el-button>
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

    <label-view-dialog
      :isView="isView"
      @closeView="isView=$event"
      :src="pdfUrl">
    </label-view-dialog>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        currentPage: 1,
        formData: {
          sysCode: 'TTD_MANAGE_SYSTEM',
          type: 1,
          keywords: '',
          pageNum: 1
        },
        total: '',
        tableData: [],

        isView: false,
        pdfUrl: ''
      }
    },
    created () {
      this.getDataList()
    },
    watch: {
    },
    computed: {
    },
    methods: {
      // 获取列表
      async getDataList () {
        let res = await this.$sever.getNoticeOrPowList(this.formData)
        switch (res.code) {
          case 0:
            this.tableData = res.data.list
            this.total = res.data.total
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      viewFile (url) {
        this.pdfUrl = url
        this.isView = true
      },

      getAllDataList () {
        this.formData.keyword = ''
        this.getDataList()
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
</style>

