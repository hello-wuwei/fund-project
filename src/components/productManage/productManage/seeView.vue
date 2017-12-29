<!--用户中心右侧模板-->
<template lang="html">
  <div class="right-block">
    <h4>产品信息</h4>
    <el-form label-width="240px" style="margin-left: 40px; width: 700px;margin-top: 30px">
      <el-form-item label="产品名称：">
        {{productInfo.productName || '--'}}
      </el-form-item>
      <el-form-item label="托管机构：">
        {{productInfo.trustUserName || '--'}}
      </el-form-item>
      <el-form-item label="产品风险等级：">
        {{productInfo.riskLevel || '--'}}
      </el-form-item>
      <el-form-item label="发行规模上限：">
        {{productInfo.issueSize?(productInfo.issueSize + '万') : '--'}}
      </el-form-item>
      <el-form-item label="申购费：">
        {{productInfo.purchaseFee?(productInfo.purchaseFee/100 + '%') : '--'}}
      </el-form-item>
      <el-form-item label="认购费：">
        {{productInfo.subscribeFee?(productInfo.subscribeFee/100 + '%') : '--'}}
      </el-form-item>
      <el-form-item label="申购/认购折扣：">
        {{productInfo.discount?(productInfo.discount/100 + '%') : '--'}}<i class="form-tip">折扣后申购费为0.24%，折扣后认购费为0.27%</i>
      </el-form-item>
      <el-form-item label="投资冷静期：">
        {{productInfo.calmPeriod?(productInfo.calmPeriod + '小时') : '--'}}<i class="form-tip">请与合同中的投资冷静期保持一致</i>
      </el-form-item>
      <el-form-item label="上传风险揭示书：">
        {{(JSON.stringify(productInfo.recommendMaterial) == '{}')?'未上传':'已上传'}}
        <i class="form-tip" v-if="JSON.stringify(productInfo.recommendMaterial) != '{}'">
          {{util.getUrlName(productInfo.recommendMaterial.url)}}
          <a v-if="util.isPdf(productInfo.recommendMaterial.url)" style="margin-left: 20px" target="_blank" :href="productInfo.recommendMaterial.url">
            <el-button type="primary" size="mini">预览</el-button>
          </a>
          <a :href="productInfo.recommendMaterial.url" download><el-button type="primary" size="mini">下载</el-button></a>
        </i>
      </el-form-item>
      <el-form-item label="客户签署合同是否需要录音录像：">
        <el-radio v-model.number="productInfo.needVideo" disabled :label="1">需要</el-radio>
        <el-radio v-model.number="productInfo.needVideo" disabled :label="2">不需要</el-radio>
      </el-form-item>
      <el-form-item label="是否需要进行回访：">
        <el-radio v-model.number="productInfo.needVisit" disabled :label="1">需要</el-radio>
        <el-radio v-model.number="productInfo.needVisit" disabled :label="2">不需要</el-radio>
      </el-form-item>
    </el-form>

    <h4 style="padding-top: 30px; border-top:1px solid #ccc">合同信息</h4>
    <div style="margin-left: 60px;margin-top: 40px;height: 100px;font-size: 14px">
      <span style="margin-right: 200px">{{util.getUrlName(productInfo.contractUrl.url)}}</span>
      <a v-if="util.isPdf(productInfo.contractUrl.url)" @click="isView = true"><el-button type="primary" size="mini">预览</el-button></a>
      <a :href="productInfo.contractUrl.url" download><el-button type="primary" size="mini">下载</el-button></a>
      <!--<a><el-button type="primary" size="mini" @click="loadDown">下载</el-button></a>-->
    </div>

    <div class="foot-done" style="text-align: center" type="primary">
      <el-button @click="$emit('removeTag', 'seeView')">返 回</el-button>
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
  .user-info .el-form-item{
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
</style>
