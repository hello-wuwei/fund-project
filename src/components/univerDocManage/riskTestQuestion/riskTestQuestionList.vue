<template lang="html">
  <div class="page">
    <com-breadcrumb :list="['风险测评问卷']"></com-breadcrumb>
    <div class="content-main">
      <!--<el-form :inline="true" class="demo-form-inline">-->
        <!--<el-form-item label="UKEY类型">-->
          <!--<el-select v-model="formData.ukeyType" placeholder="请选择UKEY类型" size="small">-->
            <!--<el-option label="全部" value=""></el-option>-->
            <!--<el-option label="法人章" value="1"></el-option>-->
            <!--<el-option label="业务章" value="2"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->

        <!--<el-form-item>-->
          <!--<el-button type="primary" @click="getDataList" size="small" class="btn-revise">搜 索</el-button>-->
        <!--</el-form-item>-->
      <!--</el-form>-->

      <el-table header-row-class-name="table-header-define" class="table-btn-style" :data="tableData" highlight-current-row style="width: 100%">
        <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
        <el-table-column property="name" label="问卷名称" align="center">
          <template slot-scope="scope">
            {{scope.row.name + '测评问卷'}}
          </template>
        </el-table-column>
        <el-table-column property="name" label="所属管理人" align="center"></el-table-column>
        <el-table-column property="created" label="接收时间" align="center">
          <template slot-scope="scope">
            {{scope.row.created | date}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button v-if="COMF_QUES_PERS" size="mini" type="primary" @click="seeDetail(scope.row.userId, 1003)">个人问卷</el-button>
            <el-button v-if="COMF_QUES_ORG" size="mini" type="primary" @click="seeDetail(scope.row.userId, 1004)">机构问卷</el-button>
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

    <el-dialog title="问卷详情" :visible.sync="dialogVisible">
      <evaluation-list :evaluationData="evaluationData"/>
    </el-dialog>

  </div>
</template>

<script>
  import EvaluationList from './evaluation.vue'
  export default {
    components: {
      EvaluationList
    },
    data () {
      return {
        dialogVisible: false,

        currentPage: 1,
        formData: {
          sysCode: 'TTD_MANAGE_SYSTEM',
          pageNum: 1
        },
        total: '',
        tableData: [],

        evaluationData: []
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
      // 获取列表
      async getDataList () {
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
        this.getDataList()
      },
      async seeDetail (userId, type) {
        let data = {
          sysCode: type,
          managerAdminUserId: userId
        }
        let res = await this.$sever.getQuestionnaireList(data)
        switch (res.code) {
          case 0:
            this.evaluationData = res.data.list || []
            this.dialogVisible = true
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

