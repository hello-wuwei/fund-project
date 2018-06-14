<template>
	<div class="temp-page">
    <div class="item">
      <p>{{data.affiliation}}使用账号{{data.operateAccount}}，在{{data.operateDevice}}上，于{{data.operateTime}}对私募基金产品{{data.productName}}的预约订单完成了合同签署。预约订单的详细信息为：</p>
      <p>
        发起预约的时间是{{data.bookOrderDate || '--'}}；预约的产品名称是{{data.productName || '--'}}；产品的风险的等级是{{data.riskLevel || '--'}}；产品的基金编码是{{data.productNo || '--'}}；
        产品的托管人是{{data.trustUserName || '--'}}；预约的金额为{{data.orderAmount || '--'}}万元。此订单的订单编号是{{data.orderNo || '--'}}。
      </p>
    </div>
    <div class="item">
      <h4>签署后的合同，对应的文件哈希值为：</h4>
      <p>{{data.originalMd5 || '--'}}</p>
    </div>
    <div class="item">
      <h4>签署前的合同文件信息如下：</h4>
      <p>
        {{data.beforeSignMd5 || '--'}}
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
