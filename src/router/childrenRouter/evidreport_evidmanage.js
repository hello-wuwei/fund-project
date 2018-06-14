/**
 * Created by Administrator on 2018/5/23.
 */
import list from '../../components/evidReportManage/evidReport/list.vue'
import see from '../../components/evidReportManage/evidReport/see.vue'
import {addMeta} from '../utilRouter'
const childrenRouter = [{
  path: '/',
  component: list
}, {
  path: 'see',
  component: see
}]
addMeta(childrenRouter, '存证管理')
export default childrenRouter
