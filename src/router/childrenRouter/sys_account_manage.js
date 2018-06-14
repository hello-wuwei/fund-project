/**
 * Created by Administrator on 2018/5/23.
 */
import list from '../../components/systemManage/systemAccount/systemAccountList.vue'
import addAccount from '../../components/systemManage/systemAccount/addAccount.vue'
import editAccount from '../../components/systemManage/systemAccount/editAccount.vue'
import {addMeta} from '../utilRouter'
const childrenRouter = [{
  path: '/',
  component: list
}, {
  path: 'addAccount',
  component: addAccount
}, {
  path: 'editAccount',
  component: editAccount
}]
addMeta(childrenRouter, '员工管理')
export default childrenRouter
