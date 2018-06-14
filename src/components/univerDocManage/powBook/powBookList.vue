<template lang="html">
  <div class="page">
    <com-breadcrumb :list="['数字证书-套印授权函']"></com-breadcrumb>
    <div class="content-main">

      <el-table header-row-class-name="table-header-define" class="table-btn-style" :data="tableData" highlight-current-row style="width: 100%">
        <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
        <el-table-column property="documentName" label="文档名称" align="center"></el-table-column>
        <el-table-column property="state" label="打标签状态" align="center">
          <template slot-scope="scope">
            {{{0: '待打标签', 1: '已打标签'}[scope.row.state]}}
          </template>
        </el-table-column>
        <el-table-column property="created" label="接收时间" align="center">
          <template slot-scope="scope">
            {{scope.row.created | date}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button v-if="COMF_POWBOOK_SEE" size="mini" type="primary" @click="viewFile(JSON.parse(scope.row.documentUrl).url)">查看</el-button>
            <!--<el-upload-->
              <!--v-if="COMF_POWBOOK_UPLOAD"-->
              <!--style="display: inline"-->
              <!--:before-upload="beforeAvatarUpload"-->
              <!--:on-success="handleAvatarSuccess"-->
              <!--:action="$sever.fileUploadUrl()"-->
              <!--:headers="params"-->
              <!--:show-file-list="false"-->
              <!--:data="{bucketName:'totodi-contract'}">-->
              <!--<el-button type="primary" @click="documentId = scope.row.documentId">合同上传</el-button>-->
            <!--</el-upload>-->
          </template>
        </el-table-column>
      </el-table>

      <div class="foot-bottom">
        <el-pagination
          style="float: right"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="10"
          prev-text="上一页"
          next-text="下一页"
          layout="total, prev, pager, next, jumper"
          :total="parseInt(total)">
        </el-pagination>
      </div>
    </div>

    <label-view-dialog
      :isView="isView"
      @closeView="isView=$event"
      :src="pdfUrl">
    </label-view-dialog>

  </div>
</template>

<script>
  import crypto from '../../../utils/crypto'
  import { Authorization } from '../../../api/config'
  export default {
    data () {
      return {
        currentPage: 1,
        formData: {
          sysCode: 'TTD_MANAGE_SYSTEM',
          type: 3,
          keywords: '',
          pageNum: 1
        },
        total: '',
        tableData: [],

        isView: false,
        pdfUrl: '',

        callData: '',
        params: Authorization(crypto.getTimeStamp()),
        documentId: ''
      }
    },
    created () {
      this.getDataList()
    },
    watch: {
    },
    computed: {
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
          this.callData = data.list[0]
          this.checkUpload()
        } else {
          this.$message({message: msg || '上传文件服务器失败!', type: 'warning', center: true})
        }
      },

      async checkUpload () {
        let obj = {
          sysCode: 'TTD_MANAGE_SYSTEM',
          documentId: this.documentId,
          documentUrl: JSON.stringify(this.callData)
        }
        let res = await this.$sever.uploadPowFile(obj)
        switch (res.code) {
          case 0:
            this.$message({message: '上传成功', type: 'success'})
            this.getDataList()
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      // 获取列表
      async getDataList () {
        let res = await this.$sever.getNoticeOrPowList(this.formData)
        switch (res.code) {
          case 0:
            this.tableData = res.data.list
            this.total = res.data.total
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      viewFile (url) {
        if (!url) {
          this.$message({message: '还未上传文件', type: 'warning'})
          return
        }
        this.pdfUrl = url
        this.isView = true
      },

      getAllDataList () {
        this.formData.keyword = ''
        this.getDataList()
      },
      handleCurrentChange (val) {
        this.formData.pageNum = val
        this.getDataList()
      }
    }
  }
</script>
<style lang="css">
</style>
<style lang="css" scoped>
</style>

