<template>
	<div class="temp-page">
    <div class="item">
      <p>{{data.affiliation}}使用账号{{data.operateAccount}}，在{{data.operateDevice}}上，于{{data.operateTime}}为管理人{{data.managerName}}创设了新产品，产品的详细内容为：</p>
      <p>
        发起预约的时间是{{data.bookOrderDate || '--'}}；预约的产品名称是{{data.productName || '--'}}；产品的风险的等级是{{data.riskLevel || '--'}}；产品的基金编码是{{data.productNo || '--'}}；
        产品的托管人是{{data.trustUserName || '--'}}；预约的金额为{{data.orderAmount || '--'}}万元。此订单的订单编号是{{data.orderNo || '--'}}。
      </p>
    </div>
    <div class="item" style="margin-top: 10px">
      <p>此次操作流程批号为：{{data.processNumber}}</p>
    </div>
	</div>
</template>
<style></style>
<script>
  export default {
    props: {
      data: {
        type: [Object]
      }
    },
    components: {
    },
    data () {
      return {
      }
    },
    created () {
    }
  }
</script>
