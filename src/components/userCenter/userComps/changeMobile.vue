<!--用户中心右侧模板-->
<template lang="html">
  <div class="right-block">
    <h4>修改绑定手机</h4>
    <div class="user-info">
      <h5 style="margin-bottom: 10px">请输入您要更换的手机号码，进行手机绑定修改</h5>
      <el-form :model="formData" ref="subForm" :rules="subFormRules" label-width="120px" label-position="left">
        <el-form-item label="原手机号码：" prop="oldMobile">
          <el-input v-model="formData.oldMobile" placeholder="请输入旧密码" size="small" style="width: 260px;margin-right: 10px"></el-input>
          <el-button type="primary" size="mini" @click="getOldCode" :disabled="isDisableOld">{{textConOld}}</el-button>
        </el-form-item>
        <el-form-item label="验证码：" prop="oldCode">
          <el-input v-model="formData.oldCode" placeholder="请输入动态密码" size="small" style="width: 260px;margin-right: 10px"></el-input>
        </el-form-item>
        <el-form-item label="新手机号码：" prop="newMobile">
          <el-input v-model="formData.newMobile" placeholder="请输入旧密码" size="small" style="width: 260px;margin-right: 10px"></el-input>
          <el-button type="primary" size="mini" @click="getNewCode" :disabled="isDisableNew">{{textConNew}}</el-button>
        </el-form-item>
        <el-form-item label="验证码：" prop="newCode">
          <el-input v-model="formData.newCode" placeholder="请输入动态密码" size="small" style="width: 260px;margin-right: 10px"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="dialog-footer">
      <el-button @click="$router.back()">返 回</el-button>
      <el-button type="primary" @click="submitForm('subForm')">提 交</el-button>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  export default {
    data () {
      return {
        textConOld: '获取验证码',
        isDisableOld: false,
        textConNew: '获取验证码',
        isDisableNew: false,

        formData: {
          sysCode: 'TTD_MANAGE_SYSTEM',
          oldMobile: '',
          oldCode: '',
          newMobile: '',
          newCode: ''
        },

        subFormRules: {
          oldCode: [
            {required: true, message: '请输入六位数字验证码'},
            {validator: this.validateLength('验证码', 6, 6), trigger: 'blur'}
          ],
          oldMobile: [
            {required: true, message: '请输入原手机号码', trigger: 'blur'},
            {validator: this.validateMobile, trigger: 'blur'}
          ],
          newMobile: [
            {required: true, message: '请输入新手机号码', trigger: 'blur'},
            {validator: this.validateMobile, trigger: 'blur'}
          ],
          newCode: [
            {required: true, message: '请输入六位数字验证码'},
            {validator: this.validateLength('验证码', 6, 6), trigger: 'blur'}
          ]
        }
      }
    },
    created () {
    },
    computed: {
      ...mapState([
        'userInfo'
      ])
    },
    methods: {
      async updateBindMobile () {
        let res = await this.$sever.updateBindMobile(this.formData)
        switch (res.code) {
          case 0:
            this.$message({message: '修改成功', type: 'success'})
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
            this.updateBindMobile()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },

      // 旧密码获取验证码代码段
      computeTimeOld () {
        let total = 60
        this.isDisableOld = true
        var clockOld = setInterval(() => {
          if (total === 0) {
            this.textConOld = '重新发送'
            this.isDisableOld = false
            clearInterval(clockOld)
          } else {
            this.textConOld = '(' + (total--) + 's)后重新发送'
          }
        }, 1000)
      },

      async getOldCode () {
        if (this.formData.oldMobile === '') {
          this.$message({message: '请输入原手机号码', type: 'warning'})
          return
        }
        let res = await this.$sever.getCode({mobile: this.formData.oldMobile, businessType: '3', sysCode: 'TTD_MANAGE_SYSTEM'})
        switch (res.code) {
          case 0:
            this.computeTimeOld()
            this.$message({message: '发送成功', type: 'success'})
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      // 新密码获取验证码代码段
      computeTimeNew () {
        let total = 60
        this.isDisableNew = true
        var clockNew = setInterval(() => {
          if (total === 0) {
            this.textConNew = '重新发送'
            this.isDisableNew = false
            clearInterval(clockNew)
          } else {
            this.textConNew = '(' + (total--) + 's)后重新发送'
          }
        }, 1000)
      },

      async getNewCode () {
        if (this.formData.newMobile === '') {
          this.$message({message: '请输入新手机号码', type: 'warning'})
          return
        }
        let res = await this.$sever.getCode({mobile: this.formData.newMobile, businessType: '3', sysCode: 'TTD_MANAGE_SYSTEM'})
        switch (res.code) {
          case 0:
            this.computeTimeNew()
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
    padding: 20px 2%;
    border-radius: 2px;
  }
  .info-text{
    display: inline-block;
    width: 300px
  }
</style>
