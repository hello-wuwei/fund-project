<template>
	<div class="temp-page">
    <div class="item">
      <p>{{data.operatorAccount}}在{{data.operateDevice}}上，于{{data.operateTime}}成功创设了账户，生成的账户号是{{data.operatorAccount}}</p>
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
