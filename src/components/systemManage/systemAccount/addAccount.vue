<template lang="html">
  <div class="page">
    <com-breadcrumb :list="['员工管理', '新增账号']"></com-breadcrumb>
    <div class="content-main">
      <div class="border-line">
        <el-form style="width: 600px" :model="submitData" ref="ruleForm" :rules="rules" label-position="right" label-width="120px">
          <el-form-item label="用户姓名：" prop="realName">
            <el-input v-model="submitData.realName" placeholder="请输入真实姓名"></el-input>
          </el-form-item>
          <el-form-item label="账号：" prop="mobile">
            <el-input v-model="submitData.mobile" :maxlength="11" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <!--<el-form-item label="角色授权：">-->
            <!--<el-input v-model="submitData.mobile" :maxlength="11" placeholder="请输入手机号"></el-input>-->
          <!--</el-form-item>-->
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
          userName: '',
          mobile: '',
          userId: ''
        },

        rules: {
          realName: [
            { required: true, validator: this.validateName('用户姓名', 15), trigger: 'blur' }
          ],
          mobile: [
            {required: true, validator: this.validateMobile, trigger: 'blur'}
          ]
        }
      }
    },
    created () {
    },
    methods: {

      // 新增账号
      async newAccount () {
        let res = await this.$sever.newSystemAccount(this.submitData)
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
            this.newAccount()
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

