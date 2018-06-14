<template lang="html">
  <div class="page">
    <com-breadcrumb :list="['操作日志']"></com-breadcrumb>
    <div class="content-main">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="关键词">
          <el-input v-model="formData.keyword" placeholder="请输入账号、姓名、模块名称" size="small"></el-input>
        </el-form-item>
        <el-form-item label="操作时间">
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
        <el-table-column property="moduleName" label="模块名称" align="center"></el-table-column>
        <el-table-column property="actionName" label="操作名称" align="center"></el-table-column>
        <el-table-column property="created" label="操作时间" align="center">
          <template slot-scope="scope">{{scope.row.created | date}}</template>
        </el-table-column>
        <el-table-column property="operationUserId" label="操作者账号ID" align="center"></el-table-column>
        <el-table-column property="operationUserName" label="操作者姓名" align="center"></el-table-column>
        <el-table-column property="operationUserType" label="用户类型" align="center"></el-table-column>
        <el-table-column property="operationIp" label="操作IP" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button v-if="SYS_LOG_SEE" size="mini" type="primary" @click="watchLog(scope.row)">查 看</el-button>
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
        formData: {
          keyword: '',
          createdStart: '',
          createdEnd: '',
          isAll: 1,
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
      dialogShow (newVal, oldVal) {
        if (newVal === false) {
          this.curRoleIds = []
        }
      }
    },
    computed: {
      roleIds () {
        return this.curRoleIds.join(',')
      }
    },
    methods: {
      // 获取系统账号列表
      async getDataList () {
        this.formData.createdStart = this.formatDate(this.formData.createdStart)
        this.formData.createdEnd = this.formatDate(this.formData.createdEnd)
        let res = await this.$sever.getOperLogList(this.formData)
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
        this.formData.createdStart = ''
        this.formData.createdEnd = ''
        this.getDataList()
      },
      addAccount () {
      },

      watchLog (row) {
        this.$router.push({path: '/home/operLog/watchLog', query: {row: row}})
      },
      handleCurrentChange (val) {
        this.formData.pageNum = val
//        alert(JSON.stringify(this.formData))
        this.getDataList()
      }
    }
  }
</script>
<style lang="css">
</style>
<style lang="css" scoped>
</style>

