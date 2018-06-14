<template>
	<div class="temp-page">
    <div class="item">
      <p>{{data.affiliation}}使用账号{{data.operateAccount}}，在{{data.operateDevice}}上，于{{data.operateTime}}确认了私募基金产品{{data.productName}}的补充协议，确认的详细内容为：</p>
      <p>
        确认了私募基金产品{{data.productName || '--'}}的内容，确认的产品信息为：{{data.productInfo || '--'}}；确认的合同文件是：{{data.contractFile || '--'}}；确认的风险揭示文件是：{{data.revealBookFile || '--'}}。授权四川妥妥递科技有限公司代为进行数字证书签章内容为：{{data.authSignContent || '--'}}。
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
