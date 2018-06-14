<template lang="html">
  <div class="page">
    <com-breadcrumb :list="['参数配置']"></com-breadcrumb>
    <div class="content-main">
      <el-table header-row-class-name="table-header-define" class="table-btn-style" :data="tableData" highlight-current-row style="width: 100%">
        <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
        <el-table-column property="title" label="参数名称" align="center"></el-table-column>
        <el-table-column property="value" label="参数内容" align="center"></el-table-column>
        <el-table-column property="created" label="创建时间" align="center">
          <template slot-scope="scope">{{scope.row.created | date}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button v-if="SYS_CONF_EDIT && scope.row.code=='CUSTOMER_SERVICE_PHONE'" size="mini" type="primary" @click="showAlertInfo(scope.row)">编 辑</el-button>
            <el-button v-if="SYS_CONF_EDIT && scope.row.code=='SYSTEM_REMIT_CER'" size="mini" type="primary" @click="saveParam(scope.row)">{{{0: '启 用', 1: '禁 用'}[scope.row.isUsed]}}</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="foot-bottom">
        <el-button style="display: none" type="primary" @click="clearCache">刷新参数配置缓存</el-button>
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
        currentParam: '',
        row: '',

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

      async showAlertInfo (row) {
        this.row = row
        let res = await this.$sever.getParamInfo({id: row.id, sysCode: 'TTD_MANAGE_SYSTEM'})
        switch (res.code) {
          case 0:
            this.currentParam = res.data.bean
            this.dialogVisible = true
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      async saveParam (row) {
        let data = {
          sysCode: 'TTD_MANAGE_SYSTEM'
        }
        switch (row.code) {
          case 'CUSTOMER_SERVICE_PHONE':
            data.id = this.row.id
            data.value = this.currentParam.value
            break
          case 'SYSTEM_REMIT_CER':
            data.id = row.id
            data.isUsed = row.isUsed === 1 ? 0 : 1
//            alert(data.isUsed)
        }
//        alert(JSON.stringify(data))
        let res = await this.$sever.saveParamInfo(data)
        if (res.code === 0) {
          switch (row.code) {
            case 'CUSTOMER_SERVICE_PHONE':
              this.$message({message: '保存成功', type: 'success'})
              this.dialogVisible = false
              break
            case 'SYSTEM_REMIT_CER':
              this.$message({message: '操作成功', type: 'success'})
          }
          this.getDataList()
        } else {
          this.$message({message: res.msg, type: 'warning'})
        }
      },

      async clearCache () {
        let res = await this.$sever.clearCache({sysCode: 'TTD_MANAGE_SYSTEM'})
        switch (res.code) {
          case 0:
            this.$message({message: '刷新成功', type: 'success'})
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

