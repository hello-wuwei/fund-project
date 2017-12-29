<template lang="html">
  <div class="page">
    <!--<div class="top-tab">托管人管理</div>-->
    <div class="content-main">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="关键词">
          <el-input v-model="formData.keyword" placeholder="请输入管理人名称" size="small"></el-input>
        </el-form-item>
        <el-form-item label="印章状态">
          <el-select v-model="formData.state" placeholder="请选择印章状态" size="small">
            <el-option label="全部" value=""></el-option>
            <el-option label="未上传" value="1"></el-option>
            <el-option label="已添加" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="操作时间">
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
        <el-table-column property="name" label="托管人名称" align="center"></el-table-column>
        <el-table-column property="state" label="印章状态" align="center">
          <template slot-scope="scope">
            <span :style="'color:'+(scope.row.state==1?'red':'#4DC766')">{{{1:'未上传',3:'已添加'}[scope.row.state]}}</span>
          </template>
        </el-table-column>
        <el-table-column property="created" label="操作时间" align="center">
          <template slot-scope="scope">{{scope.row.created | date}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" v-if="scope.row.state==3" type="primary" @click="editSeal(scope.row.stampId)">编 辑</el-button>
            <el-button size="mini" v-if="scope.row.state==1" type="primary" @click="uploadSeal(scope.row.stampId)">上 传</el-button>
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
    },
    computed: {
    },
    methods: {
      // 获取印章列表
      async getDataList () {
        this.formData.createdStart = this.formatDate(this.formData.createdStart)
        this.formData.createdEnd = this.formatDate(this.formData.createdEnd)
        let res = await this.$sever.getCustodianSealList(this.formData)
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
      editSeal (stampId) {
        this.$emit('addTag', {title: '编辑', name: 'uploadSeal', stampId: stampId})
      },
      uploadSeal (stampId) {
        this.$emit('addTag', {title: '上传', name: 'uploadSeal', stampId: stampId})
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

