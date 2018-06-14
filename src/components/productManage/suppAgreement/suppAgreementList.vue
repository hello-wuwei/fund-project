<template lang="html">
  <div class="page">
    <com-breadcrumb :list="['补充协议']"></com-breadcrumb>
    <div class="content-main">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="关键词">
          <el-input v-model="formData.keyword" placeholder="请输入产品名称/托管方" size="small"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formData.suppleContractState" placeholder="请选择产品状态" size="small">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="(item, index) in formatSupState.stateForm" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="协议状态">
          <el-select v-model="formData.suppleContractElecState" placeholder="请选择合同状态" size="small">
            <el-option label="全部" value=""></el-option>
            <el-option label="待打标签" value="1"></el-option>
            <el-option label="已打标签" value="2"></el-option>
            <el-option label="待上传合同" value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="新合同状态">
          <el-select v-model="formData.state" placeholder="请选择风险揭示书状态" size="small">
            <el-option label="全部" value=""></el-option>
            <el-option label="待打标签" value="1"></el-option>
            <el-option label="已打标签" value="2"></el-option>
            <el-option label="待上传合同" value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="getDataList" size="small" class="btn-revise">搜 索</el-button>
        </el-form-item>
      </el-form>

      <el-table header-row-class-name="table-header-define" class="table-btn-style" :data="tableData" highlight-current-row style="width: 100%">
        <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
        <el-table-column property="productNo" label="基金编码" align="center"></el-table-column>
        <el-table-column property="productName" label="产品名称" align="center"></el-table-column>
        <el-table-column property="trustUserName" label="托管方" align="center"></el-table-column>
        <el-table-column property="manageName" label="管理人" align="center"></el-table-column>
        <el-table-column property="suppleContractState" label="状态" align="center">
          <template slot-scope="scope">
            <span>{{formatSupState.getState(scope.row.suppleContractState)}}</span>
          </template>
        </el-table-column>
        <el-table-column property="suppleContractElecState" label="文件处理进度" align="center" width="160">
          <template slot-scope="scope">
            <ul v-if="scope.row.contractType == 4 || scope.row.contractType == 5" class="progress">
              <li :style="formatSuppleState(scope.row).color">{{formatSuppleState(scope.row).des}}</li>
            </ul>

            <ul v-else class="progress">
              <li><span>新合同：</span><i :style="setColor(scope.row.state, 3)">{{{0:'未处理', 1:'处理中', 2:'已处理'}[scope.row.state]}}</i></li>
              <li v-if="scope.row.revealBookState!=null"><span>风险揭示书：</span><i :style="setColor(scope.row.revealBookState, 4)">{{{0:'未处理', 1:'处理中', 2:'处理中', 3:'已处理'}[scope.row.revealBookState]}}</i></li>
              <li><span>补充协议：</span><i :style="setColor(scope.row.suppleContractElecState, 3)">{{{0:'未处理', 1:'处理中', 2:'已处理'}[scope.row.suppleContractElecState]}}</i></li>
            </ul>
          </template>
        </el-table-column>
        <el-table-column property="contractType" label="签署模式" align="center">
          <template slot-scope="scope">
            <span>{{{1:'创设合同', 3:'签署模式', 4:'公告告知', 5:'征询意见函'}[scope.row.contractType]}}</span>
          </template>
        </el-table-column>
        <el-table-column property="created" label="接收时间" align="center">
          <template slot-scope="scope">{{scope.row.created | date}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="300">

          <template slot-scope="scope">
            <span v-if="scope.row.contractType == 4 || scope.row.contractType == 5">
              <el-button v-if="scope.row.suppleContractState==3" size="mini" type="primary" @click="specialDone(scope.row.contractId, scope.row.bookId, scope.row.contractType)">处 理</el-button>
              <el-button v-else size="mini" type="primary" @click="seeView(scope.row.contractId, scope.row.bookId)">查 看</el-button>
              <!--<el-button v-if="formatSuppleState(scope.row).des == '已处理'" size="mini" type="primary" @click="seeView(scope.row.contractId, scope.row.bookId)">查 看</el-button>-->
              <!--<el-button v-else size="mini" type="primary" @click="specialDone(scope.row.contractId, scope.row.bookId, scope.row.contractType)">处 理</el-button>-->
            </span>
            <span v-else>
              <span v-if="scope.row.suppleContractState == 3">
                <el-button v-if="PROD_AGRE_SUPP" size="mini" type="primary" @click="agreeDone(scope.row.contractId)">补充协议电子化</el-button>
                <el-button v-if="PROD_AGRE_NEWC" size="mini" type="primary" @click="newContDone(scope.row.contractId)">新合同电子化</el-button>
                <el-button v-if="PROD_AGRE_RISK && scope.row.revealBookState!=null" size="mini" type="primary" @click="riskbookDone(scope.row.bookId)">风险揭示书电子化</el-button>
                <el-button v-if="PROD_AGRE_SUBM && ((!scope.row.revealBookState&&scope.row.revealBookState!=0)||scope.row.revealBookState==3)&&scope.row.state==2&&scope.row.suppleContractElecState==2" size="mini" type="primary" @click="getCheck(scope.row.contractId)">管理人确认</el-button>
              </span>

              <span v-else>
                <el-button v-if="PROD_AGRE_SEE" size="mini" type="primary" @click="seeView(scope.row.contractId, scope.row.bookId)">查看</el-button>
              </span>
            </span>
            <el-button v-if="scope.row.suppleContractState==5" size="mini" type="primary" @click="changeLabel(scope.row.contractId)">修改合同标签</el-button>
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

  </div>
</template>

<script>
  export default {
    data () {
      return {
        currentPage: 1,
        contractId: '',
        formData: {
          sysCode: 'TTD_MANAGE_SYSTEM',
          keyword: '',
          state: '',
          suppleContractElecState: '',
          suppleContractState: '',
          pageNum: 1
        },
        total: '',
        tableData: []
      }
    },
    created () {
      this.getDataList()
    },
    methods: {
      // 获取产品列表
      async getDataList () {
        let res = await this.$sever.getAgreeList(this.formData)
        switch (res.code) {
          case 0:
            this.tableData = res.data.list
            console.log('协议数据：', res)
            this.total = res.data.total
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      getAllDataList () {
        this.formData.keyword = ''
        this.formData.state = ''
        this.formData.suppleContractElecState = ''
        this.formData.suppleContractState = ''
        this.getDataList()
      },

      getCheck (contractId) {
        this.$confirm('请确认是否提交？请确保电子化处理已完成，提交后将发至管理人进行确认。', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.checkSubmit(contractId)
        }).catch(() => {
        })
      },

      async checkSubmit (contractId) {
        let res = await this.$sever.submitManager({contractId: contractId})
        switch (res.code) {
          case 0:
            this.getDataList()
            this.$message({message: '提交成功', type: 'success'})
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      setColor (state, num) {
        if (num === 3) {
          return 'color:' + {
            0: '#FF553C',
            1: '#FF8600',
            2: '#29C76C'
          }[state]
        }
        if (num === 4) {
          return 'color:' + {
            0: '#FF553C',
            1: '#FF8600',
            2: '#FF8600',
            3: '#29C76C'
          }[state]
        }
      },

      agreeDone (id) {
        this.$router.push({path: '/home/supagree/agreedone', query: {contractId: id}})
      },
      newContDone (id) {
        this.$router.push({path: '/home/supagree/newcontdone', query: {contractId: id}})
      },
      riskbookDone (id) {
        this.$router.push({path: '/home/supagree/riskdone', query: {bookId: id}})
      },
      seeView (contractId, bookId) {
        this.$router.push({path: '/home/supagree/see', query: {contractId: contractId, bookId: bookId}})
      },

      changeLabel (id) {
        this.$router.push({path: '/home/supagree/agreesign', query: {contractId: id}})
      },

      specialDone (contractId, bookId, type) {
        let name = {4: '公告告知处理', 5: '征询意见函处理'}[type]
        this.$router.push({path: '/home/supagree/batchdone', query: {contractId: contractId, bookId: bookId, type: name}})
      },
      handleCurrentChange (val) {
        this.formData.pageNum = val
        this.getDataList()
      },

      formatSuppleState (row) {
        if (!row.suppleContractElecState && !row.state && !row.revealBookState) {
          return {
            color: {color: '#FF553C'},
            des: '未处理'
          }
        }
        if (row.suppleContractState === 3) {
          return {color: {color: '#FF8600'}, des: '处理中'}
        } else {
          return {color: {color: '#29C76C'}, des: '已处理'}
        }
      }
    }
  }
</script>
<style lang="css">
</style>
<style lang="css" scoped>
  .progress li span{
    display: inline-block;
    width: 84px;
    text-align: right;
  }
</style>

