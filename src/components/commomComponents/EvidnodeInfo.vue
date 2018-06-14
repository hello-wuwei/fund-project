<template>
  <div class="innerText">
    <div class="item common">
      <p>一、妥妥递对在妥妥递私募基金综合服务系统内生成的日志、数据电文实时使用X.509标准CA数字证书、RFC3161数字时间戳协议、ISO
        PDF文档标准、非对称加密算法和标准哈希算法，进行数字签名固化保全，形成不可窜改的数字签名文件；</p>
      <p>二、妥妥递本着独立、客观、公正的原则对妥妥递私募基金综合服务系统内的数字签名文件进行汇集，形成证明报告如下：</p>
    </div>
    <div class="view-text">
      <temp1 v-if="type==='TRACE_INVESTOR_CREATE'" :data="data"></temp1>
      <temp2 v-if="type==='TRACE_INVESTOR_RELATION'" :data="data"></temp2>
      <temp3 v-if="type==='TRACE_SPECIFIC_CERTIFIED'" :data="data"></temp3>
      <temp4 v-if="type==='TRACE_SPECIFIC_REVIEW'" :data="data"></temp4>
      <temp5 v-if="type==='TRACE_ORDER_CREATE_FINANCIAL'" :data="data"></temp5>
      <temp6 v-if="type==='TRACE_ORDER_CONFIRM_INVESTOR'" :data="data"></temp6>
      <temp7 v-if="type==='TRACE_ORDER_VIDEO'" :data="data"></temp7>
      <!--合同签署-->
      <temp8 v-if="commomTypeTempt.indexOf(type) > -1" :data="data"></temp8>
      <temp9 v-if="type==='TRACE_PRODUCT_CREATE_TRUSTEE'" :data="data"></temp9>
      <temp10 v-if="type==='TRACE_PRODUCT_CONFIRM_MANAGER'" :data="data"></temp10>
      <temp11 v-if="type==='TRACE_USER_REGISTER'" :data="data"></temp11>
      <temp12 v-if="type==='TRACE_INVESTOR_INFO_CHANGE'" :data="data"></temp12>
      <temp13 v-if="type==='TRACE_ORDER_CONFIRM_MANAGER'" :data="data"></temp13>
      <temp14 v-if="type==='TRACE_INVESTOR_QUESTION'" :data="data"></temp14>
      <temp15 v-if="type==='TRACE_INVESTOR_TYPE_CHANGE'" :data="data"></temp15>
      <temp16 v-if="type==='TRACE_INVESTOR_TYPE_CHANGE_REVIEW'" :data="data"></temp16>
      <temp17 v-if="type==='TRACE_SUPPLY_CREATE_TRUSTEE'" :data="data"></temp17>
      <temp18 v-if="type==='TRACE_SUPPLY_CONFIRM_MANAGER'" :data="data"></temp18>
      <temp19 v-if="type==='TRACE_SUPPLY_INFORM_CREATE_MANAGER'" :data="data"></temp19>
      <temp20 v-if="type==='TRACE_SUPPLY_INFORM_CONFIRM_TRUSTEE'" :data="data"></temp20>
      <temp21 v-if="type==='TRACE_ORDER_CREATE_INVESTOR'" :data="data"></temp21>
      <temp36 v-if="type==='TRACE_INVESTOR_INFO_CHANGE_REVIEW'" :data="data"></temp36>
    </div>
  </div>
</template>
<script>
  // 理财师创建投资者
  import temp1 from '../commomComponents/evidTempComponents/temp1.vue'

  // 投资者与管理人关联
  import temp2 from '../commomComponents/evidTempComponents/temp2.vue'

  // 特定对象认证申请
  import temp3 from '../commomComponents/evidTempComponents/temp3.vue'

  // 特定对象认证申请管理审核通过
  import temp4 from '../commomComponents/evidTempComponents/temp4.vue'

  // 订单创建-理财师创建
  import temp5 from '../commomComponents/evidTempComponents/temp5.vue'

  // 订单确认-投资者确认
  import temp6 from '../commomComponents/evidTempComponents/temp6.vue'

  // 双录
  import temp7 from '../commomComponents/evidTempComponents/temp7.vue'

  // 合同签署
  import temp8 from '../commomComponents/evidTempComponents/temp8.vue'

  // 创建产品-托管人创建
  import temp9 from '../commomComponents/evidTempComponents/temp9.vue'

  // 创建产品-管理人确认
  import temp10 from '../commomComponents/evidTempComponents/temp10.vue'

  // 投资者注册
  import temp11 from '../commomComponents/evidTempComponents/temp11.vue'

  // 投资者发起核心信息变更
  import temp12 from '../commomComponents/evidTempComponents/temp12.vue'

  // 订单确认-管理人
  import temp13 from '../commomComponents/evidTempComponents/temp13.vue'

  // 投资者风险测评
  import temp14 from '../commomComponents/evidTempComponents/temp14.vue'

  // 投资者申请类型转化
  import temp15 from '../commomComponents/evidTempComponents/temp15.vue'

  // 管理人审核类型转化
  import temp16 from '../commomComponents/evidTempComponents/temp16.vue'

  // 托管人创建补充协议
  import temp17 from '../commomComponents/evidTempComponents/temp17.vue'

  // 管理人确认补充协议
  import temp18 from '../commomComponents/evidTempComponents/temp18.vue'

  // 管理人上传生效告知函
  import temp19 from '../commomComponents/evidTempComponents/temp19.vue'

  // 托管人确认生效告知函
  import temp20 from '../commomComponents/evidTempComponents/temp20.vue'

  // 订单创建-投资者创建
  import temp21 from '../commomComponents/evidTempComponents/temp21.vue'

  // 管理人审核核心信息变更
  import temp36 from '../commomComponents/evidTempComponents/temp36.vue'
  export default {
    props: {
      type: {
        type: [String]
      },
      data: {
        type: [Object]
      }
    },
    components: {
      temp1,
      temp2,
      temp3,
      temp4,
      temp5,
      temp6,
      temp7,
      temp8,
      temp9,
      temp10,
      temp11,
      temp12,
      temp13,
      temp14,
      temp15,
      temp16,
      temp17,
      temp18,
      temp19,
      temp20,
      temp21,
      temp36
    },
    data () {
      return {
        commomTypeTempt: [
          'TRACE_ORDER_CONTRACT_SGIN',
          'MANAGER_TRACE_ORDER_CONTRACT_SGIN',
          'MANAGER_LEGAL_TRACE_ORDER_CONTRACT_SGIN',
          'INVESTOR_TRACE_ORDER_CONTRACT_SGIN',
          'TRUST_TRACE_ORDER_CONTRACT_SGIN',
          'TRUST_LEGAL_TRACE_ORDER_CONTRACT_SGIN',
          'INVESTOR_TRACE_ORDER_RISK_SGIN',
          'MANAGER_TRACE_ORDER_RISK_SGIN',
          'TRACE_INVESTOR_CREATE',
          'PLANNER_TRACE_ORDER_RISK_SGIN',
          'INVESTOR_TRACE_ORDER_SUPPLEMENT_SGIN',
          'MANAGER_LEGAL_TRACE_ORDER_SUPPLEMENT_SGIN',
          'MANAGER_TRACE_ORDER_SUPPLEMENT_SGIN',
          'TRUST_TRACE_ORDER_SUPPLEMENT_SGIN',
          'TRUST_LEGAL_TRACE_ORDER_SUPPLEMENT_SGIN'
        ]
      }
    },
    created () {
    }
  }
</script>
<style>
  .innerText{
    font-size: 16px;
    line-height: 30px;
  }
  .innerText .item p{
    text-indent: 30px
  }
  .innerText h4{
    margin: 10px 0;
    font-weight: bold;
  }
  .innerText b{
    font-size: 14px;
    text-indent: 0;
    display: block;
  }
  .innerText span{
    font-size: 14px;
    display: block;
  }
</style>
<style scoped>
  .innerText{
    font-weight: normal;
  }
  .innerText .item{
    margin-bottom: 10px;
  }
  .innerText .item h4{
    font-weight: bold;
    color: #000;
  }
</style>
