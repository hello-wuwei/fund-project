<template lang="html">
  <div class="page">
    <com-breadcrumb :list="['任务调度', '新增任务']"></com-breadcrumb>
    <div class="content-main">
      <div class="border-line">
        <el-form :model="submitData" ref="ruleForm" :rules="rules" label-position="right" label-width="120px">
          <el-form-item label="作业名称" prop="taskCode">
            <el-input v-model="submitData.taskCode" placeholder="请输入作业名称" style="width: 400px"></el-input>
          </el-form-item>
          <el-form-item label="系统编码" prop="sysKey">
            <el-input v-model="submitData.sysKey" placeholder="请输入系统编码" style="width: 400px"></el-input>
          </el-form-item>
          <el-form-item label="执行实例" prop="instanceFlag">
            <el-input v-model="submitData.instanceFlag" placeholder="请输入执行实例" style="width: 400px"></el-input>
          </el-form-item>
          <el-form-item label="任务类型" prop="taskType">
            <el-select v-model="submitData.taskType" placeholder="请选择任务类型">
              <el-option label="fixedDelay" value="1"></el-option>
              <el-option label="fixedRate" value="3"></el-option>
              <el-option label="cron" value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="cron表达式" prop="cron">
            <el-input v-model="submitData.cron" placeholder="请输入cron表达式" style="width: 400px"></el-input>
          </el-form-item>
          <el-form-item label="任务接口" prop="taskUrl">
            <el-input v-model="submitData.taskUrl" placeholder="请输入任务接口" style="width: 400px"></el-input>
          </el-form-item>
          <el-form-item label="任务描述" prop="description">
            <el-input type="textarea" :rows="5" v-model="submitData.description" placeholder="请输入任务描述" style="width: 400px"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$router.back()">返 回</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">提 交</el-button>
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
        },

        rules: {
          taskCode: [
            {required: true, message: '请输入作业名称', trigger: 'blur'}
          ],
          sysKey: [
            {required: true, message: '请输入系统编码', trigger: 'blur'}
          ],
          instanceFlag: [
            {required: true, message: '请输入执行实例', trigger: 'blur'}
          ],
          taskType: [
            {required: true, message: '请选择任务类型', trigger: 'change'}
          ],
          cron: [
            {required: true, message: '请输入cron表达式', trigger: 'blur'}
          ],
          taskUrl: [
            {required: true, message: '请输入任务接口', trigger: 'blur'}
          ],
          description: [
            {required: true, message: '请输入任务描述', trigger: 'blur'}
          ]
        }
      }
    },
    created () {
    },
    methods: {
      // 新增角色
      async newTask () {
        let res = await this.$sever.newTask(this.submitData)
        switch (res.code) {
          case 0:
            this.$message({message: '保存成功', type: 'success'})
            this.$router.back()
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      // 验证表单
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.newTask()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>
<style lang="css">
</style>
<style lang="css" scoped>
</style>

