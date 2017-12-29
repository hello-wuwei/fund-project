<!--用户中心右侧模板-->
<template lang="html">
  <div class="right-block">
    <el-form class="form-list" label-width="100px" label-position="right" style="margin-left: 100px; width: 700px;margin-top: 30px">
      <el-form-item label="产品合同：">
        {{productInfo.productName || '--'}}
        <el-button style="margin-left: 60px" size="mini" type="primary"><a :href="productInfo.contractUrl.url" download style="color: #fff">下 载</a></el-button>
      </el-form-item>
      <el-form-item label="托管人：">
        {{productInfo.trustUserName || '--'}}
      </el-form-item>
      <el-form-item label="管理人：">
        {{productInfo.riskLevel || '--'}}
      </el-form-item>
      <el-form-item label="合同状态：">
        {{productInfo.issueSize?(productInfo.issueSize + '万') : '--'}}
      </el-form-item>
      <el-form-item class="done-list" label="合同上传：">
        <el-button type="primary" class="btn-dashed" style="width: 238px">+ 合同上传</el-button><i class="el-icon-success"></i>
      </el-form-item>
      <el-form-item class="done-list" label="打标签：">
        <el-button type="primary" class="btn-dashed" style="width: 238px">+ 打标签</el-button><i class="el-icon-success"></i>
      </el-form-item>
    </el-form>

    <div class="foot-done" style="text-align: center;margin-top: 40px" type="primary">
      <el-button @click="$emit('removeTag', 'contractDone')">返 回</el-button>
    </div>

    <el-dialog title="预 览" :visible.sync="isView">
      <div class="switch-page">
        <div style="float:right">
          <span style="margin-right: 10px">第 {{page}}/{{numPages}} 页</span>
          <el-button type="primary" size="small" @click="switchPage('prev')">上一页</el-button>
          <el-button type="primary" size="small" @click="switchPage('next')">下一页</el-button>
        </div>
      </div>
      <div>
        <pdf :src="productInfo.contractUrl.url" :page="page" @numPages="numPages = $event"></pdf>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="isView = false">确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>
<script>
  import pdf from 'vue-pdf'
  export default {
    props: ['oId'],
    components: {
      pdf
    },
    data () {
      return {
        isView: false,
        page: 1,
        numPages: 0,

        imageUrl: '',
        productInfo: {
          contractUrl: {
            url: ''
          },
          recommendMaterial: {
            url: ''
          }
        }
      }
    },
    created () {
      this.getProInfo()
    },
    computed: {
    },
    methods: {
      switchPage (str) {
        if (str === 'prev') {
          if (this.page === 1) {
            return
          }
          this.page--
        }
        if (str === 'next') {
          if (this.page === this.numPages) {
            this.$message({message: '当前已是最后一页', type: 'warning'})
            return
          }
          this.page++
        }
//        this.getCurPageLabel(this.page)
      },

      loadDown () {
//        window.open(this.productInfo.contractUrl.url)
      },

      async getProInfo () {
        let res = await this.$sever.getProInfo({contractId: this.oId, sysCode: 'TTD_MANAGE_SYSTEM'})
        switch (res.code) {
          case 0:
            this.productInfo = res.data.bean
            this.productInfo.contractUrl = JSON.parse(this.productInfo.contractUrl)
            this.productInfo.recommendMaterial = JSON.parse(this.productInfo.recommendMaterial)
//            this.getContractLabel()
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      // 获取该合同的标签用于渲染
      async getContractLabel () {
        let res = await this.$sever.getContractLabel({contractId: this.oId, productId: this.productInfo.productId, type: '0', sysCode: 'TTDFUND'})
        switch (res.code) {
          case 0:
            console.log(res)
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      beforeAvatarUpload (file) {
        const isJPG = /jpg|jpeg|png/.test(file.type)
        const isLt2M = file.size / 1024 / 1024 < 2
        console.log(file.type)
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 或PNG格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      },
      handleAvatarSuccess ({code, data, msg}) {
        if (code === 0) {
          this.imageUrl = data.list[0].url
        } else {
          this.$message({message: msg || '上传失败!', type: 'warning', center: true})
        }
      },

      async fileSubmit (stampId) {
        if (this.imageUrl === '') {
          this.$message({message: '请选择印章', type: 'warning'})
          return
        }
        let res = await this.$sever.uploadSeal({stampId: this.stampId, stampUrl: this.imageUrl, sysCode: 'TTD_MANAGE_SYSTEM'})
        switch (res.code) {
          case 0:
            this.$message({message: '上传成功', type: 'success'})
            this.$emit('removeTag', 'uploadSeal')
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      }
    }
  }
</script>
<style>
  .form-list .el-form-item {
    margin-bottom: 10px;
  }
  .upload-demo .el-upload, .upload-demo .el-upload-dragger{
    width: 300px;
  }
</style>
<style scoped>
  .right-block{
    padding-top: 1px;
    border-radius: 6px;
    width: 100%;
    background: #fff;
    min-height: 800px;
    padding-bottom: 50px;
  }
  .right-block h4{
    margin: 20px;
    margin-bottom: 6px;
    font-size: 14px;
    color: #000;
    font-weight: bold;
  }
  .user-info{
    margin: 20px 20px;
    margin-top: 6px;
    border: 1px solid #ccc;
    padding: 20px 40px;
    padding-top: 0;
    border-radius: 2px;
    overflow: hidden;
  }
  .upload-avator{
    float: left;
  }
  .upload-avator p{
    font-size: 14px;
    margin-bottom: 10px;
  }
  .avator-view{
    margin-left: 100px;
  }
  .img-area{
    float: left;
    margin-left: 10px;
    width: 240px;
    height: 180px;
    border: 1px dashed #ccc;
    overflow: hidden;
    padding-top: 16px;
  }
  .img-area img{
    display: block;
    width: 160px;
    height: 160px;
    margin: auto;
  }
  .tip-text{
    line-height: 60px;
    color: #777786
  }
  .tip-text i{
    margin-right: 4px;
  }
  .form-tip{
    margin-left: 100px;
    font-size: 12px;
    color: gray
  }
  .switch-page{
    overflow: hidden;
    margin-top: -20px;
    margin-bottom: 20px;
  }
  .done-list i.el-icon-warning{
    color: orange;
  }
  .done-list i.el-icon-success{
    color: lightgreen;
    margin-left: 30px
  }
  .done-list span{
    display:inline-block;
    margin-left: 20px;
    width: 100px;
    font-size: 14px
  }
</style>
