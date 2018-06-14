/**
 * Created by Administrator on 2018/5/23.
 */
import list from '../../components/systemManage/toPublicAcc/toPublicAccList.vue'
import {addMeta} from '../utilRouter'
const childrenRouter = [{
  path: '/',
  component: list
}]
addMeta(childrenRouter, '对公账户管理')
export default childrenRouter
