<template lang="html">
  <div class="page">
    <com-breadcrumb :list="['存证报告申请列表']"></com-breadcrumb>
    <div class="content-main">
      <!--<el-form :inline="true" class="demo-form-inline">-->
        <!--<el-form-item label="UKEY类型">-->
          <!--<el-select v-model="formData.ukeyType" placeholder="请选择UKEY类型" size="small">-->
            <!--<el-option label="全部" value=""></el-option>-->
            <!--<el-option label="法人章" value="1"></el-option>-->
            <!--<el-option label="业务章" value="2"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="有效时间">-->
          <!--<el-date-picker v-model="formData.createdStart" type="date" size="small" placeholder="选择日期" suffix-icon="icon-user"></el-date-picker>-->
          <!--至-->
          <!--<el-date-picker v-model="formData.createdEnd" type="date" size="small" placeholder="选择日期" suffix-icon="icon-user"></el-date-picker>-->
        <!--</el-form-item>-->

        <!--<el-form-item>-->
          <!--<el-button type="primary" @click="getDataList" size="small" class="btn-revise">搜 索</el-button>-->
        <!--</el-form-item>-->
      <!--</el-form>-->

      <el-table header-row-class-name="table-header-define" class="table-btn-style" :data="tableData" highlight-current-row style="width: 100%">
        <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
        <el-table-column property="applicantUserName" label="报告申请人" align="center"></el-table-column>
        <el-table-column property="name" label="申请时间" align="center">
          <template slot-scope="scope">
            {{scope.row.created | date}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="see(scope.row.applyListId)">查看</el-button>
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
      // 获取印章列表
      async getDataList () {
        let res = await this.$sever.getEvidReportList(this.formData)
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
        this.getDataList()
      },
      see (id) {
        this.$router.push({path: '/home/evidsearch/see', query: {id: id}})
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

