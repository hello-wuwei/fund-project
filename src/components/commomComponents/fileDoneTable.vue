<template>
  <div>
    <el-table header-row-class-name="table-header-define" :data="tableData" highlight-current-row style="width: 100%">
      <el-table-column property="fileName" label="文件类型" align="center"></el-table-column>
      <el-table-column property="originFile" label="托管人上传原文件" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.originFile">
            {{util.getUrlName(scope.row.originFile)}}
            <!--<a style="float: right;" @click="util.loadFileByUrl(scope.row.originFile)">下载</a>-->
          </div>
          <div v-else>--</div>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="util.loadFileByUrl(scope.row.originFile)">下 载</el-button>
          <el-upload
            style="display: inline"
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuccess"
            :action="$sever.fileUploadUrl()"
            :headers="params"
            :show-file-list="false"
            :data="{bucketName:'totodi-contract'}">
            <el-button type="primary" size="mini" @click="uploadType = scope.row.fileName">{{scope.row.state === 0 ? '排版上传' : '重新上传'}}</el-button>
          </el-upload>
          <el-button v-if="scope.row.fileName=='风险揭示书'" :disabled="scope.row.state==0" size="mini" type="primary" @click="enterInfo">录入信息</el-button>
          <el-button size="mini" type="primary" @click="makeSign(scope.row.fileName)" :disabled="(scope.row.fileName=='风险揭示书'&&(scope.row.state==1 || scope.row.state==0)) || (scope.row.fileName!='风险揭示书' && scope.row.state==0)">打标签</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="查看录入信息" :visible.sync="infoSee">
      <div class="list-area">
        <ul>
          <li v-for="(item, index) in recordInfo" :key="index">
            <em>{{item.sortNo}}</em>
            <el-input class="text" type="textarea" :rows="3" v-model="item.content" :disabled="true" resize="none"></el-input>
          </li>
        </ul>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="infoSee = false">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import crypto from '../../utils/crypto'
  import { Authorization } from '../../api/config'
  export default {
    props: {
      tableData: {
        type: [Array],
        required: true
      },
      recordInfo: {
        type: [Array],
        required: false,
        default: () => {
          return []
        }
      },
      productInfo: {
        type: [Object],
        required: true
      }
    },
    data () {
      return {
        params: Authorization(crypto.getTimeStamp()),
        infoSee: false,
        uploadType: ''
      }
    },
    created () {
    },
    watch: {
    },
    methods: {
      beforeAvatarUpload (file) {
        const isRight = /pdf/.test(file.type)
        console.log(file.type)
        if (!isRight) {
          this.$message.error('上传文件只能是PDF格式!')
        }
        return isRight
      },
      handleAvatarSuccess ({code, data, msg}) {
        if (code === 0) {
          this.checkUpload(data.list[0])
        } else {
          this.$message({message: msg || '上传文件服务器失败!', type: 'warning', center: true})
        }
      },

      async checkUpload (url) {
        let obj = null
        let res = null
        if (this.uploadType === '新版合同') {
          obj = {contractId: this.productInfo.contractId, contractUrl: JSON.stringify(url)}
          res = await this.$sever.uploadNewCont(obj)
        } else if (this.uploadType === '风险揭示书') {
          obj = {bookId: this.productInfo.bookId, revealBookUrl: JSON.stringify(url)}
          res = await this.$sever.uploadRiskBook(obj)
        } else {
          obj = {contractId: this.productInfo.contractId, suppleContractUrl: JSON.stringify(url)}
          res = await this.$sever.uploadAgreeCont(obj)
        }
        switch (res.code) {
          case 0:
            this.$message({message: '上传成功', type: 'success'})
            this.$emit('getProInfo')
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      enterInfo () {
        if (this.productInfo.revealBookState === 0) {
          this.$message({message: '请先上传风险揭示书', type: 'warning'})
          return
        }
        this.$router.push({path: '/home/supagree/enterinfo', query: {bookId: this.productInfo.bookId}})
//        this.$emit('enterInfo', {title: '信息录入', name: 'enterInfo', bookId: this.productInfo.bookId})
      },

      makeSign (type) {
        switch (type) {
          case '新版合同':
            this.$router.push({path: '/home/supagree/newcontsign', query: {contractId: this.productInfo.contractId}})
//            this.$emit('makeSign', {title: '打标签', name: 'makeNewContSign', contractId: this.productInfo.contractId})
            break
          case '风险揭示书':
            this.$router.push({path: '/home/supagree/risksign', query: {bookId: this.productInfo.bookId}})
//            this.$emit('makeSign', {title: '打标签', name: 'makeRiskSign', bookId: this.productInfo.bookId})
            break
          default:
            this.$router.push({path: '/home/supagree/agreesign', query: {contractId: this.productInfo.contractId}})
//            this.$emit('makeSign', {title: '打标签', name: 'makeContSign', contractId: this.productInfo.contractId})
        }
      }
    }
  }
</script>
<style>
  .pdf-view-block .el-dialog__body{
    padding-top: 0;
  }
</style>
<style scoped>
  .switch-page{
    overflow: hidden;
    margin-top: -20px;
    margin-bottom: 20px;
  }
  .pdf-area{
    position: relative;
    width: auto;
  }
  .list-area ul li{
    margin-bottom: 20px;
  }
  .list-area ul li em{
    display: inline-block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: dodgerblue;
    margin-right: 20px;
    color: #fff;
    text-align: center;
    line-height: 30px;
    margin-bottom: 22px;
  }
  .list-area ul li .text{
    width: 600px;
  }
  .over-hidden{
    float: left;
    display: block;
    width: 200px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
</style>
