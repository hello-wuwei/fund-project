<template>
  <div class="page">
    <div class="content-main">
      <el-form :inline="true" class="form-size" label-width="120px">
        <el-form-item label="资源名称：" style="width: 260px">
          {{formData.name}}
        </el-form-item>
        <el-form-item label="资源编码：" style="width: 260px">
          {{formData.code}}
        </el-form-item>
        <el-form-item label="资源路径：" style="width: 260px">
          {{formData.urlAddress?formData.urlAddress:'--'}}
        </el-form-item>
        <div class="empty"></div>
        <el-form-item label="显示顺序：" style="width: 260px">
          {{formData.sortNo}}
        </el-form-item>
        <el-form-item label="资源类型：" style="width: 260px">
          {{{'1': '菜单', '2': '功能', '4': '数据', '5': '接口'}[formData.type]}}
        </el-form-item>
        <el-form-item label="资源描述：" style="width: 260px">
          {{formData.description}}
        </el-form-item>
        <div class="empty"></div>
        <el-form-item label="父资源（ID）：">
          {{formData.parentId}}
        </el-form-item>
      </el-form>

      <div class="foot-btn">
        <el-button @click="$emit('removeTag', 'editParam')">返回列表</el-button>
      </div>
    </div>

  </div>

</template>
<script>
  export default {
    props: ['id'],
    data () {
      return {
        formData: {
          sourcesId: this.sourcesId,
          sysCode: 'TTD_MANAGE_SYSTEM',
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
        let res = await this.$sever.editResouceView({sysCode: 'TTD_MANAGE_SYSTEM', sourcesId: this.sourcesId})
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
    padding: 30px 0;
    width: 900px;
    border: 1px solid #ccc;
    margin-top: 30px;
  }
  .foot-btn{
    width: 900px;
    margin-top: 40px;
    text-align: center;
  }
</style>
