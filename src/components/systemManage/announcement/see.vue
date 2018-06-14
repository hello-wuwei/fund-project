<template lang="html">
  <div class="page">
    <com-breadcrumb :list="['公告发布', '查看']"></com-breadcrumb>
    <div class="content-main">
      <div class="border-line">
        <el-form class="form-list" label-position="right" label-width="120px">
          <el-form-item label="公告名称：" prop="title">
            {{submitData.title}}
          </el-form-item>
          <el-form-item label="版本号：" prop="version">
            {{submitData.version}}
          </el-form-item>
          <el-form-item label="公告类型：" prop="type">
            {{{0: '强制性', 1: '非强制性'}[submitData.type]}}
          </el-form-item>
          <el-form-item label="发布对象：" prop="publishUser">
            {{{1: '托管人后台', 3: '托管人后台', 5: '投资人APP', 7: '管理人APP'}[submitData.publishUser]}}
          </el-form-item>
          <el-form-item label="内容简介：">
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
          title: '',
          version: '',
          type: '',
          publishUser: '',
          content: ''
        }
      }
    },
    created () {
      this.submitData.id = this.$route.query.id
    },
    mounted () {
      this.getDetail()
    },
    methods: {
      // 详情
      async getDetail () {
        let res = await this.$sever.getAnnouncementDetail({id: this.submitData.id})
        switch (res.code) {
          case 0:
            let bean = res.data.bean
            this.submitData.title = bean.title
            this.submitData.version = bean.version
            this.submitData.type = bean.type
            this.submitData.publishUser = bean.publishUser
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

