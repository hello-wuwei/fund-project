/**
 * Created by Administrator on 2018/5/23.
 */
import list from '../../components/sealManage/managerSealCorp/managerSealCorpList.vue'
import upload from '../../components/sealManage/managerSealCorp/uploadSeal.vue'
import {addMeta} from '../utilRouter'
const childrenRouter = [{
  path: '/',
  component: list
}, {
  path: 'upload',
  component: upload
}]
addMeta(childrenRouter, '管理人法人章管理')
export default childrenRouter
