<template>
	<div class="table">
    <table border="1">
      <tr><td class="title">机构名称</td><td colspan="6">{{data[`${pre}orgName`]}}</td></tr>
      <tr><td class="title">机构类型</td><td colspan="2">{{data[`${pre}orgType`]}}</td><td class="title">机构证件类型</td><td colspan="3">{{data[`${pre}orgDocumentsType`]}}</td></tr>
      <tr><td class="title">机构证件编号</td><td colspan="2">{{data[`${pre}orgDocumentsNo`]}}</td><td class="title">有效期</td><td colspan="3">{{data[`${pre}orgDocumentsValidity`]}}</td></tr>
      <tr><td class="title">机构资质证明</td><td colspan="2">{{data[`${pre}orgQualificationProve`]}}</td><td class="title">资质证书编号</td><td colspan="3">{{data[`${pre}orgQualificationNo`]}}</td></tr>
      <tr><td class="title">经营范围</td><td colspan="6">{{data[`${pre}orgBusinessScope`]}}</td></tr>
      <tr><td class="title">注册地址</td><td colspan="6">{{data[`${pre}orgRegisterAddress`]}}</td></tr>
      <tr><td class="title">办公地址</td><td colspan="6">{{data[`${pre}orgAddress`]}}</td></tr>
      <tr><td class="title">注册资本</td><td colspan="2">{{data[`${pre}orgRegisteredCapital`]}}</td><td class="title" colspan="2">控股股东或实际控制人</td><td colspan="2">{{data[`${pre}orgController`]}}</td></tr>
      <tr>
        <td class="title" rowspan="5" style="width: 80px">法定代表或负责人</td>
        <td class="title" style="width: 80px">姓名</td>
        <td style="width: 100px">{{data[`${pre}representativeName`]}}</td>
        <td class="title" style="width: 80px">姓别</td>
        <td style="width: 100px">{{data[`${pre}representativeSex`]}}</td>
        <td class="title" style="width: 80px">年龄</td>
        <td style="width: 100px">{{data[`${pre}representativeAge`]}}</td>
      </tr>
      <tr><td class="title">证件类型</td><td>{{data[`${pre}representativeDocumentsType`]}}</td><td class="title">证件号码</td><td colspan="3">{{data[`${pre}representativeIdCardNo`]}}</td></tr>
      <tr><td class="title">职务</td><td>{{data[`${pre}representativePosition`]}}</td><td class="title">电子邮箱</td><td colspan="3">{{data[`${pre}representativeEmail`]}}</td></tr>
      <tr><td class="title">证件有效期</td><td>{{data[`${pre}representativeDocumentsValidity`]}}</td><td class="title">联系方式</td><td colspan="3">手机：{{data[`${pre}representativeMobile`]}} 座机：{{data[`${pre}representativeLanline`]}}</td></tr>
      <tr><td class="title">办公邮编</td><td>{{data[`${pre}representativeZip`]}}</td><td class="title">办公地址</td><td colspan="3">{{data[`${pre}representativeAddress`]}}</td></tr>
      <tr>
        <td class="title" rowspan="6" style="width: 80px">指定授权经办人</td>
        <td class="title" style="width: 80px">姓名</td>
        <td style="width: 100px">{{data[`${pre}managersName`]}}</td>
        <td class="title" style="width: 80px">姓别</td>
        <td style="width: 100px">{{data[`${pre}managersSex`]}}</td>
        <td class="title" style="width: 80px">年龄</td>
        <td style="width: 100px">{{data[`${pre}managersAge`]}}</td>
      </tr>
      <tr><td class="title">证件类型</td><td>{{data[`${pre}managersDocumentsType`]}}</td><td class="title">证件号码</td><td colspan="3">{{data[`${pre}managersIdCardNo`]}}</td></tr>
      <tr><td class="title">职务</td><td>{{data[`${pre}managersPosition`]}}</td><td class="title">电子邮箱</td><td colspan="3">{{data[`${pre}managersEmail`]}}</td></tr>
      <tr><td class="title">证件有效期</td><td>{{data[`${pre}managersDocumentsValidity`]}}</td><td class="title">联系方式</td><td colspan="3">电话：{{data[`${pre}managersMobile`]}} 座机：{{data[`${pre}managersLanline`]}}</td></tr>
      <tr><td class="title">办公邮编</td><td>{{data[`${pre}managersZip`]}}</td><td class="title">办公地址</td><td colspan="3">{{data[`${pre}managersAddress`]}}</td></tr>
      <tr><td class="title">与该机构关系</td><td colspan="5">{{data[`${pre}relationshipWithOrg`]}}</td></tr>
      <tr><td class="title">是否为下列机构</td><td colspan="5">符合《证券期货投资者适当性管理办法》第八条第（一）款
        所规定的证券公司、期货公司、基金管理公司及其子公司、
        商业银行、保险公司、信托公司、财务公司；或在中国证券
        投资基金业协会登记或者备案的证券公司子公司、期货公司
        子公司、私募基金管理人；或者第（三）款所规定的合格境
        外机构投资者（QFII),人民币合格境外机构投资者
        （RQFII)；或者第（四）款的规定，最近1年末净资产不低于
        2000万元，最近1年末金融资产不低于1000万元，具有2年以
        上证券、基金、期货、黄金、外汇等投资经历。</td><td>{{data[`${pre}isProfessionalInvestors`]}}</td></tr>
      <tr><td class="title">资产规模</td><td colspan="5">*私募基金或者资产管理计划投资者，最近三个月月末资产均
        超过（含）人民币1000万元</td><td>{{data[`${pre}orgAssetsScale`]}}</td></tr>
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
