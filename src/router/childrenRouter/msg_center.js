/**
 * Created by Administrator on 2018/5/23.
 */
import list from '../../components/messageCenter/message/messageList.vue'
import {addMeta} from '../utilRouter'
const childrenRouter = [{
  path: '/',
  component: list
}]
addMeta(childrenRouter, '消息中心')
export default childrenRouter
