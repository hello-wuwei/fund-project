<template lang="html">
  <div class="page">
    <com-breadcrumb :list="['托管人管理']"></com-breadcrumb>
    <div class="content-main">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="关键词">
          <el-input v-model="formData.keyword" placeholder="请输入要查找的托管人名称" size="small"></el-input>
        </el-form-item>
        <el-form-item label="启用状态">
          <el-select v-model="formData.state" placeholder="启用状态" size="small">
            <el-option label="全部" value=""></el-option>
            <el-option label="启用" value="3"></el-option>
            <el-option label="停用" value="1"></el-option>
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
        <el-table-column property="name" label="托管人名称" align="center"></el-table-column>
        <el-table-column property="mobile" label="主账号" align="center">
          <template slot-scope="scope">{{scope.row.mobile}}</template>
        </el-table-column>
        <el-table-column property="state" label="启用状态" align="center">
          <template slot-scope="scope">{{scope.row.state==3?'启用':'停用'}}</template>
        </el-table-column>
        <el-table-column property="roleInfo" label="所属角色" :formatter="em" align="center"></el-table-column>
        <el-table-column property="created" label="创建时间" align="center">
          <template slot-scope="scope">{{scope.row.created | date}}</template>
        </el-table-column>
        <el-table-column label="操作" align="left" width="460">
          <template slot-scope="scope">
            <el-button v-if="USER_CUST_ROOT" size="mini" type="primary" @click="getRole_user(scope.row.userId)">授 权</el-button>
            <el-button v-if="USER_CUST_EDIT" size="mini" type="primary" @click="editAccount(scope.row.userId)">修 改</el-button>
            <el-button v-if="USER_CUST_USED" size="mini" @click="disabledUse(scope.row.userId, scope.row.state)">{{scope.row.state==3?'停 用':'启 用'}}</el-button>
            <el-button v-if="USER_CUST_RESET" size="mini" @click="resetPassword(scope.row.userId)">密码重置</el-button>
            <el-button size="mini" v-if="USER_CUST_ORGINFO && scope.row.needEdit == 1" @click="addOrgInfo(scope.row.userId)">编辑托管人机构信息</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="foot-bottom">
        <el-button v-if="USER_CUST_NEW" class="bom-btn" size="mini" icon="el-icon-plus" @click="addAccount">新增账号</el-button>
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


    <el-dialog title="授权" :visible.sync="dialogShow" width="400px">
      <div class="con-box">
        <el-checkbox-group v-model="curRoleIds">
          <div v-for="(role,index) in rolelist">
            <el-checkbox :label="role.roleId" :key="index">{{role.name}}</el-checkbox>
          </div>
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

      // 密码重置
      resetPassword (userId) {
        this.$confirm('确定要重置该托管人的密码吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.submitResetPsd(userId)
        }).catch(() => {
        })
      },

      async submitResetPsd (userId) {
        let res = await this.$sever.custodianResetPsd({sysCode: 'TTD_MANAGE_SYSTEM', userId: userId})
        switch (res.code) {
          case 0:
            this.$message({message: '密码重置成功', type: 'success'})
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      // 获取托管人列表
      async getDataList () {
        this.formData.createdStart = this.formatDate(this.formData.createdStart)
        this.formData.createdEnd = this.formatDate(this.formData.createdEnd)
        let res = await this.$sever.getCustodianlist(this.formData)
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
        this.$router.push({path: '/home/custodian/addorginfo', query: {userId: userId}})
      },

      addAccount () {
        this.$router.push({path: '/home/custodian/add'})
      },
      editAccount (userId) {
        this.$router.push({path: '/home/custodian/edit', query: {userId: userId}})
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

