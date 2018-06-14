/**
 * Created by Administrator on 2018/5/23.
 */
import list from '../../components/userManage/manager/managerList.vue'
import accCheck from '../../components/userManage/manager/accManagerCheck.vue'
import orgCheck from '../../components/userManage/manager/orgManagerCheck.vue'
import see from '../../components/userManage/manager/managerWatch.vue'
import {addMeta} from '../utilRouter'
const childrenRouter = [{
  path: '/',
  component: list
}, {
  path: 'accCheck',
  component: accCheck
}, {
  path: 'orgCheck',
  component: orgCheck
}, {
  path: 'see',
  component: see
}]
addMeta(childrenRouter, '管理人管理')
export default childrenRouter
