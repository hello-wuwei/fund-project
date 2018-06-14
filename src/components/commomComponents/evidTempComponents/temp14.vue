<template>
	<div class="temp-page">
    <div class="item">
      <p>{{data.affiliation}}使用账号{{data.operateAccount}}，在{{data.operateDevice}}上，于{{data.operateTime}}在管理人{{data.managerName}}下进行了风险测评，测评结果及测评问卷内容为：</p>
      <p>
        测评结果是投资者的风险承受等级为：{{data.questionRisk || '--'}}，测评问卷内容为：{{data.questionPdf || '--'}}。
      </p>
    </div>
	</div>
</template>
<style></style>
<script>
  import PersonTable from '../table/PersonTable.vue'
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
        PersonTable
      }
    },
    created () {
    }
  }
</script>
