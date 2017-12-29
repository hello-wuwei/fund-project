<template lang="html">
  <div class="page">
    <!--<div class="top-tab">托管人管理</div>-->
    <div class="content-main">
      <el-table header-row-class-name="table-header-define" :data="tableData" highlight-current-row style="width: 100%">
        <el-table-column type="index" align="center" width="50"></el-table-column>
        <el-table-column property="title" label="参数名称" align="center"></el-table-column>
        <el-table-column property="value" label="参数内容" align="center"></el-table-column>
        <el-table-column property="created" label="生效时间" align="center">
          <template slot-scope="scope">{{scope.row.created | date}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="showAlertInfo(scope.row.id)">编 辑</el-button>
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

    <el-dialog title="编辑" :visible.sync="dialogVisible" width="30%">
      <el-form style="margin-left: 60px">
        <el-form-item :label="currentParam.title">
          <el-input placeholder="请输入客服电话" v-model="currentParam.value" size="small" style="width: 300px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveParam">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        dialogVisible: false,
        currentParam: '',
        curId: '',

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
    watch: {
    },
    computed: {
    },
    methods: {
      // 获取系统账号列表
      async getDataList () {
        let res = await this.$sever.getParamList(this.formData)
        switch (res.code) {
          case 0:
            this.tableData = res.data.list
            this.total = res.data.total
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      async showAlertInfo (id) {
        this.curId = id
        let res = await this.$sever.getParamInfo({id: id, sysCode: 'TTD_MANAGE_SYSTEM'})
        switch (res.code) {
          case 0:
            this.currentParam = res.data.bean
            this.dialogVisible = true
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      async saveParam () {
        let res = await this.$sever.saveParamInfo({id: this.curId, value: this.currentParam.value})
        switch (res.code) {
          case 0:
            this.$message({message: '保存成功', type: 'success'})
            this.dialogVisible = false
            this.getDataList()
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

