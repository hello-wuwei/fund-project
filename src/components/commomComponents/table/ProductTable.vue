<template>
  <div class="table">
    <table border="1">
      <tr><td class="title">产品名称</td><td colspan="6">{{data[`${pre}productName`]}}</td></tr>
      <tr><td class="title">产品类型</td><td colspan="2">{{data[`${pre}productType`]}}</td><td class="title">产品备案机构</td><td colspan="3">{{data[`${pre}productRecordCode`]}}</td></tr>
      <tr><td class="title">成立时间</td><td colspan="2">{{data[`${pre}productFoundingDate`]}}</td><td class="title">备案时间</td><td colspan="3">{{data[`${pre}productRecordDate`]}}</td></tr>
      <tr><td class="title">产品备案编号</td><td colspan="2">{{data[`${pre}productRecordNo`]}}</td><td class="title">产品存续期</td><td colspan="3">{{data[`${pre}productSurvivalPeriod`]}}</td></tr>
      <tr><td class="title">产品类别</td><td colspan="2">{{data[`${pre}productCategory`]}}</td><td class="title">产品规模</td><td colspan="3">{{data[`${pre}productScale`]}}</td></tr>
      <tr><td class="title">产品托管人</td><td colspan="6">{{data[`${pre}productDeposit`]}}</td></tr>
      <tr>
        <td class="title" rowspan="6" style="width: 80px">指定授权经办人</td>
        <td class="title" style="width: 80px">姓名</td>
        <td style="width: 100px">{{data[`${pre}transactorName`]}}</td>
        <td class="title" style="width: 80px">姓别</td>
        <td style="width: 100px">{{data[`${pre}transactorSex`]}}</td>
        <td class="title" style="width: 80px">年龄</td>
        <td style="width: 100px">{{data[`${pre}transactorAge`]}}</td>
      </tr>
      <tr><td class="title">证件类型</td><td>{{data[`${pre}transactorCertigicateType`]}}</td><td class="title">证件号码</td><td colspan="3">{{data[`${pre}transactorCertigicateNo`]}}</td></tr>
      <tr><td class="title">职务</td><td>{{data[`${pre}transactorPosition`]}}</td><td class="title">电子邮箱</td><td colspan="3">{{data[`${pre}transactorEmail`]}}</td></tr>
      <tr><td class="title">证件有效期</td><td>{{data[`${pre}transactorCertificateValidity`]}}</td><td class="title">联系方式</td><td colspan="3">手机：{{data[`${pre}transactorMobile`]}} 座机：{{data[`${pre}transactorLandline`]}}</td></tr>
      <tr><td class="title">办公邮编</td><td>{{data[`${pre}transactorOfficeZip`]}}</td><td class="title">办公地址</td><td colspan="3">{{data[`${pre}transactorOfficeAddress`]}}</td></tr>
      <tr><td class="title">与该机构/产品关系</td><td colspan="5">{{data[`${pre}transactorProductRelation`]}}</td></tr>
      <tr><td class="title">管理人名称</td><td colspan="6">{{data[`${pre}managerName`]}}</td></tr>
      <tr><td class="title">机构类型</td><td colspan="2">{{data[`${pre}orgType`]}}</td><td class="title">机构证件类型</td><td colspan="3">{{data[`${pre}orgCertificateType`]}}</td></tr>
      <tr><td class="title">机构证件编号</td><td colspan="2">{{data[`${pre}orgCertificateNo`]}}</td><td class="title">有效期</td><td colspan="3">{{data[`${pre}orgValidity`]}}</td></tr>
      <tr><td class="title">机构资质证明</td><td colspan="2">{{data[`${pre}orgQualificationProve`]}}</td><td class="title">资质证书编号</td><td colspan="3">{{data[`${pre}orgQualificationNo`]}}</td></tr>
      <tr><td class="title">经营范围</td><td colspan="6">{{data[`${pre}orgBusinessScope`]}}</td></tr>
      <tr><td class="title">注册地址</td><td colspan="6">{{data[`${pre}orgRegisterAddress`]}}</td></tr>
      <tr><td class="title">办公地址</td><td colspan="6">{{data[`${pre}orgOfficeAddress`]}}</td></tr>
      <tr><td class="title">注册资本</td><td colspan="2">{{data[`${pre}orgRegisterCapital`]}}</td><td class="title">控股股东或实际控制人</td><td colspan="3">{{data[`${pre}orgController`]}}</td></tr>
      <tr><td class="title">是否为下列产品</td><td colspan="5">
        为《证券期货投资者适当性管理办法》第八条第（一）款机
        构面向投资者发行的证券公司资产管理产品、基金管理公司
        及其子公司产品、期货公司资产管理产品、银行理财产品、
        保险产品、信托产品、经行业协会备案的私募基金，及第
        （一）款规定机构发行的其它理财产品；或者为第（三）款
        规定的社会保障基金、企业年金等养老基金、慈善基金等社
        会公益基金
      </td><td>{{data[`${pre}isFollowProduct`]}}</td></tr>
      <tr><td class="title">资产规模</td><td colspan="5">*私募基金或者资产管理计划投资者，成立规模不得低于
        （含）人民币1000万元</td><td>{{data[`${pre}orgAssetSize`]}}</td></tr>
      <tr><td class="title" colspan="2">是否存在实际控制关系</td><td colspan="5">{{data[`${pre}isControllingShareholder`]}}</td></tr>
      <tr><td class="title" colspan="2">交易的实际受益人</td><td colspan="5">{{data[`${pre}transactionActualBeneficiary`]}}</td></tr>
      <tr><td class="title" colspan="2">是否有不良诚信记录</td><td colspan="5">{{data[`${pre}isBadFaith`]}}</td></tr>
      <tr><td colspan="2" class="title">身份认证资料</td><td colspan="5"><id-check :type="version" :data="data"></id-check></td></tr>
      <tr><td colspan="2" class="title">合格投资者资料</td><td colspan="5"><standard-info :type="version" :data="data"></standard-info></td></tr>
    </table>
  </div>
</template>
<script>
  import IdCheck from './IdCheck.vue'
  import StandardInfo from './StandardInfo.vue'
  export default {
    props: {
      version: {
        type: [Number],
        default: 1
      },
      data: {
        type: [Object]
      }
    },
    components: {
      IdCheck,
      StandardInfo
    },
    data () {
      return {
        pre: ''
      }
    },
    created () {
      this.setPre()
    },
    methods: {
      setPre () {
        this.pre = this.version === 0 ? 'OLD_' : ''
      }
    }
  }
</script>
<style scoped>
  .table table{
    width: 100%;
    font-size: 14px;
    line-height: normal;
  }
  td{
    text-indent: 20px;
    padding: 10px 0;
  }
  .title{
    text-align: center;
    text-indent: 0;
  }
</style>
