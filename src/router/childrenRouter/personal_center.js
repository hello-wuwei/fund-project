/**
 * Created by Administrator on 2018/5/23.
 */
import index from '../../components/userCenter/userComps/userRight.vue'
import avator from '../../components/userCenter/userComps/avator.vue'
import changePsd from '../../components/userCenter/userComps/changePsd.vue'
import changeMobile from '../../components/userCenter/userComps/changeMobile.vue'
import {addMeta} from '../utilRouter'
const childrenRouter = [{
  path: '/',
  component: index
}, {
  path: 'avator',
  component: avator
}, {
  path: 'changePsd',
  component: changePsd
}, {
  path: 'changeMobile',
  component: changeMobile
}]
addMeta(childrenRouter, '个人中心')
export default childrenRouter
