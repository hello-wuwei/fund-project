<template lang="html">
  <div class="page">
    <com-breadcrumb :list="['版本管理']"></com-breadcrumb>
    <div class="content-main">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="关键词">
          <el-input v-model="formData.keyword" placeholder="请输入产品名称/托管方" size="small"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="getDataList" size="small" class="btn-revise">搜 索</el-button>
        </el-form-item>
      </el-form>

      <el-table header-row-class-name="table-header-define" class="table-btn-style" :data="tableData" highlight-current-row style="width: 100%">
        <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
        <el-table-column property="productNo" label="基金编码" align="center"></el-table-column>
        <el-table-column property="productName" label="产品名称" align="center"></el-table-column>
        <el-table-column property="manageName" label="管理人" align="center"></el-table-column>
        <el-table-column property="trustUserName" label="托管人" align="center"></el-table-column>
        <el-table-column property="category" label="产品类型" align="center"></el-table-column>
        <el-table-column property="state" label="产品状态" align="center">
          <template slot-scope="scope">
            <span>{{{9:'发行期',11:'运作期',15:'清盘期'}[scope.row.state]}}</span>
          </template>
        </el-table-column>
        <el-table-column property="bookNum" label="已预约数量" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="300">
          <template slot-scope="scope">
            <el-button v-if="PROD_VERS_RECO" size="mini" type="primary" @click="versionRecord(scope.row.productId)">版本记录</el-button>
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

  </div>
</template>

<script>
  export default {
    data () {
      return {
        currentPage: 1,
        contractId: '',
        formData: {
          sysCode: 'TTD_MANAGE_SYSTEM',
          keyword: '',
          pageNum: 1
        },
        total: '',
        tableData: []
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
      // 获取产品列表
      async getDataList () {
        let res = await this.$sever.getVersionList(this.formData)
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
        this.formData.keyword = ''
        this.getDataList()
      },
      versionRecord (productId) {
        this.$router.push({path: '/home/version/recordlist', query: {productId: productId}})
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

