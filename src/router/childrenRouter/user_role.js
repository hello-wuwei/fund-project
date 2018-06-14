/**
 * Created by Administrator on 2018/5/23.
 */
import list from '../../components/userManage/userRole/userRoleList.vue'
import add from '../../components/userManage/userRole/addRole.vue'
import edit from '../../components/userManage/userRole/editRole.vue'
import see from '../../components/userManage/userRole/seeRole.vue'
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
  path: 'see',
  component: see
}]
addMeta(childrenRouter, '用户角色管理')
export default childrenRouter
