<template lang="html">
  <div class="page">
    <div class="content-main">
      <div class="con-box">
        <el-form ref="ruleForm" :model="submitData" :rules="rules" label-width="170px" size="small">
          <el-form-item label="用户姓名" prop="userName">
            <el-input v-model="submitData.userName" :maxlength="15" placeholder="请输入用户姓名"
                      style="width: 300px;"></el-input>
          </el-form-item>
          <el-form-item label="账号" prop="loginName">
            <el-input v-model="submitData.loginName" style="width: 300px;" :maxlength=11
                      placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="idCard">
            <el-input v-model="submitData.idCard" style="width: 300px;" :maxlength=18
                      placeholder="请输入身份证号"></el-input>
          </el-form-item>

          <el-form-item label="是否启用">
            <el-radio-group v-model="submitData.userState">
              <el-radio label="USER_STATE_PASSED">是</el-radio>
              <el-radio label="USER_STATE_STOP">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" style="margin-left: 120px" class="dialog-footer">
        <el-button type="primary" @click="onSubmit('ruleForm')">确 定</el-button>
        <el-button @click="$emit('removeTag', 'addAccount')">取 消</el-button>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      token: Object,
      row: Object
    },
    data () {
      var validateMobile = (rule, value, callback) => {
        let reg = /^1[3|4|5|6|7|8][0-9]\d{8}$/
        if (value === undefined || value === '') {
          callback(new Error('手机号码不能为空'))
        } else if (!reg.test(value)) {
          callback(new Error('手机号码格式不正确'))
        } else {
          callback()
        }
      }
      let validateUserName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('管理员姓名不能为空!'))
        } else if (!/^[\u4e00-\u9fa5]{1,10}$/.test(value)) {
          callback(new Error('请输入正确的管理员姓名'))
        } else {
          callback()
        }
      }
      let validateIdcard = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('身份证号不能为空!'))
        } else if (!/^[1-9]\d{16}[0-9Xx]$/.test(value)) {
          callback(new Error('请输入正确的身份证号'))
        } else {
          callback()
        }
      }
      return {
        defaultProps: {
          children: 'subList',
          label: 'orgName'
        },
        submitData: {
          userName: '',
          loginName: '',
          idCard: '',
          userState: 'USER_STATE_PASSED'
        },

        orgList: [],

        rules: {
          userName: [
            {validator: validateUserName, trigger: 'blur'}
          ],
          loginName: [
            {validator: validateMobile, trigger: 'blur'}
          ],
          idCard: [
            {validator: validateIdcard, trigger: 'blur'}
          ]
        }
      }
    },
    created () {
    },
    methods: {

//      // 新增账号
//      async newAccount () {
//        let res = await this.$sever.newCustodian(this.submitData)
//        switch (res.code) {
//          case 0:
//            this.$message({message: '保存成功', type: 'success'})
//            this.$emit('removeTag', 'addAccount')
//            break
//          default:
//            this.$message({message: res.msg, type: 'warning'})
//        }
//      },
//
//      // 验证表单
//      submitForm (formName) {
//        this.$refs[formName].validate((valid) => {
//          if (valid) {
//            this.newAccount()
//          } else {
//            console.log('error submit!!')
//            return false
//          }
//        })
//      },

      onSubmit (form) {
        this.$refs[form].validate(async (valid) => {
          if (valid) {
            /**
             *USER_TYPE_DEPOSIT_SUB托管人-子账号
             *USER_TYPE_MANAGER_SUB管理人-子账号
             *USER_TYPE_ORG_SUB机构投资者-子账号
             */
            let {userId, orgName, userType, idCard} = this.token
            let {loginName} = this.submitData
            let params = Object.assign({
              orgName: orgName, // 父账号的机构名
              password: 'smqy123',
              mobile: loginName,
              idCard: idCard,
              userType: /_SUB$/.test(userType) ? userType : (userType + '_SUB'),
              parentAccount: userId,
              deptId: '278'
            }, this.submitData)
            let response = await this.$sever.addChildAccount(params)
            if (response.code === 0) {
//                this.$emit('refresh')
              this.$message({
                message: '子账号添加成功!',
                type: 'success',
                center: true
              })
              this.$emit('removeTag', 'addAccount')
            }
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

