/**
 * Created by Administrator on 2018/3/26.
 */
import api from '../api/sever_api'
export const viewSignFile = async (type, productId, targetId, labelData, vm) => {
  if (!(navigator.userAgent.indexOf('Chrome') > -1)) {
    alert('您的浏览器非谷歌浏览器，可能无法显示签章信息，请使用Chrome浏览器')
  }
  if (!labelData.length) {
    vm.$message({message: '标签内容为空', type: 'warning'})
    return
  }
  let obj = {sysCode: 'TTD_MANAGE_SYSTEM', type: type, productId: productId, targetId: targetId, lableDis: JSON.stringify(labelData)}
  let res = await api.getViewLabel(obj)
  switch (res.code) {
    case 0:
      window.open(JSON.parse(res.data.bean).url, '_blank')
      break
    default:
      vm.$message({message: res.msg, type: 'warning'})
  }
}

// productId 产品ID
// targetId 业务ID(合同ID/风险揭示书ID/补充协议ID【即：合同ID】)
// sysCode 系统编码。TTDFUND：基金
// type 标签类型0：所有标签，1：普通标签，2：签章签名标签
// businessType 业务类型1：合同，2：风险揭示书，3：合同补充协议【签署型】
export const getLabelViewData = async (productId, targetId, type, businessType, vm) => {
  let obj = {
    productId: productId,
    targetId: targetId,
    sysCode: 'TTDFUND',
    type: type,
    businessType: businessType
  }
  let res = await api.getContractLabel(obj)
  switch (res.code) {
    case 0:
      return res.data.bean.length ? JSON.parse(res.data.bean[0].originalLabel) : []
    default:
      vm.$message({message: res.msg, type: 'warning'})
  }
}
