<template lang="html">
  <div class="page">
    <com-breadcrumb :list="['存证模板管理', '新增']"></com-breadcrumb>
    <div class="content-main">
      <div class="border-line">
        <el-form :model="submitData" ref="ruleForm" :rules="rules" label-position="right" label-width="120px">
          <el-form-item label="模板名称：">
            <el-autocomplete v-model="submitData.name" :fetch-suggestions="querySearchAsync" size="small" style="width: 300px" placeholder="请输入模板名称" @select="handleSelect"></el-autocomplete>
          </el-form-item>
          <!--<el-form-item label="模板名称：" prop="name">-->
            <!--<el-input v-model="submitData.name" placeholder="请输入模板名称" size="small" style="width: 300px"></el-input>-->
          <!--</el-form-item>-->
          <el-form-item label="模板代码：" prop="alias">
            <el-input v-model="submitData.alias" placeholder="请输入模板代码" size="small" style="width: 300px" disabled></el-input>
          </el-form-item>
          <el-form-item label="模板说明：" prop="remark">
            <el-input type="textarea" v-model="submitData.remark" placeholder="请输入模板说明" :rows="5"  style="width: 500px"></el-input>
          </el-form-item>
          <el-form-item label="模板内容：">
            <div class="editor-block">
              <Vueditor ref="editor"></Vueditor>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$router.back()">返 回</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">提 交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        submitData: {
          sysCode: 'TTD_MANAGE_SYSTEM',
          name: '',
          alias: '',
          remark: '',
          content: ''
        },

        rules: {
          name: [
            { required: true, message: '请输入模板名称', trigger: 'blur' }
          ],
          alias: [
            { required: true, message: '请输入模板代码', trigger: 'blur' }
          ],
          remark: [
            {required: true, message: '请输入模板说明', trigger: 'blur'}
          ],
          content: [
            {required: true, message: '请输入模板内容', trigger: 'blur'}
          ]
        }
      }
    },
    created () {
    },
    methods: {
      async querySearchAsync (queryString, cb) {
        let results = await this.createStateFilter(queryString)
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        })
      },
      async createStateFilter (queryString) {
        if (!queryString) {
          return []
        }
        let res = await this.$sever.getEvidTempltList({keyword: queryString})
        switch (res.code) {
          case 0:
            let templtList = res.data.list.map((item) => {
              return {
                value: item.mark,
                code: item.code
              }
            })
            return templtList
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      handleSelect (item) {
        this.submitData.alias = item.code
      },

      // 新增
      async add () {
        let res = await this.$sever.newExistEvidence(this.submitData)
        switch (res.code) {
          case 0:
            this.$message({message: '保存成功', type: 'success'})
            this.$router.back()
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      // 验证表单
      submitForm (formName) {
        this.submitData.content = this.$refs.editor.getContent()
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (!this.submitData.content) {
              this.$message({message: '请输入内容简介', type: 'warning'})
              return
            }
            this.add()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>
<style lang="css">
</style>
<style lang="css" scoped>
</style>

