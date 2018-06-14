<template>
	<div class="temp-page">
    <div class="item">
      <p>{{data.affiliation}}使用账号{{data.operateAccount}}，在{{data.operateDevice}}上，于{{data.operateTime}}确认了私募基金产品{{data.productName}}的信息及合同文件，确认的详细内容为：</p>
      <p>
        确认了私募基金产品{{data.productName || '--'}}的补充协议，确认的详细信息如下：补充协议类型是{{data.contractType || '--'}}；<em
        v-if="data.modifyNameStatus == '是'">修改了产品名称，修改后的产品名称为{{data.modifyProductName}}，</em>确认的新合同文件是{{data.contractFile
        || '--'}}，确认的新风险揭示文件是{{data.revealBookFile || '--'}}，确认的补充协议文件是{{data.suppleContractFile || '--'}}。
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
