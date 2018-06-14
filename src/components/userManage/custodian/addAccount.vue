<template lang="html">
  <div class="page">
    <com-breadcrumb :list="['托管人管理', '新增托管人']"></com-breadcrumb>
    <div class="content-main">
      <div class="border-line">
        <el-form style="width: 600px" :model="submitData" ref="ruleForm" :rules="rules" label-position="right" label-width="140px">
          <el-form-item label="托管机构名称" prop="name">
            <el-input v-model="submitData.name" placeholder="请输入托管机构名称"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="realName">
            <el-input v-model="submitData.realName" placeholder="请输入管理员姓名"></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="idcard">
            <el-input v-model="submitData.idcard" placeholder="请输入用户身份证号"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="mobile">
            <el-input v-model="submitData.mobile" placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <!--<el-form-item label="托管人代号" prop="depositCode">-->
            <!--<el-input v-model="submitData.depositCode" placeholder="请输入手机号码"></el-input>-->
          <!--</el-form-item>-->
          <el-form-item label="合同签署方式：" prop="signatureCode">
            <el-select v-model="submitData.signatureCode" placeholder="请选择印章类型" size="small">
              <el-option label="UK签章" value="1"></el-option>
              <el-option label="套印(软证书)" value="2"></el-option>
              <!--<el-option label="场景证书" value="3"></el-option>-->
            </el-select>
          </el-form-item>
          <el-form-item v-if="submitData.signatureCode==1" label="UKEY签署模式：" prop="depositBefore">
            <el-select v-model="submitData.depositBefore" placeholder="请选择UKEY签署模式" size="small">
              <el-option label="托管人先签" value="1"></el-option>
              <el-option label="托管人后签" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否启用" prop="state">
            <el-radio v-model="submitData.state" label="3">是</el-radio>
            <el-radio v-model="submitData.state" label="1">否</el-radio>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$router.back()">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
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
          name: '',
          realName: '',
          idcard: '',
          mobile: '',
          signatureCode: '2',
          depositBefore: '',
          state: '3',
          userId: ''
//          depositCode: ''
        },

        rules: {
          name: [
            { required: true, validator: this.validateName('托管机构名称', 45), trigger: 'blur' }
          ],
          realName: [
            { required: true, validator: this.validateName('管理员姓名', 15), trigger: 'blur' }
          ],
          idcard: [
            { required: true, validator: this.validateIdCard, trigger: 'blur' }
          ],
          mobile: [
            {required: true, validator: this.validateMobile, trigger: 'blur'}
          ],
          signatureCode: [
            {required: true, message: '请选择合同签署方式', trigger: 'change'}
          ],
          depositBefore: [
            {required: true, message: '请选择UKEY签署模式', trigger: 'change'}
          ],
          state: [
            { required: true, message: '请选择是否启用！', trigger: 'blur' }
          ]
//          depositCode: [
//            { required: true, message: '请输入托管人代号！', trigger: 'blur' }
//          ]
        },
        roleList: []
      }
    },
    created () {
    },
    watch: {
      'submitData.signatureCode' (val) {
        if (val === '2') {
          this.submitData.depositBefore = ''
        }
      }
    },
    methods: {
      // 新增账号
      async newAccount () {
        let res = await this.$sever.newCustodian(this.submitData)
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

