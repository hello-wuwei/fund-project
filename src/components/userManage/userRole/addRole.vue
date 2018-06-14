<template lang="html">
  <div class="page">
    <com-breadcrumb :list="['角色管理', '新增角色']"></com-breadcrumb>
    <div class="content-main">
      <div class="border-line">
        <el-form :model="submitData" ref="ruleForm" :rules="rules" label-position="right" label-width="120px">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="submitData.name" placeholder="请输入角色名称" style="width: 400px"></el-input>
            <i style="color: gray">(最多可以录入12个字)</i>
          </el-form-item>
          <el-form-item label="角色描述" prop="description">
            <el-input type="textarea" style="width: 400px" :maxlength="30" :rows="5" v-model="submitData.description" placeholder="请输入角色描述（不超过30个字）"></el-input>
          </el-form-item>
          <el-form-item label="是否启用" prop="state">
            <el-radio v-model="submitData.isUsed" label="1">是</el-radio>
            <el-radio v-model="submitData.isUsed" label="0">否</el-radio>
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
          sysCode: 'TOB_SYSTEM',
          name: '',
          description: '',
          isUsed: '1',
          roleId: ''
        },

        rules: {
          name: [
            { required: true, validator: this.validateName('角色名称', 15), trigger: 'blur' }
          ],
          description: [
            { max: 30, validator: this.validateName('角色描述', 30, false), trigger: 'blur' }
          ],
          isUsed: [
            { required: true, message: '请选择是否启用！', trigger: 'blur' }
          ]
        }
      }
    },
    created () {
    },
    methods: {

      // 新增角色
      async newRole () {
        let res = await this.$sever.newUserRole(this.submitData)
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
            this.newRole()
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

