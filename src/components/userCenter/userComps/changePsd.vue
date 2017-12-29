<!--用户中心右侧模板-->
<template lang="html">
  <div class="right-block">
    <h4>修改密码</h4>
    <div class="user-info">
      <el-form :model="formData" ref="subForm" :rules="subFormRules" label-width="120px" label-position="left">
        <el-form-item label="旧密码：" prop="oldPassword">
          <el-input type="password" v-model="formData.oldPassword" placeholder="请输入旧密码" size="small" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="newPassword">
          <el-input type="password" v-model="formData.newPassword" placeholder="请输入新密码" size="small" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码：" prop="checkPassword">
          <el-input type="password" v-model="formData.checkPassword" placeholder="请再次输入密码" size="small" style="width: 300px"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="submit-foot-center">
      <el-button type="primary" @click="submitForm('subForm')">保 存</el-button>
      <el-button @click="$router.back()">返 回</el-button>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  export default {
    data () {
      let validateCheckPsd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码！'))
        } else if (value !== this.formData.newPassword) {
          callback(new Error('两次输入密码不一致！'))
        } else {
          callback()
        }
      }
      return {
        formData: {
          sysCode: 'TTD_MANAGE_SYSTEM',
          userId: '',
          oldPassword: '',
          newPassword: '',
          checkPassword: ''
        },
        subFormRules: {
          oldPassword: [
            {required: true, message: '请输入旧密码', trigger: 'blur'}
          ],
          newPassword: [
            {required: true, message: '请输入新密码', trigger: 'blur'},
            {required: true, validator: this.validatePassword, trigger: 'blur'}
          ],
          checkPassword: [
            {required: true, validator: validateCheckPsd, trigger: 'blur'}
          ]
        }
      }
    },
    created () {
      this.formData.userId = this.userInfo.userId
    },
    computed: {
      ...mapState([
        'userInfo'
      ])
    },
    methods: {
      async updatePsd () {
        let that = this
        let res = await this.$sever.updatePsd(this.formData)
        switch (res.code) {
          case 0:
            this.$message({message: '密码修改成功，请重新登录', type: 'success'})
            setTimeout(() => {
              that.util.loginOut()
              that.$router.push('/login')
            }, 2000)
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },
      // 验证表单
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.updatePsd()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>
<style>
  .user-info .el-form-item{
    margin-bottom: 15px;
  }
</style>
<style scoped>
  .right-block{
    padding-top: 1px;
    border-radius: 6px;
    width: 100%;
    background: #fff;
    height: 800px;
  }
  .right-block h4{
    margin: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
  }
  .user-info{
    width: 90%;
    margin: 40px auto;
    border: 1px solid #ccc;
    padding: 20px 40px;
    border-radius: 2px;
  }
  .info-text{
    display: inline-block;
    width: 300px
  }
</style>
