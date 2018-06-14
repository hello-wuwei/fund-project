import Crypto from './crypto'
import vm from '../main'
/**
 * 获取随机字符串
 * @return {[type]} [description]
 */
function _getTimeStamp () {
  let time = new Date().getTime().toString()
  return time
}

function getRandomStr (n) {
  let chars = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z'
  ]
  let random = ''
  for (var i = 0; i < n; i++) {
    let id = Math.ceil(Math.random() * 35)
    random += chars[id]
  }
  return random
}

/**
 * 时间戳格式化
 * @param  {[type]} date [description]
 * @return {[type]}      [description]
 */
function formatDate (date, fmt) {
  if (date) {
    date = new Date(date)
    let o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      'S': date.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
    return fmt
  } else {
    return ''
  }
}

const _toQueryPair = (key, value) => {
  if (typeof value === 'undefined') {
    return key
  }
  return key + '=' + encodeURIComponent(value === null ? '' : String(value))
}

// 将对象转化为url参数
function _toQueryString (obj) {
  let ret = []
  for (let key in obj) {
    key = encodeURIComponent(key)
    let values = obj[key]
    if (values && values.constructor === Array) {                         // 数组
      var queryValues = []
      for (var i = 0, len = values.length, value; i < len; i++) {
        value = values[i]
        queryValues.push(_toQueryPair(key, value))
      }
      ret = ret.concat(queryValues)
    } else {                                              // 字符串
      ret.push(_toQueryPair(key, values))
    }
  }
  return ret.join('&')
}

function _getUrlName(url) {
  if (!url) {
    return ''
  }
  let mainUrl = url.split('?')[0]
  let endStr = mainUrl.split('/').pop()
  let nameStr = endStr.split('-')
  nameStr.shift()
  let name = nameStr.map((str) => {
    return decodeURI(str)
  })
  return name.join('-')
}

function _isPdf(url) {
  if (!url) {
    return ''
  }
  let mainUrl = url.split('?')[0]
  return mainUrl.slice(-4).indexOf('pdf') >= 0
}

/**
 * 添加本地local
 * @param name
 * @param data
 * @private
 */

function _recordTime() {
  let curtime = new Date().getTime()
  window.sessionStorage.setItem('curtime', curtime)
}

function _judgeTime() {
  let historyTime = parseInt(window.sessionStorage.getItem('curtime')) + 1800000
  let curtime = new Date().getTime()
  if (curtime > historyTime) {
    return true
  }
  window.sessionStorage.setItem('curtime', curtime)
  return false
}

function _addStorage (name, data) {
  // data.ValidPeriod = new Date().getTime() + 3600000
  let localData = Crypto.storgeEnctyptAES(JSON.stringify(data))
  window.sessionStorage.setItem(name, localData)
}

/**
 * 获取本地local
 * @param name
 * @returns {null}
 * @private
 */
function _getStorage (name) {
  let Obj = {}
  let localStr = window.sessionStorage.getItem(name)
  if (localStr === null) {

  } else {
    Obj = JSON.parse(Crypto.dectyptAES(localStr))
  }
  return Obj
}

/**
 * 检查是否登录
 * @param name
 * @returns {boolean}
 * @private
 */
function _checkLogin (name) {
  let localStr = _getStorage(name)
  let time = new Date().getTime()
  if (localStr && localStr.ValidPeriod > time) {
    return true
  } else {
    _addStorage('activePath', {})
    return false
  }
}

/**
 * 获取登录用户的ID
 * @returns {*}
 * @private
 */
function _getUserId () {
  return _getStorage('TTD_MANAGE_USERINFO') ? _getStorage('TTD_MANAGE_USERINFO').userId : ''
}

/**
 * 去除对象中属性值为空的属性
 * */
function _objDislodgeEmpty (obj, url) {
  if (url === '/sys/sources/save') {
    return obj
  }
  if (obj !== '') {
    for (let i in obj) {
      if (obj[i] === '') {
        delete obj[i]
      }
    }
    return obj
  } else {
    return {}
  }
}

// 退出登录（包含1、清空用户信息和登录缓存时长；2、断开websocket消息链接；3、跳转登录页）
function _loginOut(content) {
  window.sessionStorage.removeItem('TTD_MANAGE_USERINFO')
  window.sessionStorage.removeItem('curtime')
  if (content && content.type === 'reload') {
    window.location.reload()
    return
  }
  vm.$client_connect()
  vm.$router.push('/login')
  if (content && content.type === 'login_out') {
    vm.$message({message: content.msg, type: 'warning'})
  }
}

function _uuid () {
  var s = []
  var hexDigits = '0123456789abcdef'
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4'  // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)  // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-'

  var uuid = s.join('')
  return uuid
}

function _getStorageUserInfo() {
  return _getStorage('TTD_MANAGE_USERINFO') ? _getStorage('TTD_MANAGE_USERINFO') : null
}

// 获取登录信息
function _getLoginInfo() {
  let loginInfo = window.sessionStorage.getItem('loginInfo') || {}
  return JSON.parse(loginInfo)
}

//  操作信息需要
function _getRequestInfo() {
  // let data = {}
  let requestInfo = {
    userId: _getUserId(),      // 登录用户ID
    userName: _getStorageUserInfo().realName,  // 登录用户姓名
    loginUserName: _getStorageUserInfo().name,  // 登录账号
    parentAccount: 1,   // 登录账号父账号
    userType: 'BACKUSER',   // 用户类型  TRUST:管理人  MANAGE:管理人  PERSONAL:个人投资者  MECHANISM:机构投资者
    requestIp: _getLoginInfo().ip,           // 操作IP
    mac: location.hostname,     // 操作mac
    requestNo: _uuid() + '-' + Crypto.getTimeStamp(),     // 请求编号（UUID+"-"+时间戳）
    roleName: _getStorageUserInfo().roleInfo
  }
  return JSON.stringify(requestInfo)
}

// 加密方法
function _enctypeAes (data, timestamp) {
  // 成产key
  let KeyStr = Crypto.enctyptSHA256(timestamp)
  let key = Crypto.utf8(KeyStr)
  // 生产 iv
  let ivStr = Crypto.enctyptSHA256(KeyStr + timestamp)
  let iv = Crypto.utf8(ivStr)
  // 加密
  let encryptResult = Crypto.enctyptAES(JSON.stringify(data), key, iv)
  return encryptResult
}

function _dectypeAes(data) {
  // let localKey = Crypto.utf8('2a4ac92b8217a77a')
  // let localIv = Crypto.utf8('44bf0314c4e1b101')
  // 加密
  let denctypeResult = Crypto.dectyptAES(data)
  return denctypeResult
}

function _loadFileByUrl(url) {
  if (navigator.userAgent.indexOf('Chrome') > -1) {
    let oA = document.createElement('a')
    oA.setAttribute('download', _getUrlName(url))
    oA.setAttribute('href', url)
    oA.style.display = 'none'
    document.body.appendChild(oA)
    oA.click()
    document.body.removeChild(oA)
  } else {
    window.open(url, '_self')
  }
}

export default {
  getRandomStr: getRandomStr,
  addStorage: _addStorage,
  getStorage: _getStorage,
  isLogin: _checkLogin,
  formatDate: formatDate,
  getUserId: _getUserId,
  objDislodgeEmpty: _objDislodgeEmpty,
  getUrlName: _getUrlName,
  isPdf: _isPdf,
  toQueryString: _toQueryString,
  enctypeAes: _enctypeAes,
  dectypeAes: _dectypeAes,
  uuid: _uuid,
  getStorageUserInfo: _getStorageUserInfo,
  getRequestInfo: _getRequestInfo,
  recordTime: _recordTime,
  judgeTime: _judgeTime,
  loginOut: _loginOut,
  loadFileByUrl: _loadFileByUrl,
  getTimeStamp: _getTimeStamp
}
