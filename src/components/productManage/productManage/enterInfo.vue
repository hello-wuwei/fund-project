<!--用户中心右侧模板-->
<template lang="html">
  <div class="page">
    <com-breadcrumb :list="['产品创设', '风险揭示书处理', '录入信息']"></com-breadcrumb>
    <div class="right-block">
      <div class="border-line" style="padding: 0">
        <scroll-bar :maxH="600">
          <el-form class="form-list" label-width="140px" label-position="right" style="width: 700px; margin-top: 20px">
            <el-form-item label="风险揭示书：">
              {{util.getUrlName(productInfo.revealBookUrl.url)}}
              <el-button style="margin-left: 60px" size="mini" type="primary"><a :href="productInfo.revealBookUrl.url" download style="color: #fff">下 载</a></el-button>
            </el-form-item>
            <el-form-item label="托管人：">
              {{productInfo.trustUserName || '--'}}
            </el-form-item>
            <el-form-item label="管理人：">
              {{productInfo.manageName || '--'}}
            </el-form-item>
            <el-form-item label="风险揭示书状态：">
              {{{'0':'待上传','1':'待录入信息','2':'待打标签','3':'已打标签'}[productInfo.revealBookState]}}
            </el-form-item>

          </el-form>

          <div style="border: 1px dashed #ccc;margin: 20px 30px"></div>

          <div class="done-list" style="margin-left: 80px">
            <span>请按顺序逐条录入投资者声明</span>
            <div class="list-item" v-for="(item, index) in productionList" :key="index" style="height: 96px">
              <i class="num-tip">{{item.sortNo = index + 1}}</i>
              <el-input type="textarea" resize="none" :rows="4" style="width: 60%; float: left" v-model="item.content" :disabled="item.isDisabled"></el-input>
              <div v-if="item.isNew" style="float: left;margin-top: 30px;margin-left: 60px">
                <el-button type="primary" @click="editItem(index)">修 改</el-button>
                <el-button @click="deleteItem(index)">删 除</el-button>
              </div>
            </div>
            <el-button type="primary" @click="addProduct" class="btn-dashed" style="margin-bottom: 30px;margin-top: 15px"><i class="el-icon-plus"></i> 录入投资者声明</el-button>
          </div>
        </scroll-bar>
      </div>

      <div class="dialog-footer">
        <el-button @click="$router.back()">返回</el-button>
        <el-button type="primary" @click="submitProduction">提交</el-button>
      </div>

    </div>
  </div>
</template>
<script>
  export default {
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

        productionList: [{
          sortNo: '',
          content: '',
          isDisabled: false
        }]
      }
    },
    created () {
      this.propValue.bookId = this.$route.query.bookId
      this.getProInfo()
    },
    computed: {
    },
    methods: {
      async getProInfo () {
        let res = await this.$sever.getProRiskInfo({bookId: this.propValue.bookId, sysCode: 'TTD_MANAGE_SYSTEM'})
        switch (res.code) {
          case 0:
            this.productInfo = res.data.bean
            this.productInfo.revealBookUrl = JSON.parse(this.productInfo.revealBookUrl)
            let revealBookContent = JSON.parse(this.productInfo.revealBookContent)
            this.productionList = revealBookContent.map((item) => {
              item.isDisabled = true
              item.isNew = true
              return item
            })
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      addProduct () {
        if (this.productionList.some((item) => { return item.content === '' })) {
          this.$message({message: '请先完善当前内容为空的声明信息', type: 'warning'})
          return
        }
        for (let i = 0; i < this.productionList.length; i++) {
          this.productionList[i].isDisabled = true
          this.productionList[i].isNew = true
        }
        this.productionList.push({
          sortNo: '',
          content: '',
          isDisabled: false,
          isNew: false
        })
      },
      deleteItem (index) {
        this.productionList.splice(index, 1)
      },

      editItem (index) {
        this.productionList[index].isDisabled = false
      },

      async submitProduction () {
        if (!this.productionList.length || this.productionList.every((item) => { return item.content === '' })) {
          this.$message({message: '请输入投资者声明', type: 'warning'})
          return
        }
        let revealBookContent = this.productionList.map((item) => {
          item.content = item.content.replace(/\s|\xA0/g, '')     // 清除空格与换行符
          return {
            sortNo: item.sortNo,
            content: item.content
          }
        })
        let res = await this.$sever.submitProduction({
          bookId: this.propValue.bookId,
          revealBookContent: JSON.stringify(revealBookContent),
          sysCode: 'TTD_MANAGE_SYSTEM'
        })
        switch (res.code) {
          case 0:
            this.$message({message: '提交成功', type: 'success'})
            this.$router.back()
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
    background: #fff;
    min-height: 800px;
    padding: 20px;
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
  .done-list{
    position: relative;
    margin-top: 60px
  }
  .done-list i.num-tip{
    width: 30px;
    height: 30px;
    border-radius: 50%;
    text-align: center;
    line-height: 30px;
    background: #3D82F7;
    color: #fff;
    position: absolute;
    left: -50px;
    top:36px;
    font-size: 14px;
  }
  .done-list span{
    position: absolute;
    top: -36px;
    left: -50px;
    display: inline-block;
    width: 400px;
    font-size: 14px
  }
  .list-item{
    position: relative;
    margin-bottom: 20px;
  }
</style>
