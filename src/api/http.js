import 'es6-promise/auto'
import axios from 'axios'
import qs from 'qs'
import { Loading, Message } from 'element-ui'
import crypto from '../utils/crypto.js'
import utils from '../utils/utils'
import { Authorization, baseUrl } from './config'
let loadingInstance

let options = {
  lock: true,
  text: 'Loading',
  spinner: 'el-icon-loading',
  background: 'rgba(255, 255, 255, 0.7)'
}
// let startLoad = function () {
//   loadingInstance = Loading.service(options)
// }
// let endLoad = function () {
//   loadingInstance.close()
// }

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (config.url.indexOf('/label/create') > 0) {
    options.text = '合同标签正在提交中'
  } else {
    options.text = 'Loading'
  }
  loadingInstance = Loading.service(options)
  return config
}, function (error) {
  // 对请求错误做些什么
  Message({message: '请求错误', type: 'error'})
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  loadingInstance.close()
  // 对响应数据做点什么
  if (response.status === 200) {
    return response
  }
  Message({message: '响应异常，异常状态码：' + response.status, type: 'error'})
}, function (error) {
  // 对响应错误做点什么
  loadingInstance.close()
  return Promise.reject(error)
})

const post = (url, orgData, baseURL) => {
  if (url !== '/sysUser/login' && url !== '/sysUser/findPwd' && url !== '/sysUser/obtain/smscode') {
    if (utils.judgeTime()) {
      utils.loginOut({msg: '登录超时', type: 'reload'})
      return
    }
  }
  let data = Object.assign({}, orgData)

  let currTimeStamp = utils.uuid() + '-' + crypto.getTimeStamp()

  let header = Authorization(currTimeStamp)
  data = (typeof data === 'undefined' ? {} : data)
  data.currUserId = utils.getUserId()
  data.requestInfo = utils.getRequestInfo()
  data = utils.objDislodgeEmpty(data, url)
  console.log(data)

  if (url !== '/oos/transformToImg') {
    let _data = utils.enctypeAes(data, currTimeStamp)
    data = crypto.encryptBase64(_data)
    header.cm = crypto.encryptMD5(data)
    header.au = utils.getStorageUserInfo().au
    data = qs.stringify({body: data})
  } else {
    data = qs.stringify(data)
  }

  return new Promise(function (resolve, reject) {
    axios({
      baseURL: baseURL || (baseUrl + '/ttd-fund-manage'),
      method: 'post',
      url: url,
      data: data,
      headers: header,
      transformRequest: [(data) => {
        return data
      }],
      transformResponse: [function (data) {
        data = crypto.decryptBase64(data)
        data = utils.dectypeAes(data)
        console.log(JSON.parse(data))
        return JSON.parse(data)
      }]
    }).then((res) => {
      switch (res.status) {
        case 200:
          if (res.data.code === 1000) {           // 返回1000，账号在其他端登录，则退出当前账号
            setTimeout(() => {
              utils.loginOut({msg: res.data.msg, type: 'login_out'})
            }, 1000)
          } else {
            resolve(res.data)
          }
      }
    }).catch((e) => {
      reject(e)
    })
  })
}

export {post}
