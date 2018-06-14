<template>
	<div class="temp-page">
    <div class="item">
      <p>{{data.affiliation}}使用账号{{data.operateAccount}}，在{{data.operateDevice}}上，于{{data.operateTime}}创建了私募基金产品{{data.productName}}的补充协议，详细内容如下：</p>
      <p>
        托管人给管理人{{data.managerName || '--'}}下的产品{{data.productName || '--'}}，创设了补充协议，补充协议类型是{{data.contractType ||
        '--'}}；<em v-if="data.modifyNameStatus == '是'">修改了产品名称，修改后的产品名称为{{data.modifyProductName}}，</em>上传的新合同文件是{{data.contractFile
        || '--'}}，上传的新风险揭示文件是{{data.revealBookFile || '--'}}，上传的补充协议文件是{{data.suppleContractFile || '--'}}。
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
