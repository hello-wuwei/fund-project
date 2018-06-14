<template>
	<div class="temp-page">
    <div class="item">
      <p>{{data.affiliation}}使用账号{{data.operateAccount}}，在{{data.operateDevice}}上，于{{data.operateTime}}添加了投资者{{data.investorName}}，添加的投资者详细信息为：</p>
    </div>
    <div class="item">
      <investor-table :data="data" :version="1" :investorType="data.specificCode"/>
    </div>
    <div class="item" style="margin-top: 10px">
      <p>此次操作流程批号为：{{data.processNumber}}</p>
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
