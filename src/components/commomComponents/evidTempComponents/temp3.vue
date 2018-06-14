<template>
	<div class="temp-page">
    <div class="item">
      <p>{{data.affiliation}}使用账号{{data.operateAccount}}，在{{data.operateDevice}}上，于{{data.operateTime}}在管理人{{data.managerName}}下申请请了特定对象认证，申请特定对象认证的详细内容如下：</p>
      <p>
        投资者申请的类型是{{data.specificName || '--'}}；投资者证件号是{{data.bankUserIdCard || '--'}}；
        身份认证内容为身份证号：{{data.bankUserIdCard || '--'}}；姓名：{{data.bankUserName || '--'}}；银行卡号：{{data.bankNo || '--'}}；预留手机号：{{data.bankMobile || '--'}}，{{data.authenticationResult || '--'}}；
        投资者确认的《妥妥递私募基金管理人综合服务系统服务协议》信息为{{data.networkServicesAgreement || '--'}}；投资者确认信息为{{data.invenstorInfo || '--'}}；
        投资者确认的合格投资者承诺函信息为{{data.qualifiedInvestorCommitmentLetter || '--'}}；投资者的风险测评等级为{{data.questionRisk || '--'}}，风险测评的原始问卷为：{{data.questionPdf || '--'}}。
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
