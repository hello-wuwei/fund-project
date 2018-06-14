/**
 * Created by Administrator on 2018/5/23.
 */
import list from '../../components/systemManage/roleManage/userRoleList.vue'
import addRole from '../../components/systemManage/roleManage/addRole.vue'
import editRole from '../../components/systemManage/roleManage/editRole.vue'
import seeRole from '../../components/systemManage/roleManage/seeRole.vue'
import {addMeta} from '../utilRouter'
const childrenRouter = [{
  path: '/',
  component: list
}, {
  path: 'addRole',
  component: addRole
}, {
  path: 'editRole',
  component: editRole
}, {
  path: 'seeRole',
  component: seeRole
}]
addMeta(childrenRouter, '系统角色管理')
export default childrenRouter
