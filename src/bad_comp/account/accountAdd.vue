<!-- 新增 账号 -->
<template lang="html">
  <div class="account-save">
    <div class="card-box">
    <el-form ref="form" :model="formData" :rules="rules" label-width="170px" size="small">
      <el-form-item label="用户姓名" prop="userName">
        <el-input v-model="formData.userName" :maxlength="15" placeholder="请输入用户姓名" style="width: 300px;"></el-input>
      </el-form-item>
      <el-form-item label="账号" prop="loginName">
        <el-input v-model="formData.loginName" style="width: 300px;" :maxlength=11 placeholder="请输入手机号码"></el-input>
      </el-form-item>
      <el-form-item label="所属组织">
        <el-tree
          ref="tree"
          :data="orgList"
          default-expand-all
          show-checkbox
          check-strictly
          node-key="orgId"
          :props="defaultProps"
          style="width: 300px;">
        </el-tree>
      </el-form-item>
      <el-form-item label="是否启用">
        <el-radio-group v-model="formData.userState">
          <el-radio label="USER_STATE_PASSED">是</el-radio>
          <el-radio label="USER_STATE_STOP">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    </div>
    <div class="user-right-bottom">
      <el-button type="primary"  @click="onSubmit">保存</el-button>
      <el-button @click="onCancel">返回</el-button>
    </div>
  </div>
</template>

<script>
  import Api from '../api'
  import {post} from '@/api/http.js'
  export default {
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
      return {
        defaultProps: {
          children: 'subList',
          label: 'orgName'
        },
        formData: {
          userName: '',
          loginName: '',
          userState: 'USER_STATE_PASSED'
        },
        rules: {
          userName: [
            {validator: validateUserName, trigger: 'blur'}
          ],
          loginName: [
            {validator: validateMobile, trigger: 'blur'}
          ]
        }
      }
    },
    props: {
      orgList: Array,
      token: Object
    },
    mounted () {
      console.log(this.orgList)
    },
    methods: {
      onCancel() {
        this.$emit('on-cancel')
      },
      onSubmit () {
        this.$refs.form.validate(async(valid) => {
          if (valid) {
            let keys = this.$refs.tree.getCheckedKeys()
            if (keys.length === 0) {
              this.$message({
                message: '所属组织不能为空!',
                type: 'warning',
                center: true
              })
            } else {
              /**
               *USER_TYPE_DEPOSIT_SUB托管人-子账号
               *USER_TYPE_MANAGER_SUB管理人-子账号
               *USER_TYPE_ORG_SUB机构投资者-子账号
              */
              let {userId, orgName, userType} = this.token
              let {loginName} = this.formData
              let params = Object.assign({
                orgName: orgName, // 父账号的机构名
                password: Api.defaultPass,
                mobile: loginName,
                userType: /_SUB$/.test(userType) ? userType : (userType + '_SUB'),
                parentAccount: userId,
                deptId: JSON.stringify(keys)
              }, this.formData)
              let response = await post(Api.account.add, params)
              if (response.code === 0) {
                this.$emit('refresh')
                this.$message({
                  message: '子账号添加成功!',
                  type: 'success',
                  center: true
                })
                setTimeout(this.onCancel, 1000)
              }
            }
          }
        })
      }
    }
  }
</script>
