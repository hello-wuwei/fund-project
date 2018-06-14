/**
 * Created by Administrator on 2018/5/23.
 */
import list from '../../components/productManage/labelTemplet/labelTempletList.vue'
import templetdone from '../../components/productManage/labelTemplet/templetDone.vue'
import templetsign from '../../components/productManage/labelTemplet/makeTempSign.vue'
import {addMeta} from '../utilRouter'
const childrenRouter = [{
  path: '/',
  component: list
}, {
  path: 'templetdone',
  component: templetdone
}, {
  path: 'templetsign',
  component: templetsign
}]
addMeta(childrenRouter, '标签模板')
export default childrenRouter
