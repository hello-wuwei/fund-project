<template>
  <div class="page">
    <div class="content-main">
      <el-form :rules="rules" ref="formData" :model="formData" class="form-size" label-width="160px">
        <el-form-item label="组织名称：" prop="deptName">
          <el-input v-model="formData.deptName" placeholder="请输入部门名称" size="small" style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item label="组织ID：" prop="deptId">
        <el-input v-model="formData.deptId" placeholder="请输入组织ID" size="small" style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item label="上级组织：">
          <el-tree
            :data="treeData"
            show-checkbox
            default-expand-all
            node-key="deptId"
            ref="tree"
            :check-strictly="true"
            highlight-current
            :props="defaultProps">
          </el-tree>
        </el-form-item>
        <el-form-item label="显示排序：" prop="sortNo">
          <el-input v-model.number="formData.sortNo" placeholder="请输入显示顺序" size="small" style="width: 400px"></el-input>
        </el-form-item>
      </el-form>

      <div class="foot-btn">
        <el-button type="primary" @click="submitForm ('formData')">保 存</el-button>
        <el-button @click="$emit('removeTag', 'editResouce')">返 回</el-button>
      </div>
    </div>

  </div>

</template>
<script>
  export default {
    props: ['deptId'],
    data () {
      return {
        formData: {
          deptId: '',
          sysCode: 'TTD_MANAGE_SYSTEM',
          deptName: '',
          sortNo: '',
          parentId: ''
        },
        parentId: [],

        treeData: [{
          deptId: '-1',
          subList: [],
          deptName: '根目录'
        }],
        defaultProps: {
          id: 'deptId',
          children: 'subList',
          label: 'deptName'
        },

        rules: {
          deptName: [
            { required: true, validator: this.validateName('组织名称', 15), trigger: 'blur' }
          ],
          deptId: [
            {required: true, message: '请输入组织ID！', trigger: 'blur'}
          ],
          sortNo: [
            { validator: this.validateSortVal, trigger: 'blur' }
          ],
          parentId: [
            { required: true, message: '请选择父资源！', trigger: 'blur' }
          ]
        }
      }
    },
    created: function () {
      this.getResouceTree()
    },
    methods: {
      async newResouce () {
        let res = await this.$sever.newOrganization(this.formData)
        switch (res.code) {
          case 0:
            this.$message({message: '保存成功', type: 'success'})
            this.$emit('removeTag', 'editResouce')
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      async getResouceTree () {
        let res = await this.$sever.orgManageTree({sysCode: 'TTD_MANAGE_SYSTEM'})
        switch (res.code) {
          case 0:
            this.treeData[0].subList = res.data.bean
            this.getResouceView()
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      async getResouceView () {
        let res = await this.$sever.getOrgView({sysCode: 'TTD_MANAGE_SYSTEM', id: this.deptId})
        switch (res.code) {
          case 0:
            this.formData.deptName = res.data.bean.deptName
            this.formData.deptId = res.data.bean.deptId.toString()
            this.formData.sortNo = res.data.bean.sortNo
            this.$refs.tree.setCheckedKeys([res.data.bean.parentId])
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      // 验证表单
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let parentId = this.$refs.tree.getCheckedKeys()
            if (parentId.length === 0) {
              this.$message({message: '请选择父级资源', type: 'warning'})
              return
            }
            if (parentId.length > 1) {
              this.$message({message: '只能选择一个父级资源', type: 'warning'})
              return
            }
            this.formData.parentId = parentId.join(',')
            if (this.formData.parentId === this.formData.deptId.toString()) {
              this.$message({message: '不能将要修改的组织作为父级组织', type: 'warning'})
              return
            }
            this.newResouce()
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
</style>
<style scoped>
  .form-size{
    padding: 30px 0;
    width: 900px;
    border: 1px solid #ccc;
    margin-top: 30px;
  }
  .foot-btn{
    width: 900px;
    margin-top: 40px;
    text-align: center;
  }
</style>
