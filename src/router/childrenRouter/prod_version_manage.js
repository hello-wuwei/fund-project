/**
 * Created by Administrator on 2018/5/23.
 */
import list from '../../components/productManage/versionManage/versionManageList.vue'
import recordlist from '../../components/productManage/versionManage/versionRecordList.vue'
import see from '../../components/productManage/versionManage/seeView.vue'
import {addMeta} from '../utilRouter'
const childrenRouter = [{
  path: '/',
  component: list
}, {
  path: 'recordlist',
  component: recordlist
}, {
  path: 'see',
  component: see
}]
addMeta(childrenRouter, '版本管理')
export default childrenRouter
