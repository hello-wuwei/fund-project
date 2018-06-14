<template lang="html">
  <div class="page">
    <com-breadcrumb :list="['SQL同步']"></com-breadcrumb>
    <div class="content-main">
      <div class="switch-table" style="margin-bottom: 10px">
        <el-button type="primary" size="small">未同步列表</el-button>
        <el-button size="small" @click="$router.push({path: '/home/dataAsync/haslist'})">已同步列表</el-button>
      </div>
      <el-table header-row-class-name="table-header-define" class="table-btn-style" :data="tableData" @selection-change="handleSelectionChange" highlight-current-row style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column property="dataKey" label="服务名称" align="center"></el-table-column>
        <el-table-column property="creator" label="提交人" align="center"></el-table-column>
        <el-table-column property="sqlCode" label="SQL标识" align="center"></el-table-column>
        <el-table-column property="operationType" label="SQL类型" align="center">
          <template slot-scope="scope">
          {{{'INSERT':'新增','DELETE':'删除','UPDATE':'修改','SELECT':'查询'}[scope.row.operationType]}}
          </template>
        </el-table-column>
        <el-table-column property="created" label="新增时间" align="center">
          <template slot-scope="scope">{{scope.row.created | date}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="300">
          <template slot-scope="scope">
            <el-button v-if="SYS_SQL_EDIT" size="mini" type="primary" @click="editSql(scope.row)">修 改</el-button>
            <el-button v-if="SYS_SQL_ASYNC" size="mini" type="primary" @click="singalAsync(scope.row.id)">同 步</el-button>
            <el-button v-if="SYS_SQL_SEE" size="mini" type="primary" @click="watchSql(scope.row)">查 看</el-button>
            <el-button v-if="SYS_SQL_DELE" size="mini" @click="deleteSql(scope.row.id)">删 除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="foot-bottom">
        <el-button v-if="SYS_SQL_NEW" class="bom-btn" size="mini" icon="el-icon-plus" @click="addSql">新增</el-button>
        <el-button v-if="SYS_SQL_ASYNC" class="bom-btn" size="mini" icon="el-icon-plus" @click="partAsync">批量同步</el-button>
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
        multipleSelection: [],
        formData: {
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
      ids () {
        return this.multipleSelection.map((item) => {
          return item.id
        }).join(',')
      }
    },
    methods: {
      // 获取列表
      async getDataList () {
//        this.formData.createdStart = this.formatDate(this.formData.createdStart)
//        this.formData.createdEnd = this.formatDate(this.formData.createdEnd)
        let res = await this.$sever.getNoAsyncList(this.formData)
        switch (res.code) {
          case 0:
            this.tableData = res.data.list
            this.total = res.data.total
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      async singalAsync (id) {
        let res = await this.$sever.batchAsync({ids: id.toString()})
        switch (res.code) {
          case 0:
            this.$message({message: '同步成功', type: 'success'})
            this.getDataList()
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      async partAsync () {
        if (!this.multipleSelection.length) {
          this.$message({message: '请选择要同步的SQL项', type: 'warning'})
          return
        }
        let res = await this.$sever.batchAsync({ids: this.ids})
        switch (res.code) {
          case 0:
            this.$message({message: '同步成功', type: 'success'})
            this.getDataList()
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      handleSelectionChange(val) {
        this.multipleSelection = val
      },

      getAllDataList () {
        this.formData.keyword = ''
        this.formData.createdStart = ''
        this.formData.createdEnd = ''
        this.getDataList()
      },
      addSql () {
        this.$router.push({path: '/home/dataAsync/addSql'})
      },
      editSql (row) {
        this.$router.push({path: '/home/dataAsync/editSql', query: {row: row}})
      },

      watchSql (row) {
        this.$router.push({path: '/home/dataAsync/watchSql', query: {row: row}})
      },

      async deleteSql (id) {
        let res = await this.$sever.deleteSql({id: id})
        switch (res.code) {
          case 0:
            this.$message({message: '删除成功', type: 'success'})
            this.getDataList()
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
</style>

