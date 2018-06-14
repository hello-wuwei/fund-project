<template lang="html">
  <div class="page">
    <!--<div class="top-tab">托管人管理</div>-->
    <div class="content-main">
      <!--<el-form :inline="true" class="demo-form-inline">-->
        <!--<el-form-item label="关键词">-->
          <!--<el-input v-model="formData.keyword" placeholder="请输入要查找的托管人名称" size="small"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="启用状态">-->
          <!--<el-select v-model="formData.state" placeholder="启用状态" size="small">-->
            <!--<el-option label="全部" value=""></el-option>-->
            <!--<el-option label="启用" value="3"></el-option>-->
            <!--<el-option label="停用" value="1"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="新增时间">-->
          <!--<el-date-picker v-model="formData.createdStart" type="date" size="small" placeholder="选择日期" suffix-icon="icon-user"></el-date-picker>-->
          <!--至-->
          <!--<el-date-picker v-model="formData.createdEnd" type="date" size="small" placeholder="选择日期" suffix-icon="icon-user"></el-date-picker>-->
        <!--</el-form-item>-->

        <!--<el-form-item>-->
          <!--<el-button type="primary" icon="el-icon-search" @click="getDataList" size="small">搜 索</el-button>-->
          <!--<el-button type="primary" icon="el-icon-search" @click="getAllDataList" size="small">查看全部</el-button>-->
        <!--</el-form-item>-->
      <!--</el-form>-->

      <el-table header-row-class-name="table-header-define" :data="tableData" highlight-current-row style="width: 100%">
        <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
        <el-table-column prop="userName" label="姓名"  align="center"></el-table-column>
        <el-table-column prop="loginName" label="账号" width="110"></el-table-column>
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
            <el-button type="primary" size="mini" @click="editAccount(scope.row)">修改</el-button>
            <el-button size="mini" @click="onRemove(scope.row)">删除</el-button>
            <el-button size="mini" @click="onChangeState(scope.row)">
              {{scope.row.userState === 'USER_STATE_PASSED' ? '停用' : '启用'}}
            </el-button>
            <el-button type="primary" size="mini" @click="onRevert(scope.row)">密码重置</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="foot-bottom">
        <el-button icon="el-icon-plus" type="primary" size="small" @click="addAccount">新增账号</el-button>
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


    <el-dialog title="授权" :visible.sync="dialogShow" width="800px">
      <div class="con-box">
        <el-checkbox-group v-model="curRoleIds">
          <el-checkbox v-for="(role,index) in rolelist" :label="role.roleId" :key="index">{{role.name}}</el-checkbox>
        </el-checkbox-group>
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
    props: {
      token: Object,
      row: Object
    },
    data () {
      return {
        dialogShow: false,
        rolelist: [],
        curRoleIds: [],
        userId: '',

        currentPage: 1,
        formData: {
          userId: 901,
          pageNum: 1
        },
        total: '',
        tableData: []
      }
    },
    created () {
      this.getDataList()
    },
    watch: {
      dialogShow (newVal, oldVal) {
        if (newVal === false) {
          this.curRoleIds = []
        }
      }
    },
    computed: {
      roleIds () {
        return this.curRoleIds.join(',')
      }
    },
    methods: {
      async onRemove (data) {
        this.$confirm('确定删除该账号？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let response = await this.$sever.deleteAccountBak({userId: this.token.userId, childUserId: data.userId})
          if (response.code === 0) {
            this.getDataList()
          }
        }).catch()
      },

      // 启用 、停用
      async onChangeState (data) {
        let response = await this.$sever.changeUsedBak({
          userId: data.userId,
          parentAccount: this.token.userId,
          userState: data.userState === 'USER_STATE_PASSED' ? 'USER_STATE_STOP' : 'USER_STATE_PASSED'
        })
        if (response.code === 0) {
          this.getDataList()
        }
      },

      // 重置子账号密码
      async onRevert (data) {
        let response = await this.$sever.revisePsdBak({
          userId: data.userId,
          password: 'smqy123',
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

      // 停用或者启用
      async disabledUse (userId, state) {
        let res = await this.$sever.custodianStopUsed({sysCode: 'TTD_MANAGE_SYSTEM', userId: userId})
        switch (res.code) {
          case 0:
            this.$message({message: (state === 3 ? '停用' : '启用') + '成功', type: 'success'})
            this.getDataList()
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      // 提交选中角色（授权）
      async roleAuthorize () {
        let res = await this.$sever.roleAuthorize({sysCode: 'TTD_MANAGE_SYSTEM', userId: this.userId, roleIds: this.roleIds})
        switch (res.code) {
          case 0:
            this.$message({message: '保存成功', type: 'success'})
            this.getDataList()
            this.dialogShow = false
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      // 获取托管人列表
      async getDataList () {
//        this.formData.createdStart = this.formatDate(this.formData.createdStart)
//        this.formData.createdEnd = this.formatDate(this.formData.createdEnd)
        let res = await this.$sever.getManagerBak(this.formData)
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
        this.formData.state = ''
        this.formData.createdStart = ''
        this.formData.createdEnd = ''
        this.getDataList()
      },

      addOrgInfo (userId) {
        this.$emit('addTag', {title: '新增托管人机构信息', name: 'addOrgInfo', userId: userId})
      },

      addAccount () {
        this.$emit('addTag', {title: '新增账号', name: 'addAccount'})
      },
      editAccount (row) {
        this.$emit('addTag', {title: '修改账号', name: 'editAccount', row: row})
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

