/**
 * Created by Administrator on 2018/5/23.
 */
import list from '../../components/userManage/custodian/custodianList.vue'
import add from '../../components/userManage/custodian/addAccount.vue'
import edit from '../../components/userManage/custodian/editAccount.vue'
import addOrgInfo from '../../components/userManage/custodian/addOrgInfo.vue'
import {addMeta} from '../utilRouter'
const childrenRouter = [{
  path: '/',
  component: list
}, {
  path: 'add',
  component: add
}, {
  path: 'edit',
  component: edit
}, {
  path: 'addorginfo',
  component: addOrgInfo
}]
addMeta(childrenRouter, '托管人管理')
export default childrenRouter
