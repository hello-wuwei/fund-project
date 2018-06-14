<template lang="html">
  <div class="page">
    <com-breadcrumb :list="['对公账户管理']"></com-breadcrumb>
    <div class="content-main">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="关键词">
          <el-input v-model="formData.keyword" placeholder="请输入要查找的姓名、角色" size="small"></el-input>
        </el-form-item>
        <el-form-item label="认证状态">
          <el-select v-model="formData.isFlag" placeholder="全部" size="small">
            <el-option label="全部" value=""></el-option>
            <el-option label="待审核" value="0"></el-option>
            <el-option label="成功" value="1"></el-option>
            <el-option label="失败" value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="getDataList" size="small" class="btn-revise">搜 索</el-button>
        </el-form-item>
      </el-form>

      <el-table header-row-class-name="table-header-define" class="table-btn-style" :data="tableData" highlight-current-row style="width: 100%">
        <el-table-column property="userName" label="管理人名称" align="center"></el-table-column>
        <el-table-column property="registrationNumber" label="登记编号" align="center"></el-table-column>
        <el-table-column property="isFlag" label="认证状态" align="center">
          <template slot-scope="scope">
            {{{'-1': '待上传', 0: '待审核', 1: '成功', 2: '失败'}[scope.row.isFlag]}}
          </template>
        </el-table-column>
        <el-table-column property="userId" label="注册状态" align="center">
          <template slot-scope="scope">
            {{scope.row.register ? '已注册' : '未注册'}}
          </template>
        </el-table-column>
        <el-table-column property="relationBank" label="对公账号" align="center"></el-table-column>
        <el-table-column property="bankAddress" label="开户行信息" align="center"></el-table-column>
        <el-table-column property="receiptAmount" label="打款金额" align="center">
          <template slot-scope="scope">
            {{scope.row.receiptAmount ? scope.row.receiptAmount / 100 + '元' : '--'}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button v-if="SYS_PUBACC_EDIT" size="mini" type="primary" @click="editAccount(scope.row.userName, false)">修 改</el-button>
            <el-button v-if="SYS_PUBACC_SEE" size="mini" type="primary" @click="editAccount(scope.row.userName, true)">查 看</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="foot-bottom">
        <el-button v-if="SYS_PUBACC_NEW" icon="el-icon-plus" class="bom-btn" size="mini" @click="title = '新增'; isSee = false; isEdit = false; infoSource = false; dialogVisible = true">添加管理人账户信息</el-button>
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

    <el-dialog :title="title" :visible.sync="dialogVisible" width="500px">
      <el-form class="form-list" label-width="100px">
        <el-form-item label="管理人信息：">
          <el-autocomplete v-model="accInfoData.orgName" :disabled="isSee || isEdit || infoSource" :fetch-suggestions="querySearchAsync" size="small" style="width: 300px" placeholder="请输入内容" @select="handleSelect"></el-autocomplete>
        </el-form-item>
        <el-form-item label="银行卡号：">
          <el-input v-model="accInfoData.bankNumber" :disabled="isSee || infoSource" size="small" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="开户行：">
          <el-input v-model="accInfoData.bank" :disabled="isSee || infoSource" size="small" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="开户支行：">
          <el-input v-model="accInfoData.bankAddress" :disabled="isSee || infoSource" size="small" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="金额：">
          <el-input v-model="moneySum.one" :disabled="isSee" ref="monOne" size="small" style="width: 40px"></el-input>
          <el-input v-model="moneySum.two" :disabled="isSee" ref="monTwo" size="small" style="width: 40px"></el-input>
          <i style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #000;margin: 0 10px"></i>
          <el-input v-model="moneySum.three" :disabled="isSee" ref="monThree" size="small" style="width: 40px"></el-input>
          <el-input v-model="moneySum.four" :disabled="isSee" ref="monFour" size="small" style="width: 40px"></el-input>
          <span> 元</span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <span v-if="isSee">
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
        <span v-else>
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveParam">确 定</el-button>
        </span>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        treeData: [],

        currentPage: 1,
        formData: {
          sysCode: 'TTD_MANAGE_SYSTEM',
          keyword: '',
          isFlag: '',
          pageNum: 1
        },

        dialogVisible: false,
        title: '新增',
        isSee: false,
        isEdit: false,
        infoSource: false,
        accInfoData: {
          orgName: '',
          bankNumber: '',
          bankAddress: '',
          bank: '',
          receiptAmount: ''
        },
        timeout: null,

        moneySum: {
          one: '',
          two: '',
          three: '',
          four: ''
        },

        total: '',
        tableData: []
      }
    },
    created () {
      this.getDataList()
    },
    computed: {
    },
    watch: {
      'moneySum.one' (val, oldVal) {
        this.actionNext(val, oldVal, 'one', 'monTwo')
      },
      'moneySum.two' (val, oldVal) {
        this.actionNext(val, oldVal, 'two', 'monThree')
      },
      'moneySum.three' (val, oldVal) {
        this.actionNext(val, oldVal, 'three', 'monFour')
      },
      'moneySum.four' (val, oldVal) {
        this.actionNext(val, oldVal, 'four', 'monFive')
      },
      dialogVisible (bool) {
        if (!bool) {
          for (let key in this.accInfoData) {
            this.accInfoData[key] = ''
          }
          for (let key in this.moneySum) {
            this.moneySum[key] = ''
          }
        }
      }
    },
    methods: {
      getSum () {
        let one = this.moneySum.one ? parseInt(this.moneySum.one) * 1000 : 0
        let two = this.moneySum.two ? parseInt(this.moneySum.two) * 100 : 0
        let three = this.moneySum.three ? parseInt(this.moneySum.three) * 10 : 0
        let four = this.moneySum.four ? parseInt(this.moneySum.four) * 1 : 0
        return one + two + three + four
      },
      actionNext (val, oldVal, step, nextStep) {
        let isNumber = (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9]*$)|(^-?0{1}$)/).test(val + '')
        if (!isNumber) {
          setTimeout(() => {
            this.moneySum[step] = ''
          }, 10)
        } else {
          if (step !== 'four') {
            if (this.moneySum[step] !== '' && val.length === 1) {
              this.$refs[nextStep].focus()
            }
          } else {
//            alert(this.sum)
          }
        }
        if (val.length > 1) {
          setTimeout(() => {
            this.moneySum[step] = oldVal
          }, 20)
        }
      },
      async querySearchAsync (queryString, cb) {
        let results = await this.createStateFilter(queryString)
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        })
      },
      async createStateFilter (queryString) {
        if (!queryString) {
          return []
        }
        let res = await this.$sever.getManagerSearchList({fundName: queryString})
        switch (res.code) {
          case 0:
            let orgList = res.data.list.map((item) => {
              return {
                value: item.fundName
              }
            })
            return orgList
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },
      handleSelect (item) {
        console.log(item)
      },

      numberValidate (val) {
        let patrn = /^\d{6,25}$/
        return patrn.test(val)
      },

      async saveParam () {
        if (!this.numberValidate(this.accInfoData.bankNumber)) {
          this.$message({message: '请输入长度为6-25位数的银行卡号', type: 'warning'})
          return
        }
        this.accInfoData.receiptAmount = this.getSum()
        for (let key in this.accInfoData) {
          if (!this.accInfoData[key]) {
            this.$message({message: '请完善账户信息', type: 'warning'})
            return
          }
        }
        let res = await this.$sever.saveManagerAccInfo(this.accInfoData)
        switch (res.code) {
          case 0:
            this.$message({message: '保存成功', type: 'success'})
            this.dialogVisible = false
            this.getDataList()
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      // 获取角色列表
      async getDataList () {
        let res = await this.$sever.getPublicAccList(this.formData)
        switch (res.code) {
          case 0:
            this.tableData = res.data.list
            this.total = res.data.total
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
      },

      splitAmount (amount) {
        if (!amount) {
          return
        }
        amount = amount.toString()
        amount = amount.split('')
        let len = amount.length
        this.moneySum.one = amount[len - 4] || 0
        this.moneySum.two = amount[len - 3] || 0
        this.moneySum.three = amount[len - 2] || 0
        this.moneySum.four = amount[len - 1] || 0
      },
      async editAccount (orgName, isSee) {
        this.isSee = isSee
        this.title = isSee ? '查看' : '修改'
        this.isEdit = true
        let res = await this.$sever.getToPublicAccDetail({orgName: orgName})
        switch (res.code) {
          case 0:
            this.accInfoData.orgName = res.data.bean.userName
            this.accInfoData.bankNumber = res.data.bean.relationBank
            this.accInfoData.bankAddress = res.data.bean.bankAddress
            this.accInfoData.bank = res.data.bean.bank
            this.infoSource = !(res.data.bean.infoSource === 2)
            this.splitAmount(res.data.bean.receiptAmount)
            this.dialogVisible = true
            break
          default:
            this.$message({message: res.msg, type: 'warning'})
        }
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

