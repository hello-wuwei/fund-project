<template lang="html">
  <div class="page">
    <div class="content-main">
      <div class="con-box">
        <scroll-bar>
          <el-form style="width: 600px" :model="submitData" ref="ruleForm" :rules="rules" label-position="right" label-width="120px">
            <el-form-item label="角色名称：" prop="name">{{submitData.name}}</el-form-item>
            <el-form-item label="角色描述：" prop="description">{{submitData.description}}</el-form-item>
            <el-form-item label="是否启用：" prop="state">{{submitData.isUsed==1?'是':'否'}}</el-form-item>
            <el-form-item label="角色权限：">
              <div style="position: absolute; width: 100%;height: 100%;top:0;left: 0;z-index: 100;padding-bottom: 10px"></div>
              <el-tree
                :data="treeData"
                show-checkbox
                default-expand-all
                node-key="sourcesId"
                :default-checked-keys="defaultCheckNode"
                ref="tree"
                highlight-current
                :props="defaultProps">
              </el-tree>
            </el-form-item>
          </el-form>
        </scroll-bar>
      </div>
      <span slot="footer" style="margin-left: 120px" class="dialog-footer">
        <el-button @click="$emit('removeTag', 'seeRole')">返 回</el-button>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['roleId'],
    data () {
      return {
        submitData: {
          sysCode: 'TOB_SYSTEM',
          name: '',
          description: '',
          isUsed: '',
          roleId: ''
        },

        rules: {
          name: [
            { required: false, message: '请输入角色名称！', trigger: 'blur' }
          ],
          description: [
            {required: false, message: '请输入角色描述！', trigger: 'blur'}
          ],
          isUsed: [
            { required: false, message: '请选择是否启用！', trigger: 'blur' }
          ]
        },

        treeData: [],
        defaultProps: {
          id: 'sourcesId',
          children: 'subList',
          label: 'name'
        },
        defaultCheckNode: []
      }
    },
    created () {
      this.submitData.roleId = this.roleId
      this.showRoleInfo()
    },
    methods: {
      // 遍历节点数
      eq_nodeTree (nodetree) {
        let nodeIds = []
        let eqFun = (nodetree) => {
          for (let i = 0; i < nodetree.length; i++) {
            if (nodetree[i].subList.length === 0) {
              if (nodetree[i].checked) {
                nodeIds.push(nodetree[i].sourcesId)
              }
            } else {
              eqFun(nodetree[i].subList)
            }
          }
        }
        eqFun(nodetree)
        return nodeIds
      },

      async showRoleInfo () {
        let res = await this.$sever.showRoleInfo({roleId: this.submitData.roleId, sysCode: 'TOB_SYSTEM'})
        switch (res.code) {
          case 0:
            this.submitData.name = res.data.bean.name
            this.submitData.description = res.data.bean.description
            this.submitData.isUsed = res.data.bean.isUsed
            this.treeData = res.data.bean.sourcesList
            this.defaultCheckNode = this.eq_nodeTree(this.treeData)
            console.log(this.eq_nodeTree(this.treeData))
            console.log('资源树：', this.treeData)
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      // 新增角色
      async newRole () {
        let res = await this.$sever.newUserRole(this.submitData)
        switch (res.code) {
          case 0:
            this.$message({message: '保存成功', type: 'success'})
            this.$emit('removeTag', 'seeRole')
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      // 验证表单
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.newRole()
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

