<template>
  <div class="page">
    <com-breadcrumb :list="['SQL同步', '编辑SQL']"></com-breadcrumb>
    <div class="content-main">
      <div class="border-line">
        <el-form :model="submitData" :rules="rules" ref="ruleForm" class="form-size" label-width="120px">
          <el-form-item label="服务名称：" style="width: 360px" prop="dataKey">
            <el-input v-model="submitData.dataKey" placeholder="请输入" size="small"></el-input>
          </el-form-item>
          <el-form-item label="SQL标识：" style="width: 360px" prop="sqlCode">
            <el-input v-model="submitData.sqlCode" placeholder="请输入" size="small"></el-input>
          </el-form-item>
          <el-form-item label="SQL类型：" style="width: 360px" prop="operationType">
            <el-select v-model="submitData.operationType" placeholder="请输入" size="small">
              <el-option label="新增" value="INSERT"></el-option>
              <el-option label="删除" value="DELETE"></el-option>
              <el-option label="修改" value="UPDATE"></el-option>
              <el-option label="查询" value="SELECT"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否参数可变：" style="width: 360px">
            <el-radio v-model="submitData.isParamAgile" label="1">是</el-radio>
            <el-radio v-model="submitData.isParamAgile" label="0">否</el-radio>
          </el-form-item>
          <el-form-item label="SQL语句描述：" style="width: 500px" prop="sqlRemark">
            <el-input v-model="submitData.sqlRemark" type="textarea" :rows="4" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="分页语句：" style="width: 500px">
            <el-input v-model="submitData.pageSql" type="textarea" :rows="4" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="排序语句：" style="width: 500px">
            <el-input v-model="submitData.orderSql" type="textarea" :rows="4" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="SQL语句：" style="width: 500px" prop="sqlInfo">
            <el-input v-model="submitData.sqlInfo" type="textarea" :rows="4" placeholder="请输入"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <div class="dialog-footer">
        <el-button @click="$router.back()">返 回</el-button>
        <el-button type="primary" @click="submitForm ('ruleForm')">提 交</el-button>
        <!--<el-button type="primary" @click="$emit('removeTag', 'watchLog')">刷新SQL缓存</el-button>-->
      </div>
    </div>

  </div>

</template>
<script>
  export default {
    data () {
      return {
        row: {},

        submitData: {
          dataKey: '',
          sqlCode: '',
          operationType: '',
          isParamAgile: '',
          sqlRemark: '',
          pageSql: '',
          orderSql: '',
          sqlInfo: '',
          creator: this.util.getStorageUserInfo().realName,
          id: ''
        },

        rules: {
          dataKey: [
            { required: true, message: '请输入服务名称！', trigger: 'blur' }
          ],
          sqlCode: [
            { required: true, message: '请输入SQL标识！', trigger: 'blur' }
          ],
          operationType: [
            { required: true, message: '请输入SQL类型！', trigger: 'blur' }
          ],
          sqlRemark: [
            { required: true, message: '请输入SQL语句描述！', trigger: 'blur' }
          ],
          pageSql: [
            { required: true, message: '请输入分页语句！', trigger: 'blur' }
          ],
          orderSql: [
            { required: true, message: '请输入排序语句！', trigger: 'blur' }
          ],
          sqlInfo: [
            { required: true, message: '请输入SQL语句！', trigger: 'blur' }
          ]
        }
      }
    },
    created: function () {
      this.row = this.$route.query.row
      this.submitData.id = this.row.id
      this.submitData.dataKey = this.row.dataKey
      this.submitData.sqlCode = this.row.sqlCode
      this.submitData.operationType = this.row.operationType
      this.submitData.isParamAgile = this.row.isParamAgile.toString()
      this.submitData.sqlRemark = this.row.sqlRemark
      this.submitData.pageSql = this.row.pageSql
      this.submitData.orderSql = this.row.orderSql
      this.submitData.sqlInfo = this.row.sqlInfo
    },
    methods: {
      // 验证表单
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.newSql()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      // 新增账号
      async newSql () {
        console.log(this.submitData)
        let res = await this.$sever.newSql({synSql: JSON.stringify(this.submitData)})
        switch (res.code) {
          case 0:
            this.$message({message: '保存成功', type: 'success'})
            this.$router.back()
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      }
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
