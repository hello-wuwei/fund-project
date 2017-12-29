<template lang="html">
  <div class="page">
    <!--<div class="top-tab">托管人管理</div>-->
    <div class="content-main">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="关键词">
          <el-input v-model="formData.keyword" placeholder="请输入产品名称/托管方" size="small"></el-input>
        </el-form-item>
        <el-form-item label="产品状态">
          <el-select v-model="formData.state" placeholder="请选择产品状态" size="small">
            <el-option label="全部" value=""></el-option>
            <el-option label="待电子化处理" value="3"></el-option>
            <el-option label="待管理人确认" value="5"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="合同状态">
          <el-select v-model="formData.contractState" placeholder="请选择合同状态" size="small">
            <el-option label="全部" value=""></el-option>
            <el-option label="待打标签" value="1"></el-option>
            <el-option label="已打标签" value="2"></el-option>
            <el-option label="待上传合同" value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="getDataList" size="small">搜 索</el-button>
          <el-button type="primary" icon="el-icon-search" @click="getAllDataList" size="small">查看全部</el-button>
        </el-form-item>
      </el-form>

      <el-table header-row-class-name="table-header-define" :data="tableData" highlight-current-row style="width: 100%">
        <el-table-column type="index" align="center" width="50"></el-table-column>
        <el-table-column property="trustUserName" label="托管方" align="center"></el-table-column>
        <el-table-column property="manageName" label="管理人" align="center"></el-table-column>
        <el-table-column property="productName" label="产品名称" align="center"></el-table-column>
        <el-table-column property="productNo" label="协会代码" align="center"></el-table-column>
        <el-table-column property="category" label="产品类型" align="center"></el-table-column>
        <el-table-column property="state" label="产品状态" align="center">
          <template slot-scope="scope">
            <span>{{stateFormat(scope.row.state)}}</span>
          </template>
        </el-table-column>
        <el-table-column property="state" label="合同状态" align="center">
          <template slot-scope="scope">
            <span>{{{0:'待上传合同', 1:'待打标签', 2:'已打标签'}[scope.row.contractState]}}</span>
          </template>
        </el-table-column>
        <el-table-column property="state" label="风险揭示书状态" align="center">
          <template slot-scope="scope">
            <span>{{{0:'待上传合同', 1:'待打标签', 2:'已打标签'}[scope.row.contractState]}}</span>
          </template>
        </el-table-column>
        <el-table-column property="receiveTime" label="产品接收时间" align="center">
          <template slot-scope="scope">{{scope.row.receiveTime | date}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="400">
          <template slot-scope="scope">
            <!--<div style="float: left;margin-right: 10px" v-if="scope.row.state==3 && (scope.row.contractState==0 || scope.row.contractState==1)">-->
              <!--<el-button size="mini" type="primary"><a :href="JSON.parse(scope.row.contractUrl).url" download style="color: #fff">下 载</a></el-button>-->
            <!--</div>-->
            <!--<div style="float: left;margin-right: 10px;" v-if="scope.row.state==3 && (scope.row.contractState==0 || scope.row.contractState==1)">-->
              <!--<el-upload-->
                <!--:before-upload="beforeAvatarUpload"-->
                <!--:on-success="handleAvatarSuccess"-->
                <!--:action="$sever.fileUploadUrl()"-->
                <!--:headers="params"-->
                <!--:show-file-list="false"-->
                <!--:data= "{bucketName:'totodi-contract'}">-->
                <!--<el-button size="mini" type="primary" @click="contractId = scope.row.contractId">上 传</el-button>-->
              <!--</el-upload>-->
            <!--</div>-->
            <!--<div style="float: left;margin-right: 10px;">-->
              <!--<el-button size="mini" type="primary" @click="seeView(scope.row.contractId)">查 看</el-button>-->
            <!--</div>-->
            <!--<div style="float: left;" v-if="scope.row.contractState==1">-->
              <!--<el-button size="mini" type="primary" @click="makingLabel(scope.row.contractId)">打标签</el-button>-->
            <!--</div>-->
            <el-button size="mini" type="primary" @click="contractDone(scope.row.contractId)">合同处理</el-button>
            <el-button size="mini" type="primary" @click="riskbookDone(scope.row.contractId)">风险揭示书处理</el-button>
            <el-button size="mini" type="primary" @click="seeView(scope.row.contractId)">查 看</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="foot-bottom">
        <el-button icon="el-icon-plus" type="primary" size="small" @click="textLabelResp">文本标签库</el-button>
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

    <el-dialog title="提示" :visible.sync="dialogVisible" style="width: 60%;margin: auto">
      <p style="text-align: center">您是否确认上传该合同？确认后，该合同将传给管理人进行确认。</p>
      <div style="margin: 20px 0; text-align: center">
        <el-button type="primary" @click="checkUpload">确 定</el-button>
        <el-button @click="dialogVisible=false">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import crypto from '../../../utils/crypto'
  import { Authorization } from '../../../api/config'
  export default {
    data () {
      return {
        dialogVisible: false,
        currentPage: 1,
        callData: '',
        contractId: '',
        params: Authorization(crypto.getTimeStamp()),
        formData: {
          sysCode: 'TTD_MANAGE_SYSTEM',
          keyword: '',
          state: '',
          contractState: '',
          pageNum: 1
        },
        total: '',
        tableData: []
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
      // 获取产品列表
      async getDataList () {
        let res = await this.$sever.getProductList(this.formData)
        switch (res.code) {
          case 0:
            this.tableData = res.data.list
            this.total = res.data.total
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

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
          console.log(data)
          this.callData = data.list[0]
          this.checkUpload()
        } else {
          this.$message({message: msg || '上传失败!', type: 'warning', center: true})
        }
      },

      async checkUpload () {
        let obj = {
          contractId: this.contractId,
          contractUrl: JSON.stringify(this.callData)
        }
        let res = await this.$sever.uploadContract(obj)
        switch (res.code) {
          case 0:
            this.getDataList()
//            this.dialogVisible = false
            this.$message({message: '上传成功', type: 'success'})
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      stateFormat (state) {
        return {
          '3': '待电子化处理',
          '5': '待管理人确认'
        }[state]
      },

      download (contractUrl) {
        window.location.href = contractUrl
      },

      getAllDataList () {
        this.formData.keyword = ''
        this.formData.state = ''
        this.formData.contractState = ''
        this.getDataList()
      },
      contractDone (id) {
        this.$emit('addTag', {title: '合同处理', name: 'contractDone', oId: id})
      },
      riskbookDone (id) {
        this.$emit('addTag', {title: '风险揭示书处理', name: 'riskbookDone', oId: id})
      },
      seeView (id) {
        this.$emit('addTag', {title: '查看', name: 'seeView', oId: id})
      },
      makingLabel (id) {
        this.$emit('addTag', {title: '打标签', name: 'makeSign', oId: id})
      },
      textLabelResp () {
        this.$emit('addTag', {title: '文本标签库', name: 'textLabelResp'})
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

