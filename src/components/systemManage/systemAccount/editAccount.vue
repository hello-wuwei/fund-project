<template lang="html">
  <div class="page">
    <div class="content-main">
      <div class="con-box">
        <el-form style="width: 600px" :model="submitData" ref="ruleForm" :rules="rules" label-position="right" label-width="120px">
          <el-form-item label="用户姓名：" prop="realName">
            <el-input v-model="submitData.realName" placeholder="请输入真实姓名"></el-input>
          </el-form-item>
          <el-form-item label="账号：" prop="mobile">
            <el-input v-model="submitData.mobile" :maxlength="11" placeholder="请输入手机号"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" style="margin-left: 120px" class="dialog-footer">
        <el-button type="primary" @click="submitForm('ruleForm')">提 交</el-button>
        <el-button @click="$emit('removeTag', 'editAccount')">返 回</el-button>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['userId'],
    data () {
      return {
        submitData: {
          sysCode: 'TTD_MANAGE_SYSTEM',
          realName: '',
          mobile: '',
          userId: this.userId
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
      this.showAccountInfo()
    },
    methods: {
      async showAccountInfo () {
        let res = await this.$sever.getAccountInfo({userId: this.userId, sysCode: 'TTD_MANAGE_SYSTEM'})
        switch (res.code) {
          case 0:
            this.submitData.realName = res.data.bean.realName
            this.submitData.mobile = res.data.bean.mobile
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      // 新增账号
      async newAccount () {
        let res = await this.$sever.newSystemAccount(this.submitData)
        switch (res.code) {
          case 0:
            this.$message({message: '保存成功', type: 'success'})
            this.$emit('removeTag', 'editAccount')
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

