<template>
	<div class="temp-page">
    <div class="item">
      <p>{{data.affiliation}}使用账号{{data.operateAccount}}，在{{data.operateDevice}}上，于{{data.operateTime}}确认了管理人{{data.managerName}}提交的私募基金产品的补充协议生效告知函，详细内容如下：</p>
      <p>
        产品的信息为{{data.productInfo || '--'}}；补充协议已签署的份额数量是{{data.signCount || '--'}}；管理人标记产品已赎回的份额数量是{{data.ransomCount ||
        '--'}}，确定协议生效的时间是{{data.effectiveDate || '--'}}；{{data.isTrace === '是' ? '需要' : '不需要'}}追溯，<em
        v-if="data.isTrace == '是'">追溯的时间是：{{data.traceDate || '--'}}；</em>补充协议文件是{{data.suppleContractFile ||
        '--'}}，新合同文件是{{data.contractFile || '--'}}；新风险揭示书文件{{data.revealBookFile || '--'}}；生效告知函是：{{data.informFile ||
        '--'}}。
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
