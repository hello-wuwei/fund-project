<template lang="html">
  <div class="page">
    <com-breadcrumb :list="['公告发布', '新增']"></com-breadcrumb>
    <div class="content-main">
      <div class="border-line">
        <el-form :model="submitData" ref="ruleForm" :rules="rules" label-position="right" label-width="120px">
          <el-form-item label="公告名称：" prop="title">
            <el-input v-model="submitData.title" placeholder="请输入公告名称" size="small" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="版本号：" prop="version">
            <el-input v-model="submitData.version" placeholder="请输入版本号" size="small" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="公告类型：" prop="type">
            <el-select v-model="submitData.type" placeholder="请选择公告类型" size="small">
              <el-option label="强制性" value="0"></el-option>
              <el-option label="非强制性" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布对象：" prop="publishUser">
            <el-select v-model="submitData.publishUser" placeholder="请选择发布对象" size="small">
              <el-option label="托管人后台" value="1"></el-option>
              <el-option label="管理人后台" value="3"></el-option>
              <el-option label="投资人APP" value="5"></el-option>
              <el-option label="管理人APP" value="7"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="内容简介：">
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
          title: '',
          version: '',
          type: '',
          publishUser: '',
          content: '',
          introduction: ''
        },

        rules: {
          title: [
            { required: true, message: '请输入公告名称', trigger: 'blur' }
          ],
          version: [
            { required: true, message: '请输入版本号', trigger: 'blur' }
          ],
          type: [
            {required: true, message: '请选择公告类型', trigger: 'change'}
          ],
          publishUser: [
            {required: true, message: '请选择发布对象', trigger: 'change'}
          ],
          content: [
            {required: true, message: '请输入发布内容', trigger: 'blur'}
          ]
        }
      }
    },
    created () {
    },
    methods: {
      // 新增
      async add () {
        let res = await this.$sever.newAnnouncement(this.submitData)
        switch (res.code) {
          case 0:
            this.$message({message: '保存成功', type: 'success'})
            this.$router.back()
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      // 提取html文本内容
      htmlToText (htmlString) {
        let rootNode = document.createElement('div')
        let text = ''
        rootNode.innerHTML = htmlString
        let eqNode = (rootNode) => {
          if (rootNode.childNodes && rootNode.childNodes.length) {
            rootNode.childNodes.forEach((childNode) => {
              if (childNode.nodeType === 3) {
                text = text + rootNode.innerText
              }
              if (childNode.nodeType === 1) {
                eqNode(childNode)
              }
            })
          }
        }
        eqNode(rootNode)
        return text
      },

      // 验证表单
      submitForm (formName) {
        this.submitData.content = this.$refs.editor.getContent()
        this.submitData.introduction = this.htmlToText(this.submitData.content)
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

