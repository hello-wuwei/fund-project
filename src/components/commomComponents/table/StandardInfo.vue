<template>
  <ul>
    <li v-for="(item, index) in viewData" :key="item.code"><label>{{item.label}}：</label>{{data[item.code]}}</li>
  </ul>
</template>
<style></style>
<script>
  export default {
    props: {
      type: {
        type: [Number],
        default: 1
      },
      data: {
        type: [Object]
      }
    },
    data () {
      return {
        config: {
          'OLD_BUSINESS_LICENSE_REGISTR_NO': '营业执照注册号',
          'OLD_UNIFIED_SOCIAL_CREDIT_CODE': '统一社会信用代码',
          'OLD_AGENT_USER_NAME': '经办人姓名',
          'OLD_AGENT_USER_IDCARD_NO': '经办人身份证号码',
          'OLD_AGENT_USER_AUTHORISE_CERTIFICATE': '经办人授权函',
          'OLD_DIGITAL_CERTIFICATE_APPLY': '数字证书申请表',
          'OLD_ELECTRONIC_CHAPTER_COLLECTION': '电子签章采集表',
          'OLD_ORG_CODE_CERTIFICATE': '组织机构代码扫描件',
          'OLD_LEGAL_USER_NAME': '法人代表姓名',
          'OLD_LEGAL_USER_IDCARD_NO': '法人代表身份证号码',
          'OLD_PROOF_INCOME': '收入证明',
          'OLD_PROOF_ASSETS': '资产证明',
          'OLD_INVESTMENT_EXPERIENCE_PROVED': '投资经历证明',
          'OLD_RELEVANT_WORK_CERTIFICATE': '相关工作证明',
          'OLD_PROOF_EMPLOYMENT': '在职证明',
          'OLD_CONTRACT_SCANNING': '合同扫描件',
          'OLD_SOCIAL_SECURITY_PROOF': '社保证明',
          'OLD_PROOF_FINANCIAL_ASSETS': '金融资产证明',
          'OLD_NET_ASSET_PROOF': '净资产证明',
          'OLD_CARRY_FINANCIAL_BUSINESS_PROOF': '开展金融相关业务资格证明',
          'OLD_SOCIAL_INSURANCE_REGISTRATION_CERTIFICATE': '社会保险登记证',
          'OLD_STATISTICAL_REGISTRATION_CERTIFICATE': '统计登记证',
          'OLD_OTHER_PROOFS': '其他',
          'OLD_PRODUCT_INFORMATION': '产品资料',
          'OLD_OVERPRINT_AUTHORIZATION': '套印授权函',
          'OLD_DEPOSIT_CODE': '托管人代码'
        },
        activeConfig: [],
        viewData: []
      }
    },
    created () {
      if (this.type === 0) {
        for (let key in this.config) {
          this.activeConfig['OLD_' + key] = this.config[key]
        }
      } else {
        this.activeConfig = this.config
      }
      for (let key in this.activeConfig) {
        if (this.data.hasOwnProperty(key)) {
          this.viewData.push({
            label: this.activeConfig[key],
            code: key
          })
        }
      }
    }
  }
</script>
