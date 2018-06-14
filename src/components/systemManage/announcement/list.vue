<template lang="html">
  <div class="page">
    <com-breadcrumb :list="['公告发布']"></com-breadcrumb>
    <div class="content-main">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="关键词">
          <el-input v-model="formData.keyword" placeholder="请输入关键词" size="small"></el-input>
        </el-form-item>
        <el-form-item label="发布时间">
          <el-date-picker v-model="formData.createdStart" type="date" size="small" placeholder="选择日期" suffix-icon="icon-user"></el-date-picker>
          至
          <el-date-picker v-model="formData.createdEnd" type="date" size="small" placeholder="选择日期" suffix-icon="icon-user"></el-date-picker>
        </el-form-item>
        <el-form-item label="发布对象">
          <el-select v-model="formData.publishUser" placeholder="全部" size="small">
            <el-option label="全部" value=""></el-option>
            <el-option label="托管人后台" value="1"></el-option>
            <el-option label="管理人后台" value="3"></el-option>
            <el-option label="投资人APP" value="5"></el-option>
            <el-option label="管理人APP" value="7"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="getDataList" size="small" class="btn-revise">搜 索</el-button>
        </el-form-item>
      </el-form>

      <el-table header-row-class-name="table-header-define" class="table-btn-style" :data="tableData" highlight-current-row style="width: 100%">
        <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
        <el-table-column property="title" label="公告名称" align="center"></el-table-column>
        <el-table-column property="publishUser" label="发布对象" align="center">
          <template slot-scope="scope">{{{1: '托管人后台', 3: '管理人后台', 5: '投资人APP', 7: '管理人APP'}[scope.row.publishUser]}}</template>
        </el-table-column>
        <el-table-column property="created" label="发布时间" align="center">
          <template slot-scope="scope">{{scope.row.created | date}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="see(scope.row.id)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="foot-bottom">
        <el-button class="bom-btn" size="mini" icon="el-icon-plus" @click="add">添加公告</el-button>
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

    <el-dialog title="新增" :visible.sync="dialogVisible">
      <el-form>
        <el-form-item label="公告名称：">
          <el-input placeholder="请输入公告名称" v-model="saveData.title" size="small" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="公告类型：">
          <el-input placeholder="请输入公告类型" v-model="saveData.type" size="small" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="发布对象：">
          <el-input placeholder="请输入消息类型" v-model="saveData.publishUser" size="small" style="width: 300px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveParam(row)">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        dialogVisible: false,

        currentPage: 1,
        formData: {
          sysCode: 'TTD_MANAGE_SYSTEM',
          keyword: '',
          createdStart: '',
          createdEnd: '',
          publishUser: '',
          pageNum: 1
        },
        saveData: {
          title: '',
          content: '',
          type: '',
          publishUser: ''
        },
        total: '',
        tableData: []
      }
    },
    created () {
      this.getDataList()
    },
    computed: {
    },
    methods: {
      // 获取列表
      async getDataList () {
        this.formData.createdStart = this.formatDate(this.formData.createdStart)
        this.formData.createdEnd = this.formatDate(this.formData.createdEnd)
        let res = await this.$sever.getAnnouncementList(this.formData)
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
        this.formData.publishUser = ''
        this.formData.createdStart = ''
        this.formData.createdEnd = ''
        this.getDataList()
      },

      add () {
        this.$router.push({path: '/home/announcement/add'})
      },
      see (id) {
        this.$router.push({path: '/home/announcement/see', query: {id: id}})
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

