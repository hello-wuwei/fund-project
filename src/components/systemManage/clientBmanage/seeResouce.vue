<template>
  <div class="page">
    <com-breadcrumb :list="['B端管理', '查看资源']"></com-breadcrumb>
    <div class="content-main">
      <div class="con-box border-line">
        <el-form :inline="true" class="form-size form-list" label-width="120px">
          <el-form-item label="资源名称：" style="width: 300px">
            {{formData.name}}
          </el-form-item>
          <el-form-item label="资源编码：" style="width: 300px">
            {{formData.code}}
          </el-form-item>
          <el-form-item label="资源路径：" style="width: 300px">
            <span class="path-hid">{{formData.urlAddress?formData.urlAddress:'--'}}</span>
          </el-form-item>
          <div class="empty"></div>
          <el-form-item label="显示顺序：" style="width: 300px">
            {{formData.sortNo}}
          </el-form-item>
          <el-form-item label="资源类型：" style="width: 300px">
            {{formData.type}}
          </el-form-item>
          <el-form-item label="资源描述：" style="width: 300px">
            {{formData.description}}
          </el-form-item>
          <div class="empty"></div>
          <el-form-item label="父资源（ID）：">
            {{formData.parentId}}
          </el-form-item>
        </el-form>
      </div>

      <div class="dialog-footer">
        <el-button @click="$router.back()">返回列表</el-button>
      </div>
    </div>

  </div>

</template>
<script>
  export default {
    data () {
      return {
        formData: {
          sourcesId: this.$route.query.sourcesId,
          sysCode: 'TOB_SYSTEM',
          name: '',
          code: '',
          urlAddress: '',
          sortNo: '',
          type: '',
          description: '',
          parentId: ''
        },
        parentId: [],

        treeData: [],
        defaultProps: {
          id: 'sourcesId',
          children: 'subList',
          label: 'name'
        }
      }
    },
    created: function () {
      this.getResouceView()
    },
    methods: {
      async getResouceView () {
        let res = await this.$sever.editResouceView({sysCode: 'TOB_SYSTEM', sourcesId: this.$route.query.sourcesId})
        switch (res.code) {
          case 0:
            this.formData.name = res.data.bean.name
            this.formData.code = res.data.bean.code
            this.formData.urlAddress = res.data.bean.urlAddress
            this.formData.sortNo = res.data.bean.sortNo.toString()
            this.formData.type = res.data.bean.type.toString()
            this.formData.description = res.data.bean.description
            this.formData.parentId = res.data.bean.parentId
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      }
    }
  }
</script>
<style>
</style>
<style scoped>
  .form-size{
    width: 1000px;
  }
  .foot-btn{
    width: 1000px;
    margin-top: 40px;
    text-align: center;
  }
  .path-hid{
    display:block;
    width: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
