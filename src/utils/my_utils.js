/**
 * Created by Administrator on 2018/3/28.
 */
export const numToStr = (val) => {        // 数字转化为字符串
  if (!val) {
    return ''
  }
  let type = typeof val
  if (type !== 'String') {
    return val.toString()
  }
  return val
}

export const evidNodeFormat = (type) => {
  return {
    'TRACE_INVESTOR_CREATE': '理财师创建投资者',
    'TRACE_INVESTOR_RELATION': '投资者与管理人关联',
    'TRACE_SPECIFIC_CERTIFIED': '特定对象认证申请',
    'TRACE_SPECIFIC_REVIEW': '特定对象认证申请管理审核通过',
    'TRACE_ORDER_CREATE_FINANCIAL': '订单创建-理财师创建',
    'TRACE_ORDER_CONFIRM_INVESTOR': '订单确认-投资者确认',
    'TRACE_ORDER_VIDEO': '双录',
    'TRACE_ORDER_CONTRACT_SGIN': '合同签署',
    'TRACE_PRODUCT_CREATE_TRUSTEE': '创建产品-托管人创建',
    'TRACE_PRODUCT_CONFIRM_MANAGER': '创建产品-管理人确认',
    'TRACE_USER_REGISTER': '投资者注册',
    'TRACE_INVESTOR_INFO_CHANGE': '投资者发起核心信息变更',
    'CERTIFICATE_CURING': '固化证书信息',
    'TRACE_ORDER_CONFIRM_MANAGER': '订单确认-管理人',
    'CERTIFICATE_AUTHORITY_CFCA': '第三方存证机构-CFCA',
    'TRACE_INVESTOR_QUESTION': '投资者风险测评',
    'TRACE_INVESTOR_TYPE_CHANGE': '投资者申请类型转化',
    'TRACE_INVESTOR_TYPE_CHANGE_REVIEW': '管理人审核类型转化',
    'TRACE_SUPPLY_CREATE_TRUSTEE': '托管人创建补充协议',
    'TRACE_SUPPLY_CONFIRM_MANAGER': '管理人确认补充协议',
    'TRACE_SUPPLY_INFORM_CREATE_MANAGER': '管理人上传生效告知函',
    'TRACE_SUPPLY_INFORM_CONFIRM_TRUSTEE': '托管人确认生效告知函',
    'TRACE_ORDER_CREATE_INVESTOR': '订单创建-投资者创建',
    'MANAGER_TRACE_ORDER_CONTRACT_SGIN': '管理人签署合同',
    'MANAGER_LEGAL_TRACE_ORDER_CONTRACT_SGIN': '管理人法人签署合同',
    'INVESTOR_TRACE_ORDER_CONTRACT_SGIN': '投资者合同签署',
    'TRUST_TRACE_ORDER_CONTRACT_SGIN': '管理人签署补充协议',
    'TRUST_LEGAL_TRACE_ORDER_CONTRACT_SGIN': '管理人法人签署补充协议',
    'INVESTOR_TRACE_ORDER_RISK_SGIN': '投资者签署风险揭示书',
    'MANAGER_TRACE_ORDER_RISK_SGIN': '管理人签署风险揭示书',
    'PLANNER_TRACE_ORDER_RISK_SGIN': '理财师签署风险揭示书',
    'INVESTOR_TRACE_ORDER_SUPPLEMENT_SGIN': '投资者签署补充协议',
    'MANAGER_LEGAL_TRACE_ORDER_SUPPLEMENT_SGIN': '管理人法人签署补充协议',
    'MANAGER_TRACE_ORDER_SUPPLEMENT_SGIN': '管理人签署补充协议',
    'TRUST_TRACE_ORDER_SUPPLEMENT_SGIN': '托管人签署补充协议',
    'TRUST_LEGAL_TRACE_ORDER_SUPPLEMENT_SGIN': '托管人法人签署补充协议',
    'TRACE_INVESTOR_INFO_CHANGE_REVIEW': '管理人审核核心信息变更'
  }[type]
}

/* 产品创设状态格式化 */
export const formatProState = {
  stateForm: [{
    value: 0,
    label: '合同待上传'
  }, {
    value: 3,
    label: '待电子化处理'
  }, {
    value: 4,
    label: '待托管人确认'
  }, {
    value: 5,
    label: '待管理人确认'
  }, {
    value: 7,
    label: '变更申请中'
  }, {
    value: 9,
    label: '可预约'
  }, {
    value: 11,
    label: '运作期'
  }, {
    value: 15,
    label: '清盘期'
  }, {
    value: 19,
    label: '已清盘'
  }],
  getState: function (state) {
    let form = this.stateForm
    for (let i = 0; i < form.length; i++) {
      if (form[i].value === state) {
        return form[i].label
      }
    }
  }
}

/* 补充协议状态格式化 */
export const formatSupState = {
  stateForm: [{
    value: 3,
    label: '待电子化处理'
  }, {
    value: 4,
    label: '待托管人确认'
  }, {
    value: 5,
    label: '待管理人确认'
  }, {
    value: 7,
    label: '变更申请中'
  }, {
    value: 8,
    label: '待托管人确认变更'
  }, {
    value: 9,
    label: '待管理人确认变更'
  }, {
    value: 11,
    label: '待投资人确认'
  }, {
    value: 15,
    label: '托管人生效确认'
  }, {
    value: 17,
    label: '待管理人重新提交生效告知函'
  }, {
    value: 19,
    label: '补充协议有效'
  }],
  getState: function (state) {
    let form = this.stateForm
    for (let i = 0; i < form.length; i++) {
      if (form[i].value === state) {
        return form[i].label
      }
    }
  }
}
