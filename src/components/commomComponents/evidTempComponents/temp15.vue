<template>
	<div class="temp-page">
    <div class="item">
      <p>{{data.affiliation}}使用账号{{data.operateAccount}}，在{{data.operateDevice}}上，于{{data.operateTime}}在管理人{{data.managerName}}下提交了类型转化申请，提交申请的详细内容如下：</p>
      <p v-if="data.changeSpecificCode=='SPECIFIC_PERSONAL_ORDINARY' || data.changeSpecificCode=='SPECIFIC_PERSONAL_ORDINARY'">
        <b>专业转普通</b>
        <span>投资者{{data.investorName}}，证件号是{{data.cardNumber}}。申请由专业投资者转为普通投资者，申请成功。</span>
      </p>
      <p v-else>
        <b>普通转专业</b>
        <span>投资者{{data.investorName}}，证件是{{data.cardNumber}}。申请由普通投资者转专业投资者，申请提交的详细资料：</span>
        <span>统一社会信用代码：{{data.UNIFIED_SOCIAL_CREDIT_CODE || '--'}}</span>
        <span>经办人姓名：{{data.AGENT_USER_NAME || '--'}}</span>
        <span>经办人身份证号码：{{data.AGENT_USER_IDCARD_NO || '--'}}</span>
        <span>经办人授权函：{{data.AGENT_USER_AUTHORISE_CERTIFICATE || '--'}}</span>
        <span>数字证书申请表：{{data.DIGITAL_CERTIFICATE_APPLY || '--'}}</span>
        <span>电子签章采集表：{{data.ELECTRONIC_CHAPTER_COLLECTION || '--'}}</span>
        <span>法人代表姓名：{{data.LEGAL_USER_NAME || '--'}}</span>
        <span>法人代表身份证号码：{{data.LEGAL_USER_IDCARD_NO || '--'}}</span>
        <span>收入证明：{{data.PROOF_INCOME || '--'}}</span>
        <span>资产证明：{{data.PROOF_ASSETS || '--'}}</span>
        <span>投资经历证明：{{data.INVESTMENT_EXPERIENCE_PROVED || '--'}}</span>
        <span>相关工作证明：{{data.RELEVANT_WORK_CERTIFICATE || '--'}}</span>
        <span>在职证明：{{data.PROOF_EMPLOYMENT || '--'}}</span>
        <span>合同扫描件：{{data.CONTRACT_SCANNING || '--'}}</span>
        <span>社保证明：{{data.SOCIAL_SECURITY_PROOF || '--'}}</span>
        <span>金融资产证明：{{data.PROOF_FINANCIAL_ASSETS || '--'}}</span>
        <span>净资产证明：{{data.NET_ASSET_PROOF || '--'}}</span>
        <span>开展金融相关业务资格证明：{{data.CARRY_FINANCIAL_BUSINESS_PROOF || '--'}}</span>
        <span>社会保险登记证：{{data.SOCIAL_INSURANCE_REGISTRATION_CERTIFICATE || '--'}}</span>
        <span>统计登记证：{{data.STATISTICAL_REGISTRATION_CERTIFICATE || '--'}}</span>
        <span>其他：{{data.OTHER_PROOFS || '--'}}</span>
        <span>产品资料：{{data.PRODUCT_INFORMATION || '--'}}</span>
        <span>套印授权函：{{data.OVERPRINT_AUTHORIZATION || '--'}}</span>
        <span>托管人代码：{{data.DEPOSIT_CODE || '--'}}</span>
      </p>
    </div>
    <div class="item" style="margin-top: 10px">
      <p>此次操作流程批号为：{{data.processNumber}}</p>
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
