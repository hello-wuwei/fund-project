/**
 * Created by Administrator on 2018/5/23.
 */
import list from '../../components/systemManage/operLog/operLogList.vue'
import watchLog from '../../components/systemManage/operLog/watchLog.vue'
import {addMeta} from '../utilRouter'
const childrenRouter = [{
  path: '/',
  component: list
}, {
  path: 'watchLog',
  component: watchLog
}]
addMeta(childrenRouter, '操作日志')
export default childrenRouter
