/**
 * Created by Administrator on 2018/5/23.
 */
import list from '../../components/ukeyManage/custodianUkey/custodianUkeyList.vue'
import add from '../../components/ukeyManage/custodianUkey/addUkey.vue'
import see from '../../components/ukeyManage/custodianUkey/seeDetail.vue'
import {addMeta} from '../utilRouter'
const childrenRouter = [{
  path: '/',
  component: list
}, {
  path: 'add',
  component: add
}, {
  path: 'see',
  component: see
}]
addMeta(childrenRouter, '托管人UKEY管理')
export default childrenRouter
