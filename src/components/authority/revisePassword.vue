<template lang="html">
  <div class="login">
    <login-header login-title="找回密码"></login-header>
    <div class="login-con">
      <div class="">
        <el-form ref="loginFormRef" class="login-form" :model="loginForm" :rules="loginFormRules">
          <el-form-item prop="mobile">
            <el-input v-model="loginForm.mobile" :maxlength=11 placeholder="手机号">
              <i class="index-icon" slot="prefix"><icon icon-class="mobile"></icon></i>
            </el-input>
          </el-form-item>
          <el-form-item class="code-class" prop="authCode">
            <el-row :gutter="10">
              <el-col :span="14">
                <el-input v-model.number="loginForm.authCode" placeholder="请输入验证码"></el-input>
              </el-col>
              <el-col :span="10">
                <el-button type="primary" class="square" @click="getCode" :disabled="isDisable">{{textCon}}</el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" type="password" placeholder="请输入新密码">
              <i class="index-icon" slot="prefix"><icon icon-class="psd"></icon></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="checkPassword">
            <el-input v-model="loginForm.checkPassword" type="password" placeholder="请再次输入密码">
              <i class="index-icon" slot="prefix"><icon icon-class="psd"></icon></i>
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-row :gutter="10">
              <el-col :span="12">
                <el-button class="square" type="primary" :loading="loginBtnLoading"
                           @click="submitForm('loginFormRef')">提交
                </el-button>
              </el-col>
              <el-col :span="12">
                <el-button class="square" @click="$router.back()">返回</el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </div>

    </div>
  </div>
</template>

<script>
  import loginHeader from './header'
  export default {
    components: {
      'login-header': loginHeader
    },
    data () {
      let validateCheckPsd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码！'))
        } else if (value !== this.loginForm.password) {
          callback(new Error('两次输入密码不一致！'))
        } else {
          callback()
        }
      }
      return {
        loginBtnLoading: false,
        loginBtnText: '登录',
        textCon: '获取验证码',
        isDisable: false,
        loginForm: {
          sysCode: 'TTD_MANAGE_SYSTEM',
          authCode: '',
          mobile: '',
          password: '',
          checkPassword: ''
        },
        loginFormRules: {
          authCode: [
            {type: 'number', required: true, message: '请输入六位数字验证码'},
            {validator: this.validateLength('验证码', 6, 6), trigger: 'blur'}
          ],
          mobile: [
            {required: true, message: '请输入手机号码', trigger: 'blur'},
            {validator: this.validateMobile, trigger: 'blur'}
          ],
          password: [
            {validator: this.validatePassword, trigger: 'blur'}
          ],
          checkPassword: [
            {required: true, message: '请再次输入新密码', trigger: 'blur'},
            {validator: validateCheckPsd, trigger: 'blur'}
          ]
        }
      }
    },
    computed: {},
    methods: {
      // 验证表单
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.findPassword()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },

      async findPassword () {
        let res = await this.$sever.findPassword(this.loginForm)
        switch (res.code) {
          case 0:
            this.$message({message: '提交成功', type: 'warning'})
            this.$router.push({path: '/login'})
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },
      computeTime () {
        let total = 60
        this.isDisable = true
        var clock = setInterval(() => {
          if (total === 0) {
            this.textCon = '重新发送'
            this.isDisable = false
            clearInterval(clock)
          } else {
            this.textCon = '(' + (total--) + 's)后重新发送'
          }
        }, 1000)
      },

      async getCode () {
        if (this.loginForm.mobile === '') {
          this.$message({message: '请输入手机号码', type: 'warning'})
          return
        }
        let res = await this.$sever.getCode({mobile: this.loginForm.mobile, businessType: '2', sysCode: 'TTD_MANAGE_SYSTEM'})
        switch (res.code) {
          case 0:
            this.computeTime()
            this.$message({message: '发送成功', type: 'success'})
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      }
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  .square{
    width: 100%;
    border-radius: 0;
    height: 40px;
  }
  .login {
    .login-con {
      width: 410px;
      margin: 35px auto;
      .inline-input {
        width: 100%;
      }
      .tab-wrapper {
        padding: 30px 0;
        line-height: 2rem;
        text-align: center;
        .btn-type {
          border: none;
          border-bottom: 1px solid #DDDDE3;;
          .el-button {
            color: #4A4A4A
          }
        }
        .active {
          border: 1px solid #DDDDE3;
          border-bottom: none;
          .el-button {
            color: #3D82F7
          }
        }
      }
    }
  }


</style>
