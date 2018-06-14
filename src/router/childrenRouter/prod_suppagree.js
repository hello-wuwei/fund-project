/**
 * Created by Administrator on 2018/5/23.
 */
import list from '../../components/productManage/suppAgreement/suppAgreementList.vue'
import agreedone from '../../components/productManage/suppAgreement/agreeDone.vue'
import agreesign from '../../components/productManage/suppAgreement/makeContSign.vue'
import newcontdone from '../../components/productManage/suppAgreement/newContDone.vue'
import newcontsign from '../../components/productManage/suppAgreement/makeNewContSign.vue'
import riskdone from '../../components/productManage/suppAgreement/riskbookDone.vue'
import enterinfo from '../../components/productManage/suppAgreement/enterInfo.vue'
import batchdone from '../../components/productManage/suppAgreement/batchDone.vue'
import risksign from '../../components/productManage/suppAgreement/makeRiskSign.vue'
import see from '../../components/productManage/suppAgreement/seeView.vue'
import {addMeta} from '../utilRouter'
const childrenRouter = [{
  path: '/',
  component: list
}, {
  path: 'agreedone',
  component: agreedone
}, {
  path: 'agreesign',
  component: agreesign
}, {
  path: 'newcontdone',
  component: newcontdone
}, {
  path: 'newcontsign',
  component: newcontsign
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
  path: 'batchdone',
  component: batchdone
}, {
  path: 'see',
  component: see
}]
addMeta(childrenRouter, '补充协议')
export default childrenRouter
