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
          'BUSINESS_LICENSE_REGISTR_NO': '营业执照注册号',
          'ORG_CODE': '组织机构代码',
          'UNIFIED_SOCIAL_CREDIT_CODE': '统一社会信用代码',
          'AGENT_USER_NAME': '经办人姓名',
          'AGENT_USER_IDCARD_NO': '经办人身份证号码',
          'BUSINESS_LICENSE_DUPLICATES_IMG': '营业执照',
          'AGENT_USER_AUTHORISE_CERTIFICATE': '经办人授权函',
          'DIGITAL_CERTIFICATE_APPLY': '数字证书申请表',
          'ELECTRONIC_CHAPTER_COLLECTION': '电子签章采集表',
          'ORG_CODE_CERTIFICATE': '组织机构代码扫描件',
          'LEGAL_IDCARD_FRONT_CERTIFICATE': '法人身份证正面',
          'THREE_CERTIFICATES_CERTIFICATE': '三证合一',
          'TAX_REGIS_CERTIFICATE': '税务登记证扫描件',
          'AGENT_USER_IDCARD_FRONT_CERTIFICATE': '经办人身份证扫描件正面',
          'LEGAL_IDCARD_REVERSE_CERTIFICATE': '法人身份证反面',
          'LEGAL_USER_NAME': '法人代表姓名',
          'LEGAL_USER_IDCARD_NO': '法人代表身份证号码',
          'SOCIAL_INSURANCE_REGISTRATION_CERTIFICATE': '社会保险登记证',
          'STATISTICAL_REGISTRATION_CERTIFICATE': '统计登记证',
          'IDCARD_FRONT_CERTIFICATE': '身份证正面',
          'IDCARD_REVERSE_CERTIFICATE': '身份证反面',
          'PRODUCT_INFORMATION': '产品资料',
          'AGENT_USER_IDCARD_REVERSE_CERTIFICATE': '经办人身份证扫描件反面',
          'ACCOUNT_OPENING_PERMIT': '开户许可证',
          'OVERPRINT_AUTHORIZATION': '套印授权函',
          'DEPOSIT_CODE': '托管人代码'
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
