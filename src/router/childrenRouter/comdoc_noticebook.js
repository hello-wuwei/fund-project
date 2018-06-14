/**
 * Created by Administrator on 2018/5/23.
 */
import list from '../../components/univerDocManage/noticeBook/noticeBookList.vue'
import {addMeta} from '../utilRouter'
const childrenRouter = [{
  path: '/',
  component: list
}]
addMeta(childrenRouter, '生效告知书')
export default childrenRouter
