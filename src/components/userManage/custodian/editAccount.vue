<template lang="html">
  <div class="page">
    <div class="content-main">
      <div class="con-box">
        <el-form style="width: 600px" :model="submitData" ref="ruleForm" :rules="rules" label-position="right" label-width="120px">
          <el-form-item label="托管机构名称" prop="name">
            <el-input v-model="submitData.name" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="realName">
            <el-input v-model="submitData.realName"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="mobile">
            <el-input v-model="submitData.mobile"></el-input>
          </el-form-item>
          <el-form-item label="是否启用" prop="state">
            <el-radio v-model="submitData.state" label="3">是</el-radio>
            <el-radio v-model="submitData.state" label="1">否</el-radio>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" style="margin-left: 120px" class="dialog-footer">
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
        <el-button @click="$emit('removeTag', 'editAccount')">取 消</el-button>
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
          name: '',
          realName: '',
          mobile: '',
          state: '',
          userId: ''
        },

        rules: {
          name: [
            { required: true, validator: this.validateName('托管机构名称', 45), trigger: 'blur' }
          ],
          realName: [
            { required: true, validator: this.validateName('托管人姓名', 15), trigger: 'blur' }
          ],
          mobile: [
            {required: true, validator: this.validateMobile, trigger: 'blur'}
          ],
          state: [
            { required: true, message: '请选择是否启用！', trigger: 'blur' }
          ]
        }
      }
    },
    created () {
      this.submitData.userId = this.userId
      this.showUserInfo()
    },
    methods: {
      async showUserInfo () {
        let res = await this.$sever.showOrgUserInfo({userId: this.submitData.userId, sysCode: 'TTD_MANAGE_SYSTEM'})
        switch (res.code) {
          case 0:
            this.submitData.name = res.data.bean.name
            this.submitData.realName = res.data.bean.realName
            this.submitData.mobile = res.data.bean.mobile
            this.submitData.state = res.data.bean.state.toString()
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },
      // 编辑账号
      async editAccount () {
        let res = await this.$sever.newCustodian(this.submitData)
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
            this.editAccount()
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

