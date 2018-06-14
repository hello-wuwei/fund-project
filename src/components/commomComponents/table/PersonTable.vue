<template>
	<div class="table">
    <table border="1">
      <tr><td class="title" style="width: 80px">姓名</td><td style="width: 200px">{{data[`${pre}investorName`]}}</td><td class="title">性别</td><td style="width: 200px">{{data[`${pre}userSex`]}}</td><td class="title">年龄</td><td style="width: 200px">{{data[`${pre}userAge`]}}</td></tr>
      <tr><td class="title">证件类型</td><td>{{data[`${pre}catType`]}}</td><td class="title">证件号码</td><td colspan="3">{{data[`${pre}idCardNo`]}}</td></tr>
      <tr><td class="title">国籍</td><td>{{data[`${pre}userCountry`]}}</td><td class="title">职业</td><td colspan="3">{{data[`${pre}userOccupation`]}}</td></tr>
      <tr><td class="title">职务</td><td>{{data[`${pre}userPosition`]}}</td><td class="title">联系方式</td><td colspan="3">{{data[`${pre}userMobile`]}}</td></tr>
      <tr><td class="title">邮编</td><td>{{data[`${pre}zip`]}}</td><td class="title">电子邮箱</td><td colspan="3">{{data[`${pre}userEmail`]}}</td></tr>
      <tr><td class="title">住址</td><td colspan="5">{{data[`${pre}userAddress`]}}</td></tr>
      <tr><td class="title">是否满足条件</td><td colspan="4">
        （1）金融资产不低于500万元人民币，或者最近3年个人年
        均收入不低于50万元人民币 。（2）具有2年以上证券、基
        金、期货、黄金、外汇等投资经历，或者具有2年以上金融产
        品设计、投资、风险管理及相关工作经历1的自然人投资者，
        或者属于《证券期货投资者适当性管理办法》第八条第
        （一）款所规定的专业投资者的高级管理人员、获得职业资
        格认证的从事金融相关业务的注册会计师和律师。</td><td>{{JSON.parse(data[`${pre}userInvestmentExperience`]).checked}}</td></tr>
      <tr><td class="title">是否满足条件</td><td colspan="4">
        *私募基金或者资产管理计划投资者，最近20个交易日金融资
        产均不得低于人民币300万元，或者最近三年个人年均收入不
        低于人民币50万元
      </td><td>{{JSON.parse(data[`${pre}userAssetsScale`]).checked}}</td></tr>
      <tr><td class="title" colspan="2">是否存在实际控制关系</td><td colspan="4">{{JSON.parse(data[`${pre}isControllingShareholder`]).checked}}</td></tr>
      <tr><td class="title" colspan="2">交易的实际受益人</td><td colspan="4">{{JSON.parse(data[`${pre}transactionActualBeneficiary`]).checked}}</td></tr>
      <tr><td class="title" colspan="2">是否有不良诚信记录</td><td colspan="4">{{JSON.parse(data[`${pre}isBadFaith`]).checked}}</td></tr>
      <tr><td colspan="2">身份认证资料</td><td colspan="4"><id-check :type="version" :data="data"></id-check></td></tr>
      <tr><td colspan="2">合格投资者资料</td><td colspan="4"><standard-info :type="version" :data="data"></standard-info></td></tr>
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
        activeData: {},
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
