<template lang="html">
  <div class="page">
    <com-breadcrumb :list="['任务调度']"></com-breadcrumb>
    <div class="content-main">

      <el-table header-row-class-name="table-header-define" class="table-btn-style" :data="tableData" highlight-current-row style="width: 100%">
        <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
        <el-table-column property="created" label="创建时间" align="center">
          <template slot-scope="scope">{{scope.row.created | date}}</template>
        </el-table-column>
        <el-table-column property="cron" label="cron表达式" align="center"></el-table-column>
        <el-table-column property="description" label="任务描述" align="center"></el-table-column>
        <el-table-column property="instanceFlag" label="执行实例" align="center"></el-table-column>
        <el-table-column property="operUserName" label="操作人名称" align="center"></el-table-column>
        <el-table-column property="sysKey" label="系统编码" align="center"></el-table-column>
        <el-table-column property="taskCode" label="作业名称" align="center"></el-table-column>
        <el-table-column property="taskType" label="任务类型" align="center">
          <template slot-scope="scope">{{{1:'fixedDelay',3:'fixedRate',5:'cron'}[scope.row.taskType]}}</template>
        </el-table-column>
        <el-table-column property="taskUrl" label="任务接口" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="400">
          <template slot-scope="scope">
            <el-button v-if="SYS_TASK_EDIT" size="mini" type="primary" @click="editAccount(scope.row.taskId)">修 改</el-button>
            <el-button v-if="SYS_TASK_SEE" size="mini" type="primary" @click="seeAccount(scope.row.taskId)">查 看</el-button>
            <el-button v-if="SYS_TASK_DELE" size="mini" @click="deleteAlert(scope.row.taskId)">删 除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="foot-bottom">
        <el-button v-if="SYS_TASK_NEW" icon="el-icon-plus" class="bom-btn" size="mini" @click="addAccount">新增任务</el-button>
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
        treeData: [],

        currentPage: 1,
        formData: {
          sysCode: 'TTD_MANAGE_SYSTEM',
          pageNum: 1
        },
        total: '',
        tableData: []
      }
    },
    created () {
      this.getDataList()
    },
    methods: {
      // 获取角色列表
      async getDataList () {
        let res = await this.$sever.getTaskScheduleList(this.formData)
        switch (res.code) {
          case 0:
            this.tableData = res.data.list
            this.total = res.data.total
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      addAccount () {
        this.$router.push({path: '/home/taskSchedule/addTask'})
      },
      editAccount (taskId) {
        this.$router.push({path: '/home/taskSchedule/editTask', query: {taskId: taskId}})
      },
      seeAccount (taskId) {
        this.$router.push({path: '/home/taskSchedule/seeTask', query: {taskId: taskId}})
      },

      deleteAlert (taskId) {
        this.$confirm('确定删除该任务吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deletetask(taskId)
        }).catch(() => {
        })
      },

      async deletetask (taskId) {
        let res = await this.$sever.deleteTask({taskId: taskId, sysCode: 'TTD_MANAGE_SYSTEM'})
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

