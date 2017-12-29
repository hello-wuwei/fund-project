<template lang="html">
  <div class="page">
    <!--<div class="top-tab">托管人管理</div>-->
    <div class="content-main">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="关键词">
          <el-input v-model="formData.keyword" placeholder="请输入要查找的管理人名称" size="small"></el-input>
        </el-form-item>
        <el-form-item label="机构审查状态">
          <el-select v-model="formData.viewState" placeholder="请选择审查状态" size="small">
            <el-option label="全部" value=""></el-option>
            <el-option label="待审核" value="0"></el-option>
            <el-option label="审核失败" value="1"></el-option>
            <el-option label="待上传" value="2"></el-option>
            <el-option label="审核通过" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账户审查状态">
          <el-select v-model="formData.accountState" placeholder="请选择审查状态" size="small">
            <el-option label="全部" value=""></el-option>
            <el-option label="待审核" value="0"></el-option>
            <el-option label="审核失败" value="1"></el-option>
            <el-option label="待上传" value="2"></el-option>
            <el-option label="审核通过" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账号状态">
          <el-select v-model="formData.state" placeholder="请选择审查状态" size="small">
            <el-option label="全部" value=""></el-option>
            <el-option label="未开通" value="0"></el-option>
            <el-option label="已停用" value="1"></el-option>
            <el-option label="已开通" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="注册时间">
          <el-date-picker v-model="formData.createdStart" type="date" size="small" placeholder="选择日期" suffix-icon="icon-user"></el-date-picker>
          至
          <el-date-picker v-model="formData.createdEnd" type="date" size="small" placeholder="选择日期" suffix-icon="icon-user"></el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="getDataList" size="small">搜 索</el-button>
          <el-button type="primary" icon="el-icon-search" @click="getAllDataList" size="small">查看全部</el-button>
        </el-form-item>
      </el-form>

      <el-table header-row-class-name="table-header-define" :data="tableData" highlight-current-row style="width: 100%">
        <el-table-column type="index" align="center" width="50"></el-table-column>
        <el-table-column property="name" label="管理人名称" align="center"></el-table-column>
        <el-table-column property="mobile" label="主账号" align="center">
          <template slot-scope="scope">{{scope.row.mobile | mobHidden}}</template>
        </el-table-column>
        <el-table-column property="viewState" label="机构认证" align="center">
          <template slot-scope="scope">
            <i :style="stateColor(scope.row.viewState)">{{{0:'待审核',1:'审核失败',2:'待上传',3:'审核通过'}[scope.row.viewState]}}</i>
          </template>
        </el-table-column>
        <el-table-column property="stateAccount" label="账户认证" align="center">
          <template slot-scope="scope">
            <i :style="stateColor(scope.row.stateAccount)">{{{0:'待审核',1:'审核失败',2:'待上传',3:'审核通过'}[scope.row.stateAccount]}}</i>
          </template>
        </el-table-column>
        <el-table-column property="passwordState" label="数字密码" align="center">
          <template slot-scope="scope">
            {{{1:'未设置',3:'已设置'}[scope.row.passwordState]}}
          </template>
        </el-table-column>
        <el-table-column property="state" label="账号状态" align="center">
          <template slot-scope="scope">
            <i :style="stateColor(scope.row.state)">{{{0:'未开通',1:'已停用',3:'已开通'}[scope.row.state]}}</i>
          </template>
        </el-table-column>
        <el-table-column property="roleInfo"show-overflow-tooltip label="所属角色" align="center"></el-table-column>
        <el-table-column property="created" label="注册时间" align="center" width="160">
          <template slot-scope="scope">{{scope.row.created | date}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="300">
          <template slot-scope="scope">
            <el-button size="mini" v-if="scope.row.viewState==0" type="primary" @click="orgAppoint(scope.row.userId)">机构审核</el-button>
            <el-button size="mini" v-if="scope.row.stateAccount==0" type="primary" @click="accAppoint(scope.row.userId)">账户审核</el-button>
            <el-button size="mini" v-if="scope.row.viewState==3&&scope.row.stateAccount==3&&scope.row.state!=0" type="primary" @click="getRole_user(scope.row.userId)">授 权</el-button>
            <el-button
              size="mini"
              v-if="scope.row.viewState==1 || scope.row.stateAccount==1 || scope.row.viewState==3 || scope.row.stateAccount==3"
              type="primary"
              @click="seeInfo(scope.row.userId)">查 看</el-button>
            <el-button size="mini" @click="disabledUse(scope.row.userId,scope.row.state)">{{scope.row.state==1?'启 用':'停 用'}}</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="foot-bottom">
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
    data () {
      return {
        dialogShow: false,
        rolelist: [],
        curRoleIds: [],
        userId: '',

        currentPage: 1,
        formData: {
          sysCode: 'TTD_MANAGE_SYSTEM',
          keyword: '',
          viewState: '',
          accountState: '',
          state: '',
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
      stateColor (state) {
        return 'color:' + {
          0: '#FF8600',
          1: '#FF553C',
          2: '#333333',
          3: '#29C76C'
        }[state]
      },

      // 查询所有角色，若用户已拥有此角色，则checked字段为true,否则为false
      async getRole_user (userId) {
        this.dialogShow = true
        this.userId = userId
        let res = await this.$sever.getRole_user({sysCode: 'TTD_MANAGE_SYSTEM', userId: userId})
        switch (res.code) {
          case 0:
            this.rolelist = res.data.bean
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
        this.rolelist.forEach((item, index) => {
          if (item.checked) {
            this.curRoleIds.push(item.roleId)
          }
        })
      },

      // 停用或者启用
      async disabledUse (userId, state) {
        let res = await this.$sever.managerStopUsed({sysCode: 'TTD_MANAGE_SYSTEM', userId: userId})
        switch (res.code) {
          case 0:
            this.$message({message: (state === 1 ? ' 启用' : '停用') + '成功', type: 'success'})
            this.dialogShow = false
            this.getDataList()
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      // 提交选中角色（授权）
      async roleAuthorize () {
        let res = await this.$sever.roleAuthorizeManager({sysCode: 'TTD_MANAGE_SYSTEM', userId: this.userId, roleIds: this.roleIds})
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

      // 获取角色列表
      async getDataList () {
        this.formData.createdStart = this.formatDate(this.formData.createdStart)
        this.formData.createdEnd = this.formatDate(this.formData.createdEnd)
        let res = await this.$sever.getManagerlist(this.formData)
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
        this.formData.viewState = ''
        this.formData.accountState = ''
        this.formData.createdStart = ''
        this.formData.createdEnd = ''
        this.getDataList()
      },

      addAccount () {
        this.$emit('addTag', {title: '新增账号', name: 'addAccount'})
      },
      seeInfo (userId) {
        this.$emit('addTag', {title: '管理人查看', name: 'managerWatch', userId: userId})
      },
      orgAppoint (userId) {
        this.$emit('addTag', {title: '管理人机构审查', name: 'orgManagerCheck', userId: userId})
      },
      accAppoint (userId) {
        this.$emit('addTag', {title: '管理人账户审查', name: 'accManagerCheck', userId: userId})
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

