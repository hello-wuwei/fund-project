<template lang="html">
  <div class="page">
    <com-breadcrumb :list="['角色管理', '查看角色']"></com-breadcrumb>
    <div class="content-main">
      <div class="border-line">
        <scroll-bar>
          <el-form class="form-list" style="width: 600px" :model="submitData" ref="ruleForm" :rules="rules" label-position="right" label-width="120px">
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
      <div slot="footer" class="dialog-footer">
        <el-button @click="$router.back()">返 回</el-button>
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
      this.submitData.roleId = this.$route.query.roleId
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
        let res = await this.$sever.showRoleInfo({roleId: this.submitData.roleId, sysCode: 'TTD_MANAGE_SYSTEM'})
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
      }
    }
  }
</script>
<style lang="css">
</style>
<style lang="css" scoped>
</style>

