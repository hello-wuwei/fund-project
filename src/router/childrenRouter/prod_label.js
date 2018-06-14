/**
 * Created by Administrator on 2018/5/23.
 */
import list from '../../components/productManage/textLabel/textLabelList.vue'
import {addMeta} from '../utilRouter'
const childrenRouter = [{
  path: '/',
  component: list
}]
addMeta(childrenRouter, '标签管理')
export default childrenRouter
