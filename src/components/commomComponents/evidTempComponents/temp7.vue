<template>
	<div class="temp-page">
    <div class="item">
      <p>{{data.affiliation}}使用账号{{data.operateAccount}}，在{{data.operateDevice}}上，于{{data.operateTime}}对私募基金产品{{data.productName}}的的订单进行了双录。预约订单的详细信息如下：</p>
      <p>
        发起预约的时间是{{data.bookOrderDate || '--'}}；预约的产品名称是{{data.productName || '--'}}；产品的风险的等级是{{data.riskLevel || '--'}}；产品的基金编码是{{data.productNo || '--'}}；
        产品的托管人是{{data.trustUserName || '--'}}；预约的金额为{{data.orderAmount || '--'}}万元。此订单的订单编号是{{data.orderNo || '--'}}。
      </p>
    </div>
    <div class="item">
      <h4>双录的详细内容为：</h4>
      <p>
        <b>1、双录</b>
        <span>双录文件：{{data.originalMd5 || '--'}}</span>
        <b>2、合同签署</b>
        <span>签署合同的编号是: {{data.contractNo || '--'}}，模板文件为{{data.originalMd5 || '--'}}，签署前的文件内容是：{{data.beforeSignMd5 || '--'}}</span>
        <b>3、风险揭示书签署</b>
        <span>模板文件为：{{data.originalMd5 || '--'}}，签署前的文件内容是：{{data.beforeSignMd5 || '--'}}</span>
      </p>
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
