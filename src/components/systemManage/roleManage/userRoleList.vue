<template lang="html">
  <div class="page">
    <com-breadcrumb :list="['角色管理']"></com-breadcrumb>
    <!--<div class="top-tab">托管人管理</div>-->
    <div class="content-main">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="关键词">
          <el-input v-model="formData.keyword" placeholder="请输入要查找的角色名称" size="small"></el-input>
        </el-form-item>
        <el-form-item label="启用状态">
          <el-select v-model="formData.isUsed" placeholder="全部" size="small">
            <el-option label="全部" value=""></el-option>
            <el-option label="启用" value="1"></el-option>
            <el-option label="停用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker v-model="formData.createdStart" type="date" size="small" placeholder="选择日期" suffix-icon="icon-user"></el-date-picker>
          至
          <el-date-picker v-model="formData.createdEnd" type="date" size="small" placeholder="选择日期" suffix-icon="icon-user"></el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="getDataList" size="small" class="btn-revise">搜 索</el-button>
        </el-form-item>
      </el-form>

      <el-table header-row-class-name="table-header-define" class="table-btn-style" :data="tableData" highlight-current-row style="width: 100%">
        <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
        <el-table-column property="name" label="角色名称" align="center"></el-table-column>
        <el-table-column property="description" :formatter="em" label="角色描述" align="center"></el-table-column>
        <el-table-column property="state" label="启用状态" align="center">
          <template slot-scope="scope">{{scope.row.isUsed==1?'启用':'停用'}}</template>
        </el-table-column>
        <el-table-column property="created" label="创建时间" align="center">
          <template slot-scope="scope">{{scope.row.created | date}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="400">
          <template slot-scope="scope">
            <div v-if="!scope.row.isAdmin">
              <el-button v-if="SYS_ROLE_ROOT" size="mini" type="primary" @click="getAuth(scope.row.roleId)">授 权</el-button>
              <el-button v-if="SYS_ROLE_EDIT" size="mini" type="primary" @click="editAccount(scope.row.roleId)">修 改</el-button>
              <el-button v-if="SYS_ROLE_SEE" size="mini" type="primary" @click="seeAccount(scope.row.roleId)">查 看</el-button>
              <el-button v-if="SYS_ROLE_DELE" size="mini" @click="deleteAlert(scope.row.roleId)">删 除</el-button>
              <el-button v-if="SYS_ROLE_USED" size="mini" @click="stopUsed(scope.row.roleId)">{{scope.row.isUsed==1?'停 用':'启 用'}}</el-button>
            </div>
            <div v-else>- - -</div>
          </template>
        </el-table-column>
      </el-table>

      <div class="foot-bottom">
        <el-button v-if="SYS_ROLE_NEW" icon="el-icon-plus" class="bom-btn" size="mini" @click="addAccount">新增角色</el-button>
        <el-pagination
          style="float: right"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="10"
          prev-text="上一页"
          next-text="下一页"
          layout="total, prev, pager, next, jumper"
          :total="parseInt(total)">
        </el-pagination>
      </div>
    </div>

    <el-dialog title="授权" :visible.sync="dialogShow" width="500px">
      <div class="con-box">
        <el-tree
          :data="treeData"
          show-checkbox
          :default-expanded-keys="[131]"
          node-key="sourcesId"
          ref="tree"
          highlight-current
          :props="defaultProps">
        </el-tree>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogShow = false">取 消</el-button>
        <el-button type="primary" @click="roleAuthorize">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        dialogShow: false,
        treeData: [],
        defaultProps: {
          id: 'sourcesId',
          children: 'subList',
          label: 'name'
        },
        roleId: '',

        currentPage: 1,
        formData: {
          sysCode: 'TTD_MANAGE_SYSTEM',
          keyword: '',
          isUsed: '',
          createdStart: '',
          createdEnd: '',
          pageNum: 1
        },
        total: '',
        tableData: []
      }
    },
    created () {
      this.getDataList()
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

      // 初始化节点树，将子节点的父节点以及父父节点以及父父父添加到子节点，（注：最多四层节点）
      initNodeTree (nodeTree) {
        let eqFun = (nodetree) => {
          for (let i = 0; i < nodetree.length; i++) {
            nodetree[i].rootParentId = ''
            nodetree[i].grandParentId = ''
            if (nodetree[i].subList.length) {
              for (let j = 0; j < nodetree[i].subList.length; j++) {
                nodetree[i].subList[j].rootParentId = ''
                nodetree[i].subList[j].grandParentId = ''
                if (nodetree[i].subList[j].subList.length) {
                  for (let k = 0; k < nodetree[i].subList[j].subList.length; k++) {
                    nodetree[i].subList[j].subList[k].rootParentId = ''
                    nodetree[i].subList[j].subList[k].grandParentId = nodetree[i].sourcesId
                    if (nodetree[i].subList[j].subList[k].subList.length) {
                      for (let z = 0; z < nodetree[i].subList[j].subList[k].subList.length; z++) {
                        nodetree[i].subList[j].subList[k].subList[z].rootParentId = nodetree[i].sourcesId
                        nodetree[i].subList[j].subList[k].subList[z].grandParentId = nodetree[i].subList[j].sourcesId
                      }
                    }
                  }
                }
              }
            }
          }
        }
        eqFun(nodeTree)
        return nodeTree
      },

      // 传入参数获取资源树会显示某个资源当前角色是否拥有，不传入参数则获取原始资源树
      async getAuth (roleId) {
        this.dialogShow = true
        this.roleId = roleId
        let res = await this.$sever.getSystemRoleIdTree({sysCode: 'TTD_MANAGE_SYSTEM', roleId: roleId})
        switch (res.code) {
          case 0:
            this.treeData = this.initNodeTree(res.data.bean)
            this.$refs.tree.setCheckedKeys(this.eq_nodeTree(this.treeData))
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      // 对选中的数据进行处理，拿到子节点的父节点以及父父节点并去重，得到要提交的ids
      sub_eq_nodeTree (nodetree) {
        let nodeIds = []
        let eqFun = (nodetree) => {
          for (let i = 0; i < nodetree.length; i++) {
            if (nodetree[i].subList.length === 0) {
              nodeIds.push(nodetree[i].sourcesId)
              nodeIds.push(nodetree[i].parentId)
              nodeIds.push(nodetree[i].rootParentId)
              nodeIds.push(nodetree[i].grandParentId)
            } else {
              eqFun(nodetree[i].subList)
            }
          }
        }
        eqFun(nodetree)
        nodeIds = Array.from(new Set(nodeIds))
        nodeIds.forEach((item, index) => {
          if (item === -1 || item === '') {
            nodeIds.splice(nodeIds.indexOf(item), 1)
          }
        })
        return nodeIds
      },

      async roleAuthorize () {
        let sourceIds = this.$refs.tree.getCheckedNodes()
        sourceIds = this.sub_eq_nodeTree(sourceIds).join(',')
        let res = await this.$sever.systemRoleAuthorize({sysCode: 'TTD_MANAGE_SYSTEM', roleId: this.roleId, sourcesIds: sourceIds})
        switch (res.code) {
          case 0:
            this.$message({message: '授权成功', type: 'success'})
            this.dialogShow = false
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      // 获取角色列表
      async getDataList () {
        this.formData.createdStart = this.formatDate(this.formData.createdStart)
        this.formData.createdEnd = this.formatDate(this.formData.createdEnd)
        let res = await this.$sever.getUserRoleList(this.formData)
        switch (res.code) {
          case 0:
            this.tableData = res.data.list
            this.total = res.data.total
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      getAllDataList () {
        this.formData.keyword = ''
        this.formData.isUsed = ''
        this.formData.createdStart = ''
        this.formData.createdEnd = ''
        this.getDataList()
      },

      addAccount () {
        this.$router.push({path: '/home/roleManage/addRole'})
      },
      editAccount (roleId) {
        this.$router.push({path: '/home/roleManage/editRole', query: {roleId: roleId}})
      },
      seeAccount (roleId) {
        this.$router.push({path: '/home/roleManage/seeRole', query: {roleId: roleId}})
      },
      async stopUsed (roleId) {
        let res = await this.$sever.changeRoleUsed({roleId: roleId, sysCode: 'TTD_MANAGE_SYSTEM'})
        switch (res.code) {
          case 0:
            this.$message({message: '操作成功', type: 'success'})
            this.getDataList()
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      deleteAlert (roleId) {
        this.$confirm('确定删除该角色吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteRole(roleId)
        }).catch(() => {
        })
      },

      async deleteRole (roleId) {
        let res = await this.$sever.deleteUserRole({roleId: roleId, sysCode: 'TTD_MANAGE_SYSTEM'})
        switch (res.code) {
          case 0:
            this.$message({message: '删除成功', type: 'success'})
            this.getDataList()
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },
      handleCurrentChange (val) {
        this.formData.pageNum = val
        this.getDataList()
      }
    }
  }
</script>
<style lang="css">
</style>
<style lang="css" scoped>
</style>

