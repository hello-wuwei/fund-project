<template>
  <div class="page">
    <com-breadcrumb :list="['后台管理', '编辑资源']"></com-breadcrumb>
    <div class="content-main">
      <div class="border-line">
        <el-form :inline="true" :rules="rules" ref="formData" :model="formData" class="form-size valid-item" label-width="160px">
          <el-form-item label="资源名称：" prop="name">
            <el-input v-model="formData.name" placeholder="请输入资源名称" size="small"></el-input>
          </el-form-item>
          <el-form-item label="资源编码：" prop="code">
            <el-input v-model="formData.code" placeholder="请输入资源编码" size="small" disabled></el-input>
          </el-form-item>
          <el-form-item label="资源路径：" prop="urlAddress">
            <el-input v-model="formData.urlAddress" placeholder="请输入资源路径" size="small"></el-input>
          </el-form-item>
          <el-form-item label="显示顺序：" prop="sortNo">
            <el-input v-model.number="formData.sortNo" placeholder="请输入显示顺序" size="small"></el-input>
          </el-form-item>
          <el-form-item label="资源类型：" prop="type">
            <el-select v-model="formData.type" placeholder="请选择资源类型" size="small" style="width: 200px">
              <el-option label="菜单" value="1"></el-option>
              <el-option label="功能" value="2"></el-option>
              <el-option label="数据" value="3"></el-option>
              <el-option label="接口" value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="菜单图标：" prop="icon">
            <el-input v-model="formData.icon" placeholder="请输入图标代码" size="small"></el-input>
          </el-form-item>
          <div class="empty"></div>
          <el-form-item label="资源描述：" prop="description">
            <el-input type="textarea" :rows="4" v-model="formData.description" placeholder="请输入资源描述" style="width: 500px"></el-input>
          </el-form-item>
          <div class="empty"></div>
          <el-form-item label="父资源：">
            <el-tree
              :data="treeData"
              show-checkbox
              default-expand-all
              node-key="sourcesId"
              ref="tree"
              :check-strictly="true"
              highlight-current
              :props="defaultProps">
            </el-tree>
          </el-form-item>
        </el-form>
      </div>

      <div class="dialog-footer">
        <el-button @click="$router.back()">返 回</el-button>
        <el-button type="primary" @click="submitForm ('formData',0)">保 存</el-button>
        <!--<el-button type="primary" @click="submitForm ('formData',1)">保存并继续</el-button>-->
      </div>
    </div>

  </div>

</template>
<script>
  export default {
    data () {
      return {
        formData: {
          sourcesId: this.$route.query.sourcesId,
          sysCode: 'TTD_MANAGE_SYSTEM',
          name: '',
          code: '',
          urlAddress: '',
          sortNo: '',
          type: '',
          description: '',
          parentId: '',
          icon: ''
        },
        parentId: [],

        treeData: [{
          sourcesId: '-1',
          subList: [],
          name: '根目录'
        }],
        defaultProps: {
          id: 'sourcesId',
          children: 'subList',
          label: 'name'
        },

        rules: {
          name: [
            { required: true, validator: this.validateName('资源名称', 10, true, true), trigger: 'blur' }
          ],
          code: [
            { validator: this.validateSourceCode, trigger: 'blur' }
          ],
          urlAddress: [
            { validator: this.validateSourcePath, trigger: 'blur' }
          ],
          sortNo: [
            { validator: this.validateSortVal, trigger: 'blur' }
          ],
          type: [
            {required: true, message: '请选择资源类型！', trigger: 'blur'}
          ],
          description: [
            { max: 255, message: '资源描述不超过255个字符！', trigger: 'blur' }
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
      async newResouce (state) {
        let res = await this.$sever.addResouce(this.formData)
        switch (res.code) {
          case 0:
            this.$message({message: '保存成功', type: 'success'})
            if (state === 0) {
              this.$router.back()
            } else {
              this.$refs['formData'].resetFields()
              this.$refs.tree.setCheckedKeys([])
              this.formData.parentId = ''
            }
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      async getResouceView () {
        let res = await this.$sever.editResouceView({sysCode: 'TTD_MANAGE_SYSTEM', sourcesId: this.$route.query.sourcesId})
        switch (res.code) {
          case 0:
            this.formData.name = res.data.bean.name
            this.formData.code = res.data.bean.code
            this.formData.urlAddress = res.data.bean.urlAddress
            this.formData.sortNo = res.data.bean.sortNo || ''
            this.formData.type = res.data.bean.type.toString()
            this.formData.description = res.data.bean.description
            this.formData.icon = res.data.bean.icon
            this.$refs.tree.setCheckedKeys([res.data.bean.parentId])
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      async getResouceTree () {
        let res = await this.$sever.getResouceTree({sysCode: 'TTD_MANAGE_SYSTEM'})
        switch (res.code) {
          case 0:
            this.treeData[0].subList = res.data.bean
            this.getResouceView()
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      // 验证表单
      submitForm (formName, state) {
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
            if (this.formData.parentId === this.formData.sourcesId.toString()) {
              this.$message({message: '不能将要修改的资源作为父资源', type: 'warning'})
              return
            }
            this.newResouce(state)
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
    width: 900px;
  }
  .foot-btn{
    width: 900px;
    margin-top: 40px;
    text-align: center;
  }
</style>
