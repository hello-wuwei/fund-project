import * as types from './mutation-types'
import utils from '../utils/utils'

export default {
  [types.ADD_TAB] (state, data) {
    if (!state.tabs.some(v => v.path === data.path)) {
      state.tabs.push(data)
    }
  },
  [types.REMOVE_TAB] (state, path) {
    let index = state.tabs.findIndex(v => v.path === path)
    state.tabs.splice(index, 1)
  },
  [types.SET_ACTIVE_TAB] (state, index) {
    state.tabActiveIndex = index
  },
  [types.SAVE_USERINFO] (state, userInfo) {
    state.userInfo = userInfo
  },
  [types.CHANGE_MENU] (state, close) {
    // alert(window.innerWidth < 1600)
    if (close) {
      if (window.innerWidth < 1600) {
        state.isCollapse = true
      } else {
        state.isCollapse = false
      }
    } else {
      state.isCollapse = !state.isCollapse
    }
  },
  [types.SET_MSG_NUM] (state, msgNum) {
    state.msgNum = msgNum
  },
  [types.SET_LOGINIP] (state, loginInfo) {
    state.loginInfo = loginInfo
  },
  [types.REVISE_USERINFO] (state, reviseItem) {
    if (reviseItem.type === 0) {                  // 修改头像
      state.userInfo.avatar.url = reviseItem.avatar
    }
    utils.addStorage('TTD_MANAGE_USERINFO', state.userInfo)
  }
}
