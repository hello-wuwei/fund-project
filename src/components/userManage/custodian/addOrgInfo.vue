<template lang="html">
  <div class="page">
    <div class="content-main">
      <div class="con-box">
        <el-form style="width: 600px" :model="submitData" ref="ruleForm" :rules="rules" label-position="right" label-width="180px">
          <el-form-item v-for="(item, index) in submitData.authMaterialJson" :key="index" :label="item.name + '：'"
                        :prop="'authMaterialJson.' + index + '.materialValue'" :rules="item.rule">
            <el-input v-model="item.materialValue" :maxlength="lenthlimit(item.name)"></el-input>
          </el-form-item>
          <el-form-item label="证书密码：" prop="certificatePassword">
            <el-input v-model="submitData.certificatePassword"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" style="margin-left: 120px" class="dialog-footer">
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
        <el-button @click="$emit('removeTag', 'addOrgInfo')">取 消</el-button>
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
              rule: {required: true, min: 15, max: 15, message: '请输入长度为15位数的注册号', trigger: 'blur'}
            },
            {
              name: '组织机构代码',
              materialCode: 'ORG_CODE',                            // 组织机构代码CODE(固定不变)
              materialValue: '',                      // 组织机构代码
              rule: {required: true, message: '内容不能为空', trigger: 'blur'}
            },
            {
              name: '统一社会信用代码',
              materialCode: 'UNIFIED_SOCIAL_CREDIT_CODE',        // 统一社会信用代码CODE(固定不变)
              materialValue: '',                       // 统一社会信用代码
              rule: {required: true, message: '内容不能为空', trigger: 'blur'}
            },
            {
              name: '法人代表人姓名',
              materialCode: 'LEGAL_USER_NAME',                    // 法人代表人姓名CODE(固定不变)
              materialValue: '',                           // 法人代表人姓名
              rule: {required: true, message: '内容不能为空', trigger: 'blur'}
            },
            {
              name: '法人代表人身份证号',
              materialCode: 'LEGAL_USER_IDCARD_NO',                // 法人代表人身份证号CODE(固定不变)
              materialValue: '',                    // 法人代表人身份证号
              rule: {required: true, validator: this.validateIdCard, trigger: 'blur'}
            }
          ]
        },
        rules: {
          materialValue: [
            { required: true, message: '该项不能为空！', trigger: 'blur' }
          ],
          certificatePassword: [
            { required: true, message: '请输入证书密码！', trigger: 'blur' }
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
        if (name === '法人代表人身份证号') {
          return 18
        }
        return 99999
      },

      // 新增账号
      async newOrgInfo () {
        let subData = Object.assign({}, this.submitData)
        subData.authMaterialJson = JSON.stringify(subData.authMaterialJson)
        subData.userId = this.userId
        let res = await this.$sever.newOrgInfo(subData)
        switch (res.code) {
          case 0:
            this.$message({message: '保存成功', type: 'success'})
            this.$emit('removeTag', 'addOrgInfo')
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

