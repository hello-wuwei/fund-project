<template>
  <div class="page">
    <com-breadcrumb :list="['操作日志', '查看日志']"></com-breadcrumb>
    <div class="content-main">
      <div class="border-line">
        <el-form :inline="true" class="form-size form-list" label-width="120px">
          <el-form-item label="记录ID：" style="width: 260px">
            {{row.id}}
          </el-form-item>
          <el-form-item label="操作时间：" style="width: 260px">
            {{row.created | date}}
          </el-form-item>
          <div class="empty"></div>
          <el-form-item label="操作模块：" style="width: 260px">
            {{row.moduleName}}
          </el-form-item>
          <el-form-item label="操作名称：" style="width: 260px">
            {{row.actionName}}
          </el-form-item>
          <div class="empty"></div>
          <el-form-item label="操作账号：" style="width: 260px">
            {{row.operationUserId}}
          </el-form-item>
          <el-form-item label="账号姓名：" style="width: 260px">
            {{row.operationUserName}}
          </el-form-item>
          <div class="empty"></div>
          <el-form-item label="操作角色：" style="width: 260px">
            {{row.roleName?row.roleName:'--'}}
          </el-form-item>
          <el-form-item label="操作IP：" style="width: 260px">
            {{row.operationIp}}
          </el-form-item>
          <div class="empty"></div>
          <el-form-item label="操作描述：">
            <span style="display: inline-block;width: 700px">{{row.parameters}}</span>
          </el-form-item>
          <div class="empty"></div>
          <el-form-item label="操作结果：" style="width: 260px">
            {{row.requestResult}}
          </el-form-item>
        </el-form>
      </div>

      <div class="dialog-footer">
        <el-button @click="$router.back()">返回列表</el-button>
      </div>
    </div>

  </div>

</template>
<script>
  export default {
    data () {
      return {
        row: this.$route.query.row
      }
    },
    created () {
    },
    methods: {
    }
  }
</script>
<style>
</style>
<style scoped>
  .form-size{
    width: 900px;
  }
  .foot-btn{
    width: 900px;
    margin-top: 40px;
    text-align: center;
  }
</style>
