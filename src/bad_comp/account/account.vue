<template lang="html">
  <div class="account-main">
    <div class="account-main-search">

    </div>
    <div class="account-table">
      <el-table :data="tableData.list" size="small" style="width: 100%">
        <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
        <el-table-column prop="userName" label="姓名"  align="center"></el-table-column>
        <el-table-column prop="loginName" label="账号" width="100"></el-table-column>
        <el-table-column prop="orgName" label="所属组织"  width="100"></el-table-column>
        <el-table-column prop="roleName" label="后台角色"  align="center"></el-table-column>
        <el-table-column prop="appRoleName" label="APP角色"  align="center"></el-table-column>
        <el-table-column prop="userState" label="启用状态" align="center">
          <template slot-scope="scope">
            {{scope.row.userState === 'USER_STATE_PASSED' ? '启用' : '停用'}}
          </template>
        </el-table-column>
        <el-table-column prop="created" label="新增时间" width="150" align="center">
          <template slot-scope="scope">
            {{util.formatDate(scope.row.created, 'yyyy-MM-dd hh:mm:ss')}}
          </template>
        </el-table-column>
        <el-table-column prop="actions" label="操作" width="440">
          <template slot-scope="scope" v-if="scope.row.parentAccount">
            <el-button type="primary" size="mini" @click="onModify(scope.row)">修改</el-button>
            <el-button size="mini" @click="onRemove(scope.row)">删除</el-button>
            <el-button size="mini" @click="onChangeState(scope.row)">
              {{scope.row.userState === 'USER_STATE_PASSED' ? '停用' : '启用'}}
            </el-button>
            <el-button type="primary" size="mini" @click="onRevert(scope.row)">密码重置</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="account-foot">
      <div class="account-foot-btn">
        <el-button @click="handleAdd" size="small" icon="el-icon-plus" class="add-btn" plain>新增账号</el-button>
      </div>
      <div class="account-foot-page">
        <el-pagination
          :total="tableData.total"
          :page-size="tableData.pageSize"
          @current-change="handleCurrentChange"
          :current-page.sync="params.pageNum"
          layout="prev, pager, next, jumper"
          prev-text="上一页"
          next-text="下一页">
        </el-pagination>
      </div>
    </div>
    <el-dialog
      title="子账号权限"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose">
      <el-tree
        ref="treePerm"
        :data="rolePermission"
        node-key="roleId"
        :auto-expand-parent="false"
        :expand-on-click-node="false"
        default-expand-all
        check-strictly
        :props="defaultProps"
        show-checkbox>
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setPerm">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="APP权限"
      :visible.sync="appDialogVisible"
      width="30%"
      :before-close="handleAppClose">
      <el-radio-group v-model="appRole">
        <el-radio label="APP_ROLE_FINANCIAL_PLANNER">理财师角色</el-radio>
        <el-radio label="APP_ROLE_FEEDBACK_VISIT">回访角色</el-radio>
      </el-radio-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="appDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setAppPerm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Api from '../api'
  import {post} from '@/api/http.js'
  export default {
    data () {
      return {
        dialogVisible: false,
        appDialogVisible: false,
        defaultProps: {
          children: 'subList',
          label: 'roleName'
        },
        appRole: '',
        rolePermission: [],
        params: {
          pageNum: 1
        }
      }
    },
    props: {
      tableData: Object,
      orgList: Array,
      token: Object
    },
    methods: {
      handleCurrentChange (page) {
        this.params.pageNum = page
        this.getSearch()
      },
      // 该改变父组件tab标签的选中项
      handleAdd () {
        this.$emit('handlePlus', {
          label: '新增账号',
          type: 'AccountAdd',
          index: 'add'
        })
      },
      async getRolePermision (data) {
        // 分配权限，先查询子账号下的角色列表
        let response = await post(Api.account.roleList, {
          userId: this.token.userId,
          subUserId: this.accountId
        })
        if (response.code === 0) {
          this.rolePermission = response.data.list
          // 回填 账号 的角色，并修改
          let arr = []
          this.rolePermission.map(item => {
            if (item.subUserIsOwn) {
              arr.push(item.roleId)
            }
          })
          this.$refs.treePerm.setCheckedKeys(arr)
        }
      },
      // 授权 子账号（修改角色）
      onAssign (data) {
        this.dialogVisible = true
        this.accountId = data.userId // 暂存子账号ID
        this.getRolePermision(data)
      },
      // 确定授权
      async setPerm () {
        let keys = this.$refs.treePerm.getCheckedKeys()
        let response = await post(Api.role.setRole, {
          userId: this.token.userId,
          subUserId: this.accountId,
          roleIdStr: keys.join(',')
        })
        if (response.code === 0) {
          this.$message({
            message: '子账号授权成功!',
            type: 'success',
            center: true
          })
          this.dialogVisible = false
          this.$emit('refresh')
        }
      },
      // 关闭权限 弹框
      handleClose (done) {
        this.dialogVisible = false
        done()
      },

      // app授权
      onAssignApp (data) {
        this.accountId = data.userId // 暂存子账号ID
        this.appDialogVisible = true
        this.appRole = ''
        if (data.appRoleName === '理财师角色') {
          this.appRole = 'APP_ROLE_FINANCIAL_PLANNER'
        } else if (data.appRoleName === '回访角色') {
          this.appRole = 'APP_ROLE_FEEDBACK_VISIT'
        }
      },
      // 确定APP授权
      async setAppPerm () {
        if (!this.appRole) {
          this.$message.warning('请选择权限')
        } else {
          let response = await post(Api.account.setAppRole, {
            userId: this.token.userId,
            childUserId: this.accountId,
            roleCodeStr: this.appRole
          })
          if (response.code === 0) {
            this.$message({
              message: '子账号App授权成功!',
              type: 'success',
              center: true
            })
            this.appDialogVisible = false
            this.$emit('refresh')
          }
        }
      },
      // 关闭APP授权 弹框
      handleAppClose (done) {
        this.appDialogVisible = false
        done()
      },
      // 删除 子账号
      async onRemove (data) {
        this.$confirm('确定删除该账号？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let response = await post(Api.account.remove, {
            userId: this.token.userId,
            childUserId: data.userId
          })
          if (response.code === 0) {
            this.$emit('refresh')
          }
        }).catch()
      },
      // 启用 、停用
      async onChangeState (data) {
        let response = await
          post(Api.account.enable, {
            userId: data.userId,
            parentAccount: this.token.userId,
            userState: data.userState === 'USER_STATE_PASSED' ? 'USER_STATE_STOP' : 'USER_STATE_PASSED'
          })
        if (response.code === 0) {
          this.$emit('refresh')
        }
      },
      // 重置子账号密码
      async onRevert (data) {
        let response = await post(Api.account.resetPassword, {
          userId: data.userId,
          password: Api.defaultPass,
          parentAccount: this.token.userId
        })
        if (response.code === 0) {
          this.$message({
            message: '子账号密码重置成功!',
            type: 'success',
            center: true
          })
        }
      },
      onModify (data) {
        this.$emit('handlePlus', {
          label: '修改账号',
          type: 'AccountEdit',
          index: 'modify' + data.userId,
          content: data
        })
      }
    }
  }
</script>

