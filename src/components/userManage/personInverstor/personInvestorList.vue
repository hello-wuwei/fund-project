<template lang="html">
  <div class="page">
    <!--<div class="top-tab">托管人管理</div>-->
    <div class="content-main">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="关键词">
          <el-input v-model="formData.keyword" placeholder="请输入要查找的角色名称" size="small"></el-input>
        </el-form-item>
        <el-form-item label="认证状态">
          <el-select v-model="formData.authState" placeholder="认证状态" size="small">
            <el-option label="未通过" value="0"></el-option>
            <el-option label="已通过" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账号状态">
          <el-select v-model="formData.state" placeholder="认证状态" size="small">
            <el-option label="未开通" value="0"></el-option>
            <el-option label="停用" value="1"></el-option>
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
        <el-table-column property="name" label="投资者姓名" align="center" width="100"></el-table-column>
        <el-table-column property="mobile" label="账号" align="center"></el-table-column>
        <el-table-column property="authState" label="身份认证状态" align="center">
          <template slot-scope="scope">{{scope.row.authState==1?'已通过':'未通过'}}</template>
        </el-table-column>
        <el-table-column property="state" label="账号状态" align="center" width="100">
          <template slot-scope="scope">{{scope.row.state==1?'启用':'停用'}}</template>
        </el-table-column>
        <el-table-column property="created" label="注册时间" align="center">
          <template slot-scope="scope">{{scope.row.created | date}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="disabledUse(scope.row.userId)">{{scope.row.state==1?'停 用':'启 用'}}</el-button>
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


  </div>
</template>

<script>
  export default {
    data () {
      return {
        currentPage: 1,
        formData: {
          sysCode: 'TTD_MANAGE_SYSTEM',
          keyword: '',
          authState: '',
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
    watch: {},
    methods: {
      // 停用或者启用
      async disabledUse (userId) {
        let res = await this.$sever.personInverState({sysCode: 'TTD_MANAGE_SYSTEM', userId: userId})
        switch (res.code) {
          case 0:
            this.$message({message: '操作成功', type: 'success'})
            this.getDataList()
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      // 获取投资人列表
      async getDataList () {
        this.formData.createdStart = this.formatDate(this.formData.createdStart)
        this.formData.createdEnd = this.formatDate(this.formData.createdEnd)
        let res = await this.$sever.getPersonInver(this.formData)
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
        this.formData.authState = ''
        this.formData.state = ''
        this.formData.createdStart = ''
        this.formData.createdEnd = ''
        this.getDataList()
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

