<template>
  <div class="page">
    <!--<div class="top-tab">托管人管理</div>-->
    <div class="content-main">
      <div class="body-con">
        <div style="min-width: 1260px;overflow: hidden">

          <div class="contract-con">
            <div class="title-con" style="position: relative">
              <i>合同内容</i>
              <div class="switch-page" style="position: absolute;right:10px;top:0">
                <span style="margin-right: 10px">第 {{page}}/{{numPages}} 页</span>
                <el-button type="primary" size="small" @click="switchPage('prev')">上一页</el-button>
                <el-button type="primary" size="small" @click="switchPage('next')">下一页</el-button>
              </div>
            </div>
            <div class="pdf-box" style="position:relative;width: 892.5px;height:1261.5px;">
              <!--<iframe :src='productInfo.contractUrl' width='100%' height="800px" frameborder='0'></iframe>-->
              <pdf :src="productInfo.contractUrl.url" :page="page" @numPages="numPages = $event"></pdf>
              <div id="img" style="position: absolute;width: 100%; height: 100%;top: 0; left: 0;"></div>

              <component :is='currentView'
                         :group-id="currentView=='optionTag'?currentGroupId:null" v-move="getCoordinates" id="tag"
                         class="tag" keep-alive :showName='showLabel.showName' :labelId="showLabel.labelId"></component>
              <component v-for="(item,index) in pdfPageTagList" class="pdfTag"
                         v-if="labelView==0?true:(item.labelType==labelView)"
                         :is='item.tagName' :group-id="item.group_id" :style="item.styleObj" keep-alive
                         :showName='item.showName' :key="index"><i class="labelCon" :style="'line-height:'+ item.styleObj.height">{{item.showName}}</i><i class="close" @click="deleteTag(item)">+</i>
              </component>
            </div>
          </div>

          <div class="label-done">
            <div class="title-con">签名/盖章位置标签</div>
            <div class="label-list">
              <div class="label-item">
                <el-button class="btn" type="primary" @click="getSignItem">+ 设置投资者签名位置</el-button>
              </div>
              <div class="label-item">
                <el-button class="btn" type="primary" @click="getCircleItem(3)">+ 设置投资机构签章位置</el-button>
              </div>
              <div class="label-item">
                <el-button class="btn" type="primary" @click="getCircleItem(1)">+ 设置管理人签章位置</el-button>
              </div>
              <div class="label-item">
                <el-button class="btn" type="primary" @click="getCircleItem(2)">+ 设置托管人签章位置</el-button>
              </div>
              <div class="label-item">
                <el-dropdown @command="getInputItem">
                  <el-button type="primary" class="btn">
                    + 添加文本标签<i class="el-icon-caret-bottom el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="(item,index) in inputNameList" :key="index" :command="item">
                      {{item.labelName}}
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>

              <div class="label-write">
                 <!--下方显示切换区域-->
              </div>

            </div>


            <div class="label-preview">
              <h4>已打标签</h4>
              <div class="con-list">
                <div class="allSign">
                  <span>所有标签：</span><button class="view-btn" @click="labelView=0">预 览</button>
                  <p class="label-name">
                    <span v-for="(item,index) in labelData">{{item.showName}}、</span>
                  </p>
                </div>
                <div class="allSign">
                  <span>投资者签名位置：</span><button class="view-btn" @click="labelView=5">预 览</button>
                  <p class="label-name">
                    <span v-for="(item,index) in labelData" v-if="item.labelType==5">{{item.showName}}、</span>
                  </p>
                </div>
                <div class="allSign">
                  <span>投资机构签章位置：</span><button class="view-btn" @click="labelView=7">预 览</button>
                  <p class="label-name">
                    <span v-for="(item,index) in labelData" v-if="item.labelType==7">{{item.showName}}、</span>
                  </p>
                </div>
                <div class="allSign">
                  <span>管理人签章位置：</span><button class="view-btn" @click="labelView=11">预 览</button>
                  <p class="label-name">
                    <span v-for="(item,index) in labelData" v-if="item.labelType==11">{{item.showName}}、</span>
                  </p>
                </div>
                <div class="allSign">
                  <span>托管人签章位置：</span><button class="view-btn" @click="labelView=15">预 览</button>
                  <p class="label-name">
                    <span v-for="(item,index) in labelData" v-if="item.labelType==15">{{item.showName}}、</span>
                  </p>
                </div>
                <div class="allSign">
                  <span>文本标签：</span><button class="view-btn" @click="labelView=1">预 览</button>
                  <p class="label-name">
                    <span v-for="(item,index) in labelData" v-if="item.labelType==1">{{item.showName}}、</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      <div class="foot-submit">
        <el-button type="primary" @click="sureBack=true">打标签设置完成并提交</el-button>
        <el-button type="primary" @click="$emit('removeTag', 'makeSign')">返 回</el-button>
      </div>
    </div>

    <el-dialog title="提 示" :visible.sync="sureBack" style="margin:auto;width: 700px">
      <div style="text-align: center">您是否确认打标签设置完成？确认后合同将发送至管理人。</div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="subLabel()">确 定</el-button>
        <el-button @click="sureBack = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//  import { contractUrl } from '../../../config/test_config'
  import { mapMutations } from 'vuex'
  import { inputNameList } from '../../../config/textlabellist'
  import textTag from '../../labelComponents/textTag.vue'
  import textTagSign from '../../labelComponents/textTagSign.vue'
  import signTagManager from '../../labelComponents/signTagManager.vue'
  import signTagCustodian from '../../labelComponents/signTagCustodian.vue'
  import signTagInvestor from '../../labelComponents/signTagInvestor.vue'
  import optionTag from '../../labelComponents/optionTag.vue'
  import moudleTag from '../../labelComponents/moudleTag.vue'
  import pdf from 'vue-pdf'
  export default {
    props: ['oId'],
    components: {
      pdf,
      textTag,
      textTagSign,
      signTagManager,
      signTagCustodian,
      signTagInvestor,
      optionTag,
      moudleTag
    },
    data () {
      return {
//        contractUrl: contractUrl,
        productInfo: {
          contractUrl: {
            url: ''
          }
        },

        showLabel: {
          showName: '',
          labelId: ''
        },
        currentView: '',
        signType: 0,

        pdfPageTagList: [],

        page: 1,
        numPages: 0,
        signer: 1,
        keyWords: '',

        params: {},            // url参数

        inputNameList: inputNameList,

        labelData: [],       // 将要提交的所有标签数据
        labelView: 0,

        groupIdArry: [0],

        sureBack: false
      }
    },
    created () {
      this.changeMenu(true)
      this.getProInfo()
//      this.getProductSignCon()
      this.getTextLabelList()
    },
    mounted () {
    },

    computed: {
    },
    watch: {},
    methods: {
      ...mapMutations({
        changeMenu: 'CHANGE_MENU'
      }),

      async getProInfo () {
        let res = await this.$sever.getProInfo({contractId: this.oId, sysCode: 'TTD_MANAGE_SYSTEM'})
        switch (res.code) {
          case 0:
            this.productInfo = res.data.bean
            this.productInfo.contractUrl = JSON.parse(this.productInfo.contractUrl)
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      async getTextLabelList () {
        let res = await this.$sever.getAllLabelList()
        switch (res.code) {
          case 0:
            console.log('标签列表，', this.inputNameList)
            this.inputNameList = res.data.list
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      getTag (tag) {
        this.currentView = tag
      },

      // 获取签名标签
      getSignItem () {
        this.showLabel.showName = '投资者签名'
        this.showLabel.labelId = ''
        this.getTag('textTagSign')
      },

      // 点击pdf后的回调
      getCoordinates ({val, x, y}) {
        let that = this
        if (val.length) {
          val.forEach((item, index) => {
            that.pdfPageTagList.push(item)
          })
          let moudleDataCopy = JSON.parse(JSON.stringify(that.moudleData))
          moudleDataCopy.forEach((it, index) => {
            it.pageIndex = that.page
            if (it.labelContent) {
              it.labelContent.forEach((v, i) => {
                v.styleObj.left = parseInt(v.styleObj.left) + x + 'px'
                v.styleObj.top = parseInt(v.styleObj.top) + y + 'px'
              })
            } else {
              it.styleObj.left = parseInt(it.styleObj.left) + x + 'px'
              it.styleObj.top = parseInt(it.styleObj.top) + y + 'px'
            }
          })
          that.labelData.push.apply(that.labelData, moudleDataCopy)
        } else {
          this.pdfPageTagList.push(val)    // 仅用于视图渲染
          val.pageIndex = this.page
          this.labelData.push(val)
        }
      },

      // 获取文本标签
      getInputItem (item) {
        this.showLabel.showName = item.labelName
        this.showLabel.labelId = item.labelId
        this.getTag('textTag')
      },

      getCircleItem (signer) {
        this.showLabel.labelId = ''
        if (signer === 1) {
          this.showLabel.showName = '管理人签章'
          this.getTag('signTagManager')
        }
        if (signer === 2) {
          this.showLabel.showName = '托管人签章'
          this.getTag('signTagCustodian')
        }
        if (signer === 3) {
          this.showLabel.showName = '投资机构签章'
          this.getTag('signTagInvestor')
        }
      },

      // 删除文本标签
      deleteTag (item) {
        for (let i = 0; i < this.pdfPageTagList.length; i++) {
          let it = this.pdfPageTagList[i]
          if (it.showName === item.showName && it.xAxis === item.xAxis && it.yAxis === item.yAxis) {
            this.pdfPageTagList.splice(i, 1)
            for (let j = 0; j < this.labelData.length; j++) {
              if (this.labelData[j].showName === item.showName && this.labelData[j].xAxis === item.xAxis && this.labelData[j].yAxis === item.yAxis) {
                this.labelData.splice(j, 1)
                return
              }
            }
          }
        }
      },
      backNotice () {
        if (this.labelData.length) {
          this.sureBack = true
        } else {
          this.$router.back()
        }
      },
      formatLabel (item) {
        return {
          1: item.showName,
          2: item.showName,
          3: item.showName,
          5: '投资者签名',
          7: '管理人签章',
          8: '托管人签章',
          11: '本机构签章'
        }[item.labelType]
      },

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
        this.getCurPageLabel(this.page)
      },

      // 根据当前pdf文件页码获取对应标签内容显示在文件页上
      getCurPageLabel (page) {
        this.pdfPageTagList = []
        let that = this
        let data = []
        this.labelData.forEach(function (item, index) {
          if (parseInt(page) === parseInt(item.pageIndex)) {
            data.push(item)
          }
        })
        data.forEach((v, index) => {
          if (parseInt(v.labelType) === 2 || parseInt(v.labelType) === 3) {
            that.pdfPageTagList.push.apply(that.pdfPageTagList, v.labelContent)
          } else {
            that.pdfPageTagList.push(v)
          }
        })
        return data
      },

      // 获取数据库合同标签数据并初始化视图合同标签内容
      async getProductSignCon () {
        let res = await this.$server.getProductSignCon({sysCode: 'TTDXT', productId: this.params.productId})
        switch (res.code) {
          case 0:
            let data = JSON.parse(res.data.bean[0].originalLabel)
            this.labelData.push.apply(this.labelData, data)
            this.getCurPageLabel(1)
            break
        }
      },

      hasLabel () {
        if (this.labelData.length === 0) {
          this.$message({message: '您的模板标签数据为空，无法提交', type: 'warning'})
          return false
        }
        if (!(this.labelData.some((item) => { return parseInt(item.labelType) === 5 }) || this.labelData.some((item) => { return parseInt(item.labelType) === 7 }))) {
          this.$message({message: '您所打标签中缺少投资人签名标签或机构签章标签，无法提交', type: 'warning'})
          return false
        }
        if (!this.labelData.some((item) => { return parseInt(item.labelType) === 1 })) {
          this.$message({message: '您所打标签中缺少文本标签，无法提交', type: 'warning'})
          return false
        }
        if (!this.labelData.some((item) => { return parseInt(item.labelType) === 11 })) {
          this.$message({message: '您所打标签中缺少管理人标签，无法提交', type: 'warning'})
          return false
        }
        if (!this.labelData.some((item) => { return parseInt(item.labelType) === 15 })) {
          this.$message({message: '您所打标签中缺少托管人标签，无法提交', type: 'warning'})
          return false
        }
        return true
      },

      async subLabel () {
        if (!this.hasLabel()) {
          return
        }
        let that = this
        let obj = {
          sysCode: 'TTDFUND',
          productId: this.productInfo.productId,
          contractId: this.oId,
          contractPdfUrl: this.productInfo.contractUrl,
          lableDis: JSON.stringify(that.labelData)
        }
        let res = await this.$sever.submitLabel(obj)
        switch (res.code) {
          case 0:
            this.$message({message: '提交成功', type: 'success'})
            this.$emit('removeTag', 'makeSign')
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
    font-size: 14px;
    text-align: center;
    line-height: 50px;
    background: #F2F2F2;
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
    width: 320px;
    border: 1px solid #ccc;
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
    width: 200px;
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
