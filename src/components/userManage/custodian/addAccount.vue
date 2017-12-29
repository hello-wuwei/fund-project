<template lang="html">
  <div class="page">
    <div class="content-main">
      <div class="con-box">
        <el-form style="width: 600px" :model="submitData" ref="ruleForm" :rules="rules" label-position="right" label-width="120px">
          <el-form-item label="托管机构名称" prop="name">
            <el-input v-model="submitData.name"></el-input>
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
        <el-button @click="$emit('removeTag', 'addAccount')">取 消</el-button>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        submitData: {
          sysCode: 'TTD_MANAGE_SYSTEM',
          name: '',
          realName: '',
          mobile: '',
          state: '3',
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
    },
    methods: {

      // 新增账号
      async newAccount () {
        let res = await this.$sever.newCustodian(this.submitData)
        switch (res.code) {
          case 0:
            this.$message({message: '保存成功', type: 'success'})
            this.$emit('removeTag', 'addAccount')
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

