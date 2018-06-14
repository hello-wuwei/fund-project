<template lang="html">
  <div class="page">
    <com-breadcrumb :list="['托管人UKEY管理']"></com-breadcrumb>
    <div class="content-main">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="UKEY类型">
          <el-select v-model="formData.ukeyType" placeholder="请选择UKEY类型" size="small">
            <el-option label="全部" value=""></el-option>
            <el-option label="法人章" value="1"></el-option>
            <el-option label="业务章" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="有效时间">
          <el-date-picker v-model="formData.createdStart" type="date" size="small" placeholder="选择日期" suffix-icon="icon-user"></el-date-picker>
          至
          <el-date-picker v-model="formData.createdEnd" type="date" size="small" placeholder="选择日期" suffix-icon="icon-user"></el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="getDataList" size="small" class="btn-revise">搜 索</el-button>
        </el-form-item>
      </el-form>

      <el-table header-row-class-name="table-header-define" class="table-btn-style" :data="tableData" highlight-current-row style="width: 100%">
        <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
        <el-table-column property="subscriberName" label="持有人" align="center"></el-table-column>
        <el-table-column property="serialNo" label="证书序列号" align="center"></el-table-column>
        <el-table-column property="subscriberName" label="应用机构" align="center"></el-table-column>
        <el-table-column property="ukeyType" label="UKEY类型" align="center">
          <template slot-scope="scope">
            {{{1:'法人章', 2:'业务章'}[scope.row.ukeyType]}}
          </template>
        </el-table-column>
        <el-table-column property="name" label="有效期限" align="center">
          <template slot-scope="scope">
            {{scope.row.notAfter | date}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button v-if="UKEY_CUST_SEE" size="mini" type="primary" @click="seeDetail(scope.row.ukeyId)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="foot-bottom">
        <el-button v-if="UKEY_CUST_NEW" class="bom-btn" size="mini" icon="el-icon-plus" @click="addUkey">新增UKEY</el-button>
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
        formData: {
          sysCode: 'TTD_MANAGE_SYSTEM',
          ukeyType: '',
          createdStart: '',
          createdEnd: '',
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
      // 获取印章列表
      async getDataList () {
        this.formData.createdStart = this.formatDate(this.formData.createdStart)
        this.formData.createdEnd = this.formatDate(this.formData.createdEnd)
        let res = await this.$sever.getUkeyList(this.formData)
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
        this.formData.ukeyType = ''
        this.formData.createdStart = ''
        this.formData.createdEnd = ''
        this.getDataList()
      },
      seeDetail (ukeyId) {
        this.$router.push({path: '/home/ukeyManage/see', query: {ukeyId: ukeyId}})
      },
      addUkey () {
        this.$router.push({path: '/home/ukeyManage/add'})
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

