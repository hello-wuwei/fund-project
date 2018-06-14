/**
 * Created by Administrator on 2018/5/23.
 */
import list from '../../components/systemManage/paramConfig/paramConfigList.vue'
import {addMeta} from '../utilRouter'
const childrenRouter = [{
  path: '/',
  component: list
}]
addMeta(childrenRouter, '参数配置')
export default childrenRouter
