<template lang="html">
  <div class="page">
    <com-breadcrumb :list="['产品创设']"></com-breadcrumb>
    <div class="content-main">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="关键词">
          <el-input v-model="formData.keyword" placeholder="请输入产品名称/托管方" size="small"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formData.state" placeholder="请选择产品状态" size="small">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="(item, index) in formatProState.stateForm" :key="item.value" :label="item.label" :value="item.value"></el-option>
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

        <el-form-item label="风险揭示书状态">
          <el-select v-model="formData.revealBookState" placeholder="请选择风险揭示书状态" size="small">
            <el-option label="全部" value=""></el-option>
            <el-option label="待上传风险揭示书" value="0"></el-option>
            <el-option label="待信息录入" value="1"></el-option>
            <el-option label="待打标签" value="2"></el-option>
            <el-option label="已打标签" value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="getDataList" size="small" class="btn-revise">搜 索</el-button>
        </el-form-item>
      </el-form>

      <el-table header-row-class-name="table-header-define" class="table-btn-style" :data="tableData" highlight-current-row style="width: 100%">
        <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
        <el-table-column property="productNo" label="基金编码" align="center"></el-table-column>
        <el-table-column property="productName" label="基金名称" align="center"></el-table-column>
        <el-table-column property="trustUserName" label="托管方" align="center"></el-table-column>
        <el-table-column property="manageName" label="管理人" align="center"></el-table-column>
        <el-table-column property="category" label="产品类型" align="center"></el-table-column>
        <el-table-column property="state" label="状态" align="center">
          <template slot-scope="scope">
            <span>{{formatSupState.getState(scope.row.state)}}</span>
          </template>
        </el-table-column>
        <el-table-column property="state" label="合同状态" align="center">
          <template slot-scope="scope">
            <span>{{{0:'待上传合同', 1:'待打标签', 2:'已打标签'}[scope.row.contractState]}}</span>
          </template>
        </el-table-column>
        <el-table-column property="revealBookState" label="风险揭示书状态" align="center">
          <template slot-scope="scope">
            <span>{{{0:'待上传风险揭示书',1:'待信息录入',2:'待打标签',3:'已打标签'}[scope.row.revealBookState]}}</span>
          </template>
        </el-table-column>
        <el-table-column property="receiveTime" label="产品接收时间" align="center">
          <template slot-scope="scope">{{scope.row.receiveTime | date}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="400">
          <template slot-scope="scope">
            <el-button v-if="PROD_MAKE_CONT && scope.row.contractState!=2" size="mini" type="primary" @click="contractDone(scope.row.contractId)">合同处理</el-button>
            <el-button v-if="PROD_MAKE_RISK && scope.row.revealBookState!=3" size="mini" type="primary" @click="riskbookDone(scope.row.bookId)">风险揭示书处理</el-button>
            <el-button v-if="PROD_MAKE_SEE" size="mini" type="primary" @click="seeView(scope.row.contractId, scope.row.bookId)">查 看</el-button>
            <el-button v-if="scope.row.contractState==2 && scope.row.revealBookState==3 && scope.row.state==3" size="mini" type="primary" @click="getCheck(scope.row.productId)">确认提交</el-button>
            <!--<el-button v-if="scope.row.contractState==2 && scope.row.revealBookState==3" size="mini" type="primary" @click="getCheck(scope.row.productId)">确认提交</el-button>-->
            <el-button v-if="scope.row.contractState==2" size="mini" type="primary" @click="changeLabel(scope.row.contractId, true)">修改合同标签</el-button>
            <el-button v-if="scope.row.revealBookState==3" size="mini" type="primary" @click="changeRiskLabel(scope.row.bookId, true)">修改风险揭示书标签</el-button>
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

    <el-dialog title="提示" :visible.sync="dialogVisible" style="width: 60%;margin: auto">
      <p style="text-align: center">电子化完成的合同与风险揭示书即将发送给管理人，您确定么？</p>
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
          revealBookState: '',
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

      getCheck (productId) {
        this.$confirm('请确认是否提交？请确保电子化处理已完成，提交后将发至管理人进行确认。', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.checkSubmit(productId)
        }).catch(() => {
        })
      },

      async checkSubmit (productId) {
        let res = await this.$sever.submitProManager({productId: productId})
        switch (res.code) {
          case 0:
            this.getDataList()
            this.$message({message: '提交成功', type: 'success'})
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      download (contractUrl) {
        window.location.href = contractUrl
      },

      getAllDataList () {
        this.formData.keyword = ''
        this.formData.state = ''
        this.formData.contractState = ''
        this.formData.revealBookState = ''
        this.getDataList()
      },
      contractDone (id) {
        this.$router.push({path: '/home/product/contdone', query: {contractId: id}})
      },
      riskbookDone (id) {
        this.$router.push({path: '/home/product/riskdone', query: {bookId: id}})
      },
      seeView (contractId, bookId) {
        this.$router.push({path: '/home/product/see', query: {contractId: contractId, bookId: bookId}})
      },

      changeLabel (id) {
        this.$router.push({path: '/home/product/contractsign', query: {contractId: id}})
      },
      changeRiskLabel (id) {
        this.$router.push({path: '/home/product/risksign', query: {bookId: id}})
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

