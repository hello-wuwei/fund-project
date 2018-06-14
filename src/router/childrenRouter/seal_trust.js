/**
 * Created by Administrator on 2018/5/23.
 */
import list from '../../components/sealManage/custodianSeal/custodianSealList.vue'
import upload from '../../components/sealManage/custodianSeal/uploadSeal.vue'
import {addMeta} from '../utilRouter'
const childrenRouter = [{
  path: '/',
  component: list
}, {
  path: 'upload',
  component: upload
}]
addMeta(childrenRouter, '托管人公章管理')
export default childrenRouter
