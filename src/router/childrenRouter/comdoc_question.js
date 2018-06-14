/**
 * Created by Administrator on 2018/5/23.
 */
import list from '../../components/univerDocManage/riskTestQuestion/riskTestQuestionList.vue'
import {addMeta} from '../utilRouter'
const childrenRouter = [{
  path: '/',
  component: list
}]
addMeta(childrenRouter, '风险测评问卷')
export default childrenRouter
