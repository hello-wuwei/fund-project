/**
 * Created by Administrator on 2018/5/23.
 */
import list from '../../components/systemManage/clientBmanage/clientBmanageList.vue'
import addResouce from '../../components/systemManage/clientBmanage/addResouce.vue'
import editResouce from '../../components/systemManage/clientBmanage/editResouce.vue'
import seeResouce from '../../components/systemManage/clientBmanage/seeResouce.vue'
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
addMeta(childrenRouter, 'B端管理')
export default childrenRouter
