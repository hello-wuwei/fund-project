/**
 * Created by Administrator on 2017/12/1.
 */
import utils from './utils'
import * as myUtils from './my_utils'
import rootConf from '../config/fun_root'
import Sock from 'sockjs-client'
import Stomp from 'stompjs'
import { getConnectUrl, getPath } from '../api/websocket'
import { Notification } from 'element-ui'
const resiter = (Vue) => {
  for (let key in myUtils) {
    Vue.prototype[key] = myUtils[key]
  }

  Vue.prototype.formatDate = (date) => {
    if (date) {
      date = new Date(date)
      let Y = date.getFullYear()
      let M = date.getMonth() + 1
      M = M < 10 ? '0' + M : M
      let D = date.getDate()
      D = D < 10 ? ('0' + D) : D
      return Y + '-' + M + '-' + D
    } else {
      return ''
    }
  }

  Vue.prototype.em = (row, column) => {
    if (!row[column.property]) {
      return '--'
    }
    return row[column.property]
  }

  // 建立websocket链接
  Vue.prototype.$client_connect = () => {
    let websocket = new Sock(getConnectUrl(), null, {'withCredentials': false})
    Vue.stompClient = Stomp.over(websocket)
    Vue.stompClient.connect({}, function (frame) {
      Vue.stompClient.subscribe(getPath(), function (data) {
        let msg = JSON.parse(data.body)
        Notification({
          title: msg.title,
          message: msg.content
        })
      })
    })

    Vue.prototype.$client_connect = () => {
      if (Vue.stompClient !== null) {
        Vue.stompClient.disconnect()
      }
    }
  }

  // 初始化功能权限，挂载到Vue实例中
  Vue.prototype.$initFunRoot = () => {
    let rootList = utils.getStorageUserInfo().authMap
    for (let key in rootConf) {
      if (rootList.hasOwnProperty(key)) {
        Vue.prototype[key] = true
      } else {
        Vue.prototype[key] = false
      }
    }
  }
}
export default resiter
