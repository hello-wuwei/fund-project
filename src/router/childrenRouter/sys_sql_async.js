/**
 * Created by Administrator on 2018/5/23.
 */
import list from '../../components/systemManage/dataAsync/dataAsyncList.vue'
import haslist from '../../components/systemManage/dataAsync/dataHasAsyncList.vue'
import addSql from '../../components/systemManage/dataAsync/addSql.vue'
import editSql from '../../components/systemManage/dataAsync/editSql.vue'
import watchSql from '../../components/systemManage/dataAsync/watchSql.vue'
import {addMeta} from '../utilRouter'
const childrenRouter = [{
  path: '/',
  component: list
}, {
  path: 'haslist',
  component: haslist
}, {
  path: 'addSql',
  component: addSql
}, {
  path: 'editSql',
  component: editSql
}, {
  path: 'watchSql',
  component: watchSql
}]
addMeta(childrenRouter, 'SQL同步')
export default childrenRouter
