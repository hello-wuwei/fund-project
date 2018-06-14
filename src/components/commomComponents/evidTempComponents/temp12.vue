<template>
	<div class="temp-page">
    <div class="item">
      <p>{{data.investorName}}使用账号{{data.operateAccount}}，在{{data.operatorEquipment}}上，于{{data.operateTime}}在管理人{{data.managerName}}下提交了核心信息变更申请，提交变更后的投资者信息如下：</p>
    </div>
    <div class="item">
      <!--version: 1为新版， 0为旧版-->
      <investor-table :data="data" :version="1" :investorType="data.specificCode"/>
    </div>
    <div class="item">
      <p>提交变更前的投资者信息如下：</p>
    </div>
    <div class="item">
      <person-table :data="data" :version="0"/>
    </div>
    <div class="item">
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
    }
  }
</script>
