<template>
  <div class="page">
    <com-breadcrumb :list="['产品创设', '风险揭示书处理', '打标签']"></com-breadcrumb>
    <div class="content-main">
      <div class="border-line">

        <div class="body-con">
          <div style="min-width: 1260px;overflow: hidden">

            <div class="contract-con">
              <div class="title-con" style="position: relative">
                <templet-label @setLabelContent="setLabelContent"/>
                <div style="position: absolute;right:10px;top:0">
                  <switch-page @page="page = $event" :numPages="numPages"></switch-page>
                </div>
              </div>
              <div class="pdf-box" style="position:relative;width: 892.5px;height:1261.5px;">
                <pdf-view :src="productInfo.revealBookUrl.url" :page="page" @numPages="numPages = $event">
                  <label-make :labelViewData="labelContent" :item="itemObj" :page="page" @getLabelData="getLabelData" :labelView="labelView"></label-make>
                </pdf-view>
              </div>
            </div>

            <div class="label-done">
              <label-oprea
                :opreaConfig="opreaConfig"
                :labelData="labelData"
                @getSignItem="getSignItem"
                @setLabelView="labelView=$event"/>
            </div>

          </div>

        </div>

      </div>
      <div class="dialog-footer">
        <el-button @click="$router.back()">返 回</el-button>
        <el-button type="primary" @click="getViewLabel">预 览</el-button>
        <el-button type="primary" @click="sureBack=true">打标签设置完成并提交</el-button>
      </div>
    </div>

    <el-dialog title="提 示" :visible.sync="sureBack" style="margin:auto;width: 700px">
      <div style="text-align: center">您是否确认打标签设置完成？确认后风险揭示书将发送至管理人。</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="sureBack = false">取 消</el-button>
        <el-button type="primary" @click="subLabel()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  import { viewSignFile, getLabelViewData } from '../../../utils/req_util'
  import LabelOprea from '../../commomComponents/labelOprea.vue'
  import TempletLabel from '../../commomComponents/TempletLabel.vue'
  export default {
    components: {
      LabelOprea,
      TempletLabel
    },
    data () {
      return {
        propValue: {
          bookId: ''
        },
        productInfo: {
          revealBookUrl: {
            url: ''
          }
        },
        itemObj: 0,
        currentView: '',
        page: 1,
        numPages: 0,

        params: {},            // url参数

        inputNameList: [],

        labelData: [],       // 将要提交的所有标签数据
        labelView: 0,
        labelContent: [],

        sureBack: false,

        opreaConfig: [{
          name: '自然人投资者签名',
          labelType: 5
        }, {
          name: '投资机构签章',
          labelType: 7
        }, {
          name: '管理人公章',
          labelType: 11
        }, {
          name: '管理人业务合同章',
          labelType: 27
        }, {
          name: '理财师签名',
          labelType: 19
        }]
      }
    },
    created () {
      this.propValue.bookId = this.$route.query.bookId
      this.changeMenu(true)
      this.getProInfo()
    },
    methods: {
      ...mapMutations({
        changeMenu: 'CHANGE_MENU'
      }),

      getViewLabel () {
        viewSignFile(2, this.productInfo.productId, this.propValue.bookId, this.labelData, this)
      },

      getLabelData (labelData) {
        this.labelData = labelData
      },

      setLabelContent (labelContent) {
        this.labelContent = labelContent
      },

      getSignItem (type) {
        this.itemObj = type
      },

      async getProInfo () {
        let res = await this.$sever.getProRiskInfo({bookId: this.propValue.bookId, sysCode: 'TTD_MANAGE_SYSTEM'})
        switch (res.code) {
          case 0:
            this.productInfo = res.data.bean
            this.productInfo.revealBookUrl = JSON.parse(this.productInfo.revealBookUrl)
            let labelContent = await getLabelViewData(this.productInfo.productId, this.productInfo.bookId, 0, 2, this)
            this.setLabelContent(labelContent)
            break
          default:
            this.$message({message: res.msg + '??', type: 'warning'})
        }
      },

      backNotice () {
        if (this.labelData.length) {
          this.sureBack = true
        } else {
          this.$router.back()
        }
      },

      hasLabel () {
//        if (this.labelData.length === 0) {
//          this.$message({message: '您的模板标签数据为空，无法提交', type: 'warning'})
//          return false
//        }
//        if (!(this.labelData.some((item) => { return parseInt(item.labelType) === 5 }))) {
//          this.$message({message: '您所打标签中缺少自然人投资者签名标签，无法提交', type: 'warning'})
//          return false
//        }
//        if (!(this.labelData.some((item) => { return parseInt(item.labelType) === 21 }))) {
//          this.$message({message: '您所打标签中缺少机构投资者经办人签名标签，无法提交', type: 'warning'})
//          return false
//        }
//        if (!(this.labelData.some((item) => { return parseInt(item.labelType) === 7 }))) {
//          this.$message({message: '您所打标签中缺少机构投资者签章标签，无法提交', type: 'warning'})
//          return false
//        }
        return true
      },

      async subLabel () {
        if (!this.hasLabel()) {
          return
        }
        let that = this
        let obj = {
          sysCode: 'TTDFUND',
          type: 2,
          operType: 1,
          productId: this.productInfo.productId,
          targetId: this.propValue.bookId,
          filePdfUrl: this.productInfo.revealBookUrl,
          lableDis: JSON.stringify(that.labelData)
        }
        let res = await this.$sever.submitLabel(obj)
        switch (res.code) {
          case 0:
            this.$router.back()
            break
          default:
            this.$message({message: res.msg, type: 'error'})
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .index {
    overflow: hidden;
    padding-bottom: 20px;
  }

  .input-list {
    float: left;
    margin-left: 40px;
  }

  .input-list > div {
    margin-bottom: 40px;
  }

  .title {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ccc;
  }

  .title h4 {
    float: left;
  }

  .title i {
    float: right;
  }

  .body-con {
    padding: 20px 0;
    overflow: hidden;
  }

  .title-con {
    padding: 0 20px;
    font-size: 14px;
    text-align: left;
    line-height: 50px;
    border-bottom: 1px solid #ccc;
  }

  .contract-con {
    font-size: 16px;
    text-align: center;
    float: left;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }

  .label-done {
    margin-left: 16px;
    float: left;
  }

  .label-list {
    margin: 10px auto;
    padding: 10px 0;
    text-align: center;
    width: 300px;
    border: 1px solid #ccc;
  }

  .label-list .label-item {
    margin-bottom: 20px;
  }

  .label-list .label-item .btn {
    width: 240px;
  }

  .input-width {
    width: 200px;
  }

  .label-write {
    padding: 20px 0px;
    border-top: 1px dashed #ccc;
  }

  .foot-submit {
    text-align: center;
  }

  .gongzhang {
    margin: auto;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    overflow: hidden;
  }

  .gongzhang img {
    width: 100%;
    height: 100%;
  }

  .label-btn {
    margin-top: 40px;
  }

  .label-preview h4 {
    text-align: center;
  }

  .label-preview .con-list {
    margin: 10px 20px;
    border: 1px solid #ccc;
    padding: 20px;
  }

  .label-name {
    margin-top: 10px;
    color: #20a0ff;
    font-size: 14px;
  }

  .pdf-box {
    position: relative;
    width: 1000px;
    float: left;
    border: 1px solid #ccc;
  }

  .pdf-box .tag {
    position: absolute;
    z-index: 999;
    top: 0;
    display: none;
  }
  .allSign{
    margin-bottom: 20px;
  }
  .view-btn{
    width: 40px;
    height:20px;
    background: none;
    font-size: 12px !important;
    border: 1px solid #3D82F7;
    text-align: center;
    line-height: 20px;
    font-size: 14px;
    border-radius: 2px;
    padding: 0;
    color: #3D82F7;
    float: right;
    cursor: pointer;
    outline: none;
  }

  /*.pdf-box:hover .tag {*/
    /*display: block !important;*/
  /*}*/

  .close {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    position: absolute;
    top: -10px;
    right: -10px;
    background: coral;
    color: #fff;
    transform: rotateZ(45deg);
    text-align: center;
    line-height: 20px;
    cursor: pointer;
  }
</style>
