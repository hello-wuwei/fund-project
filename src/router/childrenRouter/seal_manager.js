/**
 * Created by Administrator on 2018/5/23.
 */
import list from '../../components/sealManage/managerSeal/managerSealList.vue'
import upload from '../../components/sealManage/managerSeal/uploadSeal.vue'
import {addMeta} from '../utilRouter'
const childrenRouter = [{
  path: '/',
  component: list
}, {
  path: 'upload',
  component: upload
}]
addMeta(childrenRouter, '管理人公章管理')
export default childrenRouter
