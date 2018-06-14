<template>
	<div class="temp-page">
    <div class="item">
      <p>{{data.affiliation}}使用账号{{data.operateAccount}}，在{{data.operateDevice}}上，于{{data.operateTime}}确认了私募基金产品{{data.productName}}的预约订单。预约订单的详细信息如下：</p>
      <p>
        发起预约的时间是{{data.bookOrderDate || '--'}}；预约的产品名称是{{data.productName || '--'}}；产品的风险的等级是{{data.riskLevel || '--'}}；产品的基金编码是{{data.productNo || '--'}}；
        产品的托管人是{{data.trustUserName || '--'}}；预约的金额为{{data.orderAmount || '--'}}万元。此订单的订单编号是{{data.orderNo || '--'}}。
      </p>
    </div>
    <div class="item">
      <h4>经投资者确认的投资者信息如下：</h4>
      <investor-table :data="data" :version="1" :investorType="data.specificCode"/>
    </div>
    <div class="item">
      <h4>投资者确认的其他操作信息为：</h4>
      <p>
        <b>1、风险不匹配告知内容</b>
        <span>投资者填写了银行账户，银行账户信息为银行账号：{{data.accountCode || '--'}}；账户名：{{data.accountName || '--'}}；开户行：{{data.bankName || '--'}}；投资者阅读并确认了风险不匹配警示函，风险不匹配警示函容为{{data.riskMatchNotify || '--'}}；投资者确认函内容为{{data.investorSureInfo || '--'}}。投资者对以下信息进行了确认：{{data.bookPrompt || '--'}}。</span>
        <b>2、风险匹配告知内容</b>
        <span>投资者填写了银行账户，银行账户信息为银行账号：{{data.accountCode || '--'}}；账户名：{{data.accountName || '--'}}；开户行：{{data.bankName || '--'}}；投资者阅读并确认了风险匹配告知书，投资者确认函内容：{{data.investorSureInfo || '--'}}，投资者对以下信息进行了确认：{{data.bookPrompt || '--'}}。</span>
        <b>3、管理人审核时</b>
        <span>投资者填写了银行账户，银行账户信息为银行账号：{{data.accountCode || '--'}}；账户名：{{data.accountName || '--'}}；开户行：{{data.bankName || '--'}}；投资者阅读并确认了风险匹配告知书，投资者确认函内容：{{data.investorSureInfo || '--'}}。</span>
        <b>4、管理人审核</b>
        <span>投资者填写了银行账户，银行账户信息为银行账号：{{data.accountCode || '--'}}；账户名：{{data.accountName || '--'}}；开户行：{{data.bankName || '--'}}；投资者阅读并确认了风险不匹配警示函，风险不匹配警示函容为{{data.riskMatchNotify || '--'}}；投资者确认函内容为{{data.investorSureInfo || '--'}}</span>
      </p>
    </div>
	</div>
</template>
<style></style>
<script>
  import InvestorTable from '../table/InvestorTable.vue'
  export default {
    props: {
      data: {
        type: [Object]
      }
    },
    components: {
      InvestorTable
    },
    data () {
      return {
      }
    },
    created () {
    }
  }
</script>
