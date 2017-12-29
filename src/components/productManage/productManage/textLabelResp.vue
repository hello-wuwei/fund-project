<template lang="html">
  <div class="page">
    <!--<div class="top-tab">托管人管理</div>-->
    <div class="content-main">
      <el-table header-row-class-name="table-header-define" :data="tableData" highlight-current-row style="width: 100%">
        <el-table-column type="index" align="center" width="50"></el-table-column>
        <el-table-column property="labelCode" label="CODE" align="center"></el-table-column>
        <el-table-column property="labelName" label="文本标签名称" align="center"></el-table-column>
        <el-table-column property="isUsed" label="是否启用" align="center">
          <template slot-scope="scope">
            {{{0:'停用',1:'启用'}[scope.row.isUsed]}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="doneUse(scope.row.labelId,scope.row.isUsed)">{{{0:'启用',1:'停用'}[scope.row.isUsed]}}</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="foot-bottom">
        <!--<el-button icon="el-icon-plus" type="primary" size="small" @click="dialogVisible = true">新增文本标签</el-button>-->
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

      <div class="submit-foot-center">
        <el-button @click="$emit('removeTag', 'textLabelResp')">返 回</el-button>
      </div>

    </div>

    <el-dialog title="新增" :visible.sync="dialogVisible" width="30%">
      <el-form style="margin-left: 60px" :model="saveData" ref="ruleForm" :rules="rules" label-width="100px">
        <el-form-item label="标签名：" prop="labelName">
          <el-input placeholder="请输入标签名" v-model="saveData.labelName" size="small" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="标签编码：" prop="labelCode">
          <el-input placeholder="请输入标签编码" v-model="saveData.labelCode" size="small" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="是否启用：">
          <el-radio v-model="saveData.isUsed" label="1">是</el-radio>
          <el-radio v-model="saveData.isUsed" label="0">否</el-radio>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
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
        productId: '',
        saveData: {
          labelName: '',
          labelCode: '',
          isUsed: '1',
          labelId: ''
        },
        formData: {
          pageNum: 1
        },
        total: '',
        tableData: [],

        rules: {
          labelName: [
            { required: true, validator: this.validateName('标签名', 10), trigger: 'blur' }
          ],
          labelCode: [
            { required: true, message: '请输入标签编码', trigger: 'blur' }
          ]
        }
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
      // 获取产品列表
      async getDataList () {
        let res = await this.$sever.getLabelList(this.formData)
        switch (res.code) {
          case 0:
            this.tableData = res.data.list
            this.total = res.data.total
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      // 验证表单
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addTextLabel()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      async doneUse (id, isUsed) {
        let res = await this.$sever.changeUsedState({labelId: id})
        switch (res.code) {
          case 0:
            this.$message({message: (isUsed === 1 ? '停用' : '启用') + '成功', type: 'success'})
            this.getDataList()
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },
      async addTextLabel () {
        let res = await this.$sever.addTextLabel(this.saveData)
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

