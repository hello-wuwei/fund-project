/**
 * Created by Administrator on 2018/5/23.
 */
import list from '../../components/univerDocManage/existEvidence/list.vue'
import add from '../../components/univerDocManage/existEvidence/add.vue'
import edit from '../../components/univerDocManage/existEvidence/edit.vue'
import see from '../../components/univerDocManage/existEvidence/see.vue'
import {addMeta} from '../utilRouter'
const childrenRouter = [{
  path: '/',
  component: list
}, {
  path: 'add',
  component: add
}, {
  path: 'edit',
  component: edit
}, {
  path: 'see',
  component: see
}]
addMeta(childrenRouter, '存证模板管理')
export default childrenRouter
