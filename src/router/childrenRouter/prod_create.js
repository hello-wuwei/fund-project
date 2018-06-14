/**
 * Created by Administrator on 2018/5/23.
 */
import list from '../../components/productManage/productManage/productManageList.vue'
import contdone from '../../components/productManage/productManage/contractDone.vue'
import contractsign from '../../components/productManage/productManage/makeContSign.vue'
import riskdone from '../../components/productManage/productManage/riskbookDone.vue'
import enterinfo from '../../components/productManage/productManage/enterInfo.vue'
import risksign from '../../components/productManage/productManage/makeRiskSign.vue'
import see from '../../components/productManage/productManage/seeView.vue'
import {addMeta} from '../utilRouter'
const childrenRouter = [{
  path: '/',
  component: list
}, {
  path: 'contdone',
  component: contdone
}, {
  path: 'contractsign',
  component: contractsign
}, {
  path: 'riskdone',
  component: riskdone
}, {
  path: 'enterinfo',
  component: enterinfo
}, {
  path: 'risksign',
  component: risksign
}, {
  path: 'see',
  component: see
}]
addMeta(childrenRouter, '产品创设')
export default childrenRouter
