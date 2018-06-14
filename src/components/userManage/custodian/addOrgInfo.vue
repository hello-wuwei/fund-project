<template lang="html">
  <div class="page">
    <com-breadcrumb :list="['托管人管理', '添加机构信息']"></com-breadcrumb>
    <div class="content-main">
      <div class="border-line">
        <el-form style="width: 600px" :model="submitData" ref="ruleForm" :rules="rules" label-position="right" label-width="180px">
          <el-form-item v-for="(item, index) in submitData.authMaterialJson" :key="index" :label="item.name + '：'"
                        :prop="'authMaterialJson.' + index + '.materialValue'" :rules="item.rule">
            <el-input v-model="item.materialValue" :maxlength="lenthlimit(item.name)"></el-input>
          </el-form-item>
          <el-form-item label="证书密码：" prop="certificatePassword">
            <el-input v-model.number="submitData.certificatePassword" :maxlength="6"></el-input>
          </el-form-item>
          <!--<el-form-item label="印章类型：" prop="signatureType">-->
            <!--<el-select v-model="submitData.signatureType" placeholder="请选择印章类型" size="small">-->
              <!--<el-option label="UK签章" value="1"></el-option>-->
              <!--<el-option label="套印(软证书)" value="2"></el-option>-->
              <!--<el-option label="场景证书" value="3"></el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="托管人签章顺序：" prop="depositBefore">-->
            <!--<el-select v-model="submitData.depositBefore" placeholder="请选择签章顺序" size="small">-->
              <!--<el-option label="在投资者之前签章" value="1"></el-option>-->
              <!--<el-option label="在投资人之后签章" value="2"></el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
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
      let valiCode = (rule, value, callback) => {
        let reg = /^(?!(.{0,18}[IOZSV]))[\dA-Z]{18}$/
        if (value === '') {
          callback()
        } else if (!reg.test(value)) {
          callback(new Error('统一代码须由18位数字或大写字母(不包括I,O,Z,S,V)组成！'))
        } else {
          callback()
        }
      }
      return {
        submitData: {
          userId: '',
          sysCode: 'TTD_MANAGE_SYSTEM',
          certificatePassword: '',
          authMaterialJson: [
            {
              name: '企业名称',
              materialCode: 'ENTERPRISE_NAME',                    // 企业名称CODE(固定不变)
              materialValue: '',                            // 企业名称
              rule: { required: true, validator: this.validateName('企业名称', 30), trigger: 'blur' }
            },
            {
              name: '营业执照注册号',
              materialCode: 'BUSINESS_LICENSE_REGISTR_NO',        // 营业执照注册号CODE(固定不变)
              materialValue: '',                            // 营业执照注册号
              rule: {min: 15, max: 15, message: '请输入长度为15位数的注册号', trigger: 'blur'}
            },
            {
              name: '组织机构代码',
              materialCode: 'ORG_CODE',                            // 组织机构代码CODE(固定不变)
              materialValue: '',                      // 组织机构代码
              rule: {min: 9, max: 9, message: '请输入长度为9位字符的组织机构代码', trigger: 'blur'}
            },
            {
              name: '统一社会信用代码',
              materialCode: 'UNIFIED_SOCIAL_CREDIT_CODE',        // 统一社会信用代码CODE(固定不变)
              materialValue: '',                       // 统一社会信用代码
              rule: {validator: valiCode, trigger: 'blur'}
            },
            {
              name: '法人代表姓名',
              materialCode: 'LEGAL_USER_NAME',                            // 法人代表姓名CODE(固定不变)
              materialValue: '',                      // 法人代表姓名
              rule: {validator: this.validateName('法人代表姓名', 30, false), trigger: 'blur'}
            },
            {
              name: '法人代表身份证号码',
              materialCode: 'LEGAL_USER_IDCARD_NO',        // 法人代表身份证号码CODE(固定不变)
              materialValue: '',                       // 法人代表身份证号码
              rule: {validator: this.validateIdOrgCard, trigger: 'blur'}
            }
          ]
        },
        rules: {
          certificatePassword: [
            {required: true, message: '请输入证书密码'},
            {type: 'number', message: '证书密码必须为6位的数字！', trigger: 'blur'},
            {validator: this.validateLength('证书密码', 6, 6), trigger: 'blur'}
          ]
        }
      }
    },
    created () {
    },
    methods: {
      lenthlimit (name) {
        if (name === '营业执照注册号') {
          return 15
        }
        if (name === '组织机构代码') {
          return 9
        }
        if (name === '统一社会信用代码') {
          return 18
        }
        return 99999
      },

      // 新增账号
      async newOrgInfo () {
        let subData = Object.assign({}, this.submitData)
        subData.authMaterialJson = JSON.stringify(subData.authMaterialJson)
        subData.userId = this.$route.query.userId
        let res = await this.$sever.newOrgInfo(subData)
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
            this.newOrgInfo()
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

