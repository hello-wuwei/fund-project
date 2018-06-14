/**
 * Created by Administrator on 2018/5/23.
 */
import list from '../../components/systemManage/manageBackstage/manageBackstageList.vue'
import addResouce from '../../components/systemManage/manageBackstage/addResouce.vue'
import editResouce from '../../components/systemManage/manageBackstage/editResouce.vue'
import seeResouce from '../../components/systemManage/manageBackstage/seeResouce.vue'
import {addMeta} from '../utilRouter'
const childrenRouter = [{
  path: '/',
  component: list
}, {
  path: 'addResouce',
  component: addResouce
}, {
  path: 'editResouce',
  component: editResouce
}, {
  path: 'seeResouce',
  component: seeResouce
}]
addMeta(childrenRouter, '后台管理')
export default childrenRouter
