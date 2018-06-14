<template lang="html">
  <div class="page">
    <com-breadcrumb :list="['存证模板管理']"></com-breadcrumb>
    <div class="content-main">

      <el-table header-row-class-name="table-header-define" class="table-btn-style" :data="tableData" highlight-current-row style="width: 100%">
        <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
        <el-table-column property="alias" label="模板代码" align="center"></el-table-column>
        <el-table-column property="name" label="模板名称" align="center"></el-table-column>
        <el-table-column property="remark" label="模板说明" align="center"></el-table-column>
        <el-table-column property="created" label="创建时间" align="center">
          <template slot-scope="scope">
            {{scope.row.created | date}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="edit(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="primary" @click="see(scope.row.id)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="foot-bottom">
        <el-button class="bom-btn" size="mini" icon="el-icon-plus" @click="add">新增存证模板</el-button>
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
          keywords: '',
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
      // 获取列表
      async getDataList () {
        let res = await this.$sever.getExistEvidenceList(this.formData)
        switch (res.code) {
          case 0:
            this.tableData = res.data.list
            this.total = res.data.total
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      add () {
        this.$router.push({path: '/home/existevidence/add'})
      },

      edit (id) {
        this.$router.push({path: '/home/existevidence/edit', query: {id: id}})
      },

      see (id) {
        this.$router.push({path: '/home/existevidence/see', query: {id: id}})
      },

      getAllDataList () {
        this.formData.keyword = ''
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

