<template lang="html">
  <div class="page">
    <com-breadcrumb :list="['标签模板']"></com-breadcrumb>
    <div class="content-main">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="关键词">
          <el-input v-model="formData.keyword" placeholder="请输入关键字" size="small"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="getDataList" size="small" class="btn-revise">搜 索</el-button>
        </el-form-item>
      </el-form>

      <el-table header-row-class-name="table-header-define" class="table-btn-style" :data="tableData" highlight-current-row style="width: 100%">
        <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
        <el-table-column property="templateName" label="模板名称" align="center"></el-table-column>
        <el-table-column property="description" label="模板说明" align="center">
          <template slot-scope="scope">
            {{scope.row.description || '--'}}
          </template>
        </el-table-column>
        <el-table-column property="name" label="创建时间" align="center">
          <template slot-scope="scope">
            {{scope.row.created | date}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button v-if="PROD_TEMP_EDIT" size="mini" type="primary" @click="editTemplet(scope.row.templateId)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="foot-bottom">
        <el-button v-if="PROD_TEMP_NEW" class="bom-btn" size="mini" icon="el-icon-plus" @click="dialogVisible=true">新增标签模板</el-button>
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

    <el-dialog title="新增模板" :visible.sync="dialogVisible" width="500px">
      <el-form label-width="100px">
        <el-form-item label="模板名称：">
          <el-input v-model="saveData.templateName" size="small" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="模板说明：">
          <el-input type="textarea" v-model="saveData.description" size="small" style="width: 300px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addTemplet">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        currentPage: 1,
        formData: {
          sysCode: 'TTDFUND',
          keyword: '',
          pageNum: 1
        },

        dialogVisible: false,
        saveData: {
          sysCode: 'TTDFUND',
          templateId: '',
          templateName: '',
          labelContent: '',
          description: ''
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
        let res = await this.$sever.getLabelTempletList(this.formData)
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
        this.getDataList()
      },
      editTemplet (templateId) {
        this.$router.push({path: '/home/labeltemplet/templetdone', query: {templateId: templateId}})
      },
      async addTemplet () {
        if (!this.saveData.templateName) {
          this.$message({message: '请填写模板名称', type: 'warning'})
          return
        }
        let res = await this.$sever.addTemplet(this.saveData)
        switch (res.code) {
          case 0:
            this.$message({message: '新增成功', type: 'success'})
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

