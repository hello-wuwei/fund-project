<template lang="html">
  <div class="login">
    <login-header login-title="妥妥递私募基金服务管理系统"></login-header>
    <div class="login-con">
      <div style="margin-top: 40px">
        <el-form :model="loginForm" class="login-form" ref="loginFormRef" :rules="loginFormRules">
          <el-form-item prop="mobile">
            <el-input v-model="loginForm.mobile" placeholder="手机号">
              <i class="index-icon" slot="prefix"><icon icon-class="mobile"></icon></i>
            </el-input>
          </el-form-item>

          <el-form-item class="code-class" prop="authCode">
            <el-row :gutter="10">
              <el-col :span="14">
                <el-input v-model="loginForm.authCode" placeholder="请输入验证码"></el-input>
              </el-col>
              <el-col :span="10">
                <el-button type="primary" class="square" @click="getCode" :disabled="isDisable">{{textCon}}</el-button>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item prop="password">
            <el-input v-model="loginForm.password" type="password" placeholder="请输入密码">
              <i class="index-icon" slot="prefix"><icon icon-class="psd"></icon></i>
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button class="square" type="primary" :loading="loginBtnLoading"
              @click="submitForm('loginFormRef')">{{loginBtnText}}
            </el-button>
            <div style="text-align: right;padding-top: .3rem">
              <router-link to="/revise_password">
                <i style="color:#777786">忘记密码？</i>
              </router-link>
            </div>
          </el-form-item>
        </el-form>
      </div>

    </div>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import utils from '../../utils/utils'
  import loginHeader from './header'
  export default {
    components: {
      'login-header': loginHeader
    },
    data () {
      return {
        loginBtnLoading: false,
        loginBtnText: '登录',
        textCon: '获取验证码',
        isDisable: false,
        loginForm: {
          sysCode: 'TTD_MANAGE_SYSTEM',
          authCode: '',
          mobile: '',
          password: ''
        },
        loginFormRules: {
          authCode: [
            {required: true, message: '请输入六位数字验证码'},
            {validator: this.validateLength('验证码', 6, 6), trigger: 'blur'}
          ],
          mobile: [
            {required: true, message: '请输入手机号码', trigger: 'blur'},
            {validator: this.validateMobile, trigger: 'blur'}
          ]
        }
      }
    },
    created () {
    },
    mounted () {
    },
    computed: {
      ...mapMutations({
        setLoginInfo: 'SET_LOGINIP'                 // 存储本机登录信息
      })
    },
    methods: {
      async loginIn () {
        this.loginBtnText = '登录中'
        this.loginBtnLoading = true
        let res = await this.$sever.loginIn(this.loginForm)
        switch (res.code) {
          case 0:
            if (!res.data.bean) {
              this.$message({message: '无该用户信息数据', type: 'error'})
              this.loginBtnText = '登录'
              this.loginBtnLoading = false
              return
            }
            res.data.bean.avatar = (res.data.bean.avatar === '{}') ? '' : JSON.parse(res.data.bean.avatar)
            utils.addStorage('TTD_MANAGE_USERINFO', res.data.bean)
            utils.recordTime()
//            baseHttpConfig.params.currUserId = this.util.getStorage('TTD_MANAGE_USERINFO').userId
            this.$router.push({path: '/home/index'})
            break
          default:
            this.loginBtnText = '登录'
            this.loginBtnLoading = false
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      // 验证表单
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loginIn()
          } else {
            console.log('error submit!!')
            return false
          }
        })
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
        let res = await this.$sever.getCode({mobile: this.loginForm.mobile, businessType: '1', sysCode: 'TTD_MANAGE_SYSTEM'})
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

<style>
  .login-form .el-input__inner{
    padding-left: 50px;
    border-radius: inherit;
  }
  .login-form .code-class .el-input__inner{
    padding-left: 10px
  }
</style>

<style lang="less" type="text/less" scoped>
  .square{
    width: 100%;
    border-radius: 0;
    height: 40px;
  }
  .login {
    .login-con {
      width: 410px;
      margin: 0 auto;
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
