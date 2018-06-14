/**
 * Created by Administrator on 2018/5/23.
 */
import list from '../../components/systemManage/taskSchedule/taskScheduleList.vue'
import addTask from '../../components/systemManage/taskSchedule/addTask.vue'
import editTask from '../../components/systemManage/taskSchedule/editTask.vue'
import seeTask from '../../components/systemManage/taskSchedule/seeTask.vue'
import {addMeta} from '../utilRouter'
const childrenRouter = [{
  path: '/',
  component: list
}, {
  path: 'addTask',
  component: addTask
}, {
  path: 'editTask',
  component: editTask
}, {
  path: 'seeTask',
  component: seeTask
}]
addMeta(childrenRouter, '任务调度')
export default childrenRouter
