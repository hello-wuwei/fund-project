<template lang="html">
  <div class="page">
    <com-breadcrumb :list="['任务调度', '查看任务']"></com-breadcrumb>
    <div class="content-main">
      <div class="border-line">
        <el-form :model="submitData" ref="ruleForm" label-position="right" label-width="120px">
          <el-form-item label="作业名称" prop="taskCode">
            <el-input v-model="submitData.taskCode" placeholder="请输入作业名称" disabled style="width: 400px"></el-input>
          </el-form-item>
          <el-form-item label="系统编码" prop="sysKey">
            <el-input v-model="submitData.sysKey" placeholder="请输入系统编码" disabled style="width: 400px"></el-input>
          </el-form-item>
          <el-form-item label="执行实例" prop="instanceFlag">
            <el-input v-model="submitData.instanceFlag" placeholder="请输入执行实例" disabled style="width: 400px"></el-input>
          </el-form-item>
          <el-form-item label="任务类型" prop="taskType">
            <el-select v-model="submitData.taskType" disabled placeholder="请选择任务类型">
              <el-option label="fixedDelay" value="1"></el-option>
              <el-option label="fixedRate" value="3"></el-option>
              <el-option label="cron" value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="cron表达式" prop="cron">
            <el-input v-model="submitData.cron" placeholder="请输入cron表达式" disabled style="width: 400px"></el-input>
          </el-form-item>
          <el-form-item label="任务接口" prop="taskUrl">
            <el-input v-model="submitData.taskUrl" placeholder="请输入任务接口" disabled style="width: 400px"></el-input>
          </el-form-item>
          <el-form-item label="任务描述" prop="description">
            <el-input type="textarea" :rows="5" v-model="submitData.description" disabled placeholder="请输入任务描述" style="width: 400px"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$router.back()">返 回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        submitData: {
          sysCode: 'TTD_MANAGE_SYSTEM',
          taskCode: '',
          sysKey: '',
          instanceFlag: '',
          taskType: '',
          cron: '',
          taskUrl: '',
          description: '',
          taskId: ''
        }
      }
    },
    created () {
      this.submitData.taskId = this.$route.query.taskId
      this.getTaskDetail()
    },
    methods: {

      async getTaskDetail () {
        let res = await this.$sever.getTaskDetail({taskId: this.$route.query.taskId, sysCode: 'TTD_MANAGE_SYSTEM'})
        switch (res.code) {
          case 0:
            this.submitData.taskCode = res.data.bean.taskCode
            this.submitData.sysKey = res.data.bean.sysKey
            this.submitData.instanceFlag = res.data.bean.instanceFlag
            this.submitData.taskType = res.data.bean.taskType.toString()
            this.submitData.cron = res.data.bean.cron
            this.submitData.taskUrl = res.data.bean.taskUrl
            this.submitData.description = res.data.bean.description
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      }
    }
  }
</script>
<style lang="css">
</style>
<style lang="css" scoped>
</style>

