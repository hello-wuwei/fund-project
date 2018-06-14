<template lang="html">
  <div class="page">
    <com-breadcrumb :list="['存证模板管理', '查看']"></com-breadcrumb>
    <div class="content-main">
      <div class="border-line">
        <el-form class="form-list" label-position="right" label-width="120px">
          <el-form-item label="模板名称：">
            {{submitData.name}}
          </el-form-item>
          <el-form-item label="模板代码：">
            {{submitData.alias}}
          </el-form-item>
          <el-form-item label="模板说明：">
            {{submitData.remark}}
          </el-form-item>
          <el-form-item label="模板内容：">
            <div ref="content" class="editor-content">
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$router.back()">返 回</el-button>
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
          id: '',
          name: '',
          alias: '',
          remark: '',
          content: ''
        }
      }
    },
    created () {
      this.submitData.id = this.$route.query.id
    },
    mounted () {
      this.getDetal()
    },
    methods: {
      async getDetal () {
        let res = await this.$sever.getExistEvidenceDetail({id: this.submitData.id})
        switch (res.code) {
          case 0:
            let bean = res.data.bean
            this.submitData.name = bean.name
            this.submitData.alias = bean.alias
            this.submitData.remark = bean.remark
            this.$refs.content.innerHTML = bean.content
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      }
    }
  }
</script>
<style lang="css">
</style>
<style lang="css" scoped>
  .editor-content{
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
</style>

