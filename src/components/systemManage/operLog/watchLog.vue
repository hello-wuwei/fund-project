<template>
  <div class="page">
    <div class="content-main">
      <el-form :inline="true" class="form-size" label-width="120px">
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

      <div class="foot-btn">
        <el-button @click="$emit('removeTag', 'watchLog')">返回列表</el-button>
      </div>
    </div>

  </div>

</template>
<script>
  export default {
    props: ['row'],
    data () {
      return {
        formData: {}
      }
    },
    created: function () {
    },
    methods: {
    }
  }
</script>
<style>
</style>
<style scoped>
  .form-size{
    padding: 30px 0;
    width: 900px;
    border: 1px solid #ccc;
    margin-top: 30px;
  }
  .foot-btn{
    width: 900px;
    margin-top: 40px;
    text-align: center;
  }
</style>
