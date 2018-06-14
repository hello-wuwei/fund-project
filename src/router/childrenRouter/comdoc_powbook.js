/**
 * Created by Administrator on 2018/5/23.
 */
import list from '../../components/univerDocManage/powBook/powBookList.vue'
import {addMeta} from '../utilRouter'
const childrenRouter = [{
  path: '/',
  component: list
}]
addMeta(childrenRouter, '套印授权函')
export default childrenRouter
