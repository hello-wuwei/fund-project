/**
 * Created by Administrator on 2018/5/30.
 */
import list from '../../components/systemManage/announcement/list.vue'
import add from '../../components/systemManage/announcement/add.vue'
import see from '../../components/systemManage/announcement/see.vue'
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
addMeta(childrenRouter, '公告发布')
export default childrenRouter
