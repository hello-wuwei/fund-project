<template>
	<div class="temp-page">
    <div class="item">
      <p>{{data.affiliation}}使用账号{{data.operateAccount}}，在{{data.operateDevice}}上，于{{data.operateTime}}审核通过了投资者{{data.investorName}} 的核心信息变更申请，审核的投资者详细信息为：</p>
    </div>
    <div class="item">
      <investor-table :data="data" :version="1" :investorType="data.specificCode"/>
      <!--<investor-table :data="data" :version="1" :investorType="'ORG'"/>-->
    </div>
    <div class="item" style="margin-top: 10px">
      <p>此次操作流程批号为：{{data.processNumber}}</p>
    </div>
	</div>
</template>
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
